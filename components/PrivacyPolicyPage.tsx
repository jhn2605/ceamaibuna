import React from 'react';
import { ShieldCheckIcon } from './icons';

const PrivacyPolicyPage: React.FC = () => {
    return (
        <div className="bg-white dark:bg-gray-900 py-16">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-12">
                     <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-accent dark:bg-brand-primary/20 text-brand-primary shadow-lg">
                        <ShieldCheckIcon className="w-8 h-8"/>
                    </div>
                    <h1 className="text-4xl font-extrabold text-brand-dark dark:text-white">Politică de Confidențialitate</h1>
                    <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">Angajamentul nostru pentru protecția datelor dumneavoastră.</p>
                    <p className="mt-4 text-sm text-gray-400">Ultima actualizare: {new Date().toLocaleDateString('ro-RO', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>

                <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                    <h2 className="text-brand-dark dark:text-white">1. Introducere</h2>
                    <p>Bun venit la CeAmaiBuna.ro! Confidențialitatea datelor dumneavoastră cu caracter personal reprezintă una dintre preocupările principale ale noastre. Acest document are rolul de a vă informa cu privire la prelucrarea datelor dumneavoastră cu caracter personal, în contextul utilizării paginii de internet CeAmaiBuna.ro ("Site-ul").</p>

                    <h2 className="text-brand-dark dark:text-white">2. Categoriile de date cu caracter personal prelucrate</h2>
                    <p><strong>A. Dacă sunteți client al Site-ului,</strong> vom prelucra datele dumneavoastră cu caracter personal, cum ar fi numele și prenumele, adresa de e-mail, precum și orice alte categorii de date pe care le furnizați în mod direct în contextul creării contului de utilizator, în contextul plasării unei recenzii sau în orice alt mod care rezultă din utilizarea Site-ului.</p>
                    <p><strong>B. Dacă sunteți furnizor de servicii înregistrat pe Site,</strong> vom prelucra datele dumneavoastră de contact (nume, e-mail, telefon), datele companiei (nume, CUI, adresă), precum și alte date furnizate în formularul de înregistrare a afacerii.</p>
                    <p><strong>C. Dacă sunteți vizitator al Site-ului,</strong> vom prelucra datele dumneavoastră cu caracter personal pe care le furnizați în mod indirect, cum ar fi date referitoare la modul în care utilizați Site-ul (adresa IP, tipul de browser, pagini vizitate, durata vizitei). Aceste date sunt colectate prin intermediul fișierelor de tip cookie. Pentru mai multe detalii, consultați secțiunea dedicată cookie-urilor.</p>

                    <h2 className="text-brand-dark dark:text-white">3. Scopurile și temeiurile prelucrării</h2>
                    <p>Prelucrăm datele dumneavoastră pentru:</p>
                    <ul>
                        <li><strong>Derularea relației contractuale dintre dumneavoastră și CeAmaiBuna.ro:</strong> crearea și administrarea contului, validarea și publicarea recenziilor. Temei: executarea unui contract la care sunteți parte.</li>
                        <li><strong>Îndeplinirea obligațiilor legale:</strong> de exemplu, cele în materie fiscală, precum și în materie de arhivare. Temei: obligația legală.</li>
                        <li><strong>Activități de marketing:</strong> transmiterea de comunicări comerciale privind produsele și serviciile oferite prin Site. Temei: consimțământul dumneavoastră.</li>
                        <li><strong>Rezolvarea plângerilor și monitorizarea traficului:</strong> pentru a îmbunătăți experiența pe Site. Temei: interesul legitim al administratorului Site-ului.</li>
                    </ul>

                    <h2 className="text-brand-dark dark:text-white">4. Durata pentru care vă prelucrăm datele</h2>
                    <p>Vom prelucra datele dumneavoastră cu caracter personal atât cât este necesar pentru realizarea scopurilor de prelucrare menționate mai sus. În cazul în care sunteți client, vom prelucra datele pe întreaga durată a existenței contului și ulterior conform obligațiilor legale (de ex., în cazul documentelor financiar-contabile, termenul de păstrare este de 10 ani).</p>
                    
                    <h2 className="text-brand-dark dark:text-white">5. Dezvăluirea datelor cu caracter personal</h2>
                    <p>Nu vom dezvălui datele dumneavoastră către terțe părți, cu excepția situațiilor în care acest lucru este o obligație legală sau este necesar pentru furnizarea serviciilor (de exemplu, furnizori de servicii IT, curierat, procesatori de plăți). Acești furnizori au obligația contractuală de a menține confidențialitatea datelor.</p>

                    <h2 className="text-brand-dark dark:text-white">6. Drepturile de care beneficiați</h2>
                    <p>În conformitate cu Regulamentul (UE) 2016/679 (GDPR), beneficiați de următoarele drepturi:</p>
                    <ul>
                        <li><strong>Dreptul la informare:</strong> dreptul de a primi detalii privind activitățile de prelucrare.</li>
                        <li><strong>Dreptul de acces la date:</strong> dreptul de a obține confirmarea prelucrării datelor și detalii despre aceasta.</li>
                        <li><strong>Dreptul la rectificare:</strong> dreptul de a obține corectarea datelor inexacte/incomplete.</li>
                        <li><strong>Dreptul la ștergerea datelor ("dreptul de a fi uitat"):</strong> în condițiile legii.</li>
                        <li><strong>Dreptul la restricționarea prelucrării:</strong> în condițiile legii.</li>
                        <li><strong>Dreptul la portabilitatea datelor:</strong> dreptul de a primi datele într-un format structurat, utilizat în mod curent și care poate fi citit automat.</li>
                        <li><strong>Dreptul la opoziție:</strong> dreptul de a vă opune prelucrării în scop de marketing direct sau pe baza interesului legitim.</li>
                        <li><strong>Dreptul de a nu fi supus unei decizii individuale automate.</strong></li>
                        <li><strong>Dreptul de a vă adresa Autorității Naționale de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP) sau instanțelor competente.</strong></li>
                    </ul>
                    <p>Pentru orice întrebări suplimentare sau pentru a vă exercita aceste drepturi, ne puteți contacta la adresa de e-mail: <a href="mailto:contact@ceamaibuna.ro" className="text-brand-primary hover:underline">contact@ceamaibuna.ro</a>.</p>
                    
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;