import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useChat } from '../context/ChatContext.jsx'

const SPEND_DATA = {
  '4W':  [
    { label: 'Jul 21', h: 74 }, { label: 'Jul 28', h: 80 },
    { label: 'Aug 4',  h: 86 }, { label: 'Aug 11', h: 100 },
  ],
  '12W': [
    { label: 'May 26', h: 42 }, { label: 'Jun 2',  h: 50 }, { label: 'Jun 9',  h: 58 },
    { label: 'Jun 16', h: 47 }, { label: 'Jun 23', h: 62 }, { label: 'Jun 30', h: 68 },
    { label: 'Jul 7',  h: 65 }, { label: 'Jul 14', h: 72 }, { label: 'Jul 21', h: 74 },
    { label: 'Jul 28', h: 80 }, { label: 'Aug 4',  h: 86 }, { label: 'Aug 11', h: 100 },
  ],
  '6M': [
    { label: 'Mar',  h: 55 }, { label: 'Apr',  h: 60 }, { label: 'May',  h: 65 },
    { label: 'Jun',  h: 70 }, { label: 'Jul',  h: 82 }, { label: 'Aug*', h: 100 },
  ],
  'YTD': [
    { label: 'Jan', h: 48 }, { label: 'Feb', h: 52 }, { label: 'Mar', h: 55 },
    { label: 'Apr', h: 60 }, { label: 'May', h: 65 }, { label: 'Jun', h: 70 },
    { label: 'Jul', h: 82 }, { label: 'Aug*',h: 100 },
  ],
}

const SPEND_SUMMARY = {
  '4W':  { week: '$3.84M', avg: '$3.57M', bench: '+7.6%', ltl: '63%' },
  '12W': { week: '$3.84M', avg: '$3.27M', bench: '+8.3%', ltl: '61%' },
  '6M':  { week: '$3.84M', avg: '$3.10M', bench: '+9.4%', ltl: '60%' },
  'YTD': { week: '$3.84M', avg: '$2.98M', bench: '+11.2%',ltl: '59%' },
}

const CARRIERS = [
  { name: 'Old Dominion',     mode: 'LTL',         pct: 97.4, cls: 'good' },
  { name: 'XPO Logistics',    mode: 'TL · LTL',    pct: 95.1, cls: 'good' },
  { name: 'SAIA LTL Freight', mode: 'LTL',          pct: 93.7, cls: 'good' },
  { name: 'UPS Freight',      mode: 'LTL · Parcel', pct: 88.2, cls: 'warn' },
  { name: 'FedEx Freight',    mode: 'LTL',          pct: 85.6, cls: 'warn' },
  { name: 'ABF Freight',      mode: 'LTL',          pct: 78.3, cls: 'bad' },
]

const INVOICES = [
  { id: 'INV-2026-00041897', pro: '4829-01847', carrier: 'FedEx Freight', mode: 'LTL', route: 'Chicago → Atlanta',       consignee: "Dick's Sporting Goods", cls: 'Class 85',    amount: '$4,218.34',  otif: 'On Time', otifCls: 'success', status: 'Paid',          statusCls: 'success', rowCls: '' },
  { id: 'INV-2026-00041721', pro: '2210-88432', carrier: 'UPS Freight',   mode: 'LTL', route: 'LA → Denver',            consignee: 'Adidas',                cls: 'Class 70 ⚠', clsWarn: true, amount: '$892.10',    otif: 'Late',    otifCls: 'amber',   status: 'Pending Audit', statusCls: 'amber',   rowCls: 'row-flagged' },
  { id: 'INV-2026-00041654', pro: '9914-22019', carrier: 'SAIA LTL',      mode: 'LTL', route: 'Dallas → Nashville',     consignee: 'Nike',                  cls: 'Class 92.5',  amount: '$1,441.75',  otif: 'Short',   otifCls: 'danger',  status: 'Exception',     statusCls: 'danger',  rowCls: 'row-error' },
  { id: 'INV-2026-00041523', pro: '7701-56234', carrier: 'XPO Logistics', mode: 'TL',  route: 'Memphis → Philadelphia', consignee: 'Nordstrom',             cls: 'N/A (TL)',    amount: '$12,888.00', otif: 'On Time', otifCls: 'success', status: 'Processed',     statusCls: 'blue',    rowCls: '' },
  { id: 'INV-2026-00041488', pro: '3308-77601', carrier: 'Old Dominion',  mode: 'LTL', route: 'Cincinnati → Kansas City',consignee: 'REI',                  cls: 'Class 100',   amount: '$2,104.50',  otif: 'On Time', otifCls: 'success', status: 'Paid',          statusCls: 'success', rowCls: '' },
]

const LANES = [
  { name: 'Chicago → Atlanta',   carriers: [{ name: 'Old Dominion', time: '2.1 days', cls: 'best' }, { name: 'XPO', time: '2.4 days', cls: '' }, { name: 'FedEx Freight', time: '3.2 days', cls: 'worst' }] },
  { name: 'Dallas → Nashville',  carriers: [{ name: 'SAIA', time: '1.8 days', cls: 'best' }, { name: 'XPO', time: '2.0 days', cls: '' }, { name: 'ABF', time: '2.9 days', cls: 'worst' }] },
  { name: 'LA → Denver',         carriers: [{ name: 'Old Dominion', time: '1.5 days', cls: 'best' }, { name: 'UPS Freight', time: '2.3 days', cls: 'worst' }] },
  { name: 'Memphis → Philadelphia', carriers: [{ name: 'XPO', time: '2.2 days', cls: 'best' }, { name: 'FedEx Freight', time: '3.0 days', cls: 'worst' }] },
]

export default function DashboardPage() {
  const [period, setPeriod] = useState('12W')
  const [alertDismissed, setAlertDismissed] = useState(false)
  const [hoveredBar, setHoveredBar] = useState(null)
  const [explaining, setExplaining] = useState(false)
  const { sendMessage } = useChat()
  const navigate = useNavigate()

  const bars    = SPEND_DATA[period]
  const summary = SPEND_SUMMARY[period]

  async function handleExplain() {
    setExplaining(true)
    await sendMessage(`Explain the freight spend trend for the ${period} period`)
    setExplaining(false)
    navigate('/ai-assistant')
  }

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <div className="page-meta">YTD through Aug 14, 2026 · Refreshes every 15 min</div>
        </div>
        <div className="header-actions">
          <div className="period-tabs">
            {['4W', '12W', '6M', 'YTD'].map(p => (
              <button key={p} className={`period-tab${period === p ? ' active' : ''}`} onClick={() => setPeriod(p)}>{p}</button>
            ))}
          </div>
          <button className="btn btn-ghost btn-sm">↓ Export</button>
        </div>
      </div>

      {!alertDismissed && (
        <div className="alert-strip warning">
          <span className="alert-icon">⚠</span>
          <div className="alert-body">
            <strong>OTIF below threshold on Dallas → Nashville lane.</strong>{' '}
            FedEx Freight at 81.4% over last 30 days — 8.6 pts below your 90% target.{' '}
            <Link to="/carriers" style={{ color: 'var(--cerulean-500)' }}>Review carrier scorecard →</Link>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => setAlertDismissed(true)}>Dismiss</button>
        </div>
      )}

      {/* Stat Row */}
      <div className="stat-row">
        {[
          { label: 'Overall OTIF Rate',   val: '94.2%', delta: '↑ 1.4 pts vs last period',  ctx: 'On-time & full · All carriers', cls: 'featured', to: '/carriers' },
          { label: 'Total Freight Spend', val: '$42.1M', delta: '↑ 3.2% vs prior period',   ctx: 'YTD through Aug 2026',           cls: '', to: null },
          { label: 'Invoices Processed',  val: '18,340', delta: '— No change',               ctx: 'Last 30 days',                   cls: '', to: '/invoices' },
          { label: 'Audit Recovery',      val: '$284K',  delta: '↑ Saved this quarter',      ctx: 'BOL discrepancies caught',       cls: '', to: '/invoices' },
          { label: 'Open Exceptions',     val: '37',     delta: '↑ 12 new this week',        ctx: 'Requires resolution',            cls: '', to: '/exceptions' },
        ].map(s => (
          <div
            key={s.label}
            className={`stat-card${s.cls ? ` ${s.cls}` : ''}`}
            style={{ cursor: s.to ? 'pointer' : undefined }}
            onClick={() => s.to && navigate(s.to)}
          >
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.val}</div>
            <span className={`stat-delta ${s.delta.startsWith('↑') && s.label !== 'Overall OTIF Rate' && s.label !== 'Audit Recovery' ? 'delta-down' : s.delta.startsWith('↑') ? 'delta-up' : 'delta-neutral'}`}>{s.delta}</span>
            <div className="stat-context">{s.ctx}</div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 'var(--space-5)', alignItems: 'start' }}>

        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>

          {/* Spend Chart */}
          <div className="chart-card">
            <div className="chart-header">
              <div>
                <div className="chart-title">Freight Spend by {period === '4W' || period === '12W' ? 'Week' : period === '6M' ? 'Month' : 'Month'}</div>
                <div className="chart-subtitle">{period === '4W' ? 'Last 4 weeks' : period === '12W' ? 'Last 12 weeks' : period === '6M' ? 'Last 6 months' : 'Year to date'} · All modes · All carriers</div>
              </div>
              <div className="chart-actions">
                <button className="btn btn-ghost btn-sm">All modes</button>
                <button
                  className="btn btn-ai btn-sm"
                  onClick={handleExplain}
                  disabled={explaining}
                  style={{ opacity: explaining ? 0.6 : 1 }}
                >
                  {explaining ? '✦ Asking…' : '✦ Explain'}
                </button>
              </div>
            </div>
            <div className="chart-body">
              <div className="bar-chart-area" style={{ position: 'relative' }}>
                {bars.map((b, i) => {
                  const isHot = b.label === 'Aug 11' || b.label === 'Aug*'
                  const isHovered = hoveredBar === i
                  return (
                    <div
                      key={b.label}
                      className="bar-col"
                      style={{ position: 'relative' }}
                      onMouseEnter={() => setHoveredBar(i)}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      {isHovered && (
                        <div style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', background: 'var(--navy-900)', color: '#fff', fontSize: 10, fontFamily: 'var(--font-mono)', padding: '3px 8px', borderRadius: 4, whiteSpace: 'nowrap', zIndex: 10, marginBottom: 4 }}>
                          {b.label}: ~${(b.h * 38400).toLocaleString()}
                        </div>
                      )}
                      <div
                        className="bar"
                        style={{
                          height: `${b.h}%`,
                          background: isHot ? 'var(--amber-500)' : isHovered ? 'var(--cerulean-400)' : 'var(--cerulean-300)',
                          transition: 'background 0.15s',
                          cursor: 'pointer',
                        }}
                      />
                      <div className="bar-label">{b.label}</div>
                    </div>
                  )
                })}
              </div>
              <div className="chart-summary-row">
                <div className="chart-summary-item"><div className="s-label">This week</div><div className="s-value">{summary.week}</div></div>
                <div className="chart-summary-item"><div className="s-label">Avg ({period})</div><div className="s-value">{summary.avg}</div></div>
                <div className="chart-summary-item"><div className="s-label">vs Benchmark</div><div className="s-value highlight">{summary.bench}</div></div>
                <div className="chart-summary-item"><div className="s-label">LTL share</div><div className="s-value">{summary.ltl}</div></div>
              </div>
            </div>
          </div>

          {/* Invoice Table */}
          <div className="table-card">
            <div className="table-header">
              <div>
                <div className="chart-title">Recent Invoices</div>
                <div className="chart-subtitle">Latest activity across all carriers</div>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                <Link to="/invoices" className="btn btn-primary btn-sm">View all invoices →</Link>
              </div>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Invoice / PRO</th>
                  <th>Consignee</th>
                  <th>Carrier</th>
                  <th>Mode</th>
                  <th>Route</th>
                  <th>Freight Class</th>
                  <th className="td-right">Amount</th>
                  <th>OTIF</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {INVOICES.map(inv => (
                  <tr key={inv.id} className={inv.rowCls} style={{ cursor: 'pointer' }} onClick={() => navigate('/invoices')}>
                    <td><div className="td-mono">{inv.id}</div><div className="td-sub">PRO: {inv.pro}</div></td>
                    <td style={{ fontSize: 'var(--text-xs)', fontWeight: 500, color: 'var(--cerulean-500)' }}>{inv.consignee}</td>
                    <td style={{ fontSize: 'var(--text-xs)' }}>{inv.carrier}</td>
                    <td><span className="badge badge-navy">{inv.mode}</span></td>
                    <td style={{ fontSize: 'var(--text-xs)', color: 'var(--slate-500)' }}>{inv.route}</td>
                    <td className="td-mono" style={{ fontSize: '10px', color: inv.clsWarn ? 'var(--amber-500)' : undefined }}>{inv.cls}</td>
                    <td className="td-mono td-right">{inv.amount}</td>
                    <td><span className={`badge badge-${inv.otifCls}`}>{inv.otif}</span></td>
                    <td><span className={`badge badge-${inv.statusCls}`}>{inv.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>

          <div className="ai-card">
            <div className="ai-card-header">
              <span className="ai-badge">✦ AI Insight</span>
              <span className="ai-ts">Aug 14, 2026</span>
            </div>
            <p className="ai-card-text">
              Your LTL OTIF rate on the <strong>Chicago → Atlanta lane dropped 6.2 pts</strong> over the past 3 weeks. FedEx Freight is driving this — late pickups on Mondays correlate with their ORD terminal congestion. Two alternate carriers in the US Bank network post 96%+ OTIF on this lane at comparable rates.
            </p>
            <div className="ai-card-actions">
              <Link to="/ai-assistant" className="btn btn-ai btn-sm">✦ Show alternatives</Link>
              <button className="btn btn-ghost btn-sm" onClick={() => setAlertDismissed(true)}>Dismiss</button>
            </div>
          </div>

          <div className="carrier-card">
            <div className="carrier-card-header">
              <div>
                <div className="chart-title">Carrier OTIF — {period}</div>
                <div className="chart-subtitle">On-time &amp; full · All lanes</div>
              </div>
              <Link to="/carriers" className="btn btn-ghost btn-sm">Full report</Link>
            </div>
            {CARRIERS.map(c => (
              <div key={c.name} className="carrier-row" style={{ cursor: 'pointer' }} onClick={() => navigate('/carriers')}>
                <div className="carrier-info">
                  <div className="carrier-name">{c.name}</div>
                  <div className="carrier-mode">{c.mode}</div>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  <div className="carrier-bar-track">
                    <div className={`carrier-bar-fill bar-${c.cls}`} style={{ width: `${c.pct}%` }} />
                  </div>
                </div>
                <div className={`carrier-pct pct-${c.cls}`}>{c.pct}%</div>
              </div>
            ))}
          </div>

          <div className="transit-card">
            <div className="transit-header">
              <div className="chart-title">Time to Location by Carrier</div>
              <div className="chart-subtitle">Avg transit days · Top lanes · Last 30 days</div>
            </div>
            {LANES.map(lane => (
              <div key={lane.name} className="transit-lane" style={{ cursor: 'pointer' }} onClick={() => navigate('/shipments')}>
                <div className="lane-name">{lane.name}</div>
                <div className="lane-carriers">
                  {lane.carriers.map(c => (
                    <div key={c.name} className="lane-carrier-row">
                      <span className="lane-carrier-name">{c.name}</span>
                      <span className={`lane-time${c.cls ? ` ${c.cls}` : ''}`}>{c.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  )
}
