import React, { useState } from 'react';
import { Appointment, AppointmentStatus } from '../types';
import { CheckCircle, XCircle, Calendar, Clock, Lock, LogOut } from 'lucide-react';

interface AdminDashboardProps {
  appointments: Appointment[];
  onUpdateStatus: (id: string, status: AppointmentStatus) => void;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ appointments, onUpdateStatus, onLogout }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin') { // Simple mock auth
      setIsAuthenticated(true);
    } else {
      alert('Senha incorreta');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-dark flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
           <div className="flex justify-center mb-6">
              <div className="bg-brand-primary p-3 rounded-full">
                  <Lock className="h-8 w-8 text-white" />
              </div>
           </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Acesso Restrito
          </h2>
          <p className="text-center text-gray-400 mt-2">Área administrativa Dario Eletricidade</p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Senha
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-dark hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
                >
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case AppointmentStatus.CONFIRMED:
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Confirmado</span>;
      case AppointmentStatus.CANCELLED:
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Cancelado</span>;
      case AppointmentStatus.COMPLETED:
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Concluído</span>;
      default:
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pendente</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Painel de Controle
            </h2>
            <p className="mt-1 text-sm text-gray-500">Gerencie seus agendamentos.</p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button
              onClick={() => {
                setIsAuthenticated(false);
                onLogout();
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none"
            >
              <LogOut className="h-4 w-4 mr-2" /> Sair
            </button>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Agendamentos Recentes</h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {appointments.length === 0 ? (
                <li className="px-4 py-10 text-center text-gray-500">Nenhum agendamento encontrado.</li>
            ) : (
                appointments.map((appointment) => (
                <li key={appointment.id}>
                    <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-brand-primary truncate">
                        {appointment.customerName}
                        </p>
                        <div className="ml-2 flex-shrink-0 flex">
                        {getStatusBadge(appointment.status)}
                        </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500 mr-6">
                            <span className="font-semibold mr-1">Serviço:</span> {appointment.serviceId}
                        </p>
                         <p className="flex items-center text-sm text-gray-500 mr-6">
                            <span className="font-semibold mr-1">Tel:</span> {appointment.customerPhone}
                        </p>
                        <p className="flex items-center text-sm text-gray-500 mt-2 sm:mt-0">
                            <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            {appointment.date}
                        </p>
                        <p className="flex items-center text-sm text-gray-500 mt-2 sm:mt-0 ml-4">
                             <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            {appointment.time}
                        </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm sm:mt-0 gap-2">
                        {appointment.status === AppointmentStatus.PENDING && (
                            <>
                            <button
                                onClick={() => onUpdateStatus(appointment.id, AppointmentStatus.CONFIRMED)}
                                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none"
                            >
                                <CheckCircle className="h-3 w-3 mr-1" /> Aprovar
                            </button>
                            <button
                                onClick={() => onUpdateStatus(appointment.id, AppointmentStatus.CANCELLED)}
                                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none"
                            >
                                <XCircle className="h-3 w-3 mr-1" /> Rejeitar
                            </button>
                            </>
                        )}
                        {appointment.status === AppointmentStatus.CONFIRMED && (
                             <button
                                onClick={() => onUpdateStatus(appointment.id, AppointmentStatus.COMPLETED)}
                                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none"
                            >
                                <CheckCircle className="h-3 w-3 mr-1" /> Concluir
                            </button>
                        )}
                        </div>
                    </div>
                    {appointment.notes && (
                        <div className="mt-2 text-sm text-gray-500 italic bg-gray-50 p-2 rounded">
                            "{appointment.notes}"
                        </div>
                    )}
                    </div>
                </li>
                ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;