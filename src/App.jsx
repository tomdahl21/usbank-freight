import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext.jsx'
import { ChatProvider } from './context/ChatContext.jsx'
import AppShell from './components/shell/AppShell.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import InvoicesPage from './pages/InvoicesPage.jsx'
import ShipmentStatusPage from './pages/ShipmentStatusPage.jsx'
import CarrierPerformancePage from './pages/CarrierPerformancePage.jsx'
import ExceptionsPage from './pages/ExceptionsPage.jsx'
import AIAssistantPage from './pages/AIAssistantPage.jsx'

export default function App() {
  return (
    <AuthProvider>
      <ChatProvider>
      <AppShell>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/invoices" element={<InvoicesPage />} />
          <Route path="/shipments" element={<ShipmentStatusPage />} />
          <Route path="/carriers" element={<CarrierPerformancePage />} />
          <Route path="/exceptions" element={<ExceptionsPage />} />
          <Route path="/ai-assistant" element={<AIAssistantPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppShell>
      </ChatProvider>
    </AuthProvider>
  )
}
