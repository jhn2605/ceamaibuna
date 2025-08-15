import React, { useState, useRef, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut, sendEmailVerification } from 'firebase/auth';
import { useNavigation } from '../context/NavigationContext';
import { useTheme } from '../context/ThemeContext';
import { useFavorites } from '../context/FavoritesContext';
import { UserIcon, MoonIcon, SunIcon, HeartIcon } from './icons';
import { AppPage } from '../types';

interface HeaderProps { isLoggedIn: boolean; onLogout: () => void; }

const ThemeToggle: React.FC = () => {
    const { theme, setTheme } = useTheme();

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={`Activează modul ${theme === 'dark' ? 'luminos' : 'întunecat'}`}
        >
            {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
        </button>
    );
};

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLogout }) => {
  const { page, navigateTo } = useNavigation();
  const { favorites } = useFavorites();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<any>(null);
  const [emailJustSent, setEmailJustSent] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileRef]);

  const handleNav = (targetPage: AppPage) => {
      navigateTo(targetPage);
      setIsMenuOpen(false);
  }

  const navLinkClasses = (targetPage: AppPage) => {
    const isActive = page === targetPage;
    return `relative text-gray-600 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-primary transition-colors ${isActive ? 'font-semibold text-brand-primary' : ''}`;
  }
  
  const favoritesCount = favorites.length;

  return (
    <header className="bg-brand-light/80 dark:bg-gray-900/80 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigateTo('home')} className="text-2xl font-bold text-brand-dark dark:text-white cursor-pointer">
            CeAmai<span className="text-brand-primary">Buna</span>.ro
          </button>
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => handleNav('home')} className={navLinkClasses('home')}>Compară Produse</button>
            <button onClick={() => handleNav('services')} className={navLinkClasses('services')}>Găsește Servicii</button>
            <button onClick={() => handleNav('about')} className={navLinkClasses('about')}>Despre Noi</button>
            <button onClick={() => handleNav('favorites')} className={`${navLinkClasses('favorites')} flex items-center gap-1.5`}>
                <HeartIcon className="w-5 h-5" />
                <span>Salvate</span>
                {favoritesCount > 0 && (
                    <span className="bg-brand-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{favoritesCount}</span>
                )}
            </button>
          </nav>
          <div className="hidden md:flex items-center space-x-4">
             <ThemeToggle />
            {user ? (
                <div className="relative" ref={profileRef}>
                    <button onClick={() => setIsProfileOpen(prev => !prev)} className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-primary font-medium transition-colors">
                        <UserIcon className="w-6 h-6 p-1 bg-gray-200 dark:bg-gray-600 rounded-full" />
                        <span>{user.displayName || 'Profil'}</span>
                    </button>
                    {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-20 py-1 border dark:border-gray-700">
                            {!user.emailVerified && (
                              <button disabled={emailJustSent} onClick={async ()=> { try { await sendEmailVerification(user); setEmailJustSent(true); setTimeout(()=>setEmailJustSent(false), 60000);} catch{} }} className="block w-full text-left px-4 py-2 text-xs text-orange-600 dark:text-orange-400 hover:bg-brand-accent dark:hover:bg-gray-700">
                                {emailJustSent ? 'Trimis' : 'Retrimite verificare'}
                              </button>
                            )}
                            <button onClick={() => signOut(auth).then(onLogout)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-brand-accent dark:hover:bg-gray-700">Deconectare</button>
                        </div>
                    )}
                </div>
            ) : (
              <>
                <button onClick={() => navigateTo('login')} className="text-gray-600 dark:text-gray-300 hover:text-brand-primary dark:hover:text-brand-primary font-medium transition-colors">Autentificare</button>
                <button onClick={() => navigateTo('register')} className="bg-brand-primary text-white font-bold py-2 px-5 rounded-lg hover:bg-brand-secondary transition-transform transform hover:scale-105 shadow-md hover:shadow-lg">
                  Înregistrează-te
                </button>
              </>
            )}
          </div>
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-brand-dark dark:text-gray-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <nav className="flex flex-col space-y-4 text-center">
               
                    <button onClick={() => handleNav('home')} className="text-gray-600 dark:text-gray-300 hover:text-brand-primary transition-colors">Compară Produse</button>
                    <button onClick={() => handleNav('services')} className="text-gray-600 dark:text-gray-300 hover:text-brand-primary transition-colors">Găsește Servicii</button>
                    <button onClick={() => handleNav('about')} className="text-gray-600 dark:text-gray-300 hover:text-brand-primary transition-colors">Despre Noi</button>
                     <button onClick={() => handleNav('favorites')} className="text-gray-600 dark:text-gray-300 hover:text-brand-primary transition-colors flex items-center justify-center gap-1.5">
                        <HeartIcon className="w-5 h-5" />
                        <span>Salvate ({favoritesCount})</span>
                    </button>
                    <hr className="border-gray-200 dark:border-gray-700"/>
                {user ? (
                  <>
                    <button onClick={() => handleNav('favorites')} className="text-gray-600 dark:text-gray-300 hover:text-brand-primary font-medium">Salvate ({favoritesCount})</button>
                    <button onClick={() => signOut(auth).then(onLogout)} className="text-gray-600 dark:text-gray-300 hover:text-brand-primary font-medium text-left">Deconectare</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleNav('login')} className="text-gray-600 dark:text-gray-300 hover:text-brand-primary font-medium">Autentificare</button>
                    <button onClick={() => handleNav('register')} className="bg-brand-primary text-white font-bold py-2 px-5 rounded-lg hover:bg-brand-secondary transition-colors">Înregistrează-te</button>
                  </>
                )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;