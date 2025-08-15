import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { EnvelopeIcon, SpinnerIcon } from './icons';
import { useNavigation } from '../context/NavigationContext';

const PasswordResetPage: React.FC = () => {
  const { navigateTo } = useNavigation();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email) {
      setError('Introdu adresa de e-mail.');
      return;
    }
    setStatus('loading');
    try {
      await sendPasswordResetEmail(auth, email);
      setStatus('sent');
    } catch (err: any) {
      setError('Nu am putut trimite e-mailul. Verifică adresa.');
      setStatus('error');
    }
  };

  return (
    <section className="bg-brand-light dark:bg-gray-900 py-12 md:py-20 flex items-center justify-center">
      <div className="container mx-auto px-6">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-brand-dark dark:text-white">Resetare parolă</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Primești un link de resetare pe e-mail.</p>
          </div>
          {status === 'sent' ? (
            <div className="text-center">
              <p className="text-green-600 dark:text-green-400 font-medium">E-mail trimis. Verifică inbox-ul!</p>
              <button onClick={() => navigateTo('login')} className="mt-6 w-full bg-brand-primary text-white font-bold py-3 px-5 rounded-lg hover:bg-brand-secondary transition-colors">Înapoi la autentificare</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded" role="alert">{error}</div>}
              <div className="mb-6">
                <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Adresă de e-mail</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3"><EnvelopeIcon className="w-5 h-5 text-gray-400" /></span>
                  <input id="reset-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-brand-primary focus:border-brand-primary transition bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200" placeholder="exemplu@email.com" />
                </div>
              </div>
              <button type="submit" disabled={status==='loading'} className="w-full bg-brand-primary text-white font-bold py-3 px-5 rounded-lg hover:bg-brand-secondary transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400">
                {status==='loading' && <SpinnerIcon className="w-5 h-5" />}<span>Trimite link</span>
              </button>
              <button type="button" onClick={() => navigateTo('login')} className="mt-4 w-full text-sm text-brand-primary hover:underline">Înapoi</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default PasswordResetPage;
