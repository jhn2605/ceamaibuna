import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { NavigationProvider } from './context/NavigationContext';
import { ThemeProvider } from './context/ThemeContext';
import { ComparisonProvider } from './context/ComparisonContext';
import { FavoritesProvider } from './context/FavoritesContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <NavigationProvider>
      <ThemeProvider>
        <ComparisonProvider>
          <FavoritesProvider>
            <App />
          </FavoritesProvider>
        </ComparisonProvider>
      </ThemeProvider>
    </NavigationProvider>
  </React.StrictMode>
);