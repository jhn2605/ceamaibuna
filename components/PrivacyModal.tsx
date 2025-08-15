import React from 'react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors"
          aria-label="Închide fereastra"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold text-brand-dark dark:text-white mb-4">Politică de Confidențialitate</h2>
        <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
          <p><strong>Ultima actualizare:</strong> {new Date().toLocaleDateString('ro-RO')}</p>
          <p>
            Aceasta este o secțiune demonstrativă. Un text complet pentru Politica de Confidențialitate trebuie redactat de un specialist în legislație pentru a fi conform cu GDPR.
          </p>
          <h3 className="text-lg font-semibold text-brand-dark dark:text-white mt-4">1. Ce date colectăm?</h3>
          <p>
            Colectăm date pe care ni le furnizați direct, cum ar fi numele, adresa de e-mail și informațiile de profil atunci când vă creați un cont. De asemenea, colectăm automat anumite informații atunci când vizitați site-ul nostru, cum ar fi adresa IP, tipul de browser și informații despre cookie-uri.
          </p>
          <h3 className="text-lg font-semibold text-brand-dark dark:text-white mt-4">2. Cum folosim datele?</h3>
          <p>
            Folosim informațiile colectate pentru a personaliza experiența dvs., pentru a îmbunătăți site-ul nostru, pentru a comunica cu dvs. și pentru a respecta obligațiile legale.
          </p>
           <h3 className="text-lg font-semibold text-brand-dark dark:text-white mt-4">3. Cookie-uri</h3>
          <p>
            Site-ul nostru folosește cookie-uri pentru a funcționa corect și pentru a analiza traficul. Un cookie este un fișier text mic stocat pe computerul dvs. Puteți controla și/sau șterge cookie-urile după cum doriți.
          </p>
          <h3 className="text-lg font-semibold text-brand-dark dark:text-white mt-4">4. Drepturile dvs.</h3>
          <p>
            Conform GDPR, aveți dreptul de a accesa, rectifica, șterge sau restricționa prelucrarea datelor dvs. personale. Pentru a exercita aceste drepturi, vă rugăm să ne contactați la adresa de e-mail: contact@ceammaibuna.ro.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyModal;