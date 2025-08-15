import React, { useRef, useEffect, useCallback } from 'react';
import { type GooglePlaceListing as GooglePlaceListingType, type SortCriteria, type InternalReview, type Coords, type LocalServicesState } from '../types';
import { SpinnerIcon, HeartIcon, HeartIconFilled, MapPinIcon, ArrowLeftIcon, StarIcon, ClockIcon, RouteIcon } from './icons';
import ListingDetail from './ListingDetail';
import Map from './Map'; // Import the new Map component
import { Action } from '../types';
import { useFavorites } from '../context/FavoritesContext';
import HowItWorks from './HowItWorks';
import ProviderCTA from './ProviderCTA';

const RatingDisplay: React.FC<{ rating?: number, reviewCount?: number, size?: 'small' | 'large' }> = ({ rating, reviewCount, size = 'large' }) => {
  if (typeof rating !== 'number' || rating === 0) return <div className={`text-xs ${size === 'large' ? 'h-6' : 'h-5'} text-gray-500 dark:text-gray-400 flex items-center italic`}>Fără recenzii Google</div>;
  const starSize = size === 'large' ? "w-5 h-5" : "w-4 h-4";
  const textSize = size === 'large' ? 'text-base' : 'text-sm';

  return (
    <div className="flex items-center gap-1">
      <span className={`font-bold ${textSize} text-gray-800 dark:text-gray-100`}>{rating.toFixed(1)}</span>
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} className={`${starSize} ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
        ))}
      </div>
      {typeof reviewCount === 'number' && (
        <span className={`text-xs text-gray-500 dark:text-gray-400`}>({reviewCount.toLocaleString('ro-RO')})</span>
      )}
    </div>
  );
};

const ListingItemCard = ({ 
  listing, 
  isActive,
  onSelect,
}: {
  listing: GooglePlaceListingType, 
  isActive: boolean,
  onSelect: (id: string) => void,
}) => {
    const { isFavorite, toggleFavorite } = useFavorites();
    const isFav = isFavorite(listing);

    const handleFavoriteToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleFavorite(listing);
    };
    
    const isOpen = listing.opening_hours?.toLowerCase().includes('deschis');

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(listing.place_id)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(listing.place_id);} }}
      className={`w-full text-left p-4 rounded-xl transition-all duration-200 border-2 relative cursor-pointer ${isActive ? 'bg-white dark:bg-gray-700/50 border-brand-primary shadow-lg' : 'bg-white dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 hover:border-brand-primary/50 hover:shadow-md'}`}
    >
            <div className="flex justify-between items-start mb-2 gap-2">
                <h3 className="font-bold text-lg text-brand-dark dark:text-white flex-grow pr-2">{listing.name}</h3>
                <button onClick={handleFavoriteToggle} className="p-1 text-gray-400 hover:text-brand-primary transition-colors flex-shrink-0 z-10" aria-label="Adaugă la favorite">
                    {isFav ? <HeartIconFilled className="w-5 h-5 text-brand-primary"/> : <HeartIcon className="w-5 h-5"/>}
                </button>
            </div>
            
            <div className="mb-3">
                <RatingDisplay rating={listing.rating} reviewCount={listing.user_ratings_total} size="small" />
            </div>

            <div className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-start gap-2">
                    <MapPinIcon className="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0"/>
                    <span className="line-clamp-2">{listing.vicinity}</span>
                </div>
                {listing.opening_hours && (
                    <div className="flex items-center gap-2">
                        <ClockIcon className="w-4 h-4 text-gray-400 flex-shrink-0"/>
                        <span className={`font-semibold ${isOpen ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>{listing.opening_hours}</span>
                    </div>
                )}
                {typeof listing.distance === 'number' && isFinite(listing.distance) && (
                    <div className="flex items-center gap-2">
                        <RouteIcon className="w-4 h-4 text-gray-400 flex-shrink-0"/>
                        <span>Aprox. {listing.distance.toFixed(1)} km</span>
                    </div>
                )}
            </div>
  </div>
    );
};

const SortControl: React.FC<{
  criteria: SortCriteria;
  onSortChange: (criteria: SortCriteria) => void;
  userCoords: Coords | null;
}> = ({ criteria, onSortChange, userCoords }) => {
    const sortOptions: { key: SortCriteria; label: string, requiresCoords?: boolean }[] = [
        { key: 'recommended', label: 'Recomandat' },
        { key: 'rating', label: 'Rating' },
        { key: 'reviews', label: 'Nr. Recenzii' },
        { key: 'distance', label: 'Distanță', requiresCoords: true },
    ];

    return (
        <div className="bg-gray-200/70 dark:bg-gray-800 p-1 rounded-full flex items-center gap-1 mb-4">
            {sortOptions.map(opt => {
                const isDisabled = opt.requiresCoords && !userCoords;
                return (
                    <button
                        key={opt.key}
                        onClick={() => onSortChange(opt.key)}
                        disabled={isDisabled}
                        className={`w-full px-3 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 focus:outline-none ${criteria === opt.key ? 'bg-white dark:bg-gray-700 text-brand-dark dark:text-white shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'} ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                        title={isDisabled ? "Activează locația pentru a sorta după distanță" : ""}
                    >
                        {opt.label}
                    </button>
                )
            })}
        </div>
    );
};

interface GooglePlacesListingsProps {
  isLoading: boolean;
  error: string | null;
  listings: GooglePlaceListingType[];
  selectedListing: GooglePlaceListingType | null;
  selectedCategory: string;
  sortCriteria: SortCriteria;
  dispatch: React.Dispatch<Action>;
  onAddReview: (placeId: string, businessName: string) => void;
  internalReviews: Record<string, InternalReview[]>;
  googleReviews: LocalServicesState['googleReviews'];
  userCoords: Coords | null;
}

const GooglePlacesListings: React.FC<GooglePlacesListingsProps> = ({ 
  isLoading,
  error,
  listings,
  selectedListing,
  selectedCategory,
  sortCriteria,
  dispatch,
  onAddReview,
  internalReviews,
  googleReviews,
  userCoords,
}) => {
    const listContainerRef = useRef<HTMLDivElement>(null);
    
    const handleSelectListing = useCallback((id: string | null) => {
        dispatch({ type: 'SELECT_LISTING', payload: id });
    }, [dispatch]);
    
    useEffect(() => {
        if(selectedListing?.place_id && listContainerRef.current) {
             const activeItem = listContainerRef.current.querySelector(`[data-id="${selectedListing.place_id}"]`);
             activeItem?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [selectedListing?.place_id]);

    if (selectedCategory === 'Toate') {
        return null;
    }

    const title = `Top Servicii Locale: ${selectedCategory}`;

    const renderContent = () => {
      if (isLoading && listings.length === 0) {
        return (
             <div className="text-center col-span-full py-16">
                <SpinnerIcon className="w-12 h-12 text-brand-primary mx-auto animate-spin" />
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">AI-ul caută cele mai bune locații pentru tine... Acest proces poate dura câteva momente, deoarece verificăm în detaliu informațiile pentru a-ți oferi cele mai relevante rezultate. Vă rugăm așteptați.</p>
            </div>
        );
      }
    
      if (error) {
        return (
          <div className="text-center bg-red-50 dark:bg-red-900/20 p-8 rounded-2xl shadow-inner col-span-full">
            <h3 className="text-xl font-semibold text-red-700 dark:text-red-300">A apărut o eroare</h3>
            <p className="text-red-600 dark:text-red-400 mt-2">{error}</p>
          </div>
        );
      }
    
      if (!isLoading && listings.length === 0) {
        return (
           <div className="text-center bg-gray-50 dark:bg-gray-800/50 p-8 rounded-2xl shadow-inner col-span-full">
            <h3 className="text-xl font-semibold text-brand-dark dark:text-white">Niciun rezultat găsit</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Momentan nu am găsit servicii de top pentru această categorie. Încearcă din nou sau alege alta.</p>
          </div>
        );
      }
    
      return (
        <div className="grid grid-cols-1 md:grid-cols-5 md:items-start gap-8">
            {/* Left Column: List or Details */}
            <div className="md:col-span-2 md:sticky md:top-28 md:max-h-[calc(100vh-160px)] flex flex-col">
                 {selectedListing ? (
                    <div className="flex-grow overflow-y-auto custom-scrollbar pr-2">
                        <button
                            onClick={() => handleSelectListing(null)}
                            className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-brand-primary mb-4"
                        >
                            <ArrowLeftIcon className="w-4 h-4" />
                            Înapoi la listă
                        </button>
                        <ListingDetail 
                            listing={selectedListing}
                            onAddReview={onAddReview} 
                            internalReviews={internalReviews[selectedListing?.place_id || ''] || []}
                            googleReviewsState={googleReviews[selectedListing.place_id]}
                        />
                    </div>
                 ) : (
                    <div className="flex flex-col">
                        <SortControl
                            criteria={sortCriteria}
                            onSortChange={(criteria) => dispatch({ type: 'SET_SORT_CRITERIA', payload: criteria })}
                            userCoords={userCoords}
                        />
                        {isLoading && listings.length > 0 && <div className="flex justify-center items-center gap-2 text-sm text-gray-500 mb-2"><SpinnerIcon className="w-4 h-4" /><span>Se actualizează...</span></div>}
                        
                        <div className="mt-4 bg-gray-100 dark:bg-gray-800/60 p-2 rounded-2xl shadow-inner">
                            <div ref={listContainerRef} className="space-y-3 overflow-y-auto custom-scrollbar p-1 max-h-[60vh]">
                                {listings.map((listing) => (
                                    <div key={listing.place_id} data-id={listing.place_id}>
                                    <ListingItemCard
                                            listing={listing} 
                                            isActive={selectedListing?.place_id === listing.place_id}
                                            onSelect={() => handleSelectListing(listing.place_id)}
                                    />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
             {/* Right Column: Map */}
            <div className="md:col-span-3 flex flex-col gap-16">
                <div className="h-[60vh] rounded-2xl overflow-hidden shadow-lg">
                  <Map
                      listings={listings}
                      selectedListing={selectedListing}
                      userCoords={userCoords}
                      onSelectListing={handleSelectListing}
                  />
                </div>
                {listings.length > 0 && (
                  <>
                    <HowItWorks />
                    <ProviderCTA />
                  </>
                )}
            </div>
        </div>
      );
    }

    return (
    <section className="pt-12 pb-16 bg-brand-light dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-brand-dark dark:text-white">{title}</h2>
        </div>
        {renderContent()}
      </div>
       <style>{`
        .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #d1d5db;
            border-radius: 20px;
            border: 3px solid transparent;
            background-clip: content-box;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #4b5563;
        }
        /* Leaflet pop-up style override */
        .leaflet-popup-content-wrapper {
            border-radius: 12px;
            background: #fff;
        }
        .dark .leaflet-popup-content-wrapper {
            background: #1f2937; /* gray-800 */
            color: #d1d5db; /* gray-300 */
        }
        .dark .leaflet-popup-tip {
            background: #1f2937;
        }
        .leaflet-popup-content {
            margin: 14px;
        }
        `}</style>
    </section>
  );
};

export default GooglePlacesListings;