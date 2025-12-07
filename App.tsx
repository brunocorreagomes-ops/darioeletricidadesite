import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ServicesSection from './components/ServicesSection';
import BookingForm from './components/BookingForm';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import ChatAssistant from './components/ChatAssistant';
import Testimonials from './components/Testimonials';
import { Appointment, AppointmentStatus } from './types';
import { MessageCircle, ArrowLeft } from 'lucide-react';

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
  // State mainly for Admin and Data persistence, not for View Navigation
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  
  // State to pass data between Hero/Services and the Contact Form section
  const [prefilledPhone, setPrefilledPhone] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('budget');

  const handleBookService = (serviceId: string) => {
    setSelectedService(serviceId);
    setPrefilledPhone(''); // Clear generic phone if specific service selected
    
    // Smooth scroll to contact section
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleQuickContact = (phone: string) => {
    setPrefilledPhone(phone);
    setSelectedService('budget'); // Default to budget for quick contact
  };

  const handleBookingSubmit = (newBooking: Omit<Appointment, 'id' | 'status'>) => {
    const appointment: Appointment = {
      ...newBooking,
      id: Math.random().toString(36).substr(2, 9),
      status: AppointmentStatus.PENDING
    };
    setAppointments([...appointments, appointment]);
    // Note: The success UI is handled inside BookingForm component
  };

  const handleStatusUpdate = (id: string, status: AppointmentStatus) => {
    setAppointments(appointments.map(app => 
      app.id === id ? { ...app, status } : app
    ));
  };

  // If Admin is Open, show Admin Dashboard overlay
  if (isAdminOpen) {
    return (
      <div className="relative min-h-screen bg-gray-100">
         <button 
           onClick={() => setIsAdminOpen(false)}
           className="absolute top-4 right-4 z-50 bg-white px-4 py-2 rounded-lg shadow text-sm font-bold text-gray-700 hover:bg-gray-50 flex items-center"
         >
           <ArrowLeft className="h-4 w-4 mr-2" /> Voltar ao Site
         </button>
         <AdminDashboard 
            appointments={appointments} 
            onUpdateStatus={handleStatusUpdate}
            onLogout={() => setIsAdminOpen(false)}
          />
      </div>
    );
  }

  // Standard Landing Page Layout
  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-900">
      <Navbar />
      
      <main className="flex-grow">
        <section id="home">
          <Hero onQuickContact={handleQuickContact} />
        </section>

        <section id="services">
          <ServicesSection onBookService={handleBookService} />
        </section>

        <section id="testimonials">
          <Testimonials />
        </section>

        {/* Contact section is now embedded directly in the page flow */}
        <BookingForm 
          preselectedService={selectedService}
          initialPhone={prefilledPhone}
          onSubmit={handleBookingSubmit}
        />
      </main>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/5519997869520" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-40 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center border-2 border-white"
        aria-label="Falar no WhatsApp"
      >
        <MessageCircle className="h-8 w-8" />
      </a>

      <ChatAssistant />

      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />
    </div>
  );
};

export default App;