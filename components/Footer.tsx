import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center mb-6">
                <img 
                  src="https://i.postimg.cc/sxG9BRqJ/dario-eletricidade-QUADRADO-LOGO-FUNDO-TRANSPARENTE.png" 
                  alt="Dario Eletricidade" 
                  className="h-16 w-auto" // Slightly increased size for better visibility
                />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Soluções elétricas com a energia e a competência que seu negócio exige. Segurança industrial e conforto residencial.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider mb-4">Serviços</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-brand-accent transition-colors">Residencial</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Industrial</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Predial</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Energia Solar</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider mb-4">Contato</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-brand-accent" />
                (11) 99999-9999
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-brand-accent" />
                contato@darioeletricidade.com.br
              </li>
              <li className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-brand-accent" />
                São Paulo, SP
              </li>
            </ul>
          </div>

          <div>
             <h4 className="text-white font-semibold uppercase tracking-wider mb-4">Newsletter</h4>
             <p className="text-xs mb-4">Receba dicas de economia e segurança.</p>
             <div className="flex">
                 <input type="email" placeholder="Seu e-mail" className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-l text-sm focus:outline-none focus:border-brand-accent text-white" />
                 <button className="bg-brand-accent px-3 py-2 rounded-r text-white font-bold text-sm hover:bg-orange-600">OK</button>
             </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Dario Eletricidade. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;