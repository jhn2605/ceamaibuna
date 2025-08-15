import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { type GooglePlaceListing } from '../types';

interface FavoritesContextType {
  favorites: GooglePlaceListing[];
  toggleFavorite: (listing: GooglePlaceListing) => void;
  isFavorite: (listing: GooglePlaceListing) => boolean;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const FAVORITES_STORAGE_KEY = 'ceamaibuna_favorites';

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<GooglePlaceListing[]>([]);

  useEffect(() => {
    try {
        const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    } catch (error) {
        console.error("Failed to parse favorites from localStorage", error);
        setFavorites([]);
    }
  }, []);
  
  const saveFavorites = (newFavorites: GooglePlaceListing[]) => {
      setFavorites(newFavorites);
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
  };

  const toggleFavorite = (listing: GooglePlaceListing) => {
    const itemIndex = favorites.findIndex(i => i.place_id === listing.place_id);
    if (itemIndex > -1) {
      // Item exists, remove it
      const newFavorites = favorites.filter((_, index) => index !== itemIndex);
      saveFavorites(newFavorites);
    } else {
      // Item does not exist, add it
      const newFavorites = [...favorites, listing];
      saveFavorites(newFavorites);
    }
  };

  const isFavorite = (listing: GooglePlaceListing): boolean => {
      return favorites.some(i => i.place_id === listing.place_id);
  };

  const clearFavorites = () => {
      saveFavorites([]);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};