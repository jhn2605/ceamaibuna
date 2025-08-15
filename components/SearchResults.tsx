import React from 'react';
import { type MarketResearchResult, type ResearchItem } from '../types';
import { SpinnerIcon, LightBulbIcon, CheckIcon, XMarkIcon, DocumentMagnifyingGlassIcon, ShareIcon, ScaleIcon } from './icons';
import { useComparison } from '../context/ComparisonContext';
import { useNavigation } from '../context/NavigationContext';

const sourceSearchUrlMap: Record<string, string> = {
  'emag': 'https://www.emag.ro/search/{query}',
  'altex': 'https://altex.ro/cauta/?q={query}',
  'cel.ro': 'https://www.cel.ro/cauta/keyword/{query}',
  'flanco': 'https://www.flanco.ro/catalogsearch/result/?q={query}',
  'pc garage': 'https://www.pcgarage.ro/cauta/{query}',
  'evomag': 'https://www.evomag.ro/cauta/{query}'
  // Removed compari.ro legacy URL
};

const getSourceUrl = (sourceName: string, productName: string): string | null => {
    if (!sourceName || !productName) return null;
    
    const query = encodeURIComponent(productName);
    const lowerSourceName = sourceName.toLowerCase();

    for (const key in sourceSearchUrlMap) {
        if (lowerSourceName.includes(key)) {
            return sourceSearchUrlMap[key].replace('{query}', query);
        }
    }
    // Fallback to a google search for the store name + product name
    return `https://www.google.com/search?q=${encodeURIComponent(sourceName + ' ' + productName)}`;
};

const SkeletonCard: React.FC = () => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden animate-pulse">
    <div className="p-6">
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-4"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
        </div>
        <div>
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-auto">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
        <div className="h-10 bg-gray-100 dark:bg-gray-700/50 rounded-lg mt-2"></div>
        <div className="h-10 bg-gray-100 dark:bg-gray-700/50 rounded-lg mt-2"></div>
      </div>
    </div>
  </div>
);

const EmptyState: React.FC<{ query: string }> = ({ query }) => (
    <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md max-w-2xl mx-auto">
      <DocumentMagnifyingGlassIcon className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
      <h3 className="text-xl font-semibold text-brand-dark dark:text-white">Nu am găsit rezultate pentru "{query}"</h3>
      <p className="text-gray-600 dark:text-gray-400 mt-2">Încearcă să reformulezi căutarea sau să folosești termeni mai generali.</p>
    </div>
);

const parsePrice = (priceStr: string): number => {
    if (!priceStr || typeof priceStr !== 'string') return Infinity;
    return parseFloat(priceStr.replace(/[^0-9,]/g, '').replace(',', '.'));
}

const ResultCard: React.FC<{ item: ResearchItem }> = ({ item }) => {
    const { comparisonList, toggleFromComparison } = useComparison();
    const isSelected = comparisonList.some(compItem => compItem.productName === item.productName);
    
    const sortedPrices = (item.prices || []).sort((a, b) => parsePrice(a.price) - parsePrice(b.price));

    return (
      <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col border-2 ${isSelected ? 'border-brand-primary' : 'border-transparent'}`}>
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-3 gap-2">
            <h3 className="text-xl font-bold text-brand-dark dark:text-white flex-grow pr-2">{item.productName}</h3>
            <button 
                onClick={() => toggleFromComparison(item)}
                className={`p-2 rounded-full transition-colors flex-shrink-0 ${isSelected ? 'bg-brand-accent dark:bg-brand-primary/20 text-brand-primary' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200'}`}
                aria-label={isSelected ? 'Elimină din comparație' : 'Adaugă la comparație'}
                title={isSelected ? 'Elimină din comparație' : 'Adaugă la comparație'}
              >
                  <ScaleIcon className="w-5 h-5"/>
            </button>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{item.summary}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-sm">
            {item.pros && item.pros.length > 0 && (
              <div>
                <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Avantaje</h4>
                <ul className="space-y-1">
                  {item.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckIcon className="w-4 h-4 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {item.cons && item.cons.length > 0 && (
              <div>
                <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">Dezavantaje</h4>
                <ul className="space-y-1">
                  {item.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <XMarkIcon className="w-4 h-4 text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0" />
                      <span>{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="mt-auto border-t dark:border-gray-700 pt-4">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Prețuri găsite:</h4>
            {sortedPrices.length > 0 ? (
              <ul className="space-y-2">
                {sortedPrices.map((pricePoint, index) => {
                  const sourceUrl = getSourceUrl(pricePoint.source, item.productName);
                  return (
                    <li key={index} className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg border border-gray-200 dark:border-gray-600">
                        <div className="flex justify-between items-center gap-2">
                            <span className="text-gray-800 dark:text-gray-200 font-medium truncate" title={pricePoint.source}>{pricePoint.source}</span>
                            <span className="text-brand-dark dark:text-white font-bold py-1.5 px-4 rounded-full text-sm whitespace-nowrap bg-gray-200 dark:bg-gray-600">
                              {pricePoint.price}
                            </span>
                        </div>
                        {sourceUrl && (
                            <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-brand-primary hover:underline mt-1.5 inline-block">
                                Vezi pe {pricePoint.source} &rarr;
                            </a>
                        )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 italic bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">Nu am găsit oferte de preț pentru acest produs.</p>
            )}
          </div>
        </div>
      </div>
    );
};

const CompareButton: React.FC = () => {
    const { comparisonList, clearComparison } = useComparison();
    const { navigateTo } = useNavigation();

    if (comparisonList.length < 2) return null;

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
            <div className="bg-brand-dark dark:bg-gray-700 text-white rounded-full shadow-lg flex items-center gap-4 p-2 transition-all animate-fade-in-up">
                <span className="font-semibold pl-4">Ai selectat {comparisonList.length} produse</span>
                <button
                    onClick={() => navigateTo('compare')}
                    className="bg-brand-primary hover:bg-brand-secondary text-white font-bold py-2 px-6 rounded-full"
                >
                    Compară Selecția
                </button>
                 <button
                    onClick={clearComparison}
                    className="p-2 text-gray-300 hover:text-white"
                    title="Curăță selecția"
                >
                    <XMarkIcon className="w-5 h-5"/>
                </button>
            </div>
        </div>
    );
}

interface SearchResultsProps {
  isLoading: boolean;
  error: string | null;
  results: MarketResearchResult | null;
  query: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ isLoading, error, results, query }) => {
  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-brand-light dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <SpinnerIcon className="w-12 h-12 text-brand-primary mx-auto animate-spin" />
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">AI-ul analizează piața pentru tine... Acest proces poate dura câteva momente, deoarece verificăm în detaliu informațiile pentru a-ți oferi cele mai bune rezultate. Vă rugăm așteptați.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-brand-accent dark:bg-red-900/20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-red-700 dark:text-red-300 mb-2">Oops! Ceva nu a funcționat.</h2>
          <p className="text-red-600 dark:text-red-400">{error}</p>
        </div>
      </section>
    );
  }

  if (!results) {
    return null; // Don't render anything if there are no results yet (initial state)
  }

  const hasResults = results.marketStudy && results.marketStudy.length > 0;

  return (
    <section className="py-16 md:py-24 bg-brand-light dark:bg-gray-900" id="results">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12 text-brand-dark dark:text-white">Rezultatele Studiului de Piață</h2>
        
        {results.categorySummary && hasResults && (
          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg mb-16 border dark:border-gray-700">
              <div className="flex items-center gap-4 mb-4">
                  <LightBulbIcon className="w-10 h-10 text-brand-primary flex-shrink-0" />
                  <h3 className="text-2xl lg:text-3xl font-bold text-brand-dark dark:text-white">Sumar Categorie</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg">{results.categorySummary}</p>
          </div>
        )}

        {hasResults ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">
            {results.marketStudy.map((item, index) => (
              <ResultCard key={index} item={item} />
            ))}
          </div>
        ) : (
          <EmptyState query={query} />
        )}
      </div>
      <CompareButton />
    </section>
  );
};

export default SearchResults;