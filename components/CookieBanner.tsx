import React, { useState, useEffect } from 'react';
import { useNavigation } from '../context/NavigationContext';

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { navigateTo } = useNavigation();

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-brand-dark/95 dark:bg-black/95 backdrop-blur-sm text-white p-5 shadow-2xl z-50 animate-fade-in-up">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-300 dark:text-gray-400 text-center md:text-left">
          Folosim cookie-uri pentru a vă oferi cea mai bună experiență pe site-ul nostru. Prin continuarea navigării, sunteți de acord cu utilizarea acestora. Puteți citi mai multe în{' '}
          <button onClick={() => navigateTo('privacy')} className="font-semibold underline hover:text-brand-primary transition-colors">
            Politica de Confidențialitate
          </button>.
        </p>
        <div className="flex items-center gap-4 flex-shrink-0">
          <button 
            onClick={handleAccept}
            className="bg-brand-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-brand-secondary transition-transform transform hover:scale-105"
          >
            Am înțeles
          </button>
        </div>
      </div>
       <style>{`
        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            animation: fade-in-up 0.5s ease-out forwards;
        }
    `}</style>
    </div>
  );
};

export default CookieBanner;