import React from 'react';
import { useNavigation } from '../context/NavigationContext';

const ProviderCTA: React.FC = () => {
  const { navigateTo } = useNavigation();
  
  return (
    <section className="bg-white dark:bg-gray-900/50">
      <div className="container mx-auto px-6 py-20">
        <div className="bg-brand-dark dark:bg-gray-800 rounded-2xl shadow-xl p-10 md:p-16 text-center text-white relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 w-full h-full bg-brand-primary opacity-10 dark:opacity-5"
            style={{clipPath: 'polygon(0 0, 100% 0, 100% 20%, 0 80%)'}}
          ></div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 z-10 relative">
            Ești furnizor de servicii sau produse?
          </h2>
          <p className="max-w-2xl mx-auto text-gray-300 mb-8 z-10 relative">
            Adu-ți afacerea în fața a mii de clienți noi. Înregistrează-te gratuit, adaugă ofertele tale și primește recenzii care îți vor crește vizibilitatea.
          </p>
          <button 
            onClick={() => navigateTo('business-register')}
            className="bg-brand-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-brand-secondary transition-transform transform hover:scale-105 shadow-lg hover:shadow-xl z-10 relative"
          >
            Înregistrează-ți afacerea
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProviderCTA;