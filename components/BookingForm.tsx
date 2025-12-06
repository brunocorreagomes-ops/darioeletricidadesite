import React, { useState, useEffect } from 'react';
import { Appointment } from '../types';
import { Calendar, Clock, User, Phone, Home, Factory, Sun, Zap, DollarSign, CheckCircle2, AlertCircle } from 'lucide-react';

interface BookingFormProps {
  initialPhone?: string;
  onSubmit: (appointment: Omit<Appointment, 'id' | 'status'>) => void;
  onCancel: () => void;
}

// Service options configuration for the visual selector
// Updated to reflect the filtered services: Industrial, Laudos/CRT, and Budget
const serviceOptions = [
  { id: 'budget', label: 'Orçamento', icon: DollarSign },
  { id: 'ind', label: 'Industrial', icon: Factory },
  { id: 'proj', label: 'Laudos/CRT', icon: Zap },
];

const BookingForm: React.FC<BookingFormProps> = ({ onSubmit, onCancel, initialPhone = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    serviceId: 'budget', // Default to Budget for easier conversion
    date: '',
    time: '',
    notes: ''
  });

  const [errors, setErrors] = useState({
    phone: ''
  });

  // Effect to load initial phone if provided
  useEffect(() => {
    if (initialPhone) {
      setFormData(prev => ({ ...prev, phone: initialPhone }));
    }
  }, [initialPhone]);

  const validatePhone = (phone: string) => {
    // Remove non-digits
    const cleanPhone = phone.replace(/\D/g, '');
    // Check length (10 digits for landline, 11 for mobile in Brazil)
    if (cleanPhone.length < 10) {
      return 'Número de telefone inválido.';
    }
    return '';
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Masking logic: (XX) XXXXX-XXXX
    value = value.replace(/\D/g, '');
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
    value = value.replace(/(\d)(\d{4})$/, '$1-$2');
    
    // Limit length to typical format (15 chars)
    if (value.length > 15) value = value.slice(0, 15);

    const errorMsg = validatePhone(value);
    
    setFormData(prev => ({ ...prev, phone: value }));
    setErrors(prev => ({ ...prev, phone: value.length > 0 ? errorMsg : '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Final validation before submit
    const phoneError = validatePhone(formData.phone);
    if (phoneError) {
      setErrors(prev => ({ ...prev, phone: phoneError }));
      return;
    }

    onSubmit({
      customerName: formData.name,
      customerPhone: formData.phone,
      serviceId: formData.serviceId,
      date: formData.date,
      time: formData.time,
      notes: formData.notes
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceSelect = (id: string) => {
    setFormData(prev => ({ ...prev, serviceId: id }));
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-white p-6 sm:p-10 rounded-2xl shadow-xl border border-gray-200">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-brand-dark">
            Solicitar Orçamento / Agendar
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Preencha os dados abaixo e entraremos em contato rapidamente.
          </p>
        </div>

        <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
          
          {/* Visual Service Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">O que você precisa?</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {serviceOptions.map((option) => {
                const Icon = option.icon;
                const isSelected = formData.serviceId === option.id;
                // Highlight budget option specifically if selected
                const isBudget = option.id === 'budget';
                
                return (
                  <div
                    key={option.id}
                    onClick={() => handleServiceSelect(option.id)}
                    className={`cursor-pointer relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${
                      isSelected
                        ? 'border-brand-primary bg-sky-50 text-brand-primary shadow-sm scale-105'
                        : isBudget 
                           ? 'border-brand-accent/50 bg-orange-50 text-gray-600 hover:border-brand-accent'
                           : 'border-gray-100 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2">
                        <CheckCircle2 className="h-4 w-4 text-brand-primary" />
                      </div>
                    )}
                    <Icon className={`h-8 w-8 mb-2 ${isSelected ? 'text-brand-primary' : isBudget ? 'text-brand-accent' : 'text-gray-400'}`} />
                    <span className={`text-sm font-bold ${isBudget && !isSelected ? 'text-brand-accent' : ''}`}>{option.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm transition-shadow"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Phone with Validation */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefone / WhatsApp</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className={`appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm transition-shadow ${
                    errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300'
                  }`}
                  placeholder="(00) 00000-0000"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                />
                {errors.phone && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.phone && (
                <p className="mt-1 text-xs text-red-600 font-medium">{errors.phone}</p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Date */}
              <div className="w-full sm:w-1/2">
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Data Preferida</label>
                <div className="relative">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    required
                    className="appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Time */}
              <div className="w-full sm:w-1/2">
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">Horário</label>
                 <div className="relative">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="time"
                    name="time"
                    type="time"
                    required
                    className="appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
                    value={formData.time}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Notes */}
             <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Observações (Opcional)</label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
                placeholder="Detalhes sobre o problema ou endereço específico..."
                value={formData.notes}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onCancel}
              className="w-full sm:w-auto px-6 py-3 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!!errors.phone || !formData.phone}
              className={`w-full sm:w-auto flex-1 flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary shadow-lg transition-all ${
                !!errors.phone || !formData.phone
                  ? 'bg-gray-400 cursor-not-allowed shadow-none'
                  : 'bg-brand-primary hover:bg-sky-500 shadow-sky-500/30 hover:-translate-y-0.5'
              }`}
            >
              Confirmar Solicitação
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;