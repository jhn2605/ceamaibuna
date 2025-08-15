import { useReducer, useMemo, useEffect, useCallback, useRef } from 'react';
import { type GooglePlaceListing, type Coords, type SortCriteria, type InternalReview, type LocalServicesState, type Action, type Review } from '../types';
import { fetchLocalServices, fetchGoogleReviews } from '../api';
import { calculateDistance } from '../utils';

const initialState: LocalServicesState = {
    status: 'idle',
    listings: [],
    error: null,
    selectedCategory: 'Toate',
    sortCriteria: 'recommended',
    selectedListingId: null,
    internalReviews: {},
    googleReviews: {},
};

function localServicesReducer(state: LocalServicesState, action: Action): LocalServicesState {
    switch (action.type) {
        case 'SEARCH_START':
            return {
                ...initialState,
                listings: state.status === 'success' ? state.listings : [], // Keep old listings visible while new ones load
                status: 'loading',
                selectedCategory: action.payload,
                internalReviews: state.internalReviews, // Keep reviews across searches
                googleReviews: state.googleReviews, // Keep cached reviews
                selectedListingId: state.selectedListingId,
            };
        case 'SEARCH_SUCCESS': {
            const listingsWithFallbacks = action.payload.map((item, index) => {
                // If place_id is missing or an empty string, create a stable fallback ID.
                if (!item.place_id) {
                    // Using name, vicinity, and index to create a reasonably unique key for the current response.
                    const fallbackId = `${item.name}-${item.vicinity}-${index}`;
                    return { ...item, place_id: fallbackId };
                }
                return item;
            });

            // De-duplicate using the (now guaranteed) place_id
            const uniqueListings = Array.from(
                new Map(listingsWithFallbacks.map(item => [item.place_id, item])).values()
            );

            const currentSelectedExists = uniqueListings.some(l => l.place_id === state.selectedListingId);

            return {
                ...state,
                status: 'success',
                listings: uniqueListings,
                error: null,
                selectedListingId: state.selectedListingId && currentSelectedExists ? state.selectedListingId : uniqueListings[0]?.place_id || null,
            };
        }
        case 'SEARCH_ERROR':
            return {
                ...state,
                status: 'error',
                error: action.payload,
            };
        case 'SELECT_LISTING':
            return {
                ...state,
                selectedListingId: action.payload,
            };
        case 'SET_SORT_CRITERIA':
            return {
                ...state,
                sortCriteria: action.payload,
            };
        case 'ADD_INTERNAL_REVIEW': {
            const { placeId, review } = action.payload;
            const updatedReviews = { ...state.internalReviews };
            updatedReviews[placeId] = [review, ...(updatedReviews[placeId] || [])];
            return { ...state, internalReviews: updatedReviews };
        }
        case 'LOAD_INTERNAL_REVIEWS': {
            return { ...state, internalReviews: action.payload };
        }
        case 'FETCH_GOOGLE_REVIEWS_START':
            return {
                ...state,
                googleReviews: {
                    ...state.googleReviews,
                    [action.payload.placeId]: { status: 'loading', data: [], error: null }
                }
            };
        case 'FETCH_GOOGLE_REVIEWS_SUCCESS':
            return {
                ...state,
                googleReviews: {
                    ...state.googleReviews,
                    [action.payload.placeId]: { status: 'success', data: action.payload.reviews, error: null }
                }
            };
        case 'FETCH_GOOGLE_REVIEWS_ERROR':
            return {
                ...state,
                googleReviews: {
                    ...state.googleReviews,
                    [action.payload.placeId]: { status: 'error', data: [], error: action.payload.error }
                }
            };
        default:
            return state;
    }
}

export const useLocalServices = (userCoords: Coords | null) => {
    const [state, dispatch] = useReducer(localServicesReducer, initialState);
    const previousCoords = useRef(userCoords);

    useEffect(() => {
        try {
            const storedReviews = localStorage.getItem('ceamaibuna_internal_reviews');
            if (storedReviews) {
                dispatch({ type: 'LOAD_INTERNAL_REVIEWS', payload: JSON.parse(storedReviews) });
            }
        } catch (error) {
            console.error("Failed to parse internal reviews from localStorage", error);
        }
    }, []);

    useEffect(() => {
        if (Object.keys(state.internalReviews).length > 0) {
            localStorage.setItem('ceamaibuna_internal_reviews', JSON.stringify(state.internalReviews));
        }
    }, [state.internalReviews]);

    const searchLocalServices = useCallback(async (category: string) => {
        dispatch({ type: 'SEARCH_START', payload: category });

        if (category === 'Toate') {
            dispatch({ type: 'SEARCH_SUCCESS', payload: [] });
            return;
        }

        try {
            const data = await fetchLocalServices(category, userCoords);
            dispatch({ type: 'SEARCH_SUCCESS', payload: data });
        } catch (err) {
            dispatch({ type: 'SEARCH_ERROR', payload: err instanceof Error ? err.message : 'A apărut o eroare la preluarea datelor.' });
        }
    }, [userCoords]);
    
    // Effect to make the list "reactive" to location changes
    useEffect(() => {
        const coordsChanged = JSON.stringify(previousCoords.current) !== JSON.stringify(userCoords);
        if (coordsChanged && state.status !== 'idle' && state.selectedCategory !== 'Toate') {
            searchLocalServices(state.selectedCategory);
        }
        previousCoords.current = userCoords;
    }, [userCoords, state.status, state.selectedCategory, searchLocalServices]);
    
    // Effect to fetch Google Reviews for the selected listing
    useEffect(() => {
        const getGoogleReviews = async (listing: GooglePlaceListing) => {
            const placeId = listing.place_id;
            dispatch({ type: 'FETCH_GOOGLE_REVIEWS_START', payload: { placeId } });
            try {
                const reviews = await fetchGoogleReviews(listing);
                dispatch({ type: 'FETCH_GOOGLE_REVIEWS_SUCCESS', payload: { placeId, reviews } });
            } catch (err) {
                const errorMsg = err instanceof Error ? err.message : 'Eroare la preluarea recenziilor.';
                dispatch({ type: 'FETCH_GOOGLE_REVIEWS_ERROR', payload: { placeId, error: errorMsg } });
            }
        };

        if (state.selectedListingId && state.listings.length > 0) {
            const reviewsState = state.googleReviews[state.selectedListingId];
            const selected = state.listings.find(l => l.place_id === state.selectedListingId);
            if (selected && (!reviewsState || reviewsState.status === 'idle')) {
                getGoogleReviews(selected);
            }
        }
    }, [state.selectedListingId, state.listings, state.googleReviews, dispatch]);

    const addInternalReview = useCallback((placeId: string, review: Omit<InternalReview, 'timestamp'>) => {
        const newReview: InternalReview = { ...review, timestamp: Date.now() };
        dispatch({ type: 'ADD_INTERNAL_REVIEW', payload: { placeId, review: newReview }});
    }, []);
    
    const sortedListings = useMemo(() => {
        const listingsWithDistance = state.listings.map(listing => ({
            ...listing,
            distance: listing.coords && userCoords ? calculateDistance(userCoords, listing.coords) : Infinity
        }));

        // The .sort() method modifies the array in place. To be robust and clear,
        // we create a new sorted array from a copy.
        switch (state.sortCriteria) {
            case 'rating':
                return [...listingsWithDistance].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
            case 'reviews':
                return [...listingsWithDistance].sort((a, b) => (b.user_ratings_total ?? 0) - (a.user_ratings_total ?? 0));
            case 'distance':
                return [...listingsWithDistance].sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity));
            case 'recommended':
            default:
                // For 'recommended', we want the original API order, so we return the unsorted list (with distances).
                return listingsWithDistance;
        }
    }, [state.listings, state.sortCriteria, userCoords]);
    
    const selectedListing = useMemo(() => {
        return sortedListings.find(l => l.place_id === state.selectedListingId) || null;
    }, [state.selectedListingId, sortedListings]);

    return { state, dispatch, sortedListings, selectedListing, searchLocalServices, addInternalReview };
};