import React from 'react';
import { Service } from '../types';
import { Zap, Home, Factory, Sun, Wrench, FileCheck, DollarSign } from 'lucide-react';

interface ServicesSectionProps {
  onBookService: (serviceId: string) => void;
}

// Updated list: Removed Residential and Solar. Renamed Projects to include CRT context.
const servicesList: Service[] = [
  {
    id: 'ind',
    title: 'Manutenção Industrial',
    description: 'Manutenção preventiva e corretiva em motores e painéis de comando.',
    iconName: 'factory',
    priceRange: 'Sob orçamento'
  },
  {
    id: 'proj',
    title: 'Laudos, CRT e Projetos',
    description: 'Emissão de ART, CRT, laudos técnicos detalhados e projetos elétricos conforme normas vigentes (NR-10).',
    iconName: 'zap',
    priceRange: 'A partir de R$ 500,00'
  },
  {
    id: 'budget',
    title: 'Orçamento Geral',
    description: 'Avaliação técnica presencial e emissão de cotações detalhadas para execução de serviços específicos.',
    iconName: 'dollar',
    priceRange: 'Visita técnica a combinar'
  },
];

const getIcon = (name: string) => {
  switch (name) {
    case 'home': return <Home className="h-10 w-10 text-white" />;
    case 'factory': return <Factory className="h-10 w-10 text-white" />;
    case 'sun': return <Sun className="h-10 w-10 text-white" />;
    case 'dollar': return <DollarSign className="h-10 w-10 text-white" />;
    default: return <FileCheck className="h-10 w-10 text-white" />;
  }
};

const ServicesSection: React.FC<ServicesSectionProps> = ({ onBookService }) => {
  return (
    <div className="bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-brand-primary font-bold tracking-wide uppercase text-sm mb-3">Nossos Serviços</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-brand-dark mb-6">Soluções Corporativas e Industriais</h3>
          <p className="max-w-2xl mx-auto text-gray-500 text-xl">
            Especialistas em instalações elétricas, regularização técnica e manutenção para sua empresa.
          </p>
        </div>

        {/* Centered Grid with fewer items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {servicesList.map((service) => {
            const isHighlight = service.id === 'budget';
            return (
              <div 
                key={service.id} 
                className={`
                  bg-white rounded-2xl transition-all duration-300 overflow-hidden group flex flex-col hover:-translate-y-2 relative
                  ${isHighlight 
                    ? 'border-2 border-brand-accent shadow-2xl shadow-brand-accent/20 md:scale-105 z-10 ring-4 ring-orange-50' 
                    : 'border border-gray-100 shadow-xl hover:shadow-2xl'
                  }
                `}
              >
                {isHighlight && (
                  <div className="absolute top-0 right-0 bg-brand-accent text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl z-20 uppercase tracking-wider shadow-sm">
                    Recomendado
                  </div>
                )}

                {/* Icon Section */}
                <div className={`
                  p-8 flex justify-center items-center transition-all duration-500 relative overflow-hidden h-40
                  ${isHighlight 
                    ? 'bg-gradient-to-br from-brand-accent to-orange-600' 
                    : 'bg-gradient-to-br from-brand-dark to-[#1e293b] group-hover:from-brand-primary group-hover:to-blue-600'
                  }
                `}>
                   {/* Decorative background effect */}
                   <div className="absolute bg-white/10 w-32 h-32 rounded-full -top-10 -right-10 scale-0 group-hover:scale-150 transition-transform duration-700 ease-out"></div>
                   <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                       {getIcon(service.iconName)}
                   </div>
                </div>

                {/* Content Section */}
                <div className="p-8 flex-1 flex flex-col">
                  <h4 className={`text-2xl font-bold mb-4 transition-colors ${isHighlight ? 'text-brand-accent' : 'text-gray-900 group-hover:text-brand-primary'}`}>
                    {service.title}
                  </h4>
                  
                  <p className="text-base text-gray-600 mb-8 leading-relaxed flex-grow">
                    {service.description}
                  </p>
                  
                  <div className="pt-6 border-t border-gray-100 flex items-center justify-between mt-auto">
                     <div className="flex flex-col">
                        <span className="text-xs text-gray-400 uppercase font-semibold tracking-wider mb-1">Investimento</span>
                        <span className={`text-lg font-bold ${isHighlight ? 'text-brand-accent' : 'text-brand-dark'}`}>{service.priceRange}</span>
                     </div>
                     
                     <button 
                      onClick={() => onBookService(service.id)}
                      className={`
                        px-5 py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-2 group-hover:shadow-lg
                        ${isHighlight 
                          ? 'bg-brand-accent text-white hover:bg-orange-600 shadow-md shadow-orange-200' 
                          : 'bg-gray-100 hover:bg-brand-accent text-brand-dark hover:text-white'
                        }
                      `}
                     >
                       Agendar <Zap className="h-4 w-4" />
                     </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;