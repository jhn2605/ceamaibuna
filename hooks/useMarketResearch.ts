import { useState, useEffect } from 'react';
import { type MarketResearchResult } from '../types';
import { performMarketResearch } from '../api';
import { useNavigation } from '../context/NavigationContext';
import { useComparison } from '../context/ComparisonContext';

const MAX_HISTORY_ITEMS = 5;

export const useMarketResearch = () => {
    const { page, navigateTo } = useNavigation();
    const { clearComparison } = useComparison();
    const [results, setResults] = useState<MarketResearchResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    
    useEffect(() => {
        try {
            const storedHistory = localStorage.getItem('ceamaibuna_search_history');
            if (storedHistory) {
                setSearchHistory(JSON.parse(storedHistory));
            }
        } catch (error) {
            console.error("Failed to parse search history:", error);
            setSearchHistory([]);
        }
    }, []);

    const updateSearchHistory = (query: string) => {
        const newHistory = [query, ...searchHistory.filter(item => item.toLowerCase() !== query.toLowerCase())].slice(0, MAX_HISTORY_ITEMS);
        setSearchHistory(newHistory);
        localStorage.setItem('ceamaibuna_search_history', JSON.stringify(newHistory));
    };

    const searchMarket = async (query: string, location: string, userCoords: any) => {
        if (!query) return;
        
        setIsLoading(true);
        setError(null);
        setResults(null);
        clearComparison(); // Reset comparison list on new search
        if (page !== 'home') navigateTo('home');
        updateSearchHistory(query);

        try {
            const searchResults = await performMarketResearch(query, location, userCoords);
            setResults(searchResults);
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'A apărut o eroare neașteptată. Vă rugăm să încercați din nou.');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        results,
        isLoading,
        error,
        searchHistory,
        searchMarket,
    };
};