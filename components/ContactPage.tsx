import React, { useState } from 'react';
import { EnvelopeIcon, MapPinIcon, PhoneIcon, PaperAirplaneIcon, SpinnerIcon } from './icons';

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);
        }, 1500);
    };

    return (
        <div className="bg-brand-light dark:bg-gray-900">
             <section className="bg-white dark:bg-gray-800/50 py-20 text-center">
                <div className="container mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark dark:text-white leading-tight mb-4">
                        Contactează-ne
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Ai o întrebare, o sugestie sau o problemă? Echipa noastră este aici pentru a te ajuta.
                    </p>
                </div>
            </section>
            
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-5">
                        <div className="md:col-span-3 p-8 md:p-12">
                            {isSuccess ? (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-6">
                                        <PaperAirplaneIcon className="w-8 h-8"/>
                                    </div>
                                    <h2 className="text-2xl font-bold text-brand-dark dark:text-white">Mesaj trimis!</h2>
                                    <p className="text-gray-600 dark:text-gray-300 mt-2">Mulțumim că ne-ai contactat. Vom reveni cu un răspuns în cel mai scurt timp posibil.</p>
                                </div>
                            ) : (
                                <>
                                    <h2 className="text-2xl font-bold text-brand-dark dark:text-white mb-6">Trimite-ne un mesaj</h2>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid sm:grid-cols-2 gap-6">
                                            <div>
                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Numele tău</label>
                                                <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-brand-primary focus:border-brand-primary" />
                                            </div>
                                            <div>
                                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Adresa de e-mail</label>
                                                <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-brand-primary focus:border-brand-primary" />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subiect</label>
                                            <input type="text" name="subject" id="subject" required value={formData.subject} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-brand-primary focus:border-brand-primary" />
                                        </div>
                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Mesajul tău</label>
                                            <textarea name="message" id="message" rows={5} required value={formData.message} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-brand-primary focus:border-brand-primary"></textarea>
                                        </div>
                                        <div>
                                            <button type="submit" disabled={isLoading} className="w-full bg-brand-primary text-white font-bold py-3 px-5 rounded-lg hover:bg-brand-secondary transition-all duration-300 disabled:bg-gray-400 flex items-center justify-center gap-2">
                                                {isLoading && <SpinnerIcon className="w-5 h-5" />}
                                                {isLoading ? 'Se trimite...' : 'Trimite Mesajul'}
                                            </button>
                                        </div>
                                    </form>
                                </>
                            )}
                        </div>
                        <div className="md:col-span-2 bg-brand-accent dark:bg-gray-800/50 p-8 md:p-12">
                            <h3 className="text-2xl font-bold text-brand-dark dark:text-white mb-6">Informații de Contact</h3>
                            <div className="space-y-6 text-gray-700 dark:text-gray-300">
                                <div className="flex items-start gap-4">
                                    <MapPinIcon className="w-6 h-6 text-brand-primary flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-brand-dark dark:text-white">Adresă</h4>
                                        <p>Str. Exemplu Nr. 1, Sector 1, București, România</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <EnvelopeIcon className="w-6 h-6 text-brand-primary flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-brand-dark dark:text-white">Email</h4>
                                        <p>
                                            <strong>Suport Clienți:</strong> <a href="mailto:suport@ceammaibuna.ro" className="hover:underline">suport@ceammaibuna.ro</a>
                                        </p>
                                        <p>
                                            <strong>General:</strong> <a href="mailto:contact@ceammaibuna.ro" className="hover:underline">contact@ceammaibuna.ro</a>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <PhoneIcon className="w-6 h-6 text-brand-primary flex-shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-brand-dark dark:text-white">Telefon</h4>
                                        <p>(Program L-V, 09:00 - 17:00)</p>
                                        <p><a href="tel:+40312345678" className="hover:underline">+40 312 345 678</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;