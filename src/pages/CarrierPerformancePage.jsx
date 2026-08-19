import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useChat } from '../context/ChatContext.jsx'

const CARRIER_DATA = {
  'Old Dominion':  { mode: 'LTL',        pct: 97.4, cls: 'good', trend: 'up',     transit: '2.1d', accuracy: '99.1%', lanes: 4, spend: '$3.8M', color: 'var(--success-500)' },
  'XPO Logistics': { mode: 'TL · LTL',   pct: 95.1, cls: 'good', trend: 'up',     transit: '2.2d', accuracy: '98.4%', lanes: 3, spend: '$5.4M', color: 'var(--success-500)' },
  'SAIA LTL':      { mode: 'LTL',         pct: 93.7, cls: 'good', trend: 'neutral',transit: '2.5d', accuracy: '97.8%', lanes: 3, spend: '$7.6M', color: 'var(--success-500)' },
  'UPS Freight':   { mode: 'LTL · Parcel',pct: 88.2, cls: 'warn', trend: 'down',   transit: '2.6d', accuracy: '96.2%', lanes: 4, spend: '$9.8M', color: 'var(--amber-500)' },
  'FedEx Freight': { mode: 'LTL',         pct: 85.6, cls: 'warn', trend: 'down',   transit: '2.8d', accuracy: '96.2%', lanes: 5, spend: '$14.2M',color: 'var(--amber-500)' },
  'ABF Freight':   { mode: 'LTL',         pct: 78.3, cls: 'bad',  trend: 'down',   transit: '3.1d', accuracy: '93.4%', lanes: 2, spend: '$1.3M', color: 'var(--danger-500)' },
}

const OTIF_BY_PERIOD = {
  'Old Dominion': {
    '30 days': [{ label: 'W1', h: 97 }, { label: 'W2', h: 98 }, { label: 'W3', h: 96 }, { label: 'W4', h: 97.4 }],
    '90 days': [{ label: 'W1', h: 95 }, { label: 'W2', h: 96 }, { label: 'W3', h: 97 }, { label: 'W4', h: 96 }, { label: 'W5', h: 98 }, { label: 'W6', h: 97 }, { label: 'W7', h: 98 }, { label: 'W8', h: 97 }, { label: 'W9', h: 96 }, { label: 'W10', h: 97 }, { label: 'W11', h: 98 }, { label: 'W12', h: 97.4 }],
    'YTD': [{ label: 'Jan', h: 95 }, { label: 'Feb', h: 96 }, { label: 'Mar', h: 97 }, { label: 'Apr', h: 96 }, { label: 'May', h: 97 }, { label: 'Jun', h: 98 }, { label: 'Jul', h: 97 }, { label: 'Aug*', h: 97.4 }],
  },
  'XPO Logistics': {
    '30 days': [{ label: 'W1', h: 96 }, { label: 'W2', h: 95 }, { label: 'W3', h: 96 }, { label: 'W4', h: 95.1 }],
    '90 days': [{ label: 'W1', h: 93 }, { label: 'W2', h: 94 }, { label: 'W3', h: 95 }, { label: 'W4', h: 94 }, { label: 'W5', h: 95 }, { label: 'W6', h: 96 }, { label: 'W7', h: 95 }, { label: 'W8', h: 96 }, { label: 'W9', h: 95 }, { label: 'W10', h: 96 }, { label: 'W11', h: 95 }, { label: 'W12', h: 95.1 }],
    'YTD': [{ label: 'Jan', h: 92 }, { label: 'Feb', h: 93 }, { label: 'Mar', h: 94 }, { label: 'Apr', h: 95 }, { label: 'May', h: 95 }, { label: 'Jun', h: 96 }, { label: 'Jul', h: 95 }, { label: 'Aug*', h: 95.1 }],
  },
  'FedEx Freight': {
    '30 days': [{ label: 'W1', h: 88 }, { label: 'W2', h: 85 }, { label: 'W3', h: 84 }, { label: 'W4', h: 82 }, { label: 'W5', h: 86 }, { label: 'W6', h: 83 }, { label: 'W7', h: 81 }, { label: 'W8', h: 79 }, { label: 'W9', h: 84 }, { label: 'W10', h: 86 }, { label: 'W11', h: 85 }, { label: 'W12', h: 85.6 }],
    '90 days': [{ label: 'W1', h: 90 }, { label: 'W2', h: 89 }, { label: 'W3', h: 88 }, { label: 'W4', h: 87 }, { label: 'W5', h: 88 }, { label: 'W6', h: 87 }, { label: 'W7', h: 86 }, { label: 'W8', h: 85 }, { label: 'W9', h: 86 }, { label: 'W10', h: 85 }, { label: 'W11', h: 84 }, { label: 'W12', h: 85.6 }],
    'YTD': [{ label: 'Jan', h: 93 }, { label: 'Feb', h: 92 }, { label: 'Mar', h: 91 }, { label: 'Apr', h: 90 }, { label: 'May', h: 89 }, { label: 'Jun', h: 88 }, { label: 'Jul', h: 87 }, { label: 'Aug*', h: 85.6 }],
  },
}

const DEFAULT_OTIF = (pct) => [
  { label: 'W1', h: pct - 2 }, { label: 'W2', h: pct - 1 }, { label: 'W3', h: pct + 1 },
  { label: 'W4', h: pct }, { label: 'W5', h: pct - 1 }, { label: 'W6', h: pct + 2 },
  { label: 'W7', h: pct }, { label: 'W8', h: pct - 2 }, { label: 'W9', h: pct + 1 },
  { label: 'W10', h: pct }, { label: 'W11', h: pct - 1 }, { label: 'W12', h: pct },
]

const BOL_DISCREPANCIES = {
  'FedEx Freight': [
    { invoice: 'INV-2026-00041654', pro: '9914-22019', lane: 'DFW→BNA', declared: 'Class 92.5 / 340 lbs', billed: 'Class 92.5 / 340 lbs', delta: '$0', status: 'Short delivery', statusCls: 'danger' },
    { invoice: 'INV-2026-00041501', pro: '6612-00341', lane: 'ORD→ATL', declared: 'Class 85 / 820 lbs', billed: 'Class 85 / 952 lbs', delta: '+$76.10', status: 'Overcharge', statusCls: 'amber' },
    { invoice: 'INV-2026-00041388', pro: '9903-41220', lane: 'ORD→DTW', declared: 'Class 70 / 920 lbs', billed: 'Class 85 / 920 lbs', delta: '+$145.00', status: 'Class upgrade', statusCls: 'amber' },
  ],
  'UPS Freight': [
    { invoice: 'INV-2026-00041721', pro: '2210-88432', lane: 'LAX→DEN', declared: 'Class 70 / 580 lbs', billed: 'Class 85 / 580 lbs', delta: '+$82.10', status: 'Class upgrade', statusCls: 'amber' },
  ],
  'ABF Freight': [
    { invoice: 'INV-2026-00041401', pro: '1102-66781', lane: 'ATL→BAL', declared: 'Class 110 / 760 lbs', billed: 'Class 125 / 760 lbs', delta: '+$224.50', status: 'Class upgrade', statusCls: 'amber' },
  ],
}

const ALTERNATIVES = [
  { name: 'Old Dominion', otif: '+7.6 pts → 93.2%', transit: '−0.5d → 2.3d', cost: '+4.3% → $2.18/lb', costDir: 'up' },
  { name: 'SAIA LTL',     otif: '+7.6 pts → 93.2%', transit: '−0.3d → 2.5d', cost: '+7.2% → $2.24/lb', costDir: 'up' },
  { name: 'Estes Express', otif: '+3.5 pts → 89.1%', transit: '+0.1d → 2.9d', cost: '−2.9% → $2.03/lb (lowest!)', costDir: 'down' },
]

const OTIF_LANES = [
  { lane: 'DFW→BNA', pct: 81.4, cls: 'bad',  delta: '-8.6 pts' },
  { lane: 'ORD→ATL', pct: 88.2, cls: 'warn', delta: '-1.8 pts' },
  { lane: 'LAX→DFW', pct: 91.4, cls: 'good', delta: '+2.1 pts' },
  { lane: 'MEM→PHL', pct: 86.0, cls: 'warn', delta: '-4.0 pts' },
  { lane: 'CVG→MCI', pct: 94.2, cls: 'good', delta: '+0.5 pts' },
]

function pctColor(cls) {
  if (cls === 'good') return 'var(--success-500)'
  if (cls === 'warn') return 'var(--amber-500)'
  return 'var(--danger-500)'
}

const CARRIER_NAMES = Object.keys(CARRIER_DATA)

export default function CarrierPerformancePage() {
  const [selectedName, setSelectedName] = useState('FedEx Freight')
  const [period, setPeriod] = useState('30 days')
  const [altOpen, setAltOpen] = useState(true)
  const [explaining, setExplaining] = useState(false)
  const [hoveredBar, setHoveredBar] = useState(null)
  const { sendMessage } = useChat()
  const navigate = useNavigate()

  const carrier = CARRIER_DATA[selectedName]
  const otifBars = OTIF_BY_PERIOD[selectedName]?.[period] || DEFAULT_OTIF(carrier.pct)
  const discrepancies = BOL_DISCREPANCIES[selectedName] || []

  async function handleExplain() {
    setExplaining(true)
    await sendMessage(`Explain ${selectedName} OTIF performance and what's driving it`)
    setExplaining(false)
    navigate('/ai-assistant')
  }

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - var(--topbar-height) - var(--suggest-height))', overflow: 'hidden' }}>

      {/* Left: Carrier List */}
      <div style={{ width: 260, flexShrink: 0, borderRight: '1px solid var(--slate-100)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: 'var(--space-4) var(--space-5)', borderBottom: '1px solid var(--slate-100)' }}>
          <div className="chart-title">Carriers</div>
          <div className="chart-subtitle">All modes · {period}</div>
        </div>
        <div style={{ flex: 1, overflow: 'auto' }}>
          {CARRIER_NAMES.map(name => {
            const c = CARRIER_DATA[name]
            const trendIcon = c.trend === 'up' ? '↑' : c.trend === 'down' ? '↓' : '—'
            const trendColor = c.trend === 'up' ? 'var(--success-500)' : c.trend === 'down' ? 'var(--danger-500)' : 'var(--slate-400)'
            return (
              <div
                key={name}
                onClick={() => setSelectedName(name)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                  padding: 'var(--space-4) var(--space-5)', cursor: 'pointer',
                  borderBottom: '1px solid var(--slate-050)',
                  background: selectedName === name ? 'var(--cerulean-050)' : undefined,
                  borderLeft: selectedName === name ? '3px solid var(--cerulean-500)' : '3px solid transparent',
                  transition: 'background 0.1s',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--navy-900)' }}>{name}</div>
                  <div style={{ fontSize: 10, color: 'var(--slate-500)' }}>{c.mode} · {c.lanes} lanes</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', fontWeight: 700, color: pctColor(c.cls) }}>{c.pct}%</div>
                  <div style={{ fontSize: 9, color: trendColor, fontWeight: 700 }}>{trendIcon} OTIF</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Center: Detail Panel */}
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        {/* Detail Header */}
        <div style={{ padding: 'var(--space-5) var(--space-6)', borderBottom: 'var(--seam)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--white)', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: carrier.color, flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--navy-900)' }}>{selectedName}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--slate-500)' }}>{carrier.mode} · {carrier.spend} managed spend · {carrier.lanes} active lanes</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <div className="period-tabs">
              {['30 days', '90 days', 'YTD'].map(p => (
                <button key={p} className={`period-tab${period === p ? ' active' : ''}`} onClick={() => setPeriod(p)}>{p}</button>
              ))}
            </div>
            <button className="btn btn-ghost btn-sm">↓ Export</button>
          </div>
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: 'var(--space-6)' }}>
          {/* KPI Row */}
          <div className="stat-row stat-row-4" style={{ marginBottom: 'var(--space-5)' }}>
            {[
              { label: 'OTIF Rate',        val: `${carrier.pct}%`,  delta: carrier.cls === 'bad' ? `↓ ${(90-carrier.pct).toFixed(1)} pts below 90% target` : carrier.cls === 'warn' ? '↓ Below 90% target' : '↑ Above 90% target', deltaCls: carrier.cls === 'good' ? 'delta-up' : 'delta-down', style: { color: pctColor(carrier.cls) } },
              { label: 'Avg Transit',      val: carrier.transit,     delta: carrier.trend === 'down' ? '↑ Slower than avg' : '— On target', deltaCls: carrier.trend === 'down' ? 'delta-down' : 'delta-neutral', style: {} },
              { label: 'Invoice Accuracy', val: carrier.accuracy,    delta: '— Within threshold', deltaCls: 'delta-neutral', style: {} },
              { label: 'Active Lanes',     val: carrier.lanes,       delta: '— No change',        deltaCls: 'delta-neutral', style: {} },
            ].map(s => (
              <div key={s.label} className="stat-card">
                <div className="stat-label">{s.label}</div>
                <div className="stat-value" style={s.style}>{s.val}</div>
                <span className={`stat-delta ${s.deltaCls}`}>{s.delta}</span>
              </div>
            ))}
          </div>

          {/* Payment Status */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
            {[
              { label: 'Paid',          val: '$42.3K', count: '156', color: 'var(--success-500)' },
              { label: 'Pending Audit', val: '$12.1K', count: '42',  color: 'var(--amber-500)' },
              { label: 'Disputed',      val: '$3.8K',  count: '14',  color: 'var(--danger-500)' },
              { label: 'Outstanding',   val: '$18.3K', count: '64',  color: 'var(--slate-500)' },
            ].map(s => (
              <div key={s.label} style={{ background: 'var(--white)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)', borderLeft: `3px solid ${s.color}`, boxShadow: 'var(--shadow-card)', cursor: 'pointer' }} onClick={() => navigate('/invoices')}>
                <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--slate-500)', fontFamily: 'var(--font-mono)' }}>{s.label}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xl)', fontWeight: 500, color: 'var(--navy-900)', marginTop: 4 }}>{s.val}</div>
                <div style={{ fontSize: 10, color: 'var(--slate-500)' }}>{s.count} invoices</div>
              </div>
            ))}
          </div>

          {carrier.cls !== 'good' && (
            <div className="alert-strip warning" style={{ marginBottom: 'var(--space-5)' }}>
              <span className="alert-icon">⚠</span>
              <div className="alert-body">
                <strong>{selectedName} OTIF is {carrier.pct}% — {(90 - carrier.pct).toFixed(1)} pts below your 90% target.</strong> Performance has declined for 3 consecutive weeks.
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => setAltOpen(true)}>View alternatives →</button>
            </div>
          )}

          {/* OTIF Trend Chart */}
          <div className="chart-card" style={{ marginBottom: 'var(--space-5)' }}>
            <div className="chart-header">
              <div>
                <div className="chart-title">OTIF Trend — {period}</div>
                <div className="chart-subtitle">{selectedName} · All lanes</div>
              </div>
              <button
                className="btn btn-ai btn-sm"
                onClick={handleExplain}
                disabled={explaining}
                style={{ opacity: explaining ? 0.6 : 1 }}
              >
                {explaining ? '✦ Asking…' : '✦ Explain trend'}
              </button>
            </div>
            <div className="chart-body">
              <div className="bar-chart-area" style={{ position: 'relative' }}>
                {otifBars.map((b, i) => (
                  <div
                    key={b.label}
                    className="bar-col"
                    style={{ position: 'relative' }}
                    onMouseEnter={() => setHoveredBar(i)}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    {hoveredBar === i && (
                      <div style={{ position: 'absolute', bottom: '100%', left: '50%', transform: 'translateX(-50%)', background: 'var(--navy-900)', color: '#fff', fontSize: 10, fontFamily: 'var(--font-mono)', padding: '3px 8px', borderRadius: 4, whiteSpace: 'nowrap', zIndex: 10, marginBottom: 4 }}>
                        {b.label}: {b.h.toFixed(1)}%
                      </div>
                    )}
                    <div
                      className="bar"
                      style={{
                        height: `${b.h}%`,
                        background: b.h >= 90 ? (hoveredBar === i ? '#2aad76' : 'var(--success-500)') : b.h >= 85 ? (hoveredBar === i ? 'var(--amber-400)' : 'var(--amber-500)') : (hoveredBar === i ? '#e8445a' : 'var(--danger-500)'),
                        transition: 'background 0.1s',
                        cursor: 'pointer',
                      }}
                    />
                    <div className="bar-label">{b.label}</div>
                  </div>
                ))}
              </div>
              {/* 90% target line indicator */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--slate-100)' }}>
                <div style={{ width: 20, height: 2, background: 'var(--slate-300)', borderTop: '2px dashed var(--slate-300)' }} />
                <span style={{ fontSize: 10, color: 'var(--slate-500)', fontFamily: 'var(--font-mono)' }}>90% target threshold</span>
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-3)' }}>
                <div><div className="s-label" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--slate-500)', marginBottom: 4 }}>Current</div><div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xl)', fontWeight: 500 }}>{carrier.pct}%</div></div>
                <div><div className="s-label" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--slate-500)', marginBottom: 4 }}>Target</div><div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xl)', fontWeight: 500, color: 'var(--success-500)' }}>90.0%</div></div>
                <div><div className="s-label" style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--slate-500)', marginBottom: 4 }}>Gap</div><div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xl)', fontWeight: 500, color: carrier.pct >= 90 ? 'var(--success-500)' : 'var(--danger-500)' }}>{carrier.pct >= 90 ? '+' : '−'}{Math.abs(90 - carrier.pct).toFixed(1)} pts</div></div>
              </div>
            </div>
          </div>

          {/* OTIF by Lane */}
          <div className="table-card" style={{ marginBottom: 'var(--space-5)' }}>
            <div className="table-header"><div className="chart-title">OTIF by Lane</div></div>
            <table>
              <thead><tr><th>Lane</th><th className="td-right">OTIF %</th><th className="td-right">vs Prior</th><th>Status</th></tr></thead>
              <tbody>
                {OTIF_LANES.map(l => (
                  <tr key={l.lane} style={{ cursor: 'pointer' }} onClick={() => navigate('/shipments')}>
                    <td className="td-mono">{l.lane}</td>
                    <td className="td-mono td-right" style={{ color: pctColor(l.cls) }}>{l.pct}%</td>
                    <td className="td-mono td-right" style={{ color: l.cls === 'good' ? 'var(--success-500)' : 'var(--danger-500)' }}>{l.delta}</td>
                    <td><span className={`badge badge-${l.cls === 'good' ? 'success' : l.cls === 'warn' ? 'amber' : 'danger'}`}>{l.cls === 'good' ? 'On target' : l.cls === 'warn' ? 'Watch' : 'Below target'}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* BOL Discrepancies — carrier-specific */}
          {discrepancies.length > 0 && (
            <div className="table-card" style={{ marginBottom: 'var(--space-5)' }}>
              <div className="table-header">
                <div><div className="chart-title">BOL Discrepancies</div><div className="chart-subtitle">Invoice vs. BOL declared values · {selectedName}</div></div>
                <button className="btn btn-ghost btn-sm" onClick={() => navigate('/invoices')}>View all →</button>
              </div>
              <table>
                <thead><tr><th>Invoice</th><th>Lane</th><th>Declared</th><th>Billed</th><th>Delta</th><th>Status</th></tr></thead>
                <tbody>
                  {discrepancies.map(d => (
                    <tr key={d.invoice} style={{ cursor: 'pointer' }} onClick={() => navigate('/invoices')}>
                      <td><div className="td-mono">{d.invoice}</div><div className="td-sub">{d.pro}</div></td>
                      <td className="td-mono" style={{ fontSize: 10 }}>{d.lane}</td>
                      <td style={{ fontSize: 'var(--text-xs)', color: 'var(--slate-500)' }}>{d.declared}</td>
                      <td style={{ fontSize: 'var(--text-xs)' }}>{d.billed}</td>
                      <td className="td-mono" style={{ color: d.delta === '$0' ? 'var(--slate-500)' : 'var(--danger-500)', fontSize: 10 }}>{d.delta}</td>
                      <td><span className={`badge badge-${d.statusCls}`}>{d.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* AI Insight */}
          <div className="ai-card">
            <div className="ai-card-header">
              <span className="ai-badge">✦ AI Insight</span>
              <span className="ai-ts">Aug 14, 2026</span>
            </div>
            <div style={{ marginBottom: 'var(--space-3)' }}>
              <div style={{ fontWeight: 600, fontSize: 'var(--text-xs)', color: 'var(--slate-700)', marginBottom: 4 }}>📌 Finding</div>
              <p className="ai-card-text">{selectedName} OTIF on DFW→BNA dropped 8.6 pts over 3 weeks. DFW terminal congestion on Mon/Tue is driving 74% of late deliveries. Confidence: High — based on 42 shipments.</p>
            </div>
            <div style={{ marginBottom: 'var(--space-3)' }}>
              <div style={{ fontWeight: 600, fontSize: 'var(--text-xs)', color: 'var(--slate-700)', marginBottom: 4 }}>🔄 Alternatives</div>
              <p className="ai-card-text">Old Dominion and SAIA both post 93%+ OTIF on this lane at comparable cost. Estes Express offers the lowest rate but slightly longer transit.</p>
            </div>
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <div style={{ fontWeight: 600, fontSize: 'var(--text-xs)', color: 'var(--slate-700)', marginBottom: 4 }}>💡 Recommendation</div>
              <p className="ai-card-text">Shift 30% of DFW→BNA volume to SAIA LTL for Q4. Projected OTIF lift: +7.6 pts. Estimated cost impact: +$1,840/month.</p>
            </div>
            <div className="ai-card-actions">
              <button className="btn btn-ai btn-sm" onClick={handleExplain} disabled={explaining}>
                {explaining ? '✦ Asking…' : '✦ Ask AI follow-up'}
              </button>
              <button className="btn btn-ghost btn-sm" onClick={() => setAltOpen(true)}>Show alternatives</button>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Alternatives Sidebar */}
      {altOpen && (
        <div style={{ width: 300, flexShrink: 0, borderLeft: '1px solid var(--slate-100)', background: 'var(--slate-050)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: 'var(--space-5)', borderBottom: 'var(--seam)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--navy-900)' }}>🎯 Alternatives</div>
              <div style={{ fontSize: 10, color: 'var(--slate-500)', marginTop: 2 }}>Replace {selectedName} on DFW→BNA</div>
            </div>
            <button className="btn btn-icon" onClick={() => setAltOpen(false)}>✕</button>
          </div>

          <div style={{ flex: 1, overflow: 'auto', padding: 'var(--space-4)' }}>
            <div style={{ background: 'var(--danger-100)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)', marginBottom: 'var(--space-4)', borderLeft: '3px solid var(--danger-500)' }}>
              <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--navy-900)' }}>Current: {selectedName}</div>
              <div style={{ fontSize: 10, color: 'var(--slate-500)', marginTop: 2 }}>OTIF: {carrier.pct}% · Transit: {carrier.transit} · $2.09/lb</div>
            </div>

            {ALTERNATIVES.map((alt, i) => (
              <div key={alt.name} style={{ background: 'var(--white)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)', marginBottom: 'var(--space-3)', borderLeft: '3px solid var(--cerulean-400)', boxShadow: 'var(--shadow-card)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                  <div style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--navy-900)' }}>{i + 1}. {alt.name}</div>
                  <span className="badge badge-success" style={{ fontSize: 9 }}>Better OTIF</span>
                </div>
                <div style={{ fontSize: 10, color: 'var(--slate-700)', display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <div>📈 {alt.otif}</div>
                  <div>⏱ Transit: {alt.transit}</div>
                  <div style={{ color: alt.costDir === 'down' ? 'var(--success-500)' : 'var(--slate-700)' }}>💰 Cost: {alt.cost}</div>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-3)' }}>
                  <button className="btn btn-ghost btn-sm" style={{ flex: 1, fontSize: 10 }} onClick={() => setSelectedName(alt.name)}>View carrier</button>
                  <button className="btn btn-primary btn-sm" style={{ flex: 1, fontSize: 10 }}>✦ Model shift</button>
                </div>
              </div>
            ))}

            <button className="btn btn-ai" style={{ width: '100%', justifyContent: 'center', marginTop: 'var(--space-2)' }} onClick={handleExplain} disabled={explaining}>
              {explaining ? '✦ Asking…' : '✦ Get AI Recommendation'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
