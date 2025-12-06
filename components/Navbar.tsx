import React, { useState } from 'react';
import { ViewState } from '../types';
import { Menu, X, Zap } from 'lucide-react';

interface NavbarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onChangeView }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'Início', value: 'home' as ViewState },
    { label: 'Serviços', value: 'services' as ViewState },
    { label: 'Administração', value: 'admin' as ViewState },
  ];

  return (
    <nav className="bg-brand-dark text-white sticky top-0 z-50 shadow-lg border-b border-gray-800" role="navigation" aria-label="Menu principal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          {/* Logo Area */}
          <div className="flex items-center cursor-pointer" onClick={() => onChangeView('home')} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onChangeView('home')} aria-label="Ir para página inicial">
             <div className="relative h-20 w-auto flex items-center py-2">
                <img 
                  src="https://i.postimg.cc/sxG9BRqJ/dario-eletricidade-QUADRADO-LOGO-FUNDO-TRANSPARENTE.png" 
                  alt="Dario Eletricidade Logo" 
                  className="h-full w-auto object-contain" 
                />
             </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => onChangeView(item.value)}
                  aria-current={currentView === item.value ? 'page' : undefined}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    currentView === item.value
                      ? 'text-brand-accent bg-white/5'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => onChangeView('booking')}
                className="bg-brand-accent hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent focus:ring-offset-brand-dark"
                aria-label="Pedir Orçamento Grátis"
              >
                <Zap className="h-5 w-5 fill-current" aria-hidden="true" /> Orçamento Grátis
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label="Abrir menu de navegação"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-brand-dark border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  onChangeView(item.value);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  currentView === item.value
                    ? 'text-brand-accent bg-gray-900'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                onChangeView('booking');
                setIsOpen(false);
              }}
              className="w-full flex justify-center items-center mt-4 bg-brand-accent hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md gap-2"
            >
              <Zap className="h-5 w-5 fill-current" aria-hidden="true" /> Pedir Orçamento Grátis
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;