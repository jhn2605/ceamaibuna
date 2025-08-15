import React, { useState } from 'react';
import { SearchIcon, SpinnerIcon, MapPinIcon, ViewfinderCircleIcon, HistoryIcon } from './icons';

interface HeroProps {
    onSearch: (query: string, location: string) => void;
    isLoading: boolean;
    location: string;
    onLocationChange: (value: string) => void;
    onDetectLocation: () => void;
    isDetectingLocation: boolean;
    onPopularCategorySearch: (category: string) => void;
    searchHistory: string[];
}

const Hero: React.FC<HeroProps> = ({ 
    onSearch, 
    isLoading, 
    location, 
    onLocationChange, 
    onDetectLocation, 
    isDetectingLocation,
    onPopularCategorySearch,
    searchHistory
}) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, location);
  };
    
  const handleHistoryClick = (historyQuery: string) => {
    setQuery(historyQuery);
    onSearch(historyQuery, location);
  };
    
  const popularCategories = ['Restaurante', 'Saloane', 'Electricieni', 'Servicii Auto'];

  return (
    <section className="bg-white dark:bg-gray-900/50 py-20 md:py-24">
        <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-brand-dark dark:text-white leading-tight mb-4">
                Găsește cele mai <span className="text-brand-primary">bune</span> servicii și produse
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                Platforma ta de încredere pentru recenzii verificate și oferte de top în România.
            </p>
            <form className="max-w-3xl mx-auto" onSubmit={handleSearch}>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-2">
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                        <div className="flex-grow flex items-center p-1">
                            <SearchIcon className="w-5 h-5 text-gray-400 dark:text-gray-500 mx-2 flex-shrink-0"/>
                            <input 
                                type="text" 
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Ex: iPhone 15 Pro, anvelope de vară..." 
                                className="w-full bg-transparent p-2 text-gray-700 dark:text-gray-200 focus:outline-none disabled:bg-gray-100 dark:disabled:bg-gray-700"
                                disabled={isLoading}
                                required
                            />
                        </div>
                        <div className="flex-grow flex items-center p-1 border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700">
                            <MapPinIcon className="w-5 h-5 text-gray-400 dark:text-gray-500 mx-2 flex-shrink-0"/>
                            <input 
                                type="text" 
                                value={location}
                                onChange={(e) => onLocationChange(e.target.value)}
                                placeholder="Locație (opțional, ex: București)" 
                                className="w-full bg-transparent p-2 text-gray-700 dark:text-gray-200 focus:outline-none disabled:bg-gray-100 dark:disabled:bg-gray-700"
                                disabled={isLoading || isDetectingLocation}
                            />
                            <button 
                                type="button"
                                onClick={onDetectLocation}
                                disabled={isDetectingLocation || isLoading}
                                className="p-2 text-gray-500 hover:text-brand-primary dark:hover:text-brand-primary rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                aria-label="Detectează locația curentă"
                            >
                                {isDetectingLocation ? <SpinnerIcon className="w-5 h-5" /> : <ViewfinderCircleIcon className="w-5 h-5" />}
                            </button>
                        </div>
                        <button 
                            type="submit"
                            className="w-full md:w-auto bg-brand-primary text-white rounded-lg p-3 px-6 hover:bg-brand-secondary transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2"
                            disabled={isLoading || isDetectingLocation}
                            aria-label="Caută"
                        >
                            {isLoading ? <SpinnerIcon className="w-5 h-5" /> : <SearchIcon className="w-5 h-5" />}
                            <span className="whitespace-nowrap">{isLoading ? 'Se caută...' : 'Caută'}</span>
                        </button>
                    </div>
                </div>
            </form>

            {searchHistory && searchHistory.length > 0 && (
                <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2 flex-wrap max-w-3xl mx-auto">
                    <HistoryIcon className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                    <span className="font-semibold">Căutări recente:</span>
                    {searchHistory.map((item) => (
                        <button 
                            key={item} 
                            onClick={() => handleHistoryClick(item)} 
                            className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-brand-accent dark:hover:bg-brand-primary/20 hover:text-brand-primary dark:hover:text-brand-primary px-2 py-1 rounded-md transition-colors"
                        >
                            {item}
                        </button>
                    ))}
                </div>
            )}

             <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2 flex-wrap">
                <span className="font-semibold">Popular:</span>
                {popularCategories.map((cat, index) => (
                    <React.Fragment key={cat}>
                        <button onClick={() => onPopularCategorySearch(cat)} className="hover:text-brand-primary transition-colors underline">
                            {cat}
                        </button>
                        {index < popularCategories.length - 1 && <span>,</span>}
                    </React.Fragment>
                ))}
            </div>
        </div>
    </section>
  );
};

export default Hero;