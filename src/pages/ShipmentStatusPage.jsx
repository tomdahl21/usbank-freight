import { useState, useMemo } from 'react'

const ALL_SHIPMENTS = [
  {
    id: 'BOL-2026-10041', pro: '4829-01847',
    carrier: 'Old Dominion', mode: 'LTL',
    qty: 'Full Order', status: 'In Transit', otifStatus: 'On Track', statusCls: 'success',
    cardCls: '',
    origin: 'Chicago, IL', dest: 'Atlanta, GA',
    consignee: "Dick's Sporting Goods", dcName: "Dick's DC – Atlanta",
    contents: 'Athletic footwear – seasonal drop',
    progress: 60, progressCls: 'on-track',
    carrierLine: 'Old Dominion Priority LTL · Est. delivery Aug 15 · 2.1 days avg',
    steps: ['done','active','',''],
    order: 'ORD-2026-8841', orderNote: 'This shipment covers the full order quantity',
    otif: '↗ OTIF Projected: Full', otifCls: 'otif-full',
    legs: [
      { bol: 'BOL-10041', route: 'ORD→ATL', status: 'In Transit', statusCls: 'amber' },
    ],
  },
  {
    id: 'BOL-2026-10038', pro: '2210-88432',
    carrier: 'UPS Freight', mode: 'LTL',
    qty: 'Partial · 2 of 3', qtyCls: 'blue', status: 'At Risk', otifStatus: 'At Risk', statusCls: 'amber',
    cardCls: 'at-risk',
    etaSlip: '⚠ ETA slipped 6 hours',
    origin: 'Los Angeles, CA', dest: 'Denver, CO',
    consignee: 'Adidas', dcName: 'Adidas West Coast FC – Denver',
    contents: 'Footwear – Ultraboost restock',
    progress: 40, progressCls: 'at-risk',
    carrierLine: 'UPS Freight LTL · Est. delivery Aug 14 (TODAY) · At risk of missing window',
    steps: ['done','warn','',''],
    order: 'ORD-2026-8838', orderNote: 'Shipment 2 of 3 · covers approx. 33% of order qty · legs 1 & 3 on track',
    otif: '⚠ OTIF At Risk', otifCls: 'otif-risk',
    legs: [
      { bol: 'BOL-10038', route: 'LAX→DEN', status: 'Delayed', statusCls: 'danger', note: '6-hr ETA slip, terminal congestion at DFW' },
    ],
  },
  {
    id: 'BOL-2026-10031', pro: '9914-22019',
    carrier: 'ABF Freight', mode: 'LTL',
    qty: 'Partial · 1 of 3', qtyCls: 'blue', status: 'Delayed', otifStatus: 'Delayed', statusCls: 'danger',
    cardCls: 'late',
    origin: 'Dallas, TX', dest: 'Nashville, TN',
    consignee: 'Nike', dcName: 'Nike Regional DC – Nashville',
    contents: 'Apparel – training collection',
    progress: 30, progressCls: 'late',
    carrierLine: 'ABF Freight LTL · Was due Aug 13 · Now est. Aug 15',
    steps: ['done','late','',''],
    order: 'ORD-2026-8831', orderNote: 'Shipment 1 of 3 · this leg delayed 2 days · legs 2 & 3 unaffected',
    otif: '✕ OTIF Partial Miss', otifCls: 'otif-miss',
    legs: [
      { bol: 'BOL-10031', route: 'DFW→BNA', status: 'Delayed', statusCls: 'danger', note: '2-day delay — ABF terminal backup in Dallas' },
    ],
  },
  {
    id: 'BOL-2026-10028', pro: '7701-56234',
    carrier: 'XPO Logistics', mode: 'TL',
    qty: 'Full Order', status: 'In Transit', otifStatus: 'On Track', statusCls: 'success',
    cardCls: '',
    origin: 'Memphis, TN', dest: 'Philadelphia, PA',
    consignee: 'Nordstrom', dcName: 'Nordstrom FC – Philadelphia',
    contents: 'Luxury apparel & accessories – fall floor set',
    progress: 85, progressCls: 'on-track',
    carrierLine: 'XPO Logistics TL · Est. delivery Aug 14 by 5 PM',
    steps: ['done','done','active',''],
    order: 'ORD-2026-8828', orderNote: 'This shipment covers the full order quantity · out for delivery now',
    otif: '↗ OTIF Projected: Full', otifCls: 'otif-full',
    legs: [
      { bol: 'BOL-10028', route: 'MEM→PHL', status: 'Out for Delivery', statusCls: 'success' },
    ],
  },
  {
    id: 'BOL-2026-10024', pro: '3308-77601',
    carrier: 'Old Dominion', mode: 'LTL',
    qty: 'Full Order', status: 'Delivered', otifStatus: 'Delivered', statusCls: 'success',
    cardCls: '',
    origin: 'Cincinnati, OH', dest: 'Kansas City, MO',
    consignee: 'REI', dcName: 'REI Regional DC – Kansas City',
    contents: 'Outdoor gear – camping equipment',
    progress: 100, progressCls: 'on-track',
    carrierLine: 'Old Dominion LTL · Delivered Aug 14 at 10:22 AM',
    steps: ['done','done','done','done'],
    order: 'ORD-2026-8824', orderNote: 'Full order delivered on-time · received and confirmed by destination',
    otif: '✓ OTIF: Full & On-time', otifCls: 'otif-full',
    legs: [
      { bol: 'BOL-10024', route: 'CIN→MCI', status: 'Delivered', statusCls: 'success' },
    ],
  },
  {
    id: 'BOL-2026-10019', pro: '5501-33091',
    carrier: 'FedEx Freight', mode: 'LTL',
    qty: 'Full Order', status: 'In Transit', otifStatus: 'On Track', statusCls: 'success',
    cardCls: '',
    origin: 'Chicago, IL', dest: 'Detroit, MI',
    consignee: "Dick's Sporting Goods", dcName: "Dick's DC – Detroit",
    contents: 'Hockey equipment – seasonal',
    progress: 55, progressCls: 'on-track',
    carrierLine: 'FedEx Freight LTL · Est. delivery Aug 15',
    steps: ['done','active','',''],
    order: 'ORD-2026-8819', orderNote: 'Full order — awaiting final leg pick-up scan',
    otif: '↗ OTIF Projected: Full', otifCls: 'otif-full',
    legs: [
      { bol: 'BOL-10019', route: 'ORD→DTW', status: 'In Transit', statusCls: 'amber' },
    ],
  },
  {
    id: 'BOL-2026-10009', pro: '6612-88011',
    carrier: 'ABF Freight', mode: 'LTL',
    qty: 'Full Order', status: 'At Risk', otifStatus: 'At Risk', statusCls: 'amber',
    cardCls: 'at-risk',
    etaSlip: '⚠ ETA slipped 12 hours',
    origin: 'Atlanta, GA', dest: 'Baltimore, MD',
    consignee: 'Academy Sports', dcName: 'Academy Sports DC – Baltimore',
    contents: 'Sporting goods – back-to-school promotion',
    progress: 25, progressCls: 'at-risk',
    carrierLine: 'ABF Freight LTL · Est. delivery Aug 16 · Originally Aug 15',
    steps: ['done','warn','',''],
    order: 'ORD-2026-8809', orderNote: 'Full order · ETA slipped overnight due to weather',
    otif: '⚠ OTIF At Risk', otifCls: 'otif-risk',
    legs: [
      { bol: 'BOL-10009', route: 'ATL→BAL', status: 'Delayed', statusCls: 'danger', note: '12-hr ETA slip — weather delay through I-95 corridor' },
    ],
  },
]

const STATUS_TABS = [
  { label: 'All', count: 342 },
  { label: 'In Transit', count: 187 },
  { label: 'At Risk', count: 28 },
  { label: 'Delayed', count: 14 },
  { label: 'Out for Delivery', count: 41 },
  { label: 'Delivered', count: 72 },
]

const CARRIERS = ['All carriers', 'FedEx Freight', 'UPS Freight', 'SAIA LTL', 'XPO Logistics', 'Old Dominion', 'ABF Freight']
const CUSTOMERS = ['All customers', "Dick's Sporting Goods", 'Nike', 'Adidas', 'Nordstrom', 'REI', 'Academy Sports']
const MILESTONE_LABELS = ['Picked Up', 'In Transit', 'Out for Delivery', 'Delivered']

function StepDot({ state }) {
  const base = 'step-dot'
  if (state === 'done')   return <div className={`${base} done`}>✓</div>
  if (state === 'active') return <div className={`${base} active`}>→</div>
  if (state === 'warn')   return <div className={base} style={{ background: 'var(--amber-500)', boxShadow: '0 0 0 1.5px var(--amber-500)', color: 'var(--white)' }}>→</div>
  if (state === 'late')   return <div className={`${base} late`}>!</div>
  return <div className={base} />
}

function StepLabel({ state, label }) {
  if (state === 'done')   return <div className="step-label done">{label}</div>
  if (state === 'active') return <div className="step-label active">{label}</div>
  if (state === 'warn')   return <div className="step-label" style={{ color: 'var(--amber-500)', fontWeight: 600 }}>{label}</div>
  if (state === 'late')   return <div className="step-label late">{label}</div>
  return <div className="step-label">{label}</div>
}

export default function ShipmentStatusPage() {
  const [statusFilter, setStatusFilter] = useState('All')
  const [carrierFilter, setCarrierFilter] = useState('All carriers')
  const [customerFilter, setCustomerFilter] = useState('All customers')
  const [dateFilter, setDateFilter] = useState('This Week')
  const [search, setSearch] = useState('')
  const [expandedId, setExpandedId] = useState(null)
  const [alertDismissed, setAlertDismissed] = useState(false)

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return ALL_SHIPMENTS.filter(s => {
      if (statusFilter !== 'All' && s.status !== statusFilter) return false
      if (carrierFilter !== 'All carriers' && s.carrier !== carrierFilter) return false
      if (customerFilter !== 'All customers' && s.consignee !== customerFilter) return false
      if (q && ![s.id, s.pro, s.carrier, s.origin, s.dest, s.consignee, s.order].some(v => v?.toLowerCase().includes(q))) return false
      return true
    })
  }, [statusFilter, carrierFilter, customerFilter, search])

  function toggleExpand(id) {
    setExpandedId(prev => prev === id ? null : id)
  }

  return (
    <>
      {/* Filter Bar */}
      <div className="page-filter-bar">
        <div className="search-wrap">
          <span className="search-icon">⌕</span>
          <input
            className="input"
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by PRO#, BOL#, consignee, or city…"
            style={{ minWidth: 280 }}
          />
          {search && (
            <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-400)', fontSize: 14, paddingRight: 8 }}>✕</button>
          )}
        </div>
        <div style={{ width: 1, height: 24, background: 'var(--slate-100)', flexShrink: 0 }} />
        <div className="select-wrap">
          <select value={carrierFilter} onChange={e => setCarrierFilter(e.target.value)}>
            {CARRIERS.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="select-wrap">
          <select value={customerFilter} onChange={e => setCustomerFilter(e.target.value)}>
            {CUSTOMERS.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div style={{ width: 1, height: 24, background: 'var(--slate-100)', flexShrink: 0 }} />
        <div className="status-tabs">
          {STATUS_TABS.map(t => (
            <button key={t.label} className={`status-tab${statusFilter === t.label ? ' active' : ''}`} onClick={() => setStatusFilter(t.label)}>
              {t.label} <span className="tab-count">{t.count}</span>
            </button>
          ))}
        </div>
        <div style={{ width: 1, height: 24, background: 'var(--slate-100)', flexShrink: 0 }} />
        <div className="period-tabs">
          {['Today', 'This Week', 'Last 30 Days'].map(d => (
            <button key={d} className={`period-tab${dateFilter === d ? ' active' : ''}`} onClick={() => setDateFilter(d)}>{d}</button>
          ))}
        </div>
      </div>

      <div className="content">
        <div className="page-header">
          <div>
            <h1 className="page-title">Shipment Status</h1>
            <div className="page-meta">
              {filtered.length} of {ALL_SHIPMENTS.length} shipments
              {search && ` matching "${search}"`}
              {statusFilter !== 'All' && ` · ${statusFilter}`}
              {carrierFilter !== 'All carriers' && ` · ${carrierFilter}`}
              {customerFilter !== 'All customers' && ` · ${customerFilter}`}
              {' '}· Updated 2 min ago
            </div>
          </div>
          <div className="header-actions">
            <button className="btn btn-ghost btn-sm" onClick={() => { setSearch(''); setStatusFilter('All'); setCarrierFilter('All carriers'); setCustomerFilter('All customers') }}>
              Reset filters
            </button>
            <button className="btn btn-ghost btn-sm">↓ Export</button>
            <button className="btn btn-ai btn-sm">✦ AI Summary</button>
          </div>
        </div>

        <div className="stat-row stat-row-4">
          {[
            { label: 'In Transit',       val: 187, delta: '— Tracking normally',  ctx: 'Across all carriers',    cls: '' },
            { label: 'At Risk',          val: 28,  delta: '↑ 6 since yesterday',  ctx: 'May miss delivery window', cls: 'featured' },
            { label: 'Out for Delivery', val: 41,  delta: '↑ On schedule',        ctx: 'Expected today',         cls: '' },
            { label: 'Delivered Today',  val: 72,  delta: '↑ 94.4% OTIF',         ctx: 'Confirmed deliveries',   cls: '' },
          ].map(s => (
            <div key={s.label} className={`stat-card${s.cls ? ` ${s.cls}` : ''}`} style={{ cursor: 'pointer' }} onClick={() => setStatusFilter(s.label === 'Delivered Today' ? 'Delivered' : s.label)}>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.val}</div>
              <span className={`stat-delta ${s.cls === 'featured' ? 'delta-down' : s.delta.startsWith('↑') ? 'delta-up' : 'delta-neutral'}`}>{s.delta}</span>
              <div className="stat-context">{s.ctx}</div>
            </div>
          ))}
        </div>

        {!alertDismissed && (
          <div className="alert-strip warning">
            <span className="alert-icon">⚠</span>
            <div className="alert-body">
              <strong>14 shipments are currently delayed</strong> — 9 on FedEx Freight, 3 on ABF Freight, 2 on UPS Freight. Average delay: 1.4 days.
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => { setStatusFilter('Delayed'); setAlertDismissed(true) }}>View delayed →</button>
            <button className="btn btn-ghost btn-sm" onClick={() => setAlertDismissed(true)}>Dismiss</button>
          </div>
        )}

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 'var(--space-10)', color: 'var(--slate-400)' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>📦</div>
            <div style={{ fontWeight: 600, color: 'var(--slate-600)', marginBottom: 4 }}>No shipments found</div>
            <div style={{ fontSize: 13 }}>Try adjusting your filters or search term.</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {filtered.map(s => {
              const expanded = expandedId === s.id
              return (
                <div key={s.id} className={`shipment-card${s.cardCls ? ` ${s.cardCls}` : ''}`}>
                  <div className="shipment-card-header">
                    <div className="shipment-ids" style={{ cursor: 'pointer' }} onClick={() => toggleExpand(s.id)}>
                      <div className="shipment-id-block">
                        <div className="s-id-label">BOL #</div>
                        <div className="s-id-val">{s.id}</div>
                      </div>
                      <div className="shipment-id-block">
                        <div className="s-id-label">PRO #</div>
                        <div className="s-id-val">{s.pro}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                      {s.consignee && (
                        <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--cerulean-500)', background: 'var(--cerulean-050)', borderRadius: 100, padding: '2px 10px', border: '1px solid var(--cerulean-100)' }}>
                          → {s.consignee}
                        </span>
                      )}
                      <span style={{ fontSize: 'var(--text-xs)', color: 'var(--slate-500)' }}>{s.carrier}</span>
                      <span className="badge badge-navy">{s.mode}</span>
                      <span className={`badge badge-${s.qtyCls || 'outline'}`}>{s.qty}</span>
                      <span className={`badge badge-${s.statusCls}`}>{s.status}</span>
                      {s.etaSlip && <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 600, color: 'var(--amber-500)', background: 'var(--amber-050)', border: '1px solid var(--amber-200)', borderRadius: 100, padding: '2px 8px' }}>{s.etaSlip}</span>}
                      <button
                        onClick={() => toggleExpand(s.id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-400)', fontSize: 12, marginLeft: 4, padding: '2px 6px' }}
                        title={expanded ? 'Collapse' : 'Expand legs'}
                      >
                        {expanded ? '▲' : '▼'}
                      </button>
                    </div>
                  </div>

                  <div className="shipment-route">
                    <div className="route-node">
                      <div className="route-city">{s.origin}</div>
                      <div className="route-detail">Origin</div>
                    </div>
                    <div className="route-line">
                      <div className="progress-track">
                        <div className={`progress-fill ${s.progressCls}`} style={{ width: `${s.progress}%` }} />
                        {s.progress < 100 && <div className={`progress-dot ${s.progressCls}`} style={{ left: `${s.progress}%` }} />}
                      </div>
                      <div className="route-carrier">{s.carrierLine}</div>
                    </div>
                    <div className="route-node" style={{ textAlign: 'right' }}>
                      <div className="route-city">{s.dest}</div>
                      <div className="route-detail">
                        {s.consignee ? <span style={{ color: 'var(--cerulean-500)', fontWeight: 600 }}>{s.dcName}</span> : 'Destination'}
                      </div>
                    </div>
                  </div>

                  <div className="milestone-steps">
                    {MILESTONE_LABELS.map((label, i) => {
                      const state = s.steps[i] || ''
                      return (
                        <div key={label} className={`milestone-step${state === 'done' ? ' done' : state === 'active' || state === 'warn' || state === 'late' ? ' active' : ''}`}>
                          <StepDot state={state} />
                          <StepLabel state={state} label={label} />
                        </div>
                      )
                    })}
                  </div>

                  {/* Expanded legs detail */}
                  {expanded && s.legs && (
                    <div style={{ margin: '0 var(--space-6) var(--space-4)', padding: 'var(--space-4)', background: 'var(--slate-050)', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-100)' }}>
                      <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--slate-500)', marginBottom: 10, fontFamily: 'var(--font-mono)' }}>Shipment Legs</div>
                      {s.legs.map((leg, i) => (
                        <div key={leg.bol} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '8px 0', borderBottom: i < s.legs.length - 1 ? '1px solid var(--slate-100)' : undefined }}>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--slate-400)', minWidth: 80, paddingTop: 2 }}>{leg.bol}</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--navy-900)' }}>{leg.route}</div>
                            {leg.note && <div style={{ fontSize: 11, color: 'var(--amber-600)', marginTop: 2 }}>{leg.note}</div>}
                          </div>
                          <span className={`badge badge-${leg.statusCls}`}>{leg.status}</span>
                        </div>
                      ))}
                      <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
                        <button className="btn btn-ghost btn-sm">View BOL</button>
                        <button className="btn btn-ghost btn-sm">Contact carrier</button>
                        {s.status === 'At Risk' && <button className="btn btn-danger btn-sm">File claim</button>}
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginTop: 'var(--space-3)', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--slate-100)', fontSize: 'var(--text-xs)', color: 'var(--slate-500)', padding: 'var(--space-3) var(--space-6)' }}>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                      <strong style={{ color: 'var(--slate-700)' }}>Order #{s.order}</strong>
                      <span>·</span>
                      <span>{s.orderNote}</span>
                      {s.contents && <><span>·</span><span style={{ color: 'var(--slate-400)' }}>{s.contents}</span></>}
                    </div>
                    <span className={`otif-forecast ${s.otifCls}`}>{s.otif}</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <style>{`
        .otif-forecast { display: inline-flex; align-items: center; gap: 4px; font-size: 10px; font-weight: 700; font-family: var(--font-mono); padding: 2px 9px; border-radius: 100px; flex-shrink: 0; }
        .otif-full    { background: var(--success-100); color: var(--success-500); }
        .otif-risk    { background: var(--amber-050); color: var(--amber-500); border: 1px solid var(--amber-200); }
        .otif-miss    { background: var(--danger-100); color: var(--danger-500); }
        .otif-partial { background: var(--cerulean-050); color: var(--cerulean-500); border: 1px solid var(--cerulean-100); }
      `}</style>
    </>
  )
}
