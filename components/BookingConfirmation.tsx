import React from 'react';
import { Appointment } from '../types';
import { CheckCircle2, Calendar, Clock, User, Phone, Home, ArrowRight } from 'lucide-react';

interface BookingConfirmationProps {
  appointment: Appointment | null;
  onHomeClick: () => void;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ appointment, onHomeClick }) => {
  if (!appointment) return null;

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Header / Success Banner */}
        <div className="bg-green-50 p-8 text-center border-b border-green-100">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6 animate-bounce-short">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Solicitação Enviada!</h2>
          <p className="text-gray-600">
            Recebemos seu pedido de agendamento. Nossa equipe entrará em contato em breve para confirmar.
          </p>
        </div>

        {/* Details Card */}
        <div className="p-8">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-6">Resumo do Pedido</h3>
          
          <div className="space-y-4">
            <div className="flex items-start p-4 bg-gray-50 rounded-xl">
              <User className="h-5 w-5 text-brand-primary mt-0.5 mr-3" />
              <div>
                <p className="text-xs text-gray-500">Cliente</p>
                <p className="font-semibold text-gray-900">{appointment.customerName}</p>
              </div>
            </div>

            <div className="flex items-start p-4 bg-gray-50 rounded-xl">
              <Phone className="h-5 w-5 text-brand-primary mt-0.5 mr-3" />
              <div>
                <p className="text-xs text-gray-500">Contato</p>
                <p className="font-semibold text-gray-900">{appointment.customerPhone}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1 flex items-start p-4 bg-gray-50 rounded-xl">
                <Calendar className="h-5 w-5 text-brand-primary mt-0.5 mr-3" />
                <div>
                  <p className="text-xs text-gray-500">Data</p>
                  <p className="font-semibold text-gray-900">
                    {new Date(appointment.date).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>

              <div className="flex-1 flex items-start p-4 bg-gray-50 rounded-xl">
                <Clock className="h-5 w-5 text-brand-primary mt-0.5 mr-3" />
                <div>
                  <p className="text-xs text-gray-500">Horário</p>
                  <p className="font-semibold text-gray-900">{appointment.time}</p>
                </div>
              </div>
            </div>

            <div className="flex items-start p-4 bg-gray-50 rounded-xl border border-brand-primary/10 bg-brand-primary/5">
              <Home className="h-5 w-5 text-brand-primary mt-0.5 mr-3" />
              <div>
                <p className="text-xs text-gray-500">Serviço Solicitado</p>
                <p className="font-bold text-brand-primary capitalize">
                  {appointment.serviceId === 'res' ? 'Residencial' : 
                   appointment.serviceId === 'ind' ? 'Industrial' :
                   appointment.serviceId === 'solar' ? 'Energia Solar' :
                   appointment.serviceId === 'proj' ? 'Projetos' : 'Orçamento'}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={onHomeClick}
              className="w-full flex justify-center items-center py-4 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-brand-dark hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-dark transition-all transform hover:scale-[1.02] shadow-lg"
            >
              Voltar ao Início <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;