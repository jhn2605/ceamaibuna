import React, { useState, useMemo } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { useNavigation } from '../context/NavigationContext';
import { GooglePlaceListing as GooglePlaceListingType } from '../types';
import { HeartIcon, StarIcon, MapPinIcon, TrashIcon } from './icons';

const FavoriteCard: React.FC<{ listing: GooglePlaceListingType, onSelect: () => void }> = ({ listing, onSelect }) => {
    return (
        <div onClick={onSelect} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer border dark:border-gray-700">
            <div className="p-5">
                <h3 className="font-bold text-lg text-brand-dark dark:text-white truncate">{listing.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
                    <MapPinIcon className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">{listing.vicinity}</span>
                </p>
                <div className="flex items-center mt-3 text-sm">
                    {listing.rating && (
                         <div className="flex items-center">
                            <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                            <span className="font-bold">{listing.rating.toFixed(1)}</span>
                            {listing.user_ratings_total && <span className="text-gray-500 ml-1">({listing.user_ratings_total})</span>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


const FavoritesPage: React.FC<{ onSelectListing: (id: string) => void }> = ({ onSelectListing }) => {
    const { favorites, clearFavorites } = useFavorites();
    const { navigateTo } = useNavigation();
    const [filter, setFilter] = useState('');
    
    const filteredFavorites = useMemo(() => {
        if (!filter) return favorites;
        return favorites.filter(fav => 
            fav.name.toLowerCase().includes(filter.toLowerCase()) ||
            fav.vicinity.toLowerCase().includes(filter.toLowerCase())
        );
    }, [favorites, filter]);

    const handleSelectAndNavigate = (listing: GooglePlaceListingType) => {
        onSelectListing(listing.place_id);
    };

    return (
        <section className="bg-brand-light dark:bg-gray-900 py-16 min-h-[70vh]">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold text-brand-dark dark:text-white">Locații Salvate</h1>
                        <p className="mt-1 text-lg text-gray-600 dark:text-gray-400">Favoritele tale, într-un singur loc.</p>
                    </div>
                    {favorites.length > 0 && (
                        <button 
                            onClick={() => { if(window.confirm('Ești sigur că vrei să ștergi toate locațiile salvate?')) { clearFavorites() }}}
                            className="flex items-center gap-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-300 font-semibold px-4 py-2 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors"
                        >
                            <TrashIcon className="w-5 h-5"/>
                            <span>Șterge Tot</span>
                        </button>
                    )}
                </div>
                
                {favorites.length > 0 ? (
                    <>
                        <div className="mb-8 max-w-md">
                            <input 
                                type="text"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                placeholder="Filtrează după nume sau adresă..."
                                className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-brand-primary focus:border-brand-primary transition"
                            />
                        </div>

                        {filteredFavorites.length > 0 ? (
                             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {filteredFavorites.map(fav => (
                                    <FavoriteCard key={fav.place_id} listing={fav} onSelect={() => handleSelectAndNavigate(fav)} />
                                ))}
                            </div>
                        ) : (
                             <p className="text-center text-gray-500 dark:text-gray-400 py-10">Nu am găsit nicio locație salvată care să corespundă filtrului tău.</p>
                        )}
                    </>
                ) : (
                    <div className="text-center bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-md">
                        <HeartIcon className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                        <h3 className="text-xl font-semibold text-brand-dark dark:text-white">Lista ta de favorite este goală</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-2 mb-6">Apasă pe inimioară la orice locație pentru a o adăuga aici.</p>
                        <button
                            onClick={() => navigateTo('services')}
                            className="bg-brand-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-brand-secondary transition-colors"
                        >
                            Explorează Servicii
                        </button>
                    </div>
                )}

            </div>
        </section>
    );
};

export default FavoritesPage;