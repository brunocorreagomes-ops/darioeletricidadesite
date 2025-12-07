import React, { useState, useEffect } from 'react';
import { Appointment } from '../types';
import { Calendar, Clock, User, Phone, Factory, Zap, DollarSign, CheckCircle2, AlertCircle, ArrowRight, Home } from 'lucide-react';
import BookingConfirmation from './BookingConfirmation';

interface BookingFormProps {
  preselectedService?: string;
  initialPhone?: string;
  onSubmit: (appointment: Omit<Appointment, 'id' | 'status'>) => void;
}

// Service options
const serviceOptions = [
  { id: 'budget', label: 'Orçamento', icon: DollarSign },
  { id: 'ind', label: 'Industrial', icon: Factory },
  { id: 'proj', label: 'Laudos/CRT', icon: Zap },
];

const BookingForm: React.FC<BookingFormProps> = ({ onSubmit, initialPhone = '', preselectedService = 'budget' }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastAppointmentData, setLastAppointmentData] = useState<Appointment | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceId: preselectedService,
    date: '',
    time: '',
    notes: ''
  });

  const [errors, setErrors] = useState({
    phone: ''
  });

  // Update form if preselectedService or initialPhone prop changes
  useEffect(() => {
    setFormData(prev => ({ 
      ...prev, 
      serviceId: preselectedService,
      phone: initialPhone || prev.phone
    }));
  }, [preselectedService, initialPhone]);

  const validatePhone = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      return 'Número de telefone inválido.';
    }
    return '';
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/\D/g, '');
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
    value = value.replace(/(\d)(\d{4})$/, '$1-$2');
    if (value.length > 15) value = value.slice(0, 15);

    const errorMsg = validatePhone(value);
    
    setFormData(prev => ({ ...prev, phone: value }));
    setErrors(prev => ({ ...prev, phone: value.length > 0 ? errorMsg : '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const phoneError = validatePhone(formData.phone);
    if (phoneError) {
      setErrors(prev => ({ ...prev, phone: phoneError }));
      return;
    }

    const appointmentData: Omit<Appointment, 'id' | 'status'> = {
      customerName: formData.name,
      customerPhone: formData.phone,
      serviceId: formData.serviceId,
      date: formData.date,
      time: formData.time,
      notes: formData.notes
    };

    onSubmit(appointmentData);
    
    // Create local appointment object for the confirmation view
    const localAppointment: Appointment = {
        ...appointmentData,
        id: 'temp-id',
        status: 'Pendente' as any
    };
    
    setLastAppointmentData(localAppointment);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceSelect = (id: string) => {
    setFormData(prev => ({ ...prev, serviceId: id }));
  };

  const handleNewBooking = () => {
    setIsSubmitted(false);
    setFormData({
        name: '',
        phone: '',
        serviceId: 'budget',
        date: '',
        time: '',
        notes: ''
    });
  };

  if (isSubmitted && lastAppointmentData) {
      return (
          <section className="bg-gray-50 py-12 px-4">
              <BookingConfirmation appointment={lastAppointmentData} onHomeClick={handleNewBooking} />
              <div className="text-center mt-6">
                <button onClick={handleNewBooking} className="text-brand-primary underline text-sm hover:text-brand-dark">Fazer novo agendamento</button>
              </div>
          </section>
      )
  }

  return (
    <section id="contact" className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
            
            {/* Sidebar / Info Panel */}
            <div className="bg-brand-dark text-white p-10 md:w-1/3 flex flex-col justify-between relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <Zap className="w-64 h-64 -translate-y-10 -translate-x-10 text-white" />
                 </div>
                 
                 <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-6">Contrate Agora</h3>
                    <p className="text-gray-300 mb-8 text-sm leading-relaxed">
                        Preencha o formulário e nossa equipe técnica entrará em contato para confirmar os detalhes do seu atendimento.
                    </p>
                    
                    <ul className="space-y-4 text-sm">
                        <li className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center flex-shrink-0">
                                <Phone className="h-4 w-4" />
                            </div>
                            <span>(19) 99786-9520</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center flex-shrink-0">
                                <Clock className="h-4 w-4" />
                            </div>
                            <span>Seg - Sex: 08h às 18h</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center flex-shrink-0">
                                <CheckCircle2 className="h-4 w-4" />
                            </div>
                            <span>Atendimento NR-10</span>
                        </li>
                    </ul>
                 </div>
                 
                 <div className="relative z-10 mt-10">
                     <p className="text-xs text-gray-400">Dario Eletricidade &copy;</p>
                 </div>
            </div>

            {/* Form Area */}
            <div className="p-8 md:p-10 md:w-2/3">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Detalhes do Serviço</h2>
                
                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                
                {/* Visual Service Selection */}
                <div>
                    <span className="block text-sm font-medium text-gray-700 mb-3">Selecione o Tipo de Serviço</span>
                    <div className="grid grid-cols-3 gap-3">
                    {serviceOptions.map((option) => {
                        const Icon = option.icon;
                        const isSelected = formData.serviceId === option.id;
                        return (
                        <button
                            type="button"
                            key={option.id}
                            onClick={() => handleServiceSelect(option.id)}
                            className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                            isSelected
                                ? 'border-brand-primary bg-sky-50 text-brand-primary'
                                : 'border-gray-100 text-gray-500 hover:border-gray-200'
                            }`}
                        >
                            <Icon className={`h-6 w-6 mb-1 ${isSelected ? 'text-brand-primary' : 'text-gray-400'}`} />
                            <span className="text-xs font-bold">{option.label}</span>
                        </button>
                        );
                    })}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-1 md:col-span-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all"
                            placeholder="Seu nome"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefone / WhatsApp</label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            required
                            className={`w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-brand-primary outline-none transition-all ${errors.phone ? 'border-red-300' : 'border-gray-300'}`}
                            placeholder="(00) 00000-0000"
                            value={formData.phone}
                            onChange={handlePhoneChange}
                        />
                         {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                        <input
                            id="date"
                            name="date"
                            type="date"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-brand-primary outline-none"
                            value={formData.date}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Horário</label>
                        <input
                            id="time"
                            name="time"
                            type="time"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-brand-primary outline-none"
                            value={formData.time}
                            onChange={handleChange}
                        />
                    </div>
                    
                     <div className="col-span-1 md:col-span-2">
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Observações</label>
                        <textarea
                            id="notes"
                            name="notes"
                            rows={2}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-brand-primary outline-none"
                            placeholder="Descreva brevemente o problema..."
                            value={formData.notes}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={!!errors.phone || !formData.phone}
                    className={`w-full py-4 px-6 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] ${
                        !!errors.phone || !formData.phone
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-brand-primary hover:bg-sky-600'
                    }`}
                >
                    Confirmar Agendamento <ArrowRight className="h-5 w-5" />
                </button>

                </form>
            </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;