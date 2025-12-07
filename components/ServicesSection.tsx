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
    case 'home': return <Home className="h-10 w-10 text-white" aria-hidden="true" />;
    case 'factory': return <Factory className="h-10 w-10 text-white" aria-hidden="true" />;
    case 'sun': return <Sun className="h-10 w-10 text-white" aria-hidden="true" />;
    case 'dollar': return <DollarSign className="h-10 w-10 text-white" aria-hidden="true" />;
    default: return <FileCheck className="h-10 w-10 text-white" aria-hidden="true" />;
  }
};

const ServicesSection: React.FC<ServicesSectionProps> = ({ onBookService }) => {
  return (
    <div className="bg-gray-50 py-16 lg:py-24 px-4 sm:px-6 lg:px-8" aria-label="Nossos Serviços">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-brand-primary font-bold tracking-wide uppercase text-sm mb-3">Nossos Serviços</h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-dark mb-6">Soluções Corporativas e Industriais</h3>
          <p className="max-w-2xl mx-auto text-gray-600 text-lg md:text-xl">
            Especialistas em instalações elétricas, regularização técnica e manutenção para sua empresa.
          </p>
        </div>

        {/* 
            Responsive Grid:
            1 col on mobile
            2 cols on tablet (md) - Last item spans 2 cols
            3 cols on desktop (lg)
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {servicesList.map((service, index) => {
            const isHighlight = service.id === 'budget';
            // Make the last item span 2 columns on tablet devices (md) for better layout balance
            const gridSpanClass = index === 2 ? 'md:col-span-2 lg:col-span-1' : '';

            return (
              <div 
                key={service.id} 
                className={`
                  bg-white rounded-2xl transition-all duration-300 overflow-hidden group flex flex-col relative transform
                  ${gridSpanClass}
                  ${isHighlight 
                    ? 'border-2 border-brand-accent shadow-2xl shadow-brand-accent/20 z-10 ring-4 ring-orange-50 lg:scale-105 hover:scale-110' 
                    : 'border border-gray-100 shadow-xl hover:shadow-2xl hover:scale-105'
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
                    ? 'bg-gradient-to-br from-brand-accent to-orange-700' 
                    : 'bg-gradient-to-br from-brand-dark to-[#1e293b] group-hover:from-brand-primary group-hover:to-blue-700'
                  }
                `}>
                   {/* Decorative background effect */}
                   <div className="absolute bg-white/10 w-32 h-32 rounded-full -top-10 -right-10 scale-0 group-hover:scale-150 transition-transform duration-700 ease-out"></div>
                   <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                       {getIcon(service.iconName)}
                   </div>
                </div>

                {/* Content Section */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col">
                  <h4 className={`text-xl sm:text-2xl font-bold mb-4 transition-colors ${isHighlight ? 'text-brand-accent' : 'text-gray-900 group-hover:text-brand-primary'}`}>
                    {service.title}
                  </h4>
                  
                  <p className="text-base text-gray-700 mb-8 leading-relaxed flex-grow">
                    {service.description}
                  </p>
                  
                  <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-auto">
                     <div className="flex flex-col">
                        <span className="text-xs text-gray-500 uppercase font-semibold tracking-wider mb-1">Investimento</span>
                        <span className={`text-lg font-bold ${isHighlight ? 'text-brand-accent' : 'text-brand-dark'}`}>{service.priceRange}</span>
                     </div>
                     
                     <button 
                      onClick={() => onBookService(service.id)}
                      aria-label={`Agendar ${service.title}`}
                      className={`
                        w-full sm:w-auto px-5 py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2
                        ${isHighlight 
                          ? 'bg-brand-accent text-white hover:bg-orange-700 shadow-md shadow-orange-200 focus:ring-brand-accent' 
                          : 'bg-gray-100 hover:bg-brand-accent text-brand-dark hover:text-white focus:ring-brand-dark'
                        }
                      `}
                     >
                       Agendar <Zap className="h-4 w-4" aria-hidden="true" />
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