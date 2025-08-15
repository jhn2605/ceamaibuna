import React from 'react';
import { GooglePlaceListing as GooglePlaceListingType, Review, InternalReview, LocalServicesState, GoogleReviewFetchState } from '../types';
import { StarIcon, MapPinIcon, ClockIcon, PhoneIcon, GlobeAltIcon, RouteIcon, SpinnerIcon, ShareIcon, HeartIcon, HeartIconFilled } from './icons';
import { useFavorites } from '../context/FavoritesContext';

const RatingDisplay: React.FC<{ rating?: number, reviewCount?: number, size?: 'small' | 'large' }> = ({ rating, reviewCount, size = 'large' }) => {
  if (typeof rating !== 'number' || rating === 0) return <div className={`text-sm ${size === 'large' ? 'h-6' : 'h-4'} text-gray-500 dark:text-gray-400 italic`}>Nici o recenzie Google găsită</div>;
  const starSize = size === 'large' ? "w-5 h-5" : "w-4 h-4";
  const textSize = size === 'large' ? 'text-base' : 'text-sm';

  return (
    <div className="flex items-center">
      <span className={`mr-2 font-bold ${textSize} text-gray-800 dark:text-gray-100`}>{rating.toFixed(1)}</span>
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} className={`${starSize} ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
        ))}
      </div>
      {typeof reviewCount === 'number' && (
        <span className={`ml-3 ${textSize} text-gray-500 dark:text-gray-400`}>({reviewCount.toLocaleString('ro-RO')} recenzii)</span>
      )}
    </div>
  );
};

const ReviewCard: React.FC<{ review: Review | InternalReview, isInternal?: boolean }> = ({ review, isInternal }) => (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
            <p className="font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                {review.author}
                {isInternal && <span className="text-xs font-normal bg-brand-accent dark:bg-brand-primary/20 text-brand-primary px-1.5 py-0.5 rounded-full">Recenzie de pe site</span>}
            </p>
            <RatingDisplay rating={review.rating} size="small" />
        </div>
        <p className="text-gray-600 dark:text-gray-400 italic">"{review.text}"</p>
        {'timestamp' in review && (
            <p className="text-right text-xs text-gray-400 mt-2">
                {new Date(review.timestamp).toLocaleDateString('ro-RO')}
            </p>
        )}
    </div>
);

const ListingDetail: React.FC<{ 
    listing: GooglePlaceListingType | null; 
    onAddReview: (placeId: string, name: string) => void; 
    internalReviews: InternalReview[];
    googleReviewsState?: LocalServicesState['googleReviews'][string];
}> = ({ listing, onAddReview, internalReviews, googleReviewsState }) => {
    const { isFavorite, toggleFavorite } = useFavorites();
    
    const handleShare = async () => {
        if (!listing) return;
        const shareData = {
            title: `Vezi ${listing.name} pe CeAmaiBuna.ro`,
            text: `Am găsit o locație grozavă: ${listing.name}. Uite detaliile:`,
            url: window.location.href, // In a real app, this would be a direct link to the listing
        };
        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // Fallback for desktop/browsers that don't support Web Share API
                await navigator.clipboard.writeText(shareData.url);
                alert('Link copiat în clipboard!');
            }
        } catch (error) {
            console.error('Error sharing', error);
        }
    };
    
    if (!listing) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 h-full flex flex-col items-center justify-center text-center border border-gray-200 dark:border-gray-700 min-h-[70vh]">
                <MapPinIcon className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
                <h3 className="text-xl font-semibold text-brand-dark dark:text-white">Selectează o afacere</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Apasă pe o locație din stânga pentru a vedea detaliile complete.</p>
            </div>
        );
    }
    
    const placeId = listing.place_id;
    const isFav = isFavorite(listing);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6">
                <div className="flex justify-between items-start gap-4">
                    <div className="flex-grow">
                        <h2 className="text-2xl font-bold text-brand-dark dark:text-white">{listing.name}</h2>
                        <div className="mt-4">
                            <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Recenzii Google</h4>
                             <RatingDisplay rating={listing.rating} reviewCount={listing.user_ratings_total} />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <button onClick={() => toggleFavorite(listing)} className="p-2 rounded-full text-gray-400 hover:text-brand-primary transition-colors" aria-label="Adaugă la favorite">
                            {isFav ? <HeartIconFilled className="w-6 h-6 text-brand-primary"/> : <HeartIcon className="w-6 h-6"/>}
                        </button>
                        <button onClick={handleShare} className="p-2 rounded-full text-gray-400 hover:text-brand-primary transition-colors" aria-label="Partajează">
                            <ShareIcon className="w-6 h-6"/>
                        </button>
                    </div>
                </div>
                <div className="flex items-start text-base text-gray-500 dark:text-gray-400 mt-4">
                    <MapPinIcon className="w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                    <span className="flex-grow">{listing.vicinity}</span>
                </div>
            </div>

            <>
                 <div className="px-6 pb-6 space-y-3 text-base text-gray-700 dark:text-gray-300">
                    {listing.opening_hours && (
                        <div className="flex items-center">
                            <ClockIcon className="w-5 h-5 mr-3 text-gray-500 flex-shrink-0"/>
                            <span>{listing.opening_hours}</span>
                        </div>
                    )}
                    {listing.phone_number && (
                        <div className="flex items-center">
                            <PhoneIcon className="w-5 h-5 mr-3 text-gray-500 flex-shrink-0"/>
                            <a href={`tel:${listing.phone_number.replace(/\s/g, '')}`} className="hover:text-brand-primary transition-colors">{listing.phone_number}</a>
                        </div>
                    )}
                    {listing.website && (
                        <div className="flex items-center">
                            <GlobeAltIcon className="w-5 h-5 mr-3 text-gray-500 flex-shrink-0"/>
                            <a href={listing.website} target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors truncate">{listing.website.replace(/^(https?:\/\/)?(www\.)?/, '')}</a>
                        </div>
                    )}
                     {typeof listing.distance === 'number' && isFinite(listing.distance) && (
                        <div className="flex items-center">
                            <RouteIcon className="w-5 h-5 mr-3 text-gray-500 flex-shrink-0"/>
                            <span>Aproximativ {listing.distance.toFixed(1)} km</span>
                        </div>
                    )}
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-5" >
                     {/* Internal Reviews Section */}
                    <div id="internal-reviews">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-brand-dark dark:text-white">Recenzii de la Utilizatori</h3>
                            <button onClick={() => onAddReview(placeId, listing.name)} className="text-sm font-semibold text-brand-primary hover:underline">
                                Adaugă recenzia ta
                            </button>
                        </div>
                         {internalReviews && internalReviews.length > 0 ? (
                            <div className="space-y-4">
                                {internalReviews.map((review, index) => (
                                    <ReviewCard key={`internal-${index}`} review={review} isInternal />
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500 italic text-center py-4">Fii primul care lasă o recenzie pentru această locație!</p>
                        )}
                    </div>

                     {/* Google Reviews Section */}
                    <div id="google-reviews" className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-bold text-brand-dark dark:text-white mb-4">Recenzii de pe Google</h3>
                        {(!googleReviewsState || googleReviewsState.status === 'loading') && (
                            <div className="flex justify-center items-center py-4">
                                <SpinnerIcon className="w-6 h-6 text-gray-400" />
                                <span className="ml-2 text-gray-500">Se încarcă recenziile...</span>
                            </div>
                        )}
                        {googleReviewsState?.status === 'error' && (
                            <p className="text-sm text-red-500 italic text-center py-4">Nu am putut încărca recenziile de pe Google.</p>
                        )}
                        {googleReviewsState?.status === 'success' && (
                            <>
                                {googleReviewsState.data.length > 0 ? (
                                    <div className="space-y-4">
                                        {googleReviewsState.data.map((review, index) => (
                                            <ReviewCard key={`google-${index}`} review={review} />
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500 italic text-center py-4">Nu au fost găsite recenzii pe Google pentru această locație.</p>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </>
        </div>
    );
};

export default ListingDetail;