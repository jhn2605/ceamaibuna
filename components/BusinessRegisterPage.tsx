import React, { useState } from 'react';
import { type BusinessProfile, type OperatingHours } from '../types';
import { registerBusiness } from '../authApi';
import { UserIcon, EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon, SpinnerIcon, CheckIcon, BuildingOfficeIcon, IdentificationIcon, PhoneIcon, MapPinIcon, GlobeAltIcon, CameraIcon, LinkIcon, ClockIcon } from './icons';
import { useNavigation } from '../context/NavigationContext';

interface BusinessRegisterPageProps {}

const ProgressBar: React.FC<{ step: number }> = ({ step }) => {
    const steps = ['Cont', 'Afacere', 'Servicii', 'Online', 'Finalizat'];
    return (
        <div className="w-full px-4 sm:px-0 mb-8">
            <div className="flex">
                {steps.map((name, index) => (
                    <div key={name} className="flex items-center w-full">
                        <div className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${step > index + 1 ? 'bg-brand-primary text-white' : step === index + 1 ? 'bg-brand-accent text-brand-primary border-2 border-brand-primary' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                                {step > index + 1 ? <CheckIcon className="w-5 h-5"/> : index + 1}
                            </div>
                            <p className={`mt-2 text-xs text-center font-semibold transition-colors ${step >= index + 1 ? 'text-brand-dark dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>{name}</p>
                        </div>
                        {index < steps.length - 1 && <div className={`flex-auto border-t-2 transition-colors duration-500 ${step > index + 1 ? 'border-brand-primary' : 'border-gray-200 dark:border-gray-600'}`}></div>}
                    </div>
                ))}
            </div>
        </div>
    );
};


const BusinessRegisterPage: React.FC<BusinessRegisterPageProps> = () => {
    const { navigateTo } = useNavigation();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<Partial<BusinessProfile>>({
        categories: [],
        socialMedia: { facebook: '', instagram: '', linkedin: '' }
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    const initialHours: OperatingHours[] = [
        { day: 'Luni', opens: '09:00', closes: '18:00', isClosed: false },
        { day: 'Marți', opens: '09:00', closes: '18:00', isClosed: false },
        { day: 'Miercuri', opens: '09:00', closes: '18:00', isClosed: false },
        { day: 'Joi', opens: '09:00', closes: '18:00', isClosed: false },
        { day: 'Vineri', opens: '09:00', closes: '18:00', isClosed: false },
        { day: 'Sâmbătă', opens: '', closes: '', isClosed: true },
        { day: 'Duminică', opens: '', closes: '', isClosed: true },
    ];
    const [operatingHours, setOperatingHours] = useState<OperatingHours[]>(initialHours);

    const allCategories = ['Restaurante', 'Servicii Auto', 'Frumusețe', 'Electronice', 'Construcții', 'IT & Software', 'Curățenie', 'Evenimente'];

    const validateStep = () => {
        const newErrors: Record<string, string> = {};
        if (step === 1) {
            if (!formData.ownerName?.trim()) newErrors.ownerName = 'Numele este obligatoriu.';
            if (!formData.email?.trim()) newErrors.email = 'Emailul este obligatoriu.';
            else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email invalid.';
            if (!formData.password) newErrors.password = 'Parola este obligatorie.';
            else if (formData.password.length < 8) newErrors.password = 'Parola trebuie să aibă minim 8 caractere.';
        }
        if (step === 2) {
            if (!formData.companyName?.trim()) newErrors.companyName = 'Numele companiei este obligatoriu.';
            if (!formData.cui?.trim()) newErrors.cui = 'CUI/CIF este obligatoriu.';
            else if (!/^(ro)?[0-9]{2,10}$/i.test(formData.cui)) newErrors.cui = 'Format CUI/CIF invalid.';
            if (!formData.address?.trim()) newErrors.address = 'Adresa este obligatorie.';
            if (!formData.phone?.trim()) newErrors.phone = 'Telefonul este obligatoriu.';
        }
         if (step === 3) {
            if (!formData.description?.trim() || formData.description.length < 20) newErrors.description = 'Descrierea trebuie să aibă minim 20 de caractere.';
            if (!formData.categories || formData.categories.length === 0) newErrors.categories = 'Selectează cel puțin o categorie.';
        }
        // Step 4 fields are optional, no validation needed unless we want to validate URL formats
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleNext = () => {
        if (validateStep()) {
            setStep(s => s + 1);
        }
    };

    const handlePrev = () => setStep(s => s - 1);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

     const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            socialMedia: {
                ...prev.socialMedia,
                [name]: value
            }
        }));
    };

    const handleHoursChange = (index: number, field: keyof Omit<OperatingHours, 'day'>, value: string | boolean) => {
        const newHours = [...operatingHours];
        (newHours[index] as any)[field] = value;
        setOperatingHours(newHours);
    };
    
    const handleCategoryToggle = (category: string) => {
        setFormData(prev => {
            const currentCategories = prev.categories || [];
            const newCategories = currentCategories.includes(category)
                ? currentCategories.filter(c => c !== category)
                : [...currentCategories, category];
            return { ...prev, categories: newCategories };
        });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateStep()) return;

        setIsLoading(true);
        setErrors({});
        try {
            const finalData = { ...formData, operatingHours };
            await registerBusiness(finalData as BusinessProfile);
            setStep(5); // Move to success step
        } catch (err) {
            setErrors({ submit: err instanceof Error ? err.message : 'A apărut o eroare.' });
        } finally {
            setIsLoading(false);
        }
    };
    
    const inputClasses = (hasError: boolean) => 
        `w-full pl-10 pr-4 py-2 border rounded-lg transition bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 ${hasError ? 'border-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-brand-primary focus:border-brand-primary'}`;


    const renderStepContent = () => {
        switch (step) {
            case 1: // Account Details
                return (
                    <div>
                        <h3 className="text-xl font-bold text-brand-dark dark:text-white mb-4">Pasul 1: Detaliile contului tău</h3>
                        <div className="space-y-4">
                           <div>
                                <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Numele tău</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3"><UserIcon className="w-5 h-5 text-gray-400" /></span>
                                    <input type="text" name="ownerName" id="ownerName" value={formData.ownerName || ''} onChange={handleChange} className={inputClasses(!!errors.ownerName)} placeholder="Popescu Ion" />
                                </div>
                                {errors.ownerName && <p className="text-red-600 text-xs mt-1">{errors.ownerName}</p>}
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Adresa de e-mail</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3"><EnvelopeIcon className="w-5 h-5 text-gray-400" /></span>
                                    <input type="email" name="email" id="email" value={formData.email || ''} onChange={handleChange} className={inputClasses(!!errors.email)} placeholder="contact@companie.ro" />
                                </div>
                                {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Parolă</label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3"><LockClosedIcon className="w-5 h-5 text-gray-400" /></span>
                                    <input type={showPassword ? 'text' : 'password'} name="password" id="password" value={formData.password || ''} onChange={handleChange} className={inputClasses(!!errors.password)} placeholder="Minim 8 caractere" />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"><span className="sr-only">Show/hide password</span>{showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}</button>
                                </div>
                                {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password}</p>}
                            </div>
                        </div>
                    </div>
                );
            case 2: // Business Details
                 return (
                    <div>
                        <h3 className="text-xl font-bold text-brand-dark dark:text-white mb-4">Pasul 2: Informații despre afacere</h3>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Numele Companiei</label>
                                 <div className="relative"><span className="absolute inset-y-0 left-0 flex items-center pl-3"><BuildingOfficeIcon className="w-5 h-5 text-gray-400" /></span><input type="text" name="companyName" id="companyName" value={formData.companyName || ''} onChange={handleChange} className={inputClasses(!!errors.companyName)} placeholder="Companie SRL" /></div>
                                {errors.companyName && <p className="text-red-600 text-xs mt-1">{errors.companyName}</p>}
                            </div>
                             <div>
                                <label htmlFor="cui" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">CUI / CIF</label>
                                <div className="relative"><span className="absolute inset-y-0 left-0 flex items-center pl-3"><IdentificationIcon className="w-5 h-5 text-gray-400" /></span><input type="text" name="cui" id="cui" value={formData.cui || ''} onChange={handleChange} className={inputClasses(!!errors.cui)} placeholder="RO12345678" /></div>
                                {errors.cui && <p className="text-red-600 text-xs mt-1">{errors.cui}</p>}
                            </div>
                             <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Adresa sediului</label>
                                <div className="relative"><span className="absolute inset-y-0 left-0 flex items-center pl-3"><MapPinIcon className="w-5 h-5 text-gray-400" /></span><input type="text" name="address" id="address" value={formData.address || ''} onChange={handleChange} className={inputClasses(!!errors.address)} placeholder="Str. Exemplu Nr. 1, București" /></div>
                                {errors.address && <p className="text-red-600 text-xs mt-1">{errors.address}</p>}
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Număr de telefon</label>
                                <div className="relative"><span className="absolute inset-y-0 left-0 flex items-center pl-3"><PhoneIcon className="w-5 h-5 text-gray-400" /></span><input type="tel" name="phone" id="phone" value={formData.phone || ''} onChange={handleChange} className={inputClasses(!!errors.phone)} placeholder="07xx xxx xxx" /></div>
                                {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
                            </div>
                        </div>
                    </div>
                );
            case 3: // Service Details
                 return (
                    <div>
                        <h3 className="text-xl font-bold text-brand-dark dark:text-white mb-4">Pasul 3: Despre serviciile tale</h3>
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Scurtă descriere a afacerii</label>
                                <textarea name="description" id="description" value={formData.description || ''} onChange={handleChange} rows={4} className={`w-full px-4 py-2 border rounded-lg transition bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 ${errors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}`} placeholder="Descrie ce oferi, ce te face special etc."></textarea>
                                {errors.description && <p className="text-red-600 text-xs mt-1">{errors.description}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Selectează categoriile de servicii</label>
                                <div className="flex flex-wrap gap-2">
                                    {allCategories.map(cat => (
                                        <button key={cat} type="button" onClick={() => handleCategoryToggle(cat)} className={`px-3 py-1.5 text-sm font-semibold rounded-full border-2 transition-colors ${formData.categories?.includes(cat) ? 'bg-brand-primary border-brand-primary text-white' : 'bg-white dark:bg-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-brand-primary'}`}>
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                                 {errors.categories && <p className="text-red-600 text-xs mt-1">{errors.categories}</p>}
                            </div>
                        </div>
                    </div>
                );
            case 4: // Online Presence & Hours
                return (
                    <div>
                        <h3 className="text-xl font-bold text-brand-dark dark:text-white mb-6">Pasul 4: Prezență Online și Program</h3>
                        <div className="space-y-6">
                             {/* Online Presence */}
                            <div>
                                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Prezență Online (Opțional)</h4>
                                <div className="space-y-4">
                                     <div>
                                        <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">URL Logo</label>
                                        <div className="relative"><span className="absolute inset-y-0 left-0 flex items-center pl-3"><CameraIcon className="w-5 h-5 text-gray-400" /></span><input type="url" name="logoUrl" id="logoUrl" value={formData.logoUrl || ''} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700" placeholder="https://.../logo.png" /></div>
                                    </div>
                                    <div>
                                        <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Website</label>
                                        <div className="relative"><span className="absolute inset-y-0 left-0 flex items-center pl-3"><GlobeAltIcon className="w-5 h-5 text-gray-400" /></span><input type="url" name="website" id="website" value={formData.website || ''} onChange={handleChange} className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700" placeholder="https://www.companie.ro" /></div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label htmlFor="facebook" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Facebook</label>
                                            <div className="relative"><span className="absolute inset-y-0 left-0 flex items-center pl-3"><LinkIcon className="w-5 h-5 text-gray-400" /></span><input type="url" name="facebook" id="facebook" value={formData.socialMedia?.facebook || ''} onChange={handleSocialChange} className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700" placeholder="URL pagină" /></div>
                                        </div>
                                        <div>
                                            <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Instagram</label>
                                            <div className="relative"><span className="absolute inset-y-0 left-0 flex items-center pl-3"><LinkIcon className="w-5 h-5 text-gray-400" /></span><input type="url" name="instagram" id="instagram" value={formData.socialMedia?.instagram || ''} onChange={handleSocialChange} className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700" placeholder="URL profil" /></div>
                                        </div>
                                        <div>
                                            <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">LinkedIn</label>
                                            <div className="relative"><span className="absolute inset-y-0 left-0 flex items-center pl-3"><LinkIcon className="w-5 h-5 text-gray-400" /></span><input type="url" name="linkedin" id="linkedin" value={formData.socialMedia?.linkedin || ''} onChange={handleSocialChange} className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700" placeholder="URL pagină" /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Operating Hours */}
                             <div>
                                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2"><ClockIcon className="w-5 h-5" />Program de lucru (Opțional)</h4>
                                <div className="space-y-2">
                                    {operatingHours.map((item, index) => (
                                        <div key={item.day} className="grid grid-cols-3 md:grid-cols-4 gap-2 items-center bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg">
                                            <div className="font-medium text-sm col-span-3 md:col-span-1 dark:text-gray-200">{item.day}</div>
                                            <div className="flex items-center gap-2">
                                                <input type="time" value={item.opens} onChange={e => handleHoursChange(index, 'opens', e.target.value)} disabled={item.isClosed} className="w-full text-sm p-1 border border-gray-300 dark:border-gray-600 rounded-md disabled:bg-gray-200 dark:disabled:bg-gray-800 dark:bg-gray-700" />
                                                <span className="dark:text-gray-400">-</span>
                                                <input type="time" value={item.closes} onChange={e => handleHoursChange(index, 'closes', e.target.value)} disabled={item.isClosed} className="w-full text-sm p-1 border border-gray-300 dark:border-gray-600 rounded-md disabled:bg-gray-200 dark:disabled:bg-gray-800 dark:bg-gray-700" />
                                            </div>
                                            <div className="flex items-center justify-end col-span-2 md:col-span-1">
                                                <label htmlFor={`closed-${item.day}`} className="text-sm mr-2 dark:text-gray-300">Închis</label>
                                                <input type="checkbox" id={`closed-${item.day}`} checked={item.isClosed} onChange={e => handleHoursChange(index, 'isClosed', e.target.checked)} className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );
             case 5: // Success
                return (
                    <div className="text-center">
                        <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-6">
                            <CheckIcon className="w-8 h-8"/>
                        </div>
                        <h2 className="text-3xl font-extrabold text-brand-dark dark:text-white">Felicitări!</h2>
                        <p className="text-gray-600 dark:text-gray-300 mt-3">
                            Afacerea ta a fost înregistrată. Profilul tău va fi revizuit de echipa noastră în cel mai scurt timp. Vei primi un e-mail de confirmare odată ce este aprobat.
                        </p>
                        <div className="mt-8">
                            <button
                                onClick={() => navigateTo('home')}
                                className="w-full bg-brand-primary text-white font-bold py-3 px-5 rounded-lg hover:bg-brand-secondary transition-all duration-300"
                            >
                                Mergi la pagina principală
                            </button>
                        </div>
                    </div>
                );
        }
    }

    return (
        <section className="bg-brand-light dark:bg-gray-900 py-12 md:py-20 flex items-center justify-center">
            <div className="container mx-auto px-6">
                <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
                    <div className="text-center mb-8">
                         <h2 className="text-3xl font-extrabold text-brand-dark dark:text-white">Înregistrează-ți afacerea</h2>
                         <p className="text-gray-500 dark:text-gray-400 mt-2">Ajungi la mii de clienți noi. Completează pașii de mai jos.</p>
                    </div>
                    
                    <ProgressBar step={step} />

                    {step < 5 ? (
                        <form onSubmit={handleSubmit} noValidate>
                            {renderStepContent()}
                             {errors.submit && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-6 rounded-md" role="alert"><p>{errors.submit}</p></div>}
                            <div className="mt-8 flex justify-between items-center">
                                <button type="button" onClick={handlePrev} className="text-gray-600 dark:text-gray-300 hover:text-brand-dark dark:hover:text-white font-semibold py-2 px-4 rounded-lg transition disabled:opacity-50" disabled={step === 1 || isLoading}>
                                    Înapoi
                                </button>
                                {step < 4 ? (
                                    <button type="button" onClick={handleNext} className="bg-brand-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-brand-secondary transition">
                                        Continuă
                                    </button>
                                ) : (
                                    <button type="submit" disabled={isLoading} className="bg-brand-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-brand-secondary transition disabled:bg-gray-400 flex items-center gap-2">
                                        {isLoading && <SpinnerIcon className="w-5 h-5" />}
                                        {isLoading ? 'Se trimite...' : 'Finalizează înregistrarea'}
                                    </button>
                                )}
                            </div>
                        </form>
                    ) : (
                        renderStepContent()
                    )}
                </div>
            </div>
        </section>
    );
};

export default BusinessRegisterPage;