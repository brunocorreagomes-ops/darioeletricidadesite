import React, { useState } from 'react';
import { ShieldCheck, Clock, Award, ArrowRight, MessageCircle } from 'lucide-react';

interface HeroProps {
  onQuickContact: (phone: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onQuickContact }) => {
  const [quickPhone, setQuickPhone] = useState('');

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickPhone) {
      onQuickContact(quickPhone);
      // Scroll to contact form
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-brand-dark overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
             <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-brand-primary blur-[100px]"></div>
             <div className="absolute bottom-[10%] -left-[10%] w-[400px] h-[400px] rounded-full bg-brand-accent blur-[120px]"></div>
        </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col-reverse lg:flex-row items-center gap-12">
        
        {/* Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-brand-primary/20 border border-brand-primary/30 animate-fade-in">
            <span className="text-brand-accent font-bold tracking-wider text-xs uppercase">Eletricidade Industrial & Residencial</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Problemas elétricos? <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-yellow-500">
              Resolvemos agora.
            </span>
          </h1>
          <p className="mt-4 max-w-lg mx-auto lg:mx-0 text-xl text-gray-300 mb-8 leading-relaxed">
            Solicite um orçamento rápido e sem compromisso. Atendimento de emergência e projetos completos com segurança total.
          </p>
          
          {/* Quick Contact Input Box */}
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 max-w-lg mx-auto lg:mx-0 shadow-2xl mb-8">
             <form onSubmit={handleQuickSubmit} className="flex flex-col sm:flex-row gap-4 items-center">
                <input 
                  type="tel" 
                  placeholder="Seu WhatsApp / Telefone"
                  value={quickPhone}
                  onChange={(e) => setQuickPhone(e.target.value)}
                  className="w-full sm:flex-1 bg-brand-dark/50 border border-gray-600 text-white placeholder-gray-400 rounded-xl px-4 py-4 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all text-lg"
                />
                
                {/* Enhanced Button with Glow/Pulse */}
                <div className="relative w-full sm:w-auto group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-brand-accent to-orange-400 rounded-xl blur opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                    <button 
                      type="submit"
                      className="relative w-full sm:w-auto bg-gradient-to-r from-brand-accent to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-extrabold py-4 px-8 rounded-xl transition-all shadow-xl shadow-orange-900/20 whitespace-nowrap flex items-center justify-center gap-2 text-lg transform group-hover:scale-[1.02]"
                    >
                      Pedir Orçamento <ArrowRight className="h-5 w-5" />
                    </button>
                </div>
             </form>
             <p className="text-xs text-gray-400 mt-2 ml-2 text-center sm:text-left">Responderemos em até 30 minutos.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a 
              href="https://wa.me/5519997869520" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold rounded-xl shadow-lg shadow-green-900/20 transition-all transform hover:-translate-y-1 text-lg flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <MessageCircle className="h-5 w-5" /> Falar no WhatsApp
            </a>
            <a 
              href="#services"
              className="px-8 py-4 bg-transparent border-2 border-gray-600 hover:border-white text-white font-semibold rounded-xl transition-colors w-full sm:w-auto text-center flex items-center justify-center"
            >
              Ver Todos Serviços
            </a>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-4 border-t border-gray-800 pt-8">
            <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center text-brand-accent mb-2">
                    <ShieldCheck className="h-5 w-5 mr-2" />
                    <span className="font-bold">NR-10</span>
                </div>
                <span className="text-sm text-gray-400">Total Segurança</span>
            </div>
            <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center text-brand-accent mb-2">
                    <Clock className="h-5 w-5 mr-2" />
                    <span className="font-bold">Rápido</span>
                </div>
                <span className="text-sm text-gray-400">Atendimento Ágil</span>
            </div>
             <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center text-brand-accent mb-2">
                    <Award className="h-5 w-5 mr-2" />
                    <span className="font-bold">Expert</span>
                </div>
                <span className="text-sm text-gray-400">Qualidade Garantida</span>
            </div>
          </div>
        </div>

        {/* Mascot / Logo Hero Image */}
        <div className="w-full lg:w-1/2 flex justify-center relative">
          <div className="relative z-10 w-full max-w-[500px] aspect-square flex items-center justify-center">
            {/* Glowing effect behind the mascot */}
            <div className="absolute inset-0 bg-brand-primary/30 blur-[80px] rounded-full"></div>
            
            <img 
              src="https://i.postimg.cc/sxG9BRqJ/dario-eletricidade-QUADRADO-LOGO-FUNDO-TRANSPARENTE.png" 
              alt="Mascote Dario Eletricista" 
              className="relative z-10 w-full h-full object-contain drop-shadow-2xl transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;