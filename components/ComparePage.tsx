import React from 'react';
import { useComparison } from '../context/ComparisonContext';
import { useNavigation } from '../context/NavigationContext';
import { CheckIcon, XMarkIcon } from './icons';

const ComparePage: React.FC = () => {
  const { comparisonList } = useComparison();
  const { navigateTo } = useNavigation();

  if (comparisonList.length === 0) {
    return (
      <div className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-bold text-brand-dark dark:text-white mb-4">Nimic de comparat</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Te rugăm să te întorci la pagina principală și să selectezi cel puțin două produse pentru a le compara.
        </p>
        <button
          onClick={() => navigateTo('home')}
          className="bg-brand-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-brand-secondary transition-colors"
        >
          Înapoi la Căutare
        </button>
      </div>
    );
  }

  return (
    <section className="bg-brand-light dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-brand-dark dark:text-white">Comparație Produse</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Analizează caracteristicile una lângă alta.</p>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-full inline-block align-middle">
            <div className="border dark:border-gray-700 rounded-2xl overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider w-1/4">
                      Caracteristică
                    </th>
                    {comparisonList.map((item) => (
                      <th key={item.productName} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        {item.productName}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800/50">
                  {/* Summary */}
                  <tr>
                    <td className="px-6 py-4 font-semibold text-sm text-brand-dark dark:text-white">Sumar</td>
                    {comparisonList.map((item) => (
                      <td key={item.productName} className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300 align-top">{item.summary}</td>
                    ))}
                  </tr>
                  
                  {/* Pros */}
                  <tr>
                    <td className="px-6 py-4 font-semibold text-sm text-brand-dark dark:text-white">Avantaje</td>
                    {comparisonList.map((item) => (
                      <td key={item.productName} className="px-6 py-4 text-sm align-top">
                        <ul className="space-y-2">
                          {item.pros.map((pro, i) => (
                            <li key={i} className="flex items-start gap-2 text-green-700 dark:text-green-400">
                              <CheckIcon className="w-4 h-4 flex-shrink-0 mt-0.5" />
                              <span>{pro}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  {/* Cons */}
                  <tr>
                    <td className="px-6 py-4 font-semibold text-sm text-brand-dark dark:text-white">Dezavantaje</td>
                    {comparisonList.map((item) => (
                      <td key={item.productName} className="px-6 py-4 text-sm align-top">
                        <ul className="space-y-2">
                          {item.cons.map((con, i) => (
                            <li key={i} className="flex items-start gap-2 text-red-700 dark:text-red-400">
                              <XMarkIcon className="w-4 h-4 flex-shrink-0 mt-0.5" />
                              <span>{con}</span>
                            </li>
                          ))}
                        </ul>
                      </td>
                    ))}
                  </tr>

                  {/* Prices */}
                   <tr className="bg-gray-50 dark:bg-gray-800">
                     <td className="px-6 py-4 font-semibold text-sm text-brand-dark dark:text-white">Prețuri</td>
                     {comparisonList.map((item) => (
                      <td key={item.productName} className="px-6 py-4 text-sm align-top">
                        {item.prices.length > 0 ? (
                            <ul className="space-y-2">
                                {item.prices.map((price, i) => (
                                    <li key={i} className="flex justify-between items-center bg-white dark:bg-gray-700 p-2 rounded-md">
                                        <span className="font-medium text-gray-700 dark:text-gray-200">{price.source}</span>
                                        <span className="font-bold text-brand-dark dark:text-white">{price.price}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <span className="italic text-gray-400">N/A</span>
                        )}
                      </td>
                    ))}
                   </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparePage;