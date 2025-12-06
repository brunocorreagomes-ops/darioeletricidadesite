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
    <div className="bg-gray-50 py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-brand-primary font-bold tracking-wide uppercase text-sm mb-3">Nossos Serviços</h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-dark mb-6">Soluções Corporativas e Industriais</h3>
          <p className="max-w-2xl mx-auto text-gray-500 text-lg md:text-xl">
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
                  bg-white rounded-2xl transition-all duration-300 overflow-hidden group flex flex-col hover:-translate-y-2 relative
                  ${gridSpanClass}
                  ${isHighlight 
                    ? 'border-2 border-brand-accent shadow-2xl shadow-brand-accent/20 z-10 ring-4 ring-orange-50 lg:scale-105 hover:scale-[1.02] hover:lg:scale-110' 
                    : 'border border-gray-100 shadow-xl hover:shadow-2xl hover:scale-[1.02]'
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
                <div className="p-6 sm:p-8 flex-1 flex flex-col">
                  <h4 className={`text-xl sm:text-2xl font-bold mb-4 transition-colors ${isHighlight ? 'text-brand-accent' : 'text-gray-900 group-hover:text-brand-primary'}`}>
                    {service.title}
                  </h4>
                  
                  <p className="text-base text-gray-