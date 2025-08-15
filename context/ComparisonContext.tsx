import React, { createContext, useState, useContext, ReactNode } from 'react';
import { type ResearchItem } from '../types';

interface ComparisonContextType {
  comparisonList: ResearchItem[];
  toggleFromComparison: (item: ResearchItem) => void;
  clearComparison: () => void;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const ComparisonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [comparisonList, setComparisonList] = useState<ResearchItem[]>([]);

  const toggleFromComparison = (item: ResearchItem) => {
    setComparisonList(prevList => {
      const itemIndex = prevList.findIndex(i => i.productName === item.productName);
      if (itemIndex > -1) {
        // Item exists, remove it
        return prevList.filter((_, index) => index !== itemIndex);
      } else {
        // Item does not exist, add it
        return [...prevList, item];
      }
    });
  };

  const clearComparison = () => {
    setComparisonList([]);
  };

  return (
    <ComparisonContext.Provider value={{ comparisonList, toggleFromComparison, clearComparison }}>
      {children}
    </ComparisonContext.Provider>
  );
};

export const useComparison = (): ComparisonContextType => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};