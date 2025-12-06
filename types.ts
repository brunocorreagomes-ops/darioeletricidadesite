
export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: 'zap' | 'home' | 'factory' | 'sun' | 'dollar';
  priceRange: string;
}

export enum AppointmentStatus {
  PENDING = 'Pendente',
  CONFIRMED = 'Confirmado',
  COMPLETED = 'Concluído',
  CANCELLED = 'Cancelado'
}

export interface Appointment {
  id: string;
  customerName: string;
  customerPhone: string;
  serviceId: string;
  date: string;
  time: string;
  notes?: string;
  status: AppointmentStatus;
}

export type ViewState = 'home' | 'booking' | 'admin' | 'services' | 'confirmation';
