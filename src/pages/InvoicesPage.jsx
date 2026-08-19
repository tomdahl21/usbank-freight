import { useState, useMemo } from 'react'

const INITIAL_INVOICES = [
  { checked: false, id: 'INV-2026-00041897', pro: '4829-01847', carrier: 'FedEx Freight',  carrierId: 'fedex', mode: 'LTL', route: 'Chicago → Atlanta',          consignee: "Dick's Sporting Goods", cls: 'Class 85',    billed: '1,240 lbs', contracted: '$4,180.00', billed_amt: '$4,218.34', delta: '+$38.34',   deltaUp: true,  otif: 'On Time', otifCls: 'success', status: 'Paid',          statusCls: 'success', rowCls: '' },
  { checked: true,  id: 'INV-2026-00041721', pro: '2210-88432', carrier: 'UPS Freight',    carrierId: 'ups',   mode: 'LTL', route: 'LA → Denver',                consignee: 'Adidas',                cls: 'Class 70⚠', clsWarn: true, billed: '580 lbs',  contracted: '$810.00',  billed_amt: '$892.10',  delta: '+$82.10',   deltaUp: true,  otif: 'Late',    otifCls: 'amber',   status: 'Pending Audit', statusCls: 'amber',   rowCls: 'row-flagged' },
  { checked: false, id: 'INV-2026-00041654', pro: '9914-22019', carrier: 'SAIA LTL',       carrierId: 'saia',  mode: 'LTL', route: 'Dallas → Nashville',         consignee: 'Nike',                  cls: 'Class 92.5',  billed: '340 lbs',  contracted: '$1,320.00', billed_amt: '$1,441.75', delta: '+$121.75', deltaUp: true,  otif: 'Short',   otifCls: 'danger',  status: 'Exception',     statusCls: 'danger',  rowCls: 'row-error' },
  { checked: false, id: 'INV-2026-00041523', pro: '7701-56234', carrier: 'XPO Logistics',  carrierId: 'xpo',   mode: 'TL',  route: 'Memphis → Philadelphia',     consignee: 'Nordstrom',             cls: 'N/A (TL)',    billed: 'N/A',       contracted: '$12,888.00',billed_amt: '$12,888.00',delta: '$0.00',    deltaUp: false, otif: 'On Time', otifCls: 'success', status: 'Processed',     statusCls: 'blue',    rowCls: '' },
  { checked: false, id: 'INV-2026-00041488', pro: '3308-77601', carrier: 'Old Dominion',   carrierId: 'od',    mode: 'LTL', route: 'Cincinnati → Kansas City',    consignee: 'REI',                   cls: 'Class 100',   billed: '1,240 lbs', contracted: '$2,056.70', billed_amt: '$2,104.50', delta: '+$47.80',   deltaUp: true,  otif: 'On Time', otifCls: 'success', status: 'Paid',          statusCls: 'success', rowCls: '' },
  { checked: false, id: 'INV-2026-00041401', pro: '1102-66781', carrier: 'ABF Freight',    carrierId: 'abf',   mode: 'LTL', route: 'Atlanta → Baltimore',        consignee: 'Academy Sports',        cls: 'Class 125⚠', clsWarn: true, billed: '760 lbs',  contracted: '$1,890.00', billed_amt: '$2,114.50', delta: '+$224.50', deltaUp: true,  otif: 'On Time', otifCls: 'success', status: 'Exception',     statusCls: 'danger',  rowCls: 'row-flagged' },
  { checked: false, id: 'INV-2026-00041388', pro: '9903-41220', carrier: 'FedEx Freight',  carrierId: 'fedex', mode: 'LTL', route: 'Chicago → Detroit',          consignee: "Dick's Sporting Goods", cls: 'Class 70',    billed: '920 lbs',  contracted: '$1,260.00', billed_amt: '$1,405.00', delta: '+$145.00', deltaUp: true,  otif: 'On Time', otifCls: 'success', status: 'Exception',     statusCls: 'danger',  rowCls: 'row-flagged' },
  { checked: false, id: 'INV-2026-00041322', pro: '5508-92034', carrier: 'Old Dominion',   carrierId: 'od',    mode: 'LTL', route: 'Cincinnati → Kansas City',    consignee: 'REI',                   cls: 'Class 100',   billed: '1,240 lbs', contracted: '$2,056.70', billed_amt: '$2,056.70', delta: '$0.00',    deltaUp: false, otif: 'On Time', otifCls: 'success', status: 'Paid',          statusCls: 'success', rowCls: '' },
]

const STATUS_TABS = [
  { label: 'All', count: 18340 }, { label: 'Paid', count: 12841 },
  { label: 'Pending Audit', count: 3210 }, { label: 'Exception', count: 248 }, { label: 'Voided', count: 41 },
]
const CARRIERS = ['All carriers', 'FedEx Freight', 'UPS Freight', 'SAIA LTL', 'XPO Logistics', 'Old Dominion', 'ABF Freight']
const MODES    = ['All modes', 'LTL', 'TL', 'Parcel']

const STATUS_MAP = {
  approve: { status: 'Paid',     statusCls: 'success', rowCls: '' },
  dispute: { status: 'Disputed', statusCls: 'danger',  rowCls: 'row-flagged' },
}

export default function InvoicesPage() {
  const [invoices, setInvoices]         = useState(INITIAL_INVOICES)
  const [activeStatus, setActiveStatus] = useState('All')
  const [carrierFilter, setCarrierFilter] = useState('All carriers')
  const [modeFilter, setModeFilter]     = useState('All modes')
  const [search, setSearch]             = useState('')
  const [selectedId, setSelectedId]     = useState(INITIAL_INVOICES[1].id)
  const [toast, setToast]               = useState(null)

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return invoices.filter(inv => {
      if (activeStatus !== 'All' && inv.status !== activeStatus) return false
      if (carrierFilter !== 'All carriers' && inv.carrier !== carrierFilter) return false
      if (modeFilter !== 'All modes' && inv.mode !== modeFilter) return false
      if (q && ![inv.id, inv.pro, inv.carrier, inv.route, inv.consignee].some(v => v?.toLowerCase().includes(q))) return false
      return true
    })
  }, [invoices, activeStatus, carrierFilter, modeFilter, search])

  const selectedInvoice = invoices.find(i => i.id === selectedId) || invoices[0]

  function updateStatus(id, action) {
    const update = STATUS_MAP[action]
    setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, ...update } : inv))
    showToast(action === 'approve' ? `Invoice approved — marked as Paid` : `Invoice disputed — marked for review`)
  }

  function toggleCheck(id) {
    setInvoices(prev => prev.map(inv => inv.id === id ? { ...inv, checked: !inv.checked } : inv))
  }

  function bulkApprove() {
    const ids = invoices.filter(i => i.checked).map(i => i.id)
    setInvoices(prev => prev.map(inv => ids.includes(inv.id) ? { ...inv, ...STATUS_MAP.approve, checked: false } : inv))
    showToast(`${ids.length} invoice${ids.length !== 1 ? 's' : ''} approved`)
  }

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(null), 3000)
  }

  const checkedCount = invoices.filter(i => i.checked).length

  return (
    <>
      {/* Toast */}
      {toast && (
        <div style={{ position: 'fixed', bottom: 24, right: 24, background: 'var(--navy-900)', color: '#fff', padding: '10px 18px', borderRadius: 8, fontSize: 13, fontWeight: 500, zIndex: 999, boxShadow: '0 4px 20px rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', gap: 8 }}>
          ✓ {toast}
        </div>
      )}

      {/* Filter Bar */}
      <div className="page-filter-bar">
        <div className="search-wrap">
          <span className="search-icon">⌕</span>
          <input
            className="input" type="text" value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search Invoice #, PRO#, carrier, consignee…"
            style={{ minWidth: 240 }}
          />
          {search && <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-400)', fontSize: 14, paddingRight: 8 }}>✕</button>}
        </div>
        <div className="select-wrap">
          <select value={carrierFilter} onChange={e => setCarrierFilter(e.target.value)}>
            {CARRIERS.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="select-wrap">
          <select value={modeFilter} onChange={e => setModeFilter(e.target.value)}>
            {MODES.map(m => <option key={m}>{m}</option>)}
          </select>
        </div>
        <div className="status-tabs">
          {STATUS_TABS.map(t => (
            <button key={t.label} className={`status-tab${activeStatus === t.label ? ' active' : ''}`} onClick={() => setActiveStatus(t.label)}>
              {t.label} <span className="tab-count">{t.count.toLocaleString()}</span>
            </button>
          ))}
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
          {checkedCount > 0 && (
            <>
              <span style={{ fontSize: 12, color: 'var(--slate-500)' }}>{checkedCount} selected</span>
              <button className="btn btn-success btn-sm" onClick={bulkApprove}>✓ Approve {checkedCount}</button>
            </>
          )}
          <button className="btn btn-ghost btn-sm">↓ Export CSV</button>
        </div>
      </div>

      {/* Two-panel workspace */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', height: 'calc(100vh - var(--topbar-height) - var(--suggest-height) - 57px)', overflow: 'hidden' }}>

        {/* Left: Invoice Table */}
        <div style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--slate-100)' }}>
          <div style={{ overflow: 'auto', flex: 1 }}>
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 48, color: 'var(--slate-400)' }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>🧾</div>
                <div style={{ fontWeight: 600, color: 'var(--slate-600)', marginBottom: 4 }}>No invoices match</div>
                <div style={{ fontSize: 12 }}>Try adjusting your filters.</div>
              </div>
            ) : (
              <table style={{ minWidth: 960 }}>
                <thead>
                  <tr>
                    <th className="td-check"><input type="checkbox" onChange={e => setInvoices(prev => prev.map(i => ({ ...i, checked: e.target.checked })))} /></th>
                    <th className="sortable">Invoice / PRO</th>
                    <th>Consignee</th>
                    <th>Carrier</th>
                    <th>Mode</th>
                    <th>Route</th>
                    <th>Class</th>
                    <th className="td-right sortable">Contracted</th>
                    <th className="td-right sortable">Billed</th>
                    <th className="td-right sortable">Delta</th>
                    <th>OTIF</th>
                    <th>Status</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(inv => (
                    <tr
                      key={inv.id}
                      className={`${inv.rowCls}${selectedId === inv.id ? ' selected' : ''}`}
                      style={{ cursor: 'pointer', background: selectedId === inv.id ? 'var(--cerulean-050)' : undefined }}
                      onClick={() => setSelectedId(inv.id)}
                    >
                      <td className="td-check"><input type="checkbox" checked={inv.checked} onChange={() => toggleCheck(inv.id)} onClick={e => e.stopPropagation()} /></td>
                      <td><div className="td-mono">{inv.id}</div><div className="td-sub">PRO: {inv.pro}</div></td>
                      <td style={{ fontSize: 'var(--text-xs)', fontWeight: 500, color: 'var(--cerulean-500)' }}>{inv.consignee}</td>
                      <td style={{ fontSize: 'var(--text-xs)' }}>{inv.carrier}</td>
                      <td><span className="badge badge-navy">{inv.mode}</span></td>
                      <td style={{ fontSize: 'var(--text-xs)', color: 'var(--slate-500)', whiteSpace: 'nowrap' }}>{inv.route}</td>
                      <td className="td-mono" style={{ fontSize: 10, color: inv.clsWarn ? 'var(--amber-500)' : undefined }}>{inv.cls}</td>
                      <td className="td-mono td-right">{inv.contracted}</td>
                      <td className="td-mono td-right">{inv.billed_amt}</td>
                      <td className="td-mono td-right" style={{ color: inv.delta === '$0.00' ? 'var(--slate-500)' : 'var(--danger-500)' }}>{inv.delta}</td>
                      <td><span className={`badge badge-${inv.otifCls}`}>{inv.otif}</span></td>
                      <td><span className={`badge badge-${inv.statusCls}`}>{inv.status}</span></td>
                      <td onClick={e => e.stopPropagation()} style={{ display: 'flex', gap: 4 }}>
                        {inv.status !== 'Paid' && inv.status !== 'Processed' && (
                          <>
                            <button className="btn btn-success btn-sm" style={{ padding: '3px 8px', fontSize: 10 }} onClick={() => updateStatus(inv.id, 'approve')}>✓</button>
                            <button className="btn btn-danger btn-sm" style={{ padding: '3px 8px', fontSize: 10 }} onClick={() => updateStatus(inv.id, 'dispute')}>✕</button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="table-footer">
            <div className="table-count">Showing {filtered.length} of {invoices.length} loaded invoices</div>
            <div className="pagination">
              <button className="page-btn" disabled>‹</button>
              {[1,2,3,4,5].map(n => (
                <button key={n} className={`page-btn${n === 1 ? ' active' : ''}`}>{n}</button>
              ))}
              <button className="page-btn">›</button>
            </div>
          </div>
        </div>

        {/* Right: Detail Panel */}
        <div style={{ overflow: 'auto', padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', background: 'var(--off-white)' }}>

          {/* AI Insight */}
          <div className="ai-card">
            <div className="ai-card-header">
              <span className="ai-badge">✦ AI Insight</span>
              <span className="ai-ts">Aug 14, 2026</span>
            </div>
            <p className="ai-card-text">
              <strong>UPS Freight</strong> has billed Class 85 on 7 of 12 recent LA → Denver shipments where the BOL declares Class 70. This pattern suggests systematic reclassification — not measurement error. Filing disputes on these 7 invoices could recover <strong>~$574.70</strong>.
            </p>
            <div className="ai-card-actions">
              <button className="btn btn-ai btn-sm">✦ Draft disputes</button>
              <button className="btn btn-ghost btn-sm">View all 7</button>
            </div>
          </div>

          {/* Invoice Detail */}
          {selectedInvoice && (
            <div className="chart-card">
              <div className="chart-header">
                <div>
                  <div className="chart-title">Invoice Detail</div>
                  <div className="chart-subtitle">{selectedInvoice.id}</div>
                </div>
                <span className={`badge badge-${selectedInvoice.statusCls}`}>{selectedInvoice.status}</span>
              </div>
              <div className="chart-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                {[
                  { label: 'Consignee',    val: selectedInvoice.consignee,  blue: true },
                  { label: 'Carrier',      val: selectedInvoice.carrier },
                  { label: 'Mode',         val: selectedInvoice.mode },
                  { label: 'Route',        val: selectedInvoice.route },
                  { label: 'PRO #',        val: selectedInvoice.pro,        mono: true },
                  { label: 'Freight Class',val: selectedInvoice.cls,        warn: selectedInvoice.clsWarn },
                  { label: 'Contracted $', val: selectedInvoice.contracted, mono: true },
                  { label: 'Billed $',     val: selectedInvoice.billed_amt, mono: true },
                  { label: 'Delta',        val: selectedInvoice.delta,      mono: true, danger: selectedInvoice.delta !== '$0.00' },
                  { label: 'OTIF',         val: selectedInvoice.otif },
                ].map(f => (
                  <div key={f.label}>
                    <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--slate-500)', fontFamily: 'var(--font-mono)', marginBottom: 2 }}>{f.label}</div>
                    <div style={{ fontSize: 'var(--text-xs)', fontFamily: f.mono ? 'var(--font-mono)' : undefined, fontWeight: 500, color: f.danger ? 'var(--danger-500)' : f.warn ? 'var(--amber-500)' : f.blue ? 'var(--cerulean-500)' : 'var(--navy-900)' }}>{f.val}</div>
                  </div>
                ))}
              </div>
              {selectedInvoice.status !== 'Paid' && selectedInvoice.status !== 'Processed' && (
                <div style={{ padding: '0 var(--space-6) var(--space-5)', display: 'flex', gap: 'var(--space-2)' }}>
                  <button className="btn btn-danger btn-sm" onClick={() => updateStatus(selectedInvoice.id, 'dispute')}>Dispute</button>
                  <button className="btn btn-success btn-sm" onClick={() => updateStatus(selectedInvoice.id, 'approve')}>Approve</button>
                  <button className="btn btn-ghost btn-sm">View BOL</button>
                </div>
              )}
              {(selectedInvoice.status === 'Paid' || selectedInvoice.status === 'Processed') && (
                <div style={{ padding: '0 var(--space-6) var(--space-5)' }}>
                  <span style={{ fontSize: 12, color: 'var(--success-500)', fontWeight: 600 }}>✓ {selectedInvoice.status} — no action required</span>
                </div>
              )}
            </div>
          )}

          {/* Exception Aging */}
          <div className="chart-card">
            <div className="chart-header"><div className="chart-title">Exception Aging</div></div>
            <div className="chart-body">
              <div className="bar-chart-area" style={{ height: 80 }}>
                {[{ label: '0–7d', h: 55 }, { label: '8–14d', h: 35 }, { label: '15–30d', h: 20 }, { label: '30d+', h: 10 }].map(b => (
                  <div key={b.label} className="bar-col">
                    <div className="bar" style={{ height: `${b.h}%`, background: 'var(--amber-400)' }} />
                    <div className="bar-label">{b.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Status Snapshot */}
          <div className="chart-card">
            <div className="chart-header"><div className="chart-title">Payment Status Snapshot</div></div>
            <div className="chart-body">
              {[
                { label: 'Paid',          val: '$42.3K', count: '156 invoices', color: 'var(--success-500)' },
                { label: 'Pending Audit', val: '$12.1K', count: '42 invoices',  color: 'var(--amber-500)' },
                { label: 'Disputed',      val: '$3.8K',  count: '14 invoices',  color: 'var(--danger-500)' },
                { label: 'Outstanding',   val: '$18.3K', count: '64 invoices',  color: 'var(--slate-500)' },
              ].map(s => (
                <div key={s.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-3) 0', borderBottom: '1px solid var(--slate-050)', borderLeft: `3px solid ${s.color}`, paddingLeft: 'var(--space-3)', cursor: 'pointer' }}
                  onClick={() => setActiveStatus(s.label === 'Outstanding' ? 'Pending Audit' : s.label)}
                >
                  <div>
                    <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--navy-900)' }}>{s.label}</div>
                    <div style={{ fontSize: 10, color: 'var(--slate-500)' }}>{s.count}</div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', fontWeight: 500 }}>{s.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
