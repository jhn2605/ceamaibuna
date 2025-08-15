import React from 'react';
import { MegaphoneIcon, EnvelopeIcon } from './icons';

const PressPage: React.FC = () => {
    return (
        <div className="bg-brand-light dark:bg-gray-900">
            <section className="bg-white dark:bg-gray-800/50 py-20 md:py-28 text-center">
                <div className="container mx-auto px-6">
                     <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-accent dark:bg-brand-primary/20 text-brand-primary shadow-lg">
                        <MegaphoneIcon className="w-8 h-8"/>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark dark:text-white leading-tight mb-4">
                        Kit de Presă & Resurse Media
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Găsiți aici informații oficiale, resurse grafice și date de contact pentru presă despre CeAmaiBuna.ro.
                    </p>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                            <h2 className="text-brand-dark dark:text-white">Despre CeAmaiBuna.ro</h2>
                            <p>
                                Lansat în 2024, <strong>CeAmaiBuna.ro</strong> este o platformă online inovatoare dedicată consumatorilor și furnizorilor de servicii din România. Misiunea noastră este să aducem transparență și încredere în procesul de selecție a serviciilor, de la restaurante și saloane de înfrumusețare, la service-uri auto și specialiști IT.
                            </p>
                            <p>
                                Platforma permite utilizatorilor să caute, să compare și să lase recenzii verificate pentru o gamă largă de afaceri locale, în timp ce oferă furnizorilor o modalitate eficientă de a-și promova serviciile și de a interacționa cu clienții.
                            </p>
                             
                            <h3 className="text-brand-dark dark:text-white">Misiunea noastră</h3>
                            <p>
                                Să devenim cea mai de încredere sursă de informații pentru serviciile locale din România, ajutând consumatorii să ia decizii informate și afacerile locale să crească.
                            </p>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
                            <h3 className="text-2xl font-bold text-brand-dark dark:text-white mb-6">Resurse Media</h3>
                            <div className="space-y-4">
                                <button className="w-full text-left bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-center justify-between hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                                    <span className="font-semibold text-brand-dark dark:text-gray-200">Pachet Logo-uri (.zip)</span>
                                    <span className="text-brand-primary">Descarcă</span>
                                </button>
                                <button className="w-full text-left bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-center justify-between hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                                    <span className="font-semibold text-brand-dark dark:text-gray-200">Ghid de Brand (.pdf)</span>
                                    <span className="text-brand-primary">Descarcă</span>
                                </button>
                                <button className="w-full text-left bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-center justify-between hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                                    <span className="font-semibold text-brand-dark dark:text-gray-200">Capturi de ecran HD (.zip)</span>
                                    <span className="text-brand-primary">Descarcă</span>
                                </button>
                            </div>

                             <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <h4 className="text-xl font-bold text-brand-dark dark:text-white mb-3">Contact Presă</h4>
                                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                    <EnvelopeIcon className="w-5 h-5 text-brand-primary"/>
                                    <span>Pentru întrebări sau interviuri:</span>
                                    <a href="mailto:presa@ceamaibuna.ro" className="font-semibold text-brand-primary hover:underline">presa@ceamaibuna.ro</a>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PressPage;