import { useState, useRef, useEffect } from 'react'
import { useChat } from '../context/ChatContext.jsx'

const CAPABILITIES = {
  now: [
    { icon: '🔍', name: 'PO & Shipment Lookup',         desc: 'Real-time status on any PO, BOL, or PRO number.' },
    { icon: '📊', name: 'Carrier Performance Analysis',  desc: 'OTIF breakdown by carrier, lane, or time period.' },
    { icon: '⚠',  name: 'Exception Triage',              desc: 'AI-grouped exceptions with open/disputed counts.' },
    { icon: '💰', name: 'Spend Summary',                  desc: 'Spend by carrier with ranking and MTD view.' },
  ],
  roadmap: [
    { icon: '📧', name: 'Carrier Dispute Drafting',       badge: 'Next', desc: 'Auto-drafts dispute emails from BOL discrepancies.' },
    { icon: '🔄', name: 'Volume Reallocation Workflow',   badge: 'Next', desc: 'End-to-end volume shift with impact modeling.' },
    { icon: '📋', name: 'Carrier Pre-Negotiation Brief',  badge: 'Next', desc: 'One-click briefing of carrier performance history.' },
    { icon: '🔮', name: 'Proactive Anomaly Alerts',       badge: 'Soon', desc: 'Automated detection of unusual patterns.' },
    { icon: '📊', name: 'Lane Intelligence Reports',      badge: 'Soon', desc: 'AI-written summary of lane trends and benchmarks.' },
    { icon: '🎙', name: 'Voice Morning Briefing',         badge: 'Soon', desc: 'Hands-free audio digest for the commute.' },
  ],
}

const CHIPS = [
  'Morning briefing',
  'Check on PO 90142-C',
  'Show open exceptions',
  'OTIF by carrier',
  'Who is my worst carrier?',
  'Spend breakdown',
  'Alternatives to FedEx',
]

export default function AIAssistantPage() {
  const { messages, loading, sendMessage, clearHistory } = useChat()
  const [input, setInput] = useState('')
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, loading])

  async function handleSend(e) {
    e.preventDefault()
    if (!input.trim() || loading) return
    const text = input.trim()
    setInput('')
    await sendMessage(text)
  }

  function handleChip(chip) {
    setInput(chip)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - var(--topbar-height) - var(--suggest-height))', overflow: 'hidden' }}>
      <div style={{ padding: 'var(--space-5) var(--space-8) 0', flexShrink: 0, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div>
          <h1 className="page-title">AI Assistant</h1>
          <div className="page-meta">Powered by US Bank Freight Intelligence · Conversations are not stored</div>
        </div>
        <button
          onClick={clearHistory}
          style={{ fontSize: 11, color: 'var(--slate-400)', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          Clear history
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', minHeight: 0 }}>

        {/* ── Chat main ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>

          {/* Scroll area */}
          <div
            ref={scrollRef}
            style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-6) var(--space-8) var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', scrollbarWidth: 'thin' }}
          >
            <div style={{ textAlign: 'center', fontSize: 'var(--text-xs)', color: 'var(--slate-500)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Today · Aug 14, 2026
            </div>

            {messages.map(msg => (
              <MessageBubble key={msg.id} msg={msg} />
            ))}

            {loading && (
              <div style={{ display: 'flex', gap: 'var(--space-3)', maxWidth: 720 }}>
                <div style={avatarStyle('#F0930E')}>✦</div>
                <div style={{ paddingTop: 6 }}>
                  <TypingDots />
                </div>
              </div>
            )}
          </div>

          {/* Composer */}
          <div style={{ padding: 'var(--space-4) var(--space-8)', background: 'var(--white)', borderTop: '1px solid var(--slate-100)', flexShrink: 0 }}>
            <div style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-3)', flexWrap: 'wrap' }}>
              {CHIPS.map(chip => (
                <button key={chip} className="suggestion-chip" onClick={() => handleChip(chip)}>{chip}</button>
              ))}
            </div>
            <form onSubmit={handleSend} style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
              <div className="ai-query-bar" style={{ flex: 1, maxWidth: 'none' }}>
                <span className="ai-query-icon">✦</span>
                <input
                  className="ai-query-input"
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask about a PO, carrier, lane, or invoice…"
                  disabled={loading}
                />
              </div>
              <button type="submit" className="btn btn-ai" disabled={loading || !input.trim()}>
                {loading ? '…' : 'Send'}
              </button>
            </form>
          </div>
        </div>

        {/* ── Right Rail ── */}
        <div style={{ width: 300, flexShrink: 0, borderLeft: '1px solid var(--slate-100)', overflowY: 'auto', padding: 'var(--space-5)' }}>
          <div style={railHeader}>Available Now</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
            {CAPABILITIES.now.map(c => (
              <CapabilityRow key={c.name} c={c} badge="Live" badgeColor="var(--success-500)" badgeBg="var(--success-100)" />
            ))}
          </div>

          <div style={railHeader}>On the Roadmap</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {CAPABILITIES.roadmap.map(c => (
              <CapabilityRow key={c.name} c={c} badge={c.badge} badgeColor={c.badge === 'Next' ? 'var(--cerulean-500)' : 'var(--slate-500)'} badgeBg={c.badge === 'Next' ? 'var(--cerulean-050)' : 'var(--slate-100)'} dim />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

// ─── Message bubble ───────────────────────────────────────────────────────────

function MessageBubble({ msg }) {
  const isAI = msg.role === 'ai'
  return (
    <div style={{ display: 'flex', gap: 'var(--space-3)', maxWidth: 720, alignSelf: isAI ? 'flex-start' : 'flex-end', flexDirection: isAI ? 'row' : 'row-reverse' }}>
      <div style={avatarStyle(isAI ? '#F0930E' : 'var(--cerulean-500)', isAI ? 14 : 'var(--text-xs)')}>
        {isAI ? '✦' : 'MR'}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 10, color: 'var(--slate-500)', fontFamily: 'var(--font-mono)', marginBottom: 4, textAlign: isAI ? 'left' : 'right' }}>
          {isAI ? 'AI Assistant' : 'Marcus Rodriguez'} · {msg.time}
        </div>
        <div style={{
          background: isAI ? 'var(--white)' : 'var(--cerulean-500)',
          color: isAI ? 'var(--slate-700)' : 'var(--white)',
          borderRadius: isAI ? '4px 12px 12px 12px' : '12px 4px 12px 12px',
          padding: 'var(--space-4) var(--space-5)',
          fontSize: 'var(--text-sm)',
          lineHeight: 1.65,
          boxShadow: 'var(--shadow-card)',
          border: isAI ? '1px solid var(--slate-100)' : undefined,
        }}>
          <AIResponseContent msg={msg} />
        </div>
      </div>
    </div>
  )
}

function AIResponseContent({ msg }) {
  const { response, text } = msg
  if (!response) return <span dangerouslySetInnerHTML={{ __html: mdBold(text) }} />

  const { type, lines, carriers, exceptions, shipment, shipments, open, byType, atRisk, suggestions, cta } = response

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span dangerouslySetInnerHTML={{ __html: mdBold(text) }} />

      {/* Briefing key/value lines */}
      {lines && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, background: 'var(--slate-050)', borderRadius: 6, padding: '10px 12px' }}>
          {lines.map(l => (
            <div key={l.label} style={{ display: 'flex', gap: 10, fontSize: 12 }}>
              <span style={{ color: 'var(--slate-400)', fontFamily: 'var(--font-mono)', fontSize: 10, minWidth: 80, paddingTop: 2 }}>{l.label}</span>
              <span dangerouslySetInnerHTML={{ __html: mdBold(l.value) }} />
            </div>
          ))}
        </div>
      )}

      {/* PO legs */}
      {shipment?.legs && (
        <div style={{ background: 'var(--slate-050)', borderRadius: 6, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--navy-900)', marginBottom: 2 }}>
            PO {shipment.po} · {shipment.route}
            {shipment.consignee && (
              <span style={{ fontWeight: 400, color: 'var(--cerulean-500)', marginLeft: 8 }}>→ {shipment.consignee.name}</span>
            )}
          </div>
          {shipment.dcName && (
            <div style={{ fontSize: 10, color: 'var(--slate-500)', marginBottom: 4 }}>
              {shipment.dcName} · {shipment.contents}
            </div>
          )}
          {shipment.legs.map(leg => (
            <div key={leg.bol} style={{ display: 'flex', gap: 10, fontSize: 12, borderBottom: '1px solid var(--slate-100)', paddingBottom: 5 }}>
              <span style={{ color: 'var(--slate-400)', fontFamily: 'var(--font-mono)', fontSize: 10, minWidth: 80, paddingTop: 2 }}>{leg.bol}</span>
              <span style={{ flex: 1 }}>{leg.route}</span>
              <span style={{ fontWeight: 600, color: leg.otif === 'On Time' ? 'var(--success-500)' : leg.otif === 'At Risk' ? 'var(--amber-500)' : 'var(--danger-500)' }}>{leg.status}</span>
            </div>
          ))}
          {shipment.note && <div style={{ fontSize: 11, color: 'var(--amber-600)', marginTop: 2 }}>{shipment.note}</div>}
        </div>
      )}

      {/* OTIF carrier table */}
      {(type === 'otif_summary' || type === 'carrier_rank') && carriers && (
        <div style={{ background: 'var(--slate-050)', borderRadius: 6, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 5 }}>
          {carriers.map(c => (
            <div key={c.id} style={{ display: 'flex', gap: 8, fontSize: 12, alignItems: 'center' }}>
              <span style={{ flex: 1 }}>{c.name}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: c.otif >= 94 ? 'var(--success-500)' : c.otif >= 90 ? 'var(--amber-500)' : 'var(--danger-500)' }}>{c.otif}%</span>
            </div>
          ))}
        </div>
      )}

      {/* Exceptions list */}
      {(type === 'exceptions_summary' || type === 'exceptions_carrier') && open && (
        <div style={{ background: 'var(--slate-050)', borderRadius: 6, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 5 }}>
          {open.map(ex => (
            <div key={ex.id} style={{ display: 'flex', gap: 8, fontSize: 12, alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--slate-400)', minWidth: 60 }}>{ex.id}</span>
              <span style={{ flex: 1 }}>{ex.type} · {ex.carrier}</span>
              {ex.amount && <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--danger-500)', fontWeight: 600 }}>+${ex.amount.toFixed(2)}</span>}
            </div>
          ))}
        </div>
      )}

      {/* Customer shipments */}
      {type === 'customer_shipments' && shipments && (
        <div style={{ background: 'var(--slate-050)', borderRadius: 6, padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {shipments.map(s => (
            <div key={s.po} style={{ display: 'flex', gap: 10, fontSize: 12, borderBottom: '1px solid var(--slate-100)', paddingBottom: 6 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: 'var(--navy-900)' }}>{s.consignee.name}</div>
                <div style={{ color: 'var(--slate-500)', fontSize: 11 }}>PO {s.po} · {s.route} · {s.carrier}</div>
                {s.contents && <div style={{ color: 'var(--slate-400)', fontSize: 10, marginTop: 1 }}>{s.contents}</div>}
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontWeight: 600, color: s.otif === 'On Time' || s.otif === 'On Track' ? 'var(--success-500)' : s.otif === 'At Risk' ? 'var(--amber-500)' : 'var(--danger-500)', fontSize: 11 }}>
                  {s.status}
                </div>
                <div style={{ color: 'var(--slate-400)', fontSize: 10 }}>{s.eta}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Suggestions */}
      {suggestions && (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {suggestions.map(s => (
            <span key={s} style={{ fontSize: 11, background: 'var(--slate-100)', borderRadius: 100, padding: '2px 10px', color: 'var(--slate-600)' }}>{s}</span>
          ))}
        </div>
      )}

      {/* CTA */}
      {cta && (
        <div style={{ fontSize: 12, color: 'var(--cerulean-500)', fontStyle: 'italic', borderTop: '1px solid var(--slate-100)', paddingTop: 6, marginTop: 2 }}>
          {cta}
        </div>
      )}
    </div>
  )
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center', height: 20 }}>
      {[0, 150, 300].map(delay => (
        <span key={delay} style={{
          width: 6, height: 6, borderRadius: '50%', background: 'var(--amber-400)',
          animation: 'dot-bounce 1s infinite ease-in-out',
          animationDelay: `${delay}ms`, display: 'inline-block',
        }} />
      ))}
      <style>{`@keyframes dot-bounce{0%,80%,100%{transform:translateY(0);opacity:.4}40%{transform:translateY(-5px);opacity:1}}`}</style>
    </div>
  )
}

function avatarStyle(bg, fontSize = 14) {
  return {
    width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize, fontWeight: 700, background: bg, color: 'var(--white)',
  }
}

function mdBold(text) {
  if (!text) return ''
  return text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
}

const railHeader = {
  fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--navy-900)',
  marginBottom: 'var(--space-4)', textTransform: 'uppercase', letterSpacing: '0.08em',
}

function CapabilityRow({ c, badge, badgeColor, badgeBg, dim }) {
  return (
    <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start', opacity: dim ? 0.7 : 1 }}>
      <span style={{ fontSize: 18, flexShrink: 0 }}>{c.icon}</span>
      <div>
        <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--navy-900)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          {c.name}
          <span style={{ fontSize: 9, background: badgeBg, color: badgeColor, borderRadius: 100, padding: '1px 6px', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>{badge}</span>
        </div>
        <div style={{ fontSize: 10, color: 'var(--slate-500)', marginTop: 2, lineHeight: 1.5 }}>{c.desc}</div>
      </div>
    </div>
  )
}
