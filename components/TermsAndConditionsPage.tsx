import React from 'react';
import { ScaleIcon } from './icons';

const TermsAndConditionsPage: React.FC = () => {
    return (
        <div className="bg-white dark:bg-gray-900 py-16">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-12">
                     <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-accent dark:bg-brand-primary/20 text-brand-primary shadow-lg">
                        <ScaleIcon className="w-8 h-8"/>
                    </div>
                    <h1 className="text-4xl font-extrabold text-brand-dark dark:text-white">Termeni și Condiții</h1>
                    <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">Regulile de utilizare ale platformei noastre.</p>
                    <p className="mt-4 text-sm text-gray-400">Ultima actualizare: {new Date().toLocaleDateString('ro-RO', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>

                <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                    <h2 className="text-brand-dark dark:text-white">1. Acceptarea Termenilor</h2>
                    <p>Prin accesarea și utilizarea site-ului CeAmaiBuna.ro ("Site-ul"), sunteți de acord să respectați și să fiți legat de prezenții Termeni și Condiții ("Termenii"). Dacă nu sunteți de acord cu acești Termeni, vă rugăm să nu utilizați acest Site. Ne rezervăm dreptul de a modifica acești Termeni în orice moment.</p>

                    <h2 className="text-brand-dark dark:text-white">2. Descrierea Serviciilor</h2>
                    <p>CeAmaiBuna.ro oferă o platformă online unde utilizatorii pot căuta, compara și evalua diverse servicii și produse, iar furnizorii își pot lista și promova afacerile. Informațiile prezentate pe Site au caracter informativ și nu constituie o ofertă fermă din partea noastră.</p>
                    
                    <h2 className="text-brand-dark dark:text-white">3. Contul de Utilizator</h2>
                    <p>Pentru a accesa anumite funcționalități, precum adăugarea de recenzii, este necesară crearea unui cont. Sunteți responsabil pentru păstrarea confidențialității datelor de autentificare și pentru toate activitățile care au loc în contul dumneavoastră. Sunteți de acord să furnizați informații corecte și complete la înregistrare.</p>

                    <h2 className="text-brand-dark dark:text-white">4. Conținutul Generat de Utilizatori</h2>
                    <p>Utilizatorii pot posta recenzii, comentarii și alt conținut ("Conținutul Utilizatorului"). Prin postarea acestui conținut, garantați că dețineți drepturile asupra acestuia și acordați CeAmaiBuna.ro o licență neexclusivă, globală, perpetuă și irevocabilă de a utiliza, reproduce, modifica și distribui conținutul respectiv.</p>
                    <p>Este interzisă postarea de conținut ilegal, obscen, defăimător, care încalcă drepturile de proprietate intelectuală sau care este în orice alt mod dăunător terților.</p>
                    
                    <h2 className="text-brand-dark dark:text-white">5. Proprietate Intelectuală</h2>
                    <p>Conținutul Site-ului, inclusiv textele, grafica, logo-urile și software-ul, este proprietatea CeAmaiBuna.ro sau a partenerilor săi și este protejat de legile privind drepturile de autor și proprietatea intelectuală.</p>

                    <h2 className="text-brand-dark dark:text-white">6. Limitarea Răspunderii</h2>
                    <p>CeAmaiBuna.ro nu garantează acuratețea, completitudinea sau actualitatea informațiilor de pe Site, inclusiv a recenziilor postate de utilizatori. Utilizarea Site-ului se face pe propriul risc. Nu vom fi răspunzători pentru niciun fel de daune directe sau indirecte rezultate din utilizarea sau incapacitatea de utilizare a Site-ului.</p>

                    <h2 className="text-brand-dark dark:text-white">7. Legea Aplicabilă</h2>
                    <p>Acești Termeni vor fi guvernați și interpretați în conformitate cu legile din România. Orice litigiu va fi supus jurisdicției exclusive a instanțelor competente din România.</p>
                    
                    <h2 className="text-brand-dark dark:text-white">8. Contact</h2>
                    <p>Pentru orice întrebări legate de acești Termeni și Condiții, vă rugăm să ne contactați la adresa de e-mail: <a href="mailto:contact@ceamaibuna.ro" className="text-brand-primary hover:underline">contact@ceamaibuna.ro</a>.</p>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditionsPage;