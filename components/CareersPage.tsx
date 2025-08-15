import React from 'react';
import { BriefcaseIcon, UsersIcon, LightBulbIcon, PaperAirplaneIcon } from './icons';

const ValueCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
        <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-accent dark:bg-brand-primary/20 text-brand-primary">{icon}</div>
        <h3 className="text-lg font-bold text-brand-dark dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
    </div>
);

const CareersPage: React.FC = () => {
    return (
        <div className="bg-brand-light dark:bg-gray-900">
            <section className="bg-white dark:bg-gray-800/50 py-20 md:py-28 text-center">
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-brand-dark dark:text-white leading-tight mb-4">
                        Alătură-te echipei noastre
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Suntem în căutare de oameni talentați și pasionați care să ne ajute să modelăm viitorul serviciilor din România.
                    </p>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12 text-brand-dark dark:text-white">De ce să lucrezi la CeAmaiBuna.ro?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <ValueCard
                            icon={<LightBulbIcon className="w-7 h-7" />}
                            title="Impact real"
                            description="Contribuie la o platformă care ajută mii de români să facă alegeri mai bune și sprijină afacerile locale să prospere."
                        />
                        <ValueCard
                            icon={<UsersIcon className="w-7 h-7" />}
                            title="Echipă colaborativă"
                            description="Vei face parte dintr-un mediu de lucru dinamic și prietenos, unde ideile tale sunt apreciate și încurajate."
                        />
                        <ValueCard
                            icon={<BriefcaseIcon className="w-7 h-7" />}
                            title="Creștere profesională"
                            description="Oferim oportunități constante de învățare și dezvoltare, pentru a te ajuta să atingi potențialul maxim."
                        />
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white dark:bg-gray-800/50">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto text-center">
                         <h2 className="text-3xl font-bold mb-6 text-brand-dark dark:text-white">Posturi disponibile</h2>
                         <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                             <p className="text-gray-600 dark:text-gray-300 mb-6">
                                În acest moment nu avem posturi deschise, dar suntem mereu interesați să cunoaștem oameni excepționali. Dacă ești pasionat de misiunea noastră și crezi că te-ai potrivi în echipa noastră, ne-ar plăcea să auzim de la tine.
                             </p>
                             <a href="mailto:cariere@ceamaibuna.ro" className="bg-brand-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-brand-secondary transition-transform transform hover:scale-105 shadow-lg inline-flex items-center gap-2">
                                 <PaperAirplaneIcon className="w-5 h-5"/>
                                 Trimite-ne CV-ul tău
                             </a>
                         </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CareersPage;