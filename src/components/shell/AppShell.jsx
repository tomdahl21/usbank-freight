import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext.jsx'
import PasswordGate from '../../auth/PasswordGate.jsx'
import Sidebar from './Sidebar.jsx'
import Topbar from './Topbar.jsx'

const PAGE_META = {
  '/': {
    placeholder: 'Ask about freight spend, OTIF trends, or carrier performance…',
    chips: ['Why did OTIF drop last week?', 'Which carrier has the most exceptions?', 'Show spend by lane'],
  },
  '/invoices': {
    placeholder: 'Ask about an invoice, carrier billing, or dispute status…',
    chips: ['Find overcharges this month', 'Which invoices need audit?', 'Show ABF Freight disputes'],
  },
  '/shipments': {
    placeholder: 'Ask about a shipment, PRO, or delivery status…',
    chips: ['Which shipments are at risk today?', 'Show delayed FedEx shipments', 'Check PO 90142-C'],
  },
  '/carriers': {
    placeholder: 'Ask about carrier OTIF, lane performance, or alternatives…',
    chips: ['Why is FedEx OTIF low?', 'Compare FedEx vs Old Dominion on DFW→BNA', 'Which carrier should we shift volume to?'],
  },
  '/exceptions': {
    placeholder: 'Ask about exceptions, disputes, or BOL discrepancies…',
    chips: ['Approve all BOL mismatches under $500', 'Which carrier has most overcharges?', 'Show aging exceptions'],
  },
  '/ai-assistant': {
    placeholder: 'Ask anything about your freight program…',
    chips: ['Morning briefing', 'Find cost leaks', 'Which POs are at risk?'],
  },
}

export default function AppShell({ children }) {
  const { unlocked, checking } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  const meta = PAGE_META[location.pathname] || PAGE_META['/']

  if (checking) return null

  if (!unlocked) return <PasswordGate />

  return (
    <div className="app">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="main">
        <Topbar
          onMenuClick={() => setSidebarOpen(o => !o)}
          placeholder={meta.placeholder}
          chips={meta.chips}
        />
        <div className="content">
          {children}
        </div>
      </div>
    </div>
  )
}
