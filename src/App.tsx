import { Dashboard } from './pages/Dashboard';
import { Agenda } from './pages/Agenda';
import { Patients as PatientsPage } from './pages/Patients';
import { Finance as FinancePage } from './pages/Finance';
import { Stock as StockPage } from './pages/Stock';
import { Team as TeamPage } from './pages/Team';
import { SettingsPage } from './pages/Settings';
import { InboxPage } from './pages/Inbox';
import { GrowthPage } from './pages/GrowthPage';
import { BudgetPage } from './pages/BudgetPage';
import { CarePage } from './pages/CarePage';
import SimulatorPage from './pages/SimulatorPage';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';


import { ConsultationPage } from './pages/ConsultationPage';

export default function App() {
  // Removed artificial loading delay for faster UX

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/atendimento" element={<ConsultationPage />} />
        <Route path="/mensagens" element={<InboxPage />} />
        <Route path="/pacientes" element={<PatientsPage />} />
        <Route path="/captacao" element={<GrowthPage />} />
        <Route path="/financeiro" element={<FinancePage />} />
        <Route path="/estoque" element={<StockPage />} />
        <Route path="/equipe" element={<TeamPage />} />
        <Route path="/orcamentos" element={<BudgetPage />} />
        <Route path="/care" element={<CarePage />} />
        <Route path="/simulador" element={<SimulatorPage />} />
        <Route path="/configuracoes" element={<SettingsPage />} />
      </Routes>
      <Toaster
        position="top-right"
        theme="dark"
        toastOptions={{
          style: {
            background: '#09090b',
            border: '1px solid #27272a',
            color: '#f4f4f5',
          },
          className: 'font-sans'
        }}
      />
    </>
  );
}
