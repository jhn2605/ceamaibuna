import React from 'react';
import { useNavigation } from '../context/NavigationContext';

const SocialIcon: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-primary transition-colors">
    {children}
  </a>
);

const Footer: React.FC = () => {
    const { navigateTo } = useNavigation();
  return (
    <footer className="bg-brand-dark dark:bg-black/50 text-gray-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold text-white mb-4">CeAmai<span className="text-brand-primary">Buna</span>.ro</h3>
            <p className="text-gray-400 text-sm">Platforma ta pentru alegeri informate.</p>
             <div className="mt-6">
                <h4 className="font-semibold text-white tracking-wider uppercase mb-2 text-sm">Contact</h4>
                <p className="text-gray-400 text-sm">Str. Exemplu Nr. 1, București, România</p>
                <p className="text-gray-400 text-sm">contact@ceamaibuna.ro</p>
            </div>
            <div className="flex space-x-4 mt-6">
                <SocialIcon href="#">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                </SocialIcon>
                <SocialIcon href="#">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                </SocialIcon>
                 <SocialIcon href="#">
                   <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363.416 2.427.465C9.53 2.013 9.884 2 12.315 2zM12 8.118c-2.146 0-3.882 1.736-3.882 3.882s1.736 3.882 3.882 3.882 3.882-1.736 3.882-3.882S14.146 8.118 12 8.118zM12 14.162c-1.205 0-2.179-.974-2.179-2.179s.974-2.179 2.179-2.179 2.179.974 2.179 2.179-.974 2.179-2.179 2.179zM18.812 6.162a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" clipRule="evenodd" /></svg>
                </SocialIcon>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white tracking-wider uppercase mb-4">Companie</h4>
            <button onClick={() => navigateTo('about')} className="block text-left mb-2 text-sm text-gray-400 hover:text-white">Despre Noi</button>
            <button onClick={() => navigateTo('careers')} className="block text-left mb-2 text-sm text-gray-400 hover:text-white">Cariere</button>
            <button onClick={() => navigateTo('press')} className="block text-left mb-2 text-sm text-gray-400 hover:text-white">Presă</button>
          </div>
          <div>
            <h4 className="font-semibold text-white tracking-wider uppercase mb-4">Legal</h4>
            <button onClick={() => navigateTo('privacy')} className="block text-left mb-2 text-sm text-gray-400 hover:text-white">Politică de Confidențialitate</button>
            <button onClick={() => navigateTo('terms')} className="block text-left mb-2 text-sm text-gray-400 hover:text-white">Termeni și Condiții</button>
          </div>
          <div>
            <h4 className="font-semibold text-white tracking-wider uppercase mb-4">Suport</h4>
            <button onClick={() => navigateTo('contact')} className="block text-left mb-2 text-sm text-gray-400 hover:text-white">Contact</button>
            <button onClick={() => navigateTo('faq')} className="block text-left mb-2 text-sm text-gray-400 hover:text-white">Centru de Ajutor (FAQ)</button>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-gray-700 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} CeAmaiBuna.ro. Toate drepturile rezervate.
        </div>
      </div>
    </footer>
  );
};

export default Footer;