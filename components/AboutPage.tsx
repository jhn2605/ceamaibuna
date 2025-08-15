import React from 'react';
import { type TeamMember } from '../types';
import { ShieldCheckIcon, UsersIcon, LightBulbIcon, StarIcon, UserIcon } from './icons';
import ProviderCTA from './ProviderCTA';

interface AboutPageProps {}

const teamMembers: TeamMember[] = [
    { name: 'Elena Popescu', role: 'Fondator & CEO', imageUrl: 'avatar1', bio: 'Cu o pasiune pentru tehnologie și comunitate, Elena a fondat CeAmaiBuna.ro cu scopul de a aduce transparență și încredere în piața de servicii din România.' },
    { name: 'Mihai Ionescu', role: 'Chief Technology Officer', imageUrl: 'avatar2', bio: 'Mihai este arhitectul din spatele platformei. El asigură că tehnologia noastră este mereu de ultimă generație, rapidă și sigură pentru toți utilizatorii.' },
    { name: 'Ana Stoica', role: 'Head of Community', imageUrl: 'avatar3', bio: 'Ana este vocea comunității noastre. Ea lucrează direct cu furnizorii și clienții pentru a se asigura că experiența pe platformă este excepțională.' },
];

const Avatar: React.FC<{ member: TeamMember }> = ({ member }) => {
    // A simple hash function to get a color for the avatar background
    const getBgColor = (name: string) => {
        const colors = ['bg-red-100 dark:bg-red-900/20', 'bg-blue-100 dark:bg-blue-900/20', 'bg-green-100 dark:bg-green-900/20', 'bg-yellow-100 dark:bg-yellow-900/20', 'bg-purple-100 dark:bg-purple-900/20'];
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    };

    return (
        <div className={`w-32 h-32 rounded-full mx-auto mb-4 border-4 border-brand-accent dark:border-brand-primary/20 flex items-center justify-center ${getBgColor(member.name)}`}>
            <UserIcon className="w-16 h-16 text-brand-dark dark:text-gray-400 opacity-50" />
        </div>
    );
};


const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 text-center flex flex-col items-center hover:shadow-xl transition-shadow duration-300">
        <Avatar member={member} />
        <h3 className="text-xl font-bold text-brand-dark dark:text-white">{member.name}</h3>
        <p className="text-brand-primary font-semibold mb-2">{member.role}</p>
        <p className="text-gray-600 dark:text-gray-400 text-sm flex-grow">{member.bio}</p>
    </div>
);

const ValueCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
        <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-accent dark:bg-brand-primary/20 text-brand-primary">
            {icon}
        </div>
        <h3 className="text-lg font-bold text-brand-dark dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
    </div>
);

const AboutPage: React.FC<AboutPageProps> = () => {
    return (
        <div className="bg-brand-light dark:bg-gray-900">
            {/* Hero Section */}
            <section className="bg-white dark:bg-gray-800/50 py-20 md:py-28 text-center">
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-brand-dark dark:text-white leading-tight mb-4">
                        Misiunea noastră: Alegeri <span className="text-brand-primary">informate</span> pentru toți.
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Credem că fiecare român merită acces la servicii de cea mai înaltă calitate. De aceea, am creat un spațiu unde transparența, recenziile oneste și comunitatea se întâlnesc pentru a te ajuta să faci cea mai bună alegere, de fiecare dată.
                    </p>
                </div>
            </section>
            
            {/* Mission & Vision Section */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="text-center md:text-left">
                            <h2 className="text-3xl font-bold text-brand-dark dark:text-white mb-4">Misiunea Noastră</h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                Să digitalizăm și să transparentizăm piața de servicii din România, oferind o platformă unică unde consumatorii pot găsi, compara și evalua furnizori pe baza unor criterii obiective și a experiențelor reale ale altor clienți. Ne dedicăm să sprijinim afacerile locale să crească și să ajungă la clienții potriviți.
                            </p>
                        </div>
                         <div className="text-center md:text-left">
                            <h2 className="text-3xl font-bold text-brand-dark dark:text-white mb-4">Viziunea Noastră</h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                Ne dorim să devenim standardul de aur în materie de recenzii și recomandări de servicii în România. Vizăm o lume în care deciziile de cumpărare sunt luate cu încredere deplină, bazate pe date verificate și pe puterea comunității, eliminând astfel riscul experiențelor nesatisfăcătoare.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values Section */}
            <section className="py-16 bg-white dark:bg-gray-800/50">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-10 text-brand-dark dark:text-white">Valorile Care Ne Ghidează</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                         <ValueCard 
                            icon={<ShieldCheckIcon className="w-7 h-7" />}
                            title="Încredere & Transparență"
                            description="Recenziile sunt verificate, iar profilurile furnizorilor sunt complete. Fără surprize neplăcute."
                         />
                         <ValueCard 
                            icon={<StarIcon className="w-7 h-7 text-brand-primary" />}
                            title="Calitate Garantată"
                            description="Promovăm excelența și încurajăm standardele înalte. Doar cei mai buni ajung în top."
                         />
                         <ValueCard 
                            icon={<UsersIcon className="w-7 h-7" />}
                            title="Puterea Comunității"
                            description="Credem în puterea experiențelor partajate. Fiecare recenzie ajută pe altcineva."
                         />
                         <ValueCard 
                            icon={<LightBulbIcon className="w-7 h-7" />}
                            title="Inovație Continuă"
                            description="Suntem mereu în căutare de noi modalități de a îmbunătăți platforma și experiența ta."
                         />
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-12 text-brand-dark dark:text-white">Echipa din spatele Viziunii</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamMembers.map(member => (
                            <TeamMemberCard key={member.name} member={member} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <ProviderCTA />
        </div>
    );
};

export default AboutPage;