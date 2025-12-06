import React, { useState } from 'react';
import { Appointment, AppointmentStatus } from '../types';
import { 
  CheckCircle, XCircle, Calendar, Clock, Lock, LogOut, 
  LayoutDashboard, List, Settings, Search, User, FileText 
} from 'lucide-react';

interface AdminDashboardProps {
  appointments: Appointment[];
  onUpdateStatus: (id: string, status: AppointmentStatus) => void;
  onLogout: () => void;
}

type AdminTab = 'appointments' | 'services' | 'settings';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ appointments, onUpdateStatus, onLogout }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('appointments');
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'dariogomes2525@@') {
      setIsAuthenticated(true);
    } else {
      alert('Senha incorreta');
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-dark flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
           <div className="flex justify-center mb-6">
              <div className="bg-brand-primary p-3 rounded-full">
                  <Lock className="h-8 w-8 text-white" aria-hidden="true" />
              </div>
           </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Acesso Restrito
          </h2>
          <p className="text-center text-gray-300 mt-2">Área administrativa Dario Eletricidade</p>
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
                    aria-label="Senha de administrador"
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

  const filteredAppointments = appointments.filter(app => 
    app.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.serviceId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'services':
        return (
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Gerenciar Serviços Ativos</h3>
            <div className="border border-gray-200 rounded-md overflow-hidden">
               <table className="min-w-full divide-y divide-gray-200" aria-label="Tabela de serviços">
                 <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome do Serviço</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                 </thead>
                 <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Manutenção Industrial</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">Ativo</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-primary cursor-pointer hover:underline">Editar</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Laudos e CRT</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">Ativo</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-primary cursor-pointer hover:underline">Editar</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Orçamento</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">Ativo</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-primary cursor-pointer hover:underline">Editar</td>
                    </tr>
                 </tbody>
               </table>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">Configurações da Conta</h3>
            <form className="space-y-4 max-w-lg">
               <div>
                  <label htmlFor="admin-email" className="block text-sm font-medium text-gray-700">Email Administrativo</label>
                  <input id="admin-email" type="email" defaultValue="admin@darioeletricidade.com.br" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm" />
               </div>
               <div>
                  <label htmlFor="admin-new-pass" className="block text-sm font-medium text-gray-700">Alterar Senha</label>
                  <input id="admin-new-pass" type="password" placeholder="Nova senha" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm" />
               </div>
               <div className="flex items-center">
                  <input id="notif" type="checkbox" className="h-4 w-4 text-brand-primary focus:ring-brand-primary border-gray-300 rounded" defaultChecked />
                  <label htmlFor="notif" className="ml-2 block text-sm text-gray-900">Receber notificações por email</label>
               </div>
               <button type="button" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-dark hover:bg-gray-800 focus:outline-none">
                 Salvar Alterações
               </button>
            </form>
          </div>
        );
      case 'appointments':
      default:
        return (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Lista de Agendamentos</h3>
              <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" aria-hidden="true" />
                 </div>
                 <input 
                    type="text" 
                    placeholder="Buscar cliente..." 
                    aria-label="Buscar agendamentos"
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-brand-primary focus:border-brand-primary"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                 />
              </div>
            </div>
            <ul className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
              {filteredAppointments.length === 0 ? (
                  <li className="px-4 py-10 text-center text-gray-500">Nenhum agendamento encontrado.</li>
              ) : (
                  filteredAppointments.map((appointment) => (
                  <li key={appointment.id}>
                      <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                          <p className="text-sm font-bold text-brand-dark flex items-center">
                             <User className="h-4 w-4 mr-2 text-gray-400" aria-hidden="true" />
                             {appointment.customerName}
                          </p>
                          <div className="ml-2 flex-shrink-0 flex">
                          {getStatusBadge(appointment.status)}
                          </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex flex-col sm:flex-row sm:items-center text-sm text-gray-600">
                             <p className="flex items-center mr-6 mb-2 sm:mb-0">
                                <span className="font-semibold mr-1 text-gray-800">Serviço:</span> {appointment.serviceId}
                             </p>
                             <p className="flex items-center mr-6 mb-2 sm:mb-0">
                                <span className="font-semibold mr-1 text-gray-800">Tel:</span> {appointment.customerPhone}
                             </p>
                             <div className="flex items-center gap-4">
                                <p className="flex items-center">
                                    <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                    {appointment.date}
                                </p>
                                <p className="flex items-center">
                                    <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                    {appointment.time}
                                </p>
                             </div>
                          </div>
                      </div>
                      
                      {appointment.notes && (
                        <div className="mt-3 text-sm text-gray-700 bg-yellow-50 p-3 rounded-md border border-yellow-200">
                             <span className="font-semibold text-yellow-900">Nota:</span> {appointment.notes}
                        </div>
                      )}

                      <div className="mt-4 flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                          {appointment.status === AppointmentStatus.PENDING && (
                              <>
                              <button
                                  onClick={() => onUpdateStatus(appointment.id, AppointmentStatus.CONFIRMED)}
                                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-green-800 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                                  aria-label={`Aprovar agendamento de ${appointment.customerName}`}
                              >
                                  <CheckCircle className="h-3 w-3 mr-1" /> Aprovar
                              </button>
                              <button
                                  onClick={() => onUpdateStatus(appointment.id, AppointmentStatus.CANCELLED)}
                                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-red-800 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                                  aria-label={`Rejeitar agendamento de ${appointment.customerName}`}
                              >
                                  <XCircle className="h-3 w-3 mr-1" /> Rejeitar
                              </button>
                              </>
                          )}
                          {appointment.status === AppointmentStatus.CONFIRMED && (
                              <button
                                  onClick={() => onUpdateStatus(appointment.id, AppointmentStatus.COMPLETED)}
                                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded text-blue-800 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                  aria-label={`Concluir agendamento de ${appointment.customerName}`}
                              >
                                  <CheckCircle className="h-3 w-3 mr-1" /> Concluir
                              </button>
                          )}
                      </div>
                      </div>
                  </li>
                  ))
              )}
            </ul>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-brand-dark text-white flex flex-col shadow-xl z-20 hidden md:flex">
        <div className="h-24 flex items-center px-6 border-b border-gray-800">
           <span className="font-bold text-xl tracking-wider text-white">Dario<span className="text-brand-accent">Admin</span></span>
        </div>
        
        <nav className="flex-1 py-6 px-3 space-y-1">
          <button
            onClick={() => setActiveTab('appointments')}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'appointments' ? 'bg-brand-primary text-white shadow-md' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <LayoutDashboard className="mr-3 h-5 w-5" aria-hidden="true" />
            Agendamentos
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'services' ? 'bg-brand-primary text-white shadow-md' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <List className="mr-3 h-5 w-5" aria-hidden="true" />
            Serviços
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'settings' ? 'bg-brand-primary text-white shadow-md' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <Settings className="mr-3 h-5 w-5" aria-hidden="true" />
            Configurações
          </button>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={() => {
                setIsAuthenticated(false);
                onLogout();
            }}
            className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-md transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5" aria-hidden="true" />
            Sair do Sistema
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6 md:hidden">
            <span className="font-bold text-lg text-brand-dark">Painel Administrativo</span>
            <button onClick={onLogout} className="text-gray-500 hover:text-red-600" aria-label="Sair">
               <LogOut className="h-6 w-6" />
            </button>
        </header>

        {/* Mobile Nav Tabs */}
        <div className="md:hidden flex border-b border-gray-200 bg-white overflow-x-auto">
            <button 
              onClick={() => setActiveTab('appointments')}
              className={`flex-1 py-3 text-sm font-medium border-b-2 ${activeTab === 'appointments' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-gray-500'}`}
            >
              Agendamentos
            </button>
            <button 
              onClick={() => setActiveTab('services')}
              className={`flex-1 py-3 text-sm font-medium border-b-2 ${activeTab === 'services' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-gray-500'}`}
            >
              Serviços
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`flex-1 py-3 text-sm font-medium border-b-2 ${activeTab === 'settings' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-gray-500'}`}
            >
              Config
            </button>
        </div>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
           <div className="max-w-7xl mx-auto">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 capitalize">
                  {activeTab === 'appointments' ? 'Gestão de Agendamentos' : activeTab === 'services' ? 'Catálogo de Serviços' : 'Configurações'}
                </h1>
                <p className="text-sm text-gray-600">
                   Bem-vindo de volta, Administrador.
                </p>
              </div>
              {renderContent()}
           </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;