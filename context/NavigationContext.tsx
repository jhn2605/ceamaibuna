import React, { createContext, useState, useContext, ReactNode } from 'react';
import { type AppPage } from '../types';

interface NavigationContextType {
  page: AppPage;
  navigateTo: (page: AppPage) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [page, setPage] = useState<AppPage>('home');

  const navigateTo = (newPage: AppPage) => {
    setPage(newPage);
    // Scroll to the top of the page on every navigation change for better UX
    window.scrollTo(0, 0);
  };

  return (
    <NavigationContext.Provider value={{ page, navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};