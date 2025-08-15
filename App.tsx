import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Categories from './components/Categories';
import HowItWorks from './components/HowItWorks';
import ProviderCTA from './components/ProviderCTA';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import SearchResults from './components/SearchResults';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AboutPage from './components/AboutPage';
import BusinessRegisterPage from './components/BusinessRegisterPage';
import GooglePlacesListings from './components/GooglePlacesListings';
import ComparePage from './components/ComparePage';
import ReviewModal from './components/ReviewModal';
import FavoritesPage from './components/FavoritesPage';
import CareersPage from './components/CareersPage';
import PressPage from './components/PressPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsAndConditionsPage from './components/TermsAndConditionsPage';
import ContactPage from './components/ContactPage';
import FaqPage from './components/FaqPage';
import { useNavigation } from './context/NavigationContext';
import { useTheme } from './context/ThemeContext';
import BackToTopButton from './components/BackToTopButton';
import { useLocation } from './hooks/useLocation';
import { useMarketResearch } from './hooks/useMarketResearch';
import { useLocalServices } from './hooks/useLocalServices';
import { InternalReview } from './types';
import PasswordResetPage from './components/PasswordResetPage';
import { AuthProvider, useAuth } from './context/AuthContext';

const App: React.FC = () => {
  const { page, navigateTo } = useNavigation();
  const { theme } = useTheme();
  // auth state handled via AuthContext now
  const [reviewModalData, setReviewModalData] = useState<{ isOpen: boolean; placeId: string; placeName: string }>({ isOpen: false, placeId: '', placeName: '' });
  
  const {
      userCoords,
      locationInput,
      isDetectingLocation,
      handleLocationInputChange,
      handleDetectLocation
  } = useLocation();

  const {
      results,
      isLoading: isMarketLoading,
      error: marketError,
      searchHistory,
      searchMarket,
  } = useMarketResearch();

  const { 
    state,
    dispatch,
    sortedListings,
    selectedListing,
    searchLocalServices, 
    addInternalReview 
  } = useLocalServices(userCoords);


  const handleProductSearch = (query: string, location: string) => {
    // Use coordinates if the user has opted for their current location.
    const coordsToUse = location.toLowerCase().includes('locația mea curentă') && userCoords ? userCoords : null;
    searchMarket(query, location, coordsToUse);
  };
  
  const handleLoginSuccess = () => {
    navigateTo('home');
  };

  const handleOpenReviewModal = (placeId: string, businessName: string) => {
      setReviewModalData({ isOpen: true, placeId, placeName: businessName });
  };
  
  const handleCloseReviewModal = () => {
    setReviewModalData({ isOpen: false, placeId: '', placeName: '' });
  };

  const handleAddReview = (review: Omit<InternalReview, 'timestamp'>) => {
      if (reviewModalData.placeId) {
          addInternalReview(reviewModalData.placeId, review);
      }
  };

  const handlePopularCategorySearch = (category: string) => {
    if (page !== 'services') {
      navigateTo('services');
      // Use a short timeout to ensure the page has switched before the search starts
      setTimeout(() => searchLocalServices(category), 50);
    } else {
      searchLocalServices(category);
    }
  };

  const renderPage = () => {
    switch(page) {
      case 'login':
        return <LoginPage onLoginSuccess={handleLoginSuccess} />;
      case 'register':
        return <RegisterPage />;
      case 'business-register':
        return <Protected><BusinessRegisterPage /></Protected>;
      case 'about':
        return <AboutPage />;
      case 'careers':
        return <CareersPage />;
      case 'press':
        return <PressPage />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsAndConditionsPage />;
      case 'contact':
        return <ContactPage />;
      case 'faq':
        return <FaqPage />;
      case 'compare':
        return <ComparePage />;
      case 'favorites':
        return <Protected><FavoritesPage onSelectListing={(id) => {
          dispatch({ type: 'SELECT_LISTING', payload: id });
          navigateTo('services');
        }} /></Protected>;
      case 'reset-password':
        return <PasswordResetPage />;
      case 'services':
          return (
            <>
                <Categories onSelectCategory={searchLocalServices} selectedCategory={state.selectedCategory} />
                <GooglePlacesListings 
                  isLoading={state.status === 'loading'}
                  error={state.error}
                  listings={sortedListings}
                  selectedListing={selectedListing}
                  selectedCategory={state.selectedCategory}
                  sortCriteria={state.sortCriteria}
                  dispatch={dispatch}
                  onAddReview={handleOpenReviewModal}
                  internalReviews={state.internalReviews}
                  googleReviews={state.googleReviews}
                  userCoords={userCoords}
                />
            </>
          );
      case 'home':
      default:
        return (
          <>
            <Hero 
              onSearch={handleProductSearch} 
              isLoading={isMarketLoading} 
              location={locationInput}
              onLocationChange={handleLocationInputChange}
              onDetectLocation={handleDetectLocation}
              isDetectingLocation={isDetectingLocation}
              onPopularCategorySearch={handlePopularCategorySearch}
              searchHistory={searchHistory}
            />
            <SearchResults 
              isLoading={isMarketLoading} 
              error={marketError} 
              results={results}
              query={results ? results.queryFor : ''}
            />
            <HowItWorks />
            <ProviderCTA />
          </>
        )
    }
  }


  return (
    <AuthProvider>
      <div className={`${theme} bg-brand-light dark:bg-gray-900 font-sans text-brand-dark dark:text-gray-300 flex flex-col min-h-screen`}>
        <Header isLoggedIn={false} onLogout={() => navigateTo('home')} />
        <main className="flex-grow">
          {renderPage()}
        </main>
        <Footer />
        <CookieBanner />
        <ReviewModal
          isOpen={reviewModalData.isOpen}
          onClose={handleCloseReviewModal}
          businessName={reviewModalData.placeName}
          onSubmit={handleAddReview}
        />
        <BackToTopButton />
      </div>
    </AuthProvider>
  );
};

// Simple protected wrapper
const Protected: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  const { navigateTo } = useNavigation();
  if (loading) return <div className="p-10 text-center">Se încarcă...</div>;
  if (!user) {
    navigateTo('login');
    return null;
  }
  if (!user.emailVerified) {
    return <div className="p-10 text-center text-sm text-gray-600 dark:text-gray-300">Trebuie să îți verifici e-mailul pentru a accesa această pagină.</div>;
  }
  return <>{children}</>;
};

export default App;