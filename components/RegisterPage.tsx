import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { UserIcon, EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon, SpinnerIcon, PaperAirplaneIcon, BriefcaseIcon } from './icons';
import { useNavigation } from '../context/NavigationContext';

const RegisterPage: React.FC = () => {
    const { navigateTo } = useNavigation();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    // Resend verification state
    const [resendLoading, setResendLoading] = useState(false);
    const [resendSent, setResendSent] = useState(false);
    const [resendError, setResendError] = useState<string | null>(null);
    const RESEND_COOLDOWN = 60; // seconds
    const [cooldownLeft, setCooldownLeft] = useState<number>(0);

    useEffect(() => {
        if (cooldownLeft <= 0) return;
        const t = setInterval(() => setCooldownLeft((c) => c - 1), 1000);
        return () => clearInterval(t);
    }, [cooldownLeft]);

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};
        if (!fullName.trim()) newErrors.fullName = 'Numele complet este obligatoriu.';
        if (!email.trim()) {
            newErrors.email = 'Adresa de e-mail este obligatorie.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Adresa de e-mail este invalidă.';
        }
        if (!password) {
            newErrors.password = 'Parola este obligatorie.';
        } else if (password.length < 8) {
            newErrors.password = 'Parola trebuie să conțină cel puțin 8 caractere.';
        }
        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Parolele nu se potrivesc.';
        }
        if (!agreedToTerms) {
            newErrors.terms = 'Trebuie să fii de acord cu termenii și condițiile.';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const translateAuthError = (code: string): string => {
        switch(code) {
            case 'auth/email-already-in-use': return 'E-mail deja folosit.';
            case 'auth/invalid-email': return 'Adresa de e-mail este invalidă.';
            case 'auth/weak-password': return 'Parolă prea slabă (minim 6 caractere Firebase, noi recomandăm 8+).';
            case 'auth/network-request-failed': return 'Problemă de rețea. Verifică conexiunea.';
            case 'auth/operation-not-allowed': return 'Metoda de autentificare nu este activată în Firebase.';
            case 'auth/too-many-requests': return 'Prea multe încercări. Așteaptă puțin și reîncearcă.';
            case 'auth/invalid-api-key': return 'API key invalidă. Verifică valorile din .env.local.';
            default: return `Eroare la crearea contului (${code}).`;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setIsLoading(true);
        setErrors({});
        try {
            const cred = await createUserWithEmailAndPassword(auth, email, password);
            // Optional: set display name
            if (fullName.trim()) {
                await updateProfile(cred.user, { displayName: fullName.trim() });
            }
            await sendEmailVerification(cred.user);
            setIsSuccess(true);
        } catch (err: any) {
            console.error('Firebase register error', err);
            const msg = translateAuthError(err.code || 'necunoscut');
            setErrors(prev => ({ ...prev, general: msg }));
        } finally {
            setIsLoading(false);
        }
    };

    const inputClasses = (hasError: boolean) => 
        `w-full pl-10 pr-4 py-2 border rounded-lg transition bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 ${hasError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-brand-primary focus:border-brand-primary'}`;

    const handleResendVerification = async () => {
        if (cooldownLeft > 0 || resendLoading) return;
        setResendLoading(true);
        setResendError(null);
        try {
            if (auth.currentUser) {
                await sendEmailVerification(auth.currentUser);
                setResendSent(true);
                setCooldownLeft(RESEND_COOLDOWN);
            } else {
                setResendError('Nu ești autentificat. Reîncearcă să te conectezi.');
            }
        } catch (e: any) {
            console.error('Resend verification error', e);
            setResendError('Nu s-a putut retrimite e-mailul. Încearcă din nou.');
        } finally {
            setResendLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <section className="bg-brand-light dark:bg-gray-900 py-12 md:py-20 flex items-center justify-center min-h-[60vh]">
                 <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-brand-accent dark:bg-brand-primary/20 text-brand-primary flex items-center justify-center mx-auto mb-6">
                        <PaperAirplaneIcon className="w-8 h-8"/>
                    </div>
                    <h2 className="text-3xl font-extrabold text-brand-dark dark:text-white">Verifică-ți e-mailul</h2>
                    <p className="text-gray-600 dark:text-gray-300 mt-3">
                        Ți-am trimis un link de confirmare la <strong className="text-brand-dark dark:text-white">{email}</strong>. Te rugăm să verifici inbox-ul (și folderul Spam).
                    </p>
                    <div className="mt-6 space-y-4">
                        <button
                            onClick={() => navigateTo('login')}
                            className="w-full bg-brand-primary text-white font-bold py-3 px-5 rounded-lg hover:bg-brand-secondary transition-all duration-300"
                        >
                           Am verificat, mergi la autentificare
                        </button>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                            <p className="mb-2">Nu ai primit e-mailul?</p>
                            <button
                                onClick={handleResendVerification}
                                disabled={resendLoading || cooldownLeft > 0}
                                className={`px-4 py-2 rounded-lg font-medium border transition-all w-full ${resendLoading || cooldownLeft>0 ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-white dark:bg-gray-700 hover:bg-brand-accent/40 dark:hover:bg-brand-primary/20 text-brand-primary border-brand-primary/40'}`}
                            >
                                {resendLoading ? 'Se retrimite...' : cooldownLeft > 0 ? `Poți retrimite în ${cooldownLeft}s` : 'Retrimite e-mailul de verificare'}
                            </button>
                            {resendSent && !resendError && <p className="text-green-600 dark:text-green-400 mt-2">E-mail retrimis. Verifică din nou inbox / spam.</p>}
                            {resendError && <p className="text-red-600 mt-2">{resendError}</p>}
                        </div>
                    </div>
                 </div>
            </section>
        );
    }

    return (
        <section className="bg-brand-light dark:bg-gray-900 py-12 md:py-20 flex items-center justify-center">
            <div className="container mx-auto px-6">
                <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
                    <div className="text-center mb-8">
                         <h2 className="text-3xl font-extrabold text-brand-dark dark:text-white">Creează un cont de Client</h2>
                         <p className="text-gray-500 dark:text-gray-400 mt-2">Este rapid și gratuit. Începe acum.</p>
                    </div>

                                        <form onSubmit={handleSubmit} noValidate>
                                                {errors.general && (
                                                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded" role="alert">{errors.general}</div>
                                                )}
                        {/* Full Name */}
                        <div className="mb-4">
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nume complet</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3"><UserIcon className="w-5 h-5 text-gray-400" /></span>
                                <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputClasses(!!errors.fullName)} placeholder="Popescu Ion" required />
                            </div>
                            {errors.fullName && <p className="text-red-600 text-xs mt-1">{errors.fullName}</p>}
                        </div>

                        {/* Email */}
                        <div className="mb-4">
                            <label htmlFor="email-register" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Adresă de e-mail</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3"><EnvelopeIcon className="w-5 h-5 text-gray-400" /></span>
                                <input type="email" id="email-register" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClasses(!!errors.email)} placeholder="exemplu@email.com" required />
                            </div>
                            {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                            <label htmlFor="password-register" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Parolă</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3"><LockClosedIcon className="w-5 h-5 text-gray-400" /></span>
                                <input type={showPassword ? 'text' : 'password'} id="password-register" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClasses(!!errors.password)} placeholder="Minim 8 caractere" required />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-brand-dark"><span className="sr-only">Show/hide password</span>{showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}</button>
                            </div>
                            {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password}</p>}
                        </div>
                        
                        {/* Confirm Password */}
                        <div className="mb-6">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirmă parola</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3"><LockClosedIcon className="w-5 h-5 text-gray-400" /></span>
                                <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={inputClasses(!!errors.confirmPassword)} placeholder="Repetă parola" required />
                            </div>
                            {errors.confirmPassword && <p className="text-red-600 text-xs mt-1">{errors.confirmPassword}</p>}
                        </div>

                        {/* Terms and Conditions */}
                        <div className="mb-6">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="terms" name="terms" type="checkbox" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} className={`h-4 w-4 text-brand-primary border-gray-300 dark:border-gray-600 rounded focus:ring-brand-primary dark:bg-gray-700 ${errors.terms ? 'ring-2 ring-red-500' : ''}`} />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="text-gray-600 dark:text-gray-300">Sunt de acord cu {' '}
                                        <button type="button" onClick={(e) => { e.preventDefault(); navigateTo('terms');}} className="font-semibold text-brand-primary hover:underline">Termenii și Condițiile</button> și am citit {' '}
                                        <button type="button" onClick={(e) => { e.preventDefault(); navigateTo('privacy');}} className="font-semibold text-brand-primary hover:underline">Politica de Confidențialitate</button>.
                                    </label>
                                    {errors.terms && <p className="text-red-600 text-xs mt-1">{errors.terms}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <button type="submit" disabled={isLoading} className="w-full bg-brand-primary text-white font-bold py-3 px-5 rounded-lg hover:bg-brand-secondary transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                                {isLoading ? <SpinnerIcon className="w-5 h-5" /> : null}
                                <span>{isLoading ? 'Se creează contul...' : 'Creează cont de client'}</span>
                            </button>
                        </div>
                    </form>
                    
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
                         <p className="text-sm text-gray-600 dark:text-gray-400">
                            Ai deja un cont?{' '}
                            <button onClick={() => navigateTo('login')} className="font-semibold text-brand-primary hover:underline">
                                Autentifică-te
                            </button>
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                            Ești furnizor de servicii?{' '}
                             <button onClick={() => navigateTo('business-register')} className="font-semibold text-brand-primary hover:underline">
                                Înregistrează-ți afacerea aici
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegisterPage;