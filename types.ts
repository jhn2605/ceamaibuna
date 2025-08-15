import React from 'react';

export type AppPage = 'home' | 'login' | 'register' | 'about' | 'business-register' | 'services' | 'compare' | 'favorites' | 'careers' | 'press' | 'privacy' | 'terms' | 'contact' | 'faq' | 'reset-password';

export type SortCriteria = 'recommended' | 'rating' | 'reviews' | 'distance';

export interface Category {
  name: string;
  icon: React.ReactNode;
}

export interface PricePoint {
  source: string;
  price: string;
}

export interface ResearchItem {
  productName: string;
  summary: string;
  pros: string[];
  cons: string[];
  prices: PricePoint[];
}

export interface MarketResearchResult {
  categorySummary: string;
  marketStudy: ResearchItem[];
  queryFor?: string;
}

export interface Coords {
  latitude: number;
  longitude: number;
}

export interface Review {
    author: string;
    text: string;
    rating: number;
}

export interface InternalReview extends Review {
    timestamp: number;
}


export type GoogleReviewFetchState = 'idle' | 'loading' | 'success' | 'error';

export interface GooglePlaceListing {
  place_id: string;
  name: string;
  category: string;
  vicinity: string;
  rating: number | null;
  user_ratings_total: number | null;
  coords: { latitude: number; longitude: number; } | null;
  distance?: number;
  url: string;
  website: string;
  phone_number: string;
  opening_hours: string;
}

// State Management Types for Local Services
export interface LocalServicesState {
    status: 'idle' | 'loading' | 'success' | 'error';
    listings: GooglePlaceListing[];
    error: string | null;
    selectedCategory: string;
    sortCriteria: SortCriteria;
    selectedListingId: string | null;
    internalReviews: Record<string, InternalReview[]>;
    googleReviews: Record<string, {
        status: GoogleReviewFetchState;
        data: Review[];
        error: string | null;
    }>;
}

export type Action =
    | { type: 'SEARCH_START'; payload: string }
    | { type: 'SEARCH_SUCCESS'; payload: GooglePlaceListing[] }
    | { type: 'SEARCH_ERROR'; payload: string }
    | { type: 'SELECT_LISTING'; payload: string | null }
    | { type: 'SET_SORT_CRITERIA'; payload: SortCriteria }
    | { type: 'ADD_INTERNAL_REVIEW'; payload: { placeId: string; review: InternalReview } }
    | { type: 'LOAD_INTERNAL_REVIEWS', payload: Record<string, InternalReview[]> }
    | { type: 'FETCH_GOOGLE_REVIEWS_START'; payload: { placeId: string } }
    | { type: 'FETCH_GOOGLE_REVIEWS_SUCCESS'; payload: { placeId: string; reviews: Review[] } }
    | { type: 'FETCH_GOOGLE_REVIEWS_ERROR'; payload: { placeId: string; error: string } };

export interface TeamMember {
    name: string;
    role: string;
    imageUrl: string;
    bio: string;
}

export interface OperatingHours {
  day: 'Luni' | 'Marți' | 'Miercuri' | 'Joi' | 'Vineri' | 'Sâmbătă' | 'Duminică';
  opens: string;
  closes: string;
  isClosed: boolean;
}

export interface BusinessProfile {
  ownerName: string;
  email: string;
  password?: string;
  companyName: string;
  cui: string;
  address: string;
  phone: string;
  description: string;
  categories: string[];
  logoUrl?: string;
  website?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  operatingHours: OperatingHours[];
}