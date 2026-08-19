import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useChat } from '../../context/ChatContext.jsx'

export default function Topbar({ onMenuClick, placeholder, chips = [] }) {
  const { sendMessage, loading } = useChat()
  const navigate = useNavigate()
  const [query, setQuery]         = useState('')
  const [response, setResponse]   = useState(null)
  const [open, setOpen]           = useState(false)
  const wrapRef = useRef(null)

  // Close the inline card when clicking outside
  useEffect(() => {
    function onPointerDown(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!query.trim() || loading) return
    setOpen(true)
    setResponse(null)
    const res = await sendMessage(query.trim())
    setResponse(res)
  }

  function handleChipClick(chip) {
    setQuery(chip)
  }

  function handleViewFull() {
    setOpen(false)
    navigate('/ai-assistant')
  }

  return (
    <>
      <div className="topbar">
        <button className="topbar-menu-btn" aria-label="Open navigation" onClick={onMenuClick}>
          <HamburgerIcon />
        </button>

        <div ref={wrapRef} style={{ flex: 1, position: 'relative', maxWidth: 640 }}>
          <form onSubmit={handleSubmit}>
            <div className="ai-query-bar">
              <span className="ai-query-icon" aria-hidden="true">✦</span>
              <input
                className="ai-query-input"
                type="text"
                value={query}
                onChange={e => { setQuery(e.target.value); setOpen(false) }}
                placeholder={placeholder || 'Ask about a PO, carrier, lane, or invoice…'}
                aria-label="AI query"
                onFocus={() => response && setOpen(true)}
              />
              {query && (
                <button
                  type="submit"
                  disabled={loading}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 10px', color: 'var(--amber-500)', fontWeight: 700, fontSize: 12, whiteSpace: 'nowrap', opacity: loading ? 0.5 : 1 }}
                >
                  {loading ? '…' : 'Ask →'}
                </button>
              )}
            </div>
          </form>

          {/* Inline response card */}
          {open && (
            <div style={cardStyle}>
              {!response ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--slate-500)', fontSize: 13 }}>
                  <span style={{ color: 'var(--amber-500)' }}>✦</span>
                  <span>Thinking…</span>
                </div>
              ) : (
                <>
                  <ResponseBody response={response} />
                  <div style={{ borderTop: '1px solid var(--slate-100)', paddingTop: 10, marginTop: 10, display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      onClick={handleViewFull}
                      style={{ fontSize: 12, color: 'var(--cerulean-500)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                    >
                      View full conversation →
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <div className="topbar-right">
          <button className="topbar-icon-btn" aria-label="Notifications">
            <BellIcon />
            <span className="notif-dot" aria-hidden="true" />
          </button>
          <button className="topbar-icon-btn" aria-label="Settings">
            <SettingsIcon />
          </button>
        </div>
      </div>

      {chips.length > 0 && (
        <div className="suggestions" role="list" aria-label="Suggested queries">
          <span className="suggestion-label">Suggested:</span>
          {chips.map(chip => (
            <button key={chip} className="suggestion-chip" role="listitem" onClick={() => handleChipClick(chip)}>
              {chip}
            </button>
          ))}
        </div>
      )}
    </>
  )
}

// ─── Inline response renderer ─────────────────────────────────────────────────

function ResponseBody({ response }) {
  const { type, text, lines, carriers, exceptions, shipment, alternatives, suggestions } = response

  return (
    <div style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--slate-700)' }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: lines || carriers || shipment ? 10 : 0 }}>
        <span style={{ color: 'var(--amber-500)', flexShrink: 0, marginTop: 1 }}>✦</span>
        <span dangerouslySetInnerHTML={{ __html: mdBold(text) }} />
      </div>

      {/* Briefing lines */}
      {lines && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingLeft: 22 }}>
          {lines.map(l => (
            <div key={l.label} style={{ display: 'flex', gap: 8, fontSize: 12 }}>
              <span style={{ color: 'var(--slate-400)', minWidth: 80, fontFamily: 'var(--font-mono)', fontSize: 10, paddingTop: 2 }}>{l.label}</span>
              <span dangerouslySetInnerHTML={{ __html: mdBold(l.value) }} />
            </div>
          ))}
        </div>
      )}

      {/* PO shipment legs */}
      {shipment?.legs && (
        <div style={{ paddingLeft: 22 }}>
          {shipment.consignee && (
            <div style={{ fontSize: 11, color: 'var(--cerulean-500)', fontWeight: 600, marginBottom: 4 }}>
              → {shipment.consignee.name} · {shipment.dcName}
            </div>
          )}
          {shipment.contents && (
            <div style={{ fontSize: 10, color: 'var(--slate-400)', marginBottom: 6 }}>{shipment.contents}</div>
          )}
          {shipment.legs.map(leg => (
            <div key={leg.bol} style={{ display: 'flex', gap: 10, fontSize: 12, padding: '3px 0', borderBottom: '1px solid var(--slate-050)' }}>
              <span style={{ color: 'var(--slate-400)', fontFamily: 'var(--font-mono)', fontSize: 10, minWidth: 72, paddingTop: 2 }}>{leg.bol}</span>
              <span style={{ flex: 1 }}>{leg.route}</span>
              <span style={{ fontWeight: 600, color: leg.otif === 'On Time' ? 'var(--success-500)' : leg.otif === 'At Risk' ? 'var(--amber-500)' : 'var(--danger-500)' }}>
                {leg.status}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* OTIF carrier table (compact) */}
      {type === 'otif_summary' && carriers && (
        <div style={{ paddingLeft: 22, display: 'flex', flexDirection: 'column', gap: 3 }}>
          {carriers.slice(0, 4).map(c => (
            <div key={c.id} style={{ display: 'flex', gap: 8, fontSize: 12, alignItems: 'center' }}>
              <span style={{ flex: 1 }}>{c.name}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600, color: c.otif >= 94 ? 'var(--success-500)' : c.otif >= 90 ? 'var(--amber-500)' : 'var(--danger-500)' }}>{c.otif}%</span>
            </div>
          ))}
        </div>
      )}

      {/* Suggestions for unknown */}
      {suggestions && (
        <div style={{ paddingLeft: 22, display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>
          {suggestions.map(s => (
            <span key={s} style={{ fontSize: 11, background: 'var(--slate-100)', borderRadius: 100, padding: '2px 10px', color: 'var(--slate-600)' }}>{s}</span>
          ))}
        </div>
      )}
    </div>
  )
}

function mdBold(text) {
  if (!text) return ''
  return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
}

const cardStyle = {
  position: 'absolute',
  top: 'calc(100% + 6px)',
  left: 0,
  right: 0,
  background: 'var(--white)',
  borderRadius: 10,
  boxShadow: '0 8px 32px rgba(12,32,116,0.13)',
  border: '1px solid var(--slate-100)',
  padding: '14px 16px',
  zIndex: 200,
  maxHeight: 360,
  overflowY: 'auto',
}

function HamburgerIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="2" y1="4.5" x2="16" y2="4.5" />
      <line x1="2" y1="9" x2="16" y2="9" />
      <line x1="2" y1="13.5" x2="16" y2="13.5" />
    </svg>
  )
}
function BellIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 1a5 5 0 015 5v3l1.5 2.5H1.5L3 9V6a5 5 0 015-5z" />
      <path d="M6.5 13a1.5 1.5 0 003 0" />
    </svg>
  )
}
function SettingsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="8" cy="8" r="2.5" />
      <path d="M8 1v2M8 13v2M1 8h2M13 8h2M2.93 2.93l1.41 1.41M11.66 11.66l1.41 1.41M2.93 13.07l1.41-1.41M11.66 4.34l1.41-1.41" />
    </svg>
  )
}
