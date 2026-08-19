import { useState, useMemo } from 'react'

const INITIAL_EXCEPTIONS = [
  {
    id: 'EX-0481', type: 'overcharge', typeLabel: 'Overcharge',
    title: 'Weight Discrepancy — ABF Freight',
    desc: 'Billed weight 760 lbs exceeds BOL-declared 640 lbs on Atlanta → Baltimore lane. Accessorial liftgate charge also not on original BOL.',
    invoice: 'INV-2026-00041519', pro: '5590-31002', carrier: 'ABF Freight', lane: 'Atlanta→Baltimore', consignee: 'Academy Sports',
    impact: '$224.50', impactCls: 'danger', impactVal: 224.50,
    age: '9 days', ageCls: 'aging', status: 'open',
    actions: ['Approve', 'Dispute', 'Escalate'],
  },
  {
    id: 'EX-0479', type: 'mismatch', typeLabel: 'BOL Mismatch',
    title: 'Freight Class Upgrade — UPS Freight',
    desc: 'Carrier billed at Class 85, BOL declared Class 70. $82.10 variance. PRO 2210-88432.',
    invoice: 'INV-2026-00041721', pro: '2210-88432', carrier: 'UPS Freight', lane: 'LA→Denver', consignee: 'Adidas',
    impact: '$82.10', impactCls: 'amber', impactVal: 82.10,
    age: '3 days', ageCls: 'fresh', status: 'open',
    actions: ['Approve', 'Dispute', 'Escalate'],
  },
  {
    id: 'EX-0478', type: 'late', typeLabel: 'Late Delivery',
    title: 'Late Delivery — FedEx Freight',
    desc: 'Shipment arrived 1.8 days after contracted delivery window. BOL-2026-10031. Dallas → Nashville lane. Third late delivery from this carrier in 30 days.',
    invoice: 'INV-2026-00041654', pro: '9914-22019', carrier: 'FedEx Freight', lane: 'Dallas→Nashville', consignee: 'Nike',
    impact: '$0 (OTIF violation)', impactCls: '', impactVal: 0,
    age: '2 days', ageCls: 'fresh', status: 'open',
    actions: ['File OTIF Claim', 'Dismiss'],
  },
  {
    id: 'EX-0477', type: 'duplicate', typeLabel: 'Duplicate',
    title: 'Duplicate Invoice Detected — SAIA LTL',
    desc: 'INV-2026-00041644 appears to be a duplicate of INV-2026-00040982 submitted Aug 5. Same PRO number, same lane, same amount.',
    invoice: 'INV-2026-00041644', pro: '8801-44099', carrier: 'SAIA LTL', lane: 'Memphis→St. Louis', consignee: 'REI',
    impact: '$1,441.75', impactCls: 'danger', impactVal: 1441.75,
    age: '1 day', ageCls: 'fresh', status: 'open',
    actions: ['Void Duplicate', 'Review'],
  },
  {
    id: 'EX-0471', type: 'overcharge', typeLabel: 'Overcharge',
    title: 'Unauthorized Accessorial — FedEx Freight',
    desc: 'Residential delivery surcharge ($145.00) billed but not on original BOL. Delivery address is a commercial dock.',
    invoice: 'INV-2026-00041590', pro: '6612-88011', carrier: 'FedEx Freight', lane: 'Chicago→Detroit', consignee: "Dick's Sporting Goods",
    impact: '$145.00', impactCls: 'danger', impactVal: 145.00,
    age: '5 days', ageCls: 'fresh', status: 'open',
    actions: ['Approve', 'Dispute', 'Escalate'],
  },
  {
    id: 'EX-0465', type: 'mismatch', typeLabel: 'BOL Mismatch',
    title: 'Freight Class Upgrade — ABF Freight',
    desc: 'BOL declared Class 110, carrier billed Class 125. $224.50 variance on Atlanta → Baltimore.',
    invoice: 'INV-2026-00041519', pro: '5590-31002', carrier: 'ABF Freight', lane: 'Atlanta→Baltimore', consignee: 'Academy Sports',
    impact: '$224.50', impactCls: 'danger', impactVal: 224.50,
    age: '9 days', ageCls: 'aging', status: 'open',
    actions: ['Approve', 'Dispute', 'Escalate'],
  },
  {
    id: 'EX-0441', type: 'late', typeLabel: 'Late Delivery',
    title: 'Late Delivery — ABF Freight (15+ days open)',
    desc: 'Delivery 2.4 days late on Dallas → Atlanta lane. Exception has not been actioned. Carrier has not responded to initial inquiry.',
    invoice: 'INV-2026-00040988', pro: '3301-55012', carrier: 'ABF Freight', lane: 'Dallas→Atlanta', consignee: 'Nike',
    impact: '$0 (OTIF violation)', impactCls: '', impactVal: 0,
    age: '17 days', ageCls: 'overdue', status: 'open',
    actions: ['Escalate Now', 'View History'],
  },
  {
    id: 'EX-0418', type: 'mismatch', typeLabel: 'BOL Mismatch',
    title: 'Weight Variance — Old Dominion',
    desc: 'Billed weight 1,240 lbs vs BOL-declared 1,100 lbs. $47.80 variance. Within tolerance, but logged for audit trail.',
    invoice: 'INV-2026-00041488', pro: '3308-77601', carrier: 'Old Dominion', lane: 'Cincinnati→Kansas City', consignee: 'REI',
    impact: '$47.80', impactCls: 'amber', impactVal: 47.80,
    age: '1 day', ageCls: 'fresh', status: 'open',
    actions: ['Approve', 'Flag for Review'],
  },
]

const TYPE_TABS = [
  { label: 'All',           count: 37, type: null },
  { label: 'BOL Mismatch',  count: 14, type: 'mismatch' },
  { label: 'Overcharge',    count: 10, type: 'overcharge' },
  { label: 'Duplicate',     count: 5,  type: 'duplicate' },
  { label: 'Late Delivery', count: 8,  type: 'late' },
]

const CARRIERS = ['All carriers', 'FedEx Freight', 'ABF Freight', 'UPS Freight', 'SAIA LTL', 'Old Dominion']
const AGE_FILTERS = ['Any age', '0–7 days', '8–14 days', '15+ days']

const ACTION_MAP = {
  'Approve':          { status: 'approved',  label: 'Approved',   cls: 'success' },
  'Dispute':          { status: 'disputed',  label: 'Disputed',   cls: 'danger' },
  'File OTIF Claim':  { status: 'disputed',  label: 'Claim Filed',cls: 'danger' },
  'Void Duplicate':   { status: 'voided',    label: 'Voided',     cls: 'slate' },
  'Escalate':         { status: 'escalated', label: 'Escalated',  cls: 'amber' },
  'Escalate Now':     { status: 'escalated', label: 'Escalated',  cls: 'amber' },
  'Dismiss':          { status: 'dismissed', label: 'Dismissed',  cls: 'slate' },
}

export default function ExceptionsPage() {
  const [exceptions, setExceptions] = useState(INITIAL_EXCEPTIONS)
  const [activeType, setActiveType] = useState('All')
  const [carrierFilter, setCarrierFilter] = useState('All carriers')
  const [ageFilter, setAgeFilter] = useState('Any age')
  const [selected, setSelected] = useState(new Set())
  const [showResolved, setShowResolved] = useState(false)
  const [toast, setToast] = useState(null)
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const activeTab = TYPE_TABS.find(t => t.label === activeType)
    return exceptions.filter(ex => {
      const isResolved = ['approved','disputed','voided','escalated','dismissed'].includes(ex.status)
      if (!showResolved && isResolved) return false
      if (activeTab?.type && ex.type !== activeTab.type) return false
      if (carrierFilter !== 'All carriers' && ex.carrier !== carrierFilter) return false
      if (ageFilter === '0–7 days' && parseInt(ex.age) > 7) return false
      if (ageFilter === '8–14 days' && (parseInt(ex.age) < 8 || parseInt(ex.age) > 14)) return false
      if (ageFilter === '15+ days' && parseInt(ex.age) < 15) return false
      return true
    })
  }, [exceptions, activeType, carrierFilter, ageFilter, showResolved])

  const openCount     = exceptions.filter(e => e.status === 'open').length
  const totalImpact   = exceptions.filter(e => e.status === 'open').reduce((s, e) => s + e.impactVal, 0)
  const selectedArray = [...selected]

  function handleAction(id, action) {
    const update = ACTION_MAP[action]
    if (!update) return
    setExceptions(prev => prev.map(ex => ex.id === id ? { ...ex, status: update.status } : ex))
    setSelected(prev => { const n = new Set(prev); n.delete(id); return n })
    showToast(`${update.label} — exception ${id}`)
  }

  function bulkAction(action) {
    const update = ACTION_MAP[action]
    if (!update) return
    setExceptions(prev => prev.map(ex => selected.has(ex.id) ? { ...ex, status: update.status } : ex))
    showToast(`${selectedArray.length} exception${selectedArray.length !== 1 ? 's' : ''} ${update.label.toLowerCase()}`)
    setSelected(new Set())
  }

  function toggleSelect(id) {
    setSelected(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
  }

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <>
      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, background: 'var(--navy-900)', color: '#fff', padding: '10px 18px', borderRadius: 8, fontSize: 13, fontWeight: 500, zIndex: 999, boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
          ✓ {toast}
        </div>
      )}

      {/* Filter Bar */}
      <div className="page-filter-bar">
        <div className="select-wrap">
          <select value={carrierFilter} onChange={e => setCarrierFilter(e.target.value)}>
            {CARRIERS.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="status-tabs">
          {TYPE_TABS.map(t => (
            <button key={t.label} className={`status-tab${activeType === t.label ? ' active' : ''}`} onClick={() => setActiveType(t.label)}>
              {t.label} <span className="tab-count">{t.count}</span>
            </button>
          ))}
        </div>
        <div className="select-wrap">
          <select value={ageFilter} onChange={e => setAgeFilter(e.target.value)}>
            {AGE_FILTERS.map(a => <option key={a}>{a}</option>)}
          </select>
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--slate-500)', cursor: 'pointer', flexShrink: 0 }}>
          <input type="checkbox" checked={showResolved} onChange={e => setShowResolved(e.target.checked)} />
          Show resolved
        </label>
        {selectedArray.length > 0 && (
          <>
            <span style={{ fontSize: 12, color: 'var(--slate-500)', flexShrink: 0 }}>{selectedArray.length} selected</span>
            <button className="btn btn-success btn-sm" onClick={() => bulkAction('Approve')}>✓ Approve all</button>
            <button className="btn btn-danger btn-sm" onClick={() => bulkAction('Dispute')}>✕ Dispute all</button>
          </>
        )}
      </div>

      <div className="content">
        <div className="page-header">
          <div>
            <h1 className="page-title">Exceptions</h1>
            <div className="page-meta">
              {openCount} open · ${totalImpact.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} total impact
              {activeType !== 'All' && ` · ${activeType}`}
              {carrierFilter !== 'All carriers' && ` · ${carrierFilter}`}
            </div>
          </div>
          <div className="header-actions">
            <button className="btn btn-ghost btn-sm">↓ Export</button>
            <button className="btn btn-ai btn-sm">✦ AI Review</button>
          </div>
        </div>

        <div className="stat-row stat-row-4">
          {[
            { label: 'Open Exceptions',    val: openCount, delta: '↑ 12 new this week', ctx: 'Requires resolution',  cls: '', action: () => setShowResolved(false) },
            { label: 'Total $ Impact',     val: `$${(totalImpact/1000).toFixed(1)}K`, delta: `Across ${openCount} exceptions`, ctx: 'Avg $58.53 each', cls: '', action: null },
            { label: 'Avg Age',            val: '6.4d', delta: '— Stable', ctx: 'Days open',                        cls: '', action: null },
            { label: 'Resolved This Week', val: 24, delta: '↑ 4 vs last week', ctx: '$1,840 recovered',             cls: 'featured', action: () => setShowResolved(true) },
          ].map(s => (
            <div key={s.label} className={`stat-card${s.cls ? ` ${s.cls}` : ''}`} style={{ cursor: s.action ? 'pointer' : undefined }} onClick={s.action || undefined}>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.val}</div>
              <span className={`stat-delta ${s.delta.startsWith('↑') && s.cls !== 'featured' ? 'delta-down' : s.delta.startsWith('↑') ? 'delta-up' : 'delta-neutral'}`}>{s.delta}</span>
              <div className="stat-context">{s.ctx}</div>
            </div>
          ))}
        </div>

        <div className="ai-card" style={{ marginBottom: 'var(--space-5)' }}>
          <div className="ai-card-header">
            <span className="ai-badge">✦ AI Insight</span>
            <span className="ai-ts">Aug 14, 2026</span>
          </div>
          <p className="ai-card-text">
            12 of your {openCount} open exceptions are <strong>BOL freight class mismatches</strong> — all concentrated on LTL shipments from FedEx Freight and ABF Freight. 9 follow a pattern: billed class is one tier higher than declared. Batch-disputing these could recover <strong>~$1,840</strong> and is low-risk based on supporting BOL documentation.
          </p>
          <div className="ai-card-actions">
            <button className="btn btn-ai btn-sm" onClick={() => { setActiveType('BOL Mismatch'); setSelected(new Set(filtered.filter(e => e.type === 'mismatch').map(e => e.id))) }}>
              ✦ Select all BOL mismatches
            </button>
            <button className="btn btn-ghost btn-sm">Review individually</button>
          </div>
        </div>

        <div className="table-card">
          <div className="table-header">
            <div>
              <div className="chart-title">Exceptions — Sorted by Impact</div>
              <div className="chart-subtitle">{filtered.length} showing · {openCount} total open</div>
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              <button className="btn btn-ghost btn-sm">Sort by age ↑</button>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 48, color: 'var(--slate-400)' }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>✓</div>
              <div style={{ fontWeight: 600, color: 'var(--slate-600)', marginBottom: 4 }}>No exceptions match</div>
              <div style={{ fontSize: 12 }}>Try changing your filters or showing resolved items.</div>
            </div>
          ) : (
            filtered.map(exc => {
              const isResolved = exc.status !== 'open'
              const isSelected = selected.has(exc.id)
              return (
                <div
                  key={exc.id}
                  className="exception-row"
                  style={{
                    opacity: isResolved ? 0.55 : 1,
                    background: isSelected ? 'var(--cerulean-050)' : undefined,
                    borderLeft: isSelected ? '3px solid var(--cerulean-400)' : undefined,
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelect(exc.id)}
                    style={{ marginRight: 8, flexShrink: 0, cursor: 'pointer' }}
                  />
                  <div className={`exc-type-dot ${exc.type}`} />
                  <div className="exc-body">
                    <div className="exc-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {exc.title}
                      {isResolved && <span className={`badge badge-${ACTION_MAP[Object.keys(ACTION_MAP).find(k => ACTION_MAP[k].status === exc.status)]?.cls || 'slate'}`} style={{ fontSize: 9 }}>{exc.status}</span>}
                    </div>
                    <div className="exc-desc">{exc.desc}</div>
                    <div className="exc-meta">
                      {[
                        { label: 'Consignee', val: exc.consignee, cls: 'consignee' },
                        { label: 'Invoice',   val: exc.invoice },
                        { label: 'PRO',       val: exc.pro },
                        { label: 'Carrier',   val: exc.carrier },
                        { label: 'Lane',      val: exc.lane },
                        { label: 'Impact',    val: exc.impact, cls: exc.impactCls },
                      ].map(m => (
                        <div key={m.label} className="exc-meta-item">
                          <div className="exc-meta-label">{m.label}</div>
                          <div className={`exc-meta-val${m.cls ? ` ${m.cls}` : ''}`}>{m.val}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="exc-actions">
                    <span className={`exc-age ${exc.ageCls}`}>{exc.age}</span>
                    {!isResolved && (
                      <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                        {exc.actions.map(action => {
                          const map = ACTION_MAP[action]
                          const btnCls = action.includes('Approve') || action.includes('Void') ? 'btn-success'
                            : action.includes('Dispute') || action.includes('OTIF') ? 'btn-danger'
                            : action.includes('Escalate') ? 'btn-primary'
                            : 'btn-ghost'
                          return (
                            <button key={action} className={`btn ${btnCls} btn-sm`} onClick={() => handleAction(exc.id, action)}>
                              {action}
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )
            })
          )}

          <div className="table-footer">
            <div className="table-count">Showing {filtered.length} exceptions</div>
            <div className="pagination">
              <button className="page-btn" disabled={page === 1} onClick={() => setPage(p => p - 1)}>‹</button>
              {[1,2,3,4,5].map(n => (
                <button key={n} className={`page-btn${page === n ? ' active' : ''}`} onClick={() => setPage(n)}>{n}</button>
              ))}
              <button className="page-btn" onClick={() => setPage(p => Math.min(p+1,5))}>›</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
