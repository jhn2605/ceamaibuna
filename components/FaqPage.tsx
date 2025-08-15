import React, { useState } from 'react';
import { SearchIcon, BookOpenIcon, ChevronDownIcon } from './icons';

interface FaqItemProps {
    question: string;
    answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 dark:border-gray-700 py-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left text-lg font-semibold text-brand-dark dark:text-white"
            >
                <span>{question}</span>
                <ChevronDownIcon className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen mt-4' : 'max-h-0'}`}
            >
                <div className="prose prose-sm dark:prose-invert text-gray-600 dark:text-gray-300" dangerouslySetInnerHTML={{ __html: answer }} />
            </div>
        </div>
    );
};

const faqs = {
    general: [
        {
            question: "Ce este CeAmaiBuna.ro?",
            answer: "CeAmaiBuna.ro este o platformă online care ajută utilizatorii din România să găsească, să compare și să evalueze cele mai bune servicii și produse locale. Misiunea noastră este să aducem transparență și să sprijinim atât consumatorii, cât și afacerile locale.",
        },
        {
            question: "Este gratuit să folosesc platforma?",
            answer: "Da, utilizarea platformei pentru căutarea și compararea serviciilor este complet gratuită pentru consumatori. De asemenea, înregistrarea de bază pentru furnizori este gratuită.",
        },
    ],
    clienti: [
        {
            question: "Cum pot lăsa o recenzie?",
            answer: "Pentru a lăsa o recenzie, trebuie să aveți un cont de utilizator. Navigați la pagina afacerii pe care doriți să o evaluați și apăsați pe butonul 'Adaugă o recenzie'. Toate recenziile sunt verificate de echipa noastră înainte de publicare pentru a asigura autenticitatea.",
        },
        {
            question: "Cum funcționează comparația de produse?",
            answer: "Când efectuați o căutare de produse, fiecare rezultat are un buton de 'Adaugă la comparație'. Puteți selecta mai multe produse, iar apoi veți vedea un buton 'Compară Selecția' care vă va duce la o pagină unde caracteristicile, avantajele, dezavantajele și prețurile sunt afișate una lângă alta.",
        },
         {
            question: "Ce înseamnă 'Recenzie de pe site' vs. 'Recenzie de pe Google'?",
            answer: "Afișăm două tipuri de recenzii pentru a vă oferi o imagine cât mai completă: <br/><ul><li><strong>Recenzii de pe site:</strong> Acestea sunt lăsate direct pe platforma noastră de către utilizatori înregistrați.</li><li><strong>Recenzii de pe Google:</strong> Acestea sunt importate automat de pe profilul Google al afacerii respective pentru a oferi un context mai larg.</li></ul>",
        },
    ],
    furnizori: [
        {
            question: "Cum îmi înregistrez afacerea?",
            answer: "Este simplu! Apăsați pe butonul 'Înregistrează-ți afacerea' din colțul de sus al paginii sau din secțiunile dedicate și urmați pașii. Veți avea nevoie de informații de bază despre compania dumneavoastră (CUI, adresă) și despre serviciile oferite.",
        },
        {
            question: "Ce beneficii am dacă îmi listez afacerea?",
            answer: "Prin listarea pe CeAmaiBuna.ro, beneficiați de vizibilitate crescută în fața a mii de clienți potențiali, un profil de afacere detaliat, posibilitatea de a colecta recenzii verificate care vă cresc credibilitatea și instrumente de interacțiune directă cu clienții.",
        },
        {
            question: "Pot răspunde la recenziile clienților?",
            answer: "Da, încurajăm furnizorii să interacționeze cu clienții lor. Odată ce aveți un cont de furnizor validat, veți avea opțiunea de a răspunde public la recenziile primite pe platforma noastră.",
        },
    ],
};

const FaqPage: React.FC = () => {
    return (
        <div className="bg-brand-light dark:bg-gray-900">
             <section className="bg-white dark:bg-gray-800/50 py-20 text-center">
                <div className="container mx-auto px-6">
                     <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-accent dark:bg-brand-primary/20 text-brand-primary shadow-lg">
                        <BookOpenIcon className="w-8 h-8"/>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark dark:text-white leading-tight mb-4">
                        Centru de Ajutor (Întrebări Frecvente)
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Găsiți aici răspunsuri la cele mai comune întrebări despre platforma noastră.
                    </p>
                </div>
            </section>

             <section className="py-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="relative mb-12">
                         <input type="text" placeholder="Caută o întrebare..." className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-lg focus:ring-brand-primary focus:border-brand-primary" />
                         <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                             <SearchIcon className="w-6 h-6 text-gray-400"/>
                         </div>
                    </div>

                    <div className="space-y-12">
                        <div>
                            <h2 className="text-2xl font-bold text-brand-dark dark:text-white border-l-4 border-brand-primary pl-4 mb-6">Întrebări Generale</h2>
                            <div className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-lg">
                                {faqs.general.map((faq, index) => <FaqItem key={`gen-${index}`} {...faq} />)}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-brand-dark dark:text-white border-l-4 border-brand-primary pl-4 mb-6">Pentru Clienți</h2>
                             <div className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-lg">
                                {faqs.clienti.map((faq, index) => <FaqItem key={`cli-${index}`} {...faq} />)}
                            </div>
                        </div>

                         <div>
                            <h2 className="text-2xl font-bold text-brand-dark dark:text-white border-l-4 border-brand-primary pl-4 mb-6">Pentru Furnizori</h2>
                             <div className="bg-white dark:bg-gray-800/50 p-6 rounded-2xl shadow-lg">
                                {faqs.furnizori.map((faq, index) => <FaqItem key={`fur-${index}`} {...faq} />)}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};


export default FaqPage;