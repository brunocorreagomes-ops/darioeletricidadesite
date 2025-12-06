import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Ricardo Mendes',
    role: 'Síndico Condomínio Jardins',
    content: 'A equipe do Dario foi extremamente profissional. A reforma do quadro de distribuição do prédio foi feita no prazo e com muita organização. Recomendo!',
    stars: 5,
  },
  {
    id: 2,
    name: 'Ana Paula Souza',
    role: 'Residencial',
    content: 'Precisava de uma instalação de urgência no meu chuveiro e tomadas. O atendimento foi rápido e o preço muito justo. O técnico explicou tudo o que estava fazendo.',
    stars: 5,
  },
  {
    id: 3,
    name: 'Indústria Metaltech',
    role: 'Gerente de Manutenção',
    content: 'Contratamos para a manutenção preventiva dos motores. Serviço técnico de alta qualidade, com laudos detalhados e total adequação à NR-10.',
    stars: 5,
  },
];

const Testimonials: React.FC = () => {
  return (
    <section className="bg-white py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-brand-primary font-bold tracking-wide uppercase text-sm mb-3">Depoimentos</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-brand-dark">O que nossos clientes dizem</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div key={item.id} className="bg-gray-50 p-8 rounded-2xl relative hover:shadow-lg transition-shadow duration-300">
              <Quote className="absolute top-6 right-6 h-8 w-8 text-brand-primary/20" />
              
              <div className="flex space-x-1 mb-6">
                {[...Array(item.stars)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <p className="text-gray-600 italic mb-6 leading-relaxed">"{item.content}"</p>

              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-brand-dark flex items-center justify-center text-white font-bold text-lg">
                  {item.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <h4 className="text-sm font-bold text-gray-900">{item.name}</h4>
                  <p className="text-xs text-brand-primary">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;