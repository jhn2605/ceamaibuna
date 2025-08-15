import React, { useState } from 'react';
import { StarIcon, SpinnerIcon } from './icons';
import { InternalReview } from '../types';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  businessName: string;
  onSubmit: (review: Omit<InternalReview, 'timestamp'>) => void;
}

const StarRatingInput: React.FC<{ rating: number; setRating: (rating: number) => void }> = ({ rating, setRating }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <button
            type="button"
            key={ratingValue}
            onClick={() => setRating(ratingValue)}
            className="focus:outline-none"
            aria-label={`Acordă ${ratingValue} stele`}
          >
            <StarIcon
              className={`w-8 h-8 cursor-pointer transition-colors ${
                ratingValue <= rating ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-300'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, businessName, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      
      // Pass data to parent component
      onSubmit({
          author: authorName,
          rating,
          text: reviewText,
      });

      // Simulate success animation and close
      setTimeout(() => {
          setIsLoading(false);
          setIsSuccess(true);
          setTimeout(() => {
              handleClose();
          }, 2000);
      }, 500);
  };

  const handleClose = () => {
    onClose();
    // Reset state for next time after transition
    setTimeout(() => {
        setIsSuccess(false);
        setRating(0);
        setReviewText('');
        setAuthorName('');
    }, 300);
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-[100] flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full p-8 relative transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={handleClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors"
          aria-label="Închide fereastra"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {isSuccess ? (
             <div className="text-center py-8">
                <h2 className="text-2xl font-bold text-brand-dark dark:text-white mb-2">Mulțumim!</h2>
                <p className="text-gray-600 dark:text-gray-300">Recenzia ta a fost trimisă.</p>
             </div>
        ) : (
            <>
                <h2 className="text-2xl font-bold text-brand-dark dark:text-white mb-2">Adaugă o recenzie pentru</h2>
                <h3 className="text-lg font-semibold text-brand-primary mb-6">{businessName}</h3>
                
                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Evaluarea ta generală</label>
                            <StarRatingInput rating={rating} setRating={setRating} />
                        </div>
                         <div>
                            <label htmlFor="authorName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Numele tău</label>
                            <input
                                type="text"
                                id="authorName"
                                value={authorName}
                                onChange={(e) => setAuthorName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-brand-primary focus:border-brand-primary transition"
                                placeholder="ex: Ion P."
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="reviewText" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Recenzia ta</label>
                            <textarea
                                id="reviewText"
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-brand-primary focus:border-brand-primary transition"
                                placeholder="Spune-ne despre experiența ta..."
                                required
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={isLoading || rating === 0 || !reviewText || !authorName}
                                className="w-full bg-brand-primary text-white font-bold py-3 px-5 rounded-lg hover:bg-brand-secondary transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isLoading ? <SpinnerIcon className="w-5 h-5"/> : null}
                                <span>{isLoading ? 'Se trimite...' : 'Trimite Recenzia'}</span>
                            </button>
                        </div>
                    </div>
                </form>
            </>
        )}
      </div>
    </div>
  );
};

export default ReviewModal;