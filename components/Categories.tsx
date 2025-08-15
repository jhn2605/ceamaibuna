import React from 'react';
import { type Category } from '../types';
import { 
    RestaurantIcon, CarIcon, BeautyIcon, ElectronicsIcon, WrenchScrewdriverIcon, HomeModernIcon, 
    CalendarDaysIcon, ScaleIcon, HeartIcon, AcademicCapIcon, ComputerDesktopIcon, SparklesIcon, DumbbellIcon, 
    PawIcon, TruckIcon, GlobeAltIcon, CameraIcon, CakeIcon, CoffeeIcon, CocktailIcon, PlateIcon, BuildingStorefrontIcon,
    ToothIcon, PillBottleIcon, UserGroupIcon, GlassesIcon, SpaIcon, ScissorsIcon, PaintBrushIcon, KeyIcon,
    SteeringWheelIcon, TireIcon, CarWashIcon, WrenchIcon, GardeningIcon, CalculatorIcon, MegaphoneIcon,
    ChartBarIcon, LanguageIcon, BookOpenIcon, GiftIcon, FlowerIcon, TshirtIcon, PhoneWrenchIcon
} from './icons';

interface CategoriesProps {
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
}

const iconClassName = "w-7 h-7 text-brand-primary";

const categories: Category[] = [
  { name: 'Restaurante', icon: <RestaurantIcon className={iconClassName} /> },
  { name: 'Cafenele', icon: <CoffeeIcon className={iconClassName} /> },
  { name: 'Baruri & Pub-uri', icon: <CocktailIcon className={iconClassName} /> },
  { name: 'Patiserii', icon: <CakeIcon className={iconClassName} /> },
  { name: 'Catering', icon: <PlateIcon className={iconClassName} /> },
  { name: 'Magazine Alimentare', icon: <BuildingStorefrontIcon className={iconClassName} /> },
  { name: 'Cabinete Medicale', icon: <HeartIcon className={iconClassName} /> },
  { name: 'Stomatologie', icon: <ToothIcon className={iconClassName} /> },
  { name: 'Farmacii', icon: <PillBottleIcon className={iconClassName} /> },
  { name: 'Psihoterapie', icon: <UserGroupIcon className={iconClassName} /> },
  { name: 'Optică Medicală', icon: <GlassesIcon className={iconClassName} /> },
  { name: 'Kinetoterapie', icon: <DumbbellIcon className={iconClassName} /> },
  { name: 'Spa & Masaj', icon: <SpaIcon className={iconClassName} /> },
  { name: 'Saloane Frumusețe', icon: <BeautyIcon className={iconClassName} /> },
  { name: 'Coafură & Frizerie', icon: <ScissorsIcon className={iconClassName} /> },
  { name: 'Manichiură', icon: <PaintBrushIcon className={iconClassName} /> },
  { name: 'Service Auto', icon: <CarIcon className={iconClassName} /> },
  { name: 'Închirieri Auto', icon: <KeyIcon className={iconClassName} /> },
  { name: 'Școli de Șoferi', icon: <SteeringWheelIcon className={iconClassName} /> },
  { name: 'Vulcanizare', icon: <TireIcon className={iconClassName} /> },
  { name: 'Spălătorie Auto', icon: <CarWashIcon className={iconClassName} /> },
  { name: 'Transport', icon: <TruckIcon className={iconClassName} /> },
  { name: 'Mobilă & Decor', icon: <HomeModernIcon className={iconClassName} /> },
  { name: 'Instalații', icon: <WrenchScrewdriverIcon className={iconClassName} /> },
  { name: 'Design Interior', icon: <PaintBrushIcon className={iconClassName} /> },
  { name: 'Servicii Mutări', icon: <TruckIcon className={iconClassName} /> },
  { name: 'Curățenie', icon: <SparklesIcon className={iconClassName} /> },
  { name: 'Grădinărit', icon: <GardeningIcon className={iconClassName} /> },
  { name: 'Reparații casnice', icon: <WrenchIcon className={iconClassName} /> },
  { name: 'Avocați & Notari', icon: <ScaleIcon className={iconClassName} /> },
  { name: 'Contabilitate', icon: <CalculatorIcon className={iconClassName} /> },
  { name: 'Marketing & PR', icon: <MegaphoneIcon className={iconClassName} /> },
  { name: 'Consultanță', icon: <ChartBarIcon className={iconClassName} /> },
  { name: 'Traduceri', icon: <LanguageIcon className={iconClassName} /> },
  { name: 'Imobiliare', icon: <BuildingStorefrontIcon className={iconClassName} /> },
  { name: 'Meditații', icon: <AcademicCapIcon className={iconClassName} /> },
  { name: 'Cursuri & Ateliere', icon: <BookOpenIcon className={iconClassName} /> },
  { name: 'Sport & Fitness', icon: <DumbbellIcon className={iconClassName} /> },
  { name: 'Agenții Turism', icon: <GlobeAltIcon className={iconClassName} /> },
  { name: 'Fotografie', icon: <CameraIcon className={iconClassName} /> },
  { name: 'Evenimente', icon: <CalendarDaysIcon className={iconClassName} /> },
  { name: 'Magazine Haine', icon: <TshirtIcon className={iconClassName} /> },
  { name: 'Bijuterii', icon: <GiftIcon className={iconClassName} /> },
  { name: 'Florării', icon: <FlowerIcon className={iconClassName} /> },
  { name: 'Service IT', icon: <ComputerDesktopIcon className={iconClassName} /> },
  { name: 'Reparații Telefoane', icon: <PhoneWrenchIcon className={iconClassName} /> },
  { name: 'Animale Companie', icon: <PawIcon className={iconClassName} /> },
  { name: 'Electronice', icon: <ElectronicsIcon className={iconClassName} /> },
];

const CategoryCard: React.FC<{ category: Category; onClick: () => void; isActive: boolean }> = ({ category, onClick, isActive }) => (
    <button 
        onClick={onClick} 
        className={`flex flex-col items-center bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-lg hover:shadow-xl dark:hover:shadow-brand-primary/10 transition-all duration-300 text-center transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary ${isActive ? 'ring-2 ring-brand-primary shadow-xl -translate-y-1' : 'dark:border dark:border-gray-700'}`}
        aria-pressed={isActive}
    >
        <div className="mb-2 inline-block p-2 bg-brand-accent/20 dark:bg-brand-primary/10 rounded-full">
            {category.icon}
        </div>
        <div className="h-10 flex items-center justify-center">
             <h3 className="text-xs font-semibold text-brand-dark dark:text-white leading-snug">{category.name}</h3>
        </div>
    </button>
);

const Categories: React.FC<CategoriesProps> = ({ onSelectCategory, selectedCategory }) => {
  return (
    <section className="py-16 bg-brand-light dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-4 text-brand-dark dark:text-white">Explorează Categorii Populare</h2>
        <div className="flex justify-center mb-10">
            <button
                onClick={() => onSelectCategory('Toate')}
                className={`px-6 py-2 font-semibold rounded-full transition-colors ${selectedCategory === 'Toate' ? 'bg-brand-primary text-white shadow-md' : 'bg-white dark:bg-gray-800 dark:hover:bg-gray-700 text-brand-dark dark:text-gray-200 hover:bg-gray-100'}`}
            >
                Toate Categoriile
            </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {categories.map((cat) => (
            <CategoryCard 
              key={cat.name} 
              category={cat} 
              onClick={() => onSelectCategory(cat.name)}
              isActive={selectedCategory === cat.name}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;