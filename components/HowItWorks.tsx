import React from 'react';
import { SearchIcon, CheckIcon, ArrowRightIcon, StarIcon } from './icons';

interface StepProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    stepNumber: number;
}

const Step: React.FC<StepProps> = ({ icon, title, description, stepNumber }) => (
    <div className="relative text-center">
        <div className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-accent dark:bg-brand-primary/20 text-brand-secondary shadow-lg">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-brand-dark dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
);

const HowItWorks: React.FC = () => {
  return (
    <section className="py-20 bg-brand-light dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-dark dark:text-white">Cum funcționează?</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Găsește serviciul perfect în 3 pași simpli.</p>
        </div>
        <div className="flex flex-col md:flex-row items-start justify-center gap-8 md:gap-4">
          <div className="flex-1">
            <Step 
                stepNumber={1}
                icon={<SearchIcon className="w-8 h-8"/>} 
                title="1. Caută" 
                description="Introdu ce ai nevoie în bara de căutare. Folosește filtre pentru a rafina rezultatele."
            />
          </div>
          <div className="self-center hidden md:block text-gray-300 dark:text-gray-600 mx-4 mt-[-40px]">
             <ArrowRightIcon className="w-12 h-12" />
          </div>
          <div className="flex-1">
            <Step 
                stepNumber={2}
                icon={<CheckIcon className="w-8 h-8"/>} 
                title="2. Compară" 
                description="Analizează oferte, citește recenzii de la alți utilizatori și compară prețurile."
            />
          </div>
           <div className="self-center hidden md:block text-gray-300 dark:text-gray-600 mx-4 mt-[-40px]">
             <ArrowRightIcon className="w-12 h-12" />
          </div>
          <div className="flex-1">
            <Step 
                stepNumber={3}
                icon={<StarIcon className="w-8 h-8 text-brand-secondary"/>} 
                title="3. Alege" 
                description="Contactează furnizorul ideal și bucură-te de servicii de cea mai bună calitate."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;