import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import BookingForm from './components/BookingForm';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import ChatAssistant from './components/ChatAssistant';
import Testimonials from './components/Testimonials';
import BookingConfirmation from './components/BookingConfirmation';
import { ViewState, Appointment, AppointmentStatus } from './types';
import { MessageCircle } from 'lucide-react';

// Initial Mock Data
const initialAppointments: Appointment[] = [
  {
    id: '1',
    customerName: 'Carlos Silva',
    customerPhone: '(11) 98765-4321',
    serviceId: 'Residencial',
    date: '2023-11-20',
    time: '14:00',
    status: AppointmentStatus.PENDING,
    notes: 'Chuveiro queimado'
  },
  {
    id: '2',
    customerName: 'Industria Tech Ltda',
    customerPhone: '(11) 3333-4444',
    serviceId: 'Industrial',
    date: '2023-11-21',
    time: '09:00',
    status: AppointmentStatus.CONFIRMED,
    notes: 'Manutenção preventiva quadro A'
  }
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [lastAppointment, setLastAppointment] = useState<Appointment | null>(null);
  const [prefilledPhone, setPrefilledPhone] = useState<string>('');

  // Auto-scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const handleBookService = (serviceId?: string) => {
    setPrefilledPhone(''); // Clear prefilled if coming from generic book button
    setCurrentView('booking');
    console.log(`Booking started for ${serviceId || 'general'}`);
  };

  const handleQuickContact = (phone: string) => {
    setPrefilledPhone(phone);
    setCurrentView('booking');
  };

  const handleBookingSubmit = (newBooking: Omit<Appointment, 'id' | 'status'>) => {
    const appointment: Appointment = {
      ...newBooking,
      id: Math.random().toString(36).substr(2, 9),
      status: AppointmentStatus.PENDING
    };
    setAppointments([...appointments, appointment]);
    setLastAppointment(appointment);
    setCurrentView('confirmation');
  };

  const handleStatusUpdate = (id: string, status: AppointmentStatus) => {
    setAppointments(appointments.map(app => 
      app.id === id ? { ...app, status } : app
    ));
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <>
            <Hero onBookClick={() => handleBookService()} onQuickContact={handleQuickContact} />
            <ServicesSection onBookService={handleBookService} />
            <Testimonials />
          </>
        );
      case 'services':
        return <ServicesSection onBookService={handleBookService} />;
      case 'booking':
        return (
          <BookingForm 
            initialPhone={prefilledPhone}
            onSubmit={handleBookingSubmit} 
            onCancel={() => setCurrentView('home')} 
          />
        );
      case 'confirmation':
        return (
          <BookingConfirmation 
            appointment={lastAppointment} 
            onHomeClick={() => setCurrentView('home')} 
          />
        );
      case 'admin':
        return (
          <AdminDashboard 
            appointments={appointments} 
            onUpdateStatus={handleStatusUpdate}
            onLogout={() => setCurrentView('home')}
          />
        );
      default:
        return <Hero onBookClick={() => handleBookService()} onQuickContact={handleQuickContact} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hide Navbar on confirmation screen for focus, show on others unless admin */}
      {currentView !== 'admin' && currentView !== 'confirmation' && (
        <Navbar currentView={currentView} onChangeView={setCurrentView} />
      )}
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      {/* Floating WhatsApp Button - Hide on Admin and Confirmation */}
      {currentView !== 'admin' && currentView !== 'confirmation' && (
        <a 
          href="https://wa.me/5519997869520" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-6 left-6 z-50 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center border-2 border-white"
          aria-label="Falar no WhatsApp"
        >
          <MessageCircle className="h-8 w-8" />
        </a>
      )}

      {currentView !== 'admin' && <ChatAssistant />}

      {currentView !== 'admin' && currentView !== 'confirmation' && <Footer />}
    </div>
  );
};

export default App;