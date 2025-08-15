import React, { useState } from 'react';
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../firebase';
import { EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon, SpinnerIcon } from './icons';
import { useNavigation } from '../context/NavigationContext';

interface LoginPageProps {
    onLoginSuccess: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
    const { navigateTo } = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        if (!email || !password) {
            setError('Toate câmpurile sunt obligatorii.');
            setIsLoading(false);
            return;
        }
        try {
            const cred = await signInWithEmailAndPassword(auth, email, password);
            if (!cred.user.emailVerified) {
                setError('E-mail neconfirmat. Verifică inbox-ul.');
                try { await sendEmailVerification(cred.user); } catch {}
                setIsLoading(false);
                return;
            }
            onLoginSuccess();
        } catch (err: any) {
            let msg = 'Autentificare eșuată.';
            if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') msg = 'E-mail sau parolă incorecte.';
            if (err.code === 'auth/user-not-found') msg = 'Utilizator inexistent.';
            setError(msg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="bg-brand-light dark:bg-gray-900 py-12 md:py-20 flex items-center justify-center">
            <div className="container mx-auto px-6">
                <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-extrabold text-brand-dark dark:text-white">
                            Autentificare
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">Bine ai revenit! Introdu detaliile contului.</p>
                    </div>

                    <form onSubmit={handleSubmit} noValidate>
                        {error && (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md" role="alert">
                                <p>{error}</p>
                            </div>
                        )}
                        
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Adresă de e-mail</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                                </span>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-brand-primary focus:border-brand-primary transition bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                                    placeholder="exemplu@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-6">
                             <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Parolă</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <LockClosedIcon className="w-5 h-5 text-gray-400" />
                                </span>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-brand-primary focus:border-brand-primary transition bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-brand-dark dark:hover:text-gray-300"
                                    aria-label={showPassword ? "Ascunde parola" : "Arată parola"}
                                >
                                    {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                                </button>
                            </div>
                             <div className="text-right mt-2">
                                <button type="button" onClick={() => navigateTo('reset-password')} className="text-sm text-brand-primary hover:underline">Ai uitat parola?</button>
                            </div>
                        </div>

                        <div className="mb-6">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-brand-primary text-white font-bold py-3 px-5 rounded-lg hover:bg-brand-secondary transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                               {isLoading ? <SpinnerIcon className="w-5 h-5" /> : null}
                               <span>{isLoading ? 'Se autentifică...' : 'Autentificare'}</span>
                            </button>
                        </div>
                    </form>

                    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                        Nu ai un cont?{' '}
                        <button onClick={() => navigateTo('register')} className="font-semibold text-brand-primary hover:underline">
                            Înregistrează-te acum
                        </button>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;