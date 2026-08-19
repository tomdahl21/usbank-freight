import { NavLink } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext.jsx'

const NAV_GROUPS = [
  {
    label: 'Overview',
    items: [
      { to: '/', label: 'Dashboard', icon: <GridIcon />, exact: true },
    ],
  },
  {
    label: 'Analytics',
    items: [
      { to: '/shipments',  label: 'Shipment Status',    icon: <TruckIcon /> },
      { to: '/carriers',   label: 'Carrier Performance', icon: <ChartIcon /> },
      { to: '/exceptions', label: 'Exceptions',          icon: <AlertIcon /> },
      { to: '#',           label: 'Spend Analysis',      icon: <SpendIcon />,  disabled: true },
      { to: '#',           label: 'Lane Intelligence',   icon: <LaneIcon />,   disabled: true },
      { to: '#',           label: 'Benchmarks',          icon: <BenchIcon />,  disabled: true },
    ],
  },
  {
    label: 'Finance',
    items: [
      { to: '/invoices',   label: 'Invoices & Payments', icon: <InvoiceIcon /> },
      { to: '#',           label: 'Reconciliation',       icon: <ReconcileIcon />, disabled: true },
    ],
  },
]

export default function Sidebar({ open, onClose }) {
  const { logout } = useAuth()
  return (
    <>
      <div className={`sidebar-overlay ${open ? 'visible' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-logo-area">
          <img src="/logo-white.svg" alt="US Bank" />
        </div>

        <nav className="sidebar-nav" aria-label="Main navigation">
          {NAV_GROUPS.map(group => (
            <div key={group.label}>
              <div className="nav-group-label">{group.label}</div>
              {group.items.map(item =>
                item.disabled ? (
                  <span key={item.label} className="nav-item disabled">
                    <span className="nav-item-icon">{item.icon}</span>
                    {item.label}
                  </span>
                ) : (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.exact}
                    className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
                    onClick={onClose}
                  >
                    <span className="nav-item-icon">{item.icon}</span>
                    {item.label}
                  </NavLink>
                )
              )}
            </div>
          ))}

          <NavLink
            to="/ai-assistant"
            className={({ isActive }) => `nav-ai-item${isActive ? ' active' : ''}`}
            onClick={onClose}
          >
            <span className="nav-item-icon">✦</span>
            Ask AI
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <div className="user-row">
            <div className="user-avatar">MR</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="user-name">Marcus Rodriguez</div>
              <div className="user-role">Freight Manager</div>
            </div>
            <button
              onClick={logout}
              title="Sign out"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.35)', padding: '4px', flexShrink: 0, lineHeight: 1 }}
            >
              <SignOutIcon />
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

/* ---- inline SVG icons ---- */
function GridIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1" y="1" width="6" height="6" rx="1" /><rect x="9" y="1" width="6" height="6" rx="1" />
      <rect x="1" y="9" width="6" height="6" rx="1" /><rect x="9" y="9" width="6" height="6" rx="1" />
    </svg>
  )
}
function TruckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M1 3h9v7H1z" /><path d="M10 5h3l2 3v2h-5V5z" />
      <circle cx="3.5" cy="11.5" r="1.5" /><circle cx="11.5" cy="11.5" r="1.5" />
    </svg>
  )
}
function ChartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M1 12l4-4 3 2 4-5 3 2" /><line x1="1" y1="14" x2="15" y2="14" />
    </svg>
  )
}
function AlertIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 1L1 14h14L8 1z" /><line x1="8" y1="6" x2="8" y2="9" /><circle cx="8" cy="12" r="0.5" fill="currentColor" />
    </svg>
  )
}
function SpendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1" y="3" width="14" height="10" rx="1.5" /><line x1="1" y1="7" x2="15" y2="7" />
    </svg>
  )
}
function LaneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <line x1="1" y1="8" x2="15" y2="8" /><polyline points="11,4 15,8 11,12" />
      <circle cx="3" cy="8" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}
function BenchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="1" y="9" width="4" height="5" rx="0.5" /><rect x="6" y="5" width="4" height="9" rx="0.5" />
      <rect x="11" y="2" width="4" height="12" rx="0.5" />
    </svg>
  )
}
function InvoiceIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 1h10v14l-2-1.5L9 15l-2-1.5L5 15l-2-1.5V1z" /><line x1="5" y1="5" x2="11" y2="5" />
      <line x1="5" y1="8" x2="11" y2="8" /><line x1="5" y1="11" x2="9" y2="11" />
    </svg>
  )
}
function ReconcileIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 4h10M3 8h6M3 12h8" /><polyline points="11,10 13,12 15,9" />
    </svg>
  )
}
function SignOutIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 2H2v12h4" /><polyline points="10,5 14,8 10,11" /><line x1="14" y1="8" x2="6" y2="8" />
    </svg>
  )
}
