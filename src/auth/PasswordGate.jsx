import { useState, useRef, useEffect } from 'react'
import { useAuth } from './AuthContext.jsx'

const PHOTOS = [
  '/photos/freight-worker.png',
  '/photos/tomcdahl_A_corporate_US_Bank_Employee_in_a_nice_modern_office_40afed16-152a-4085-a598-6297f43c705b_0.png',
  '/photos/tomcdahl_A_corporate_US_Bank_Employee_in_a_nice_modern_office_40afed16-152a-4085-a598-6297f43c705b_3.png',
  '/photos/tomcdahl_A_person_with_a_hardhat_and_safety_vest_holding_an_i_188fffa7-0fa8-4f15-bc7e-e46a96104f8d_2.png',
  '/photos/tomcdahl_A_person_with_a_hardhat_and_safety_vest_holding_an_i_6ce383f4-7363-467e-b087-ed5e534f1efb_0.png',
  '/photos/tomcdahl_A_person_with_a_hardhat_and_safety_vest_holding_an_i_6ce383f4-7363-467e-b087-ed5e534f1efb_2.png',
  '/photos/tomcdahl_A_person_with_a_hardhat_and_safety_vest_holding_an_i_86baa5ce-ce49-4824-83b8-0632335e92d5_1.png',
  '/photos/tomcdahl_A_person_with_a_hardhat_and_safety_vest_holding_an_i_c5c6aa4d-8c40-4ce4-a6f7-c2edc8a64dff_0.png',
]

function pickNext(current) {
  const others = PHOTOS.filter((_, i) => i !== current)
  const idx = Math.floor(Math.random() * others.length)
  return PHOTOS.indexOf(others[idx])
}

const CAPABILITIES = [
  { icon: '✦', label: 'AI Query Interface', desc: 'Natural language across all freight data' },
  { icon: '📊', label: 'OTIF Tracking',      desc: 'By carrier, lane & time period' },
  { icon: '🧾', label: 'Invoice Audit',       desc: 'BOL discrepancy detection at scale' },
  { icon: '⚠', label: 'Exception Management', desc: 'AI-grouped, one-click resolution' },
  { icon: '🚚', label: 'Shipment Visibility',  desc: 'PRO/BOL lookup with OTIF forecast' },
  { icon: '📈', label: 'Carrier Intelligence', desc: 'Performance analytics + alternatives engine' },
]

const METRICS = [
  { value: '$42.1M', label: 'Freight Spend Managed' },
  { value: '$284K',  label: 'Audit Recovery Identified' },
  { value: '6 Carriers · 20+ Lanes', label: 'Tracked in Real Time' },
]

export default function PasswordGate() {
  const { unlock } = useAuth()
  const [email, setEmail] = useState('marcus.johnson@usbank.com')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)

  const [activeIdx, setActiveIdx] = useState(0)
  const [nextIdx, setNextIdx] = useState(() => pickNext(0))
  const [fading, setFading] = useState(false)

  useEffect(() => {
    // Preload all photos up front
    PHOTOS.forEach(src => { new Image().src = src })
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setActiveIdx(prev => {
          const next = pickNext(prev)
          setNextIdx(pickNext(next))
          return next
        })
        setFading(false)
      }, 1000)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 200)
    return () => clearTimeout(t)
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 320))
    const success = unlock(password)
    if (!success) {
      setError('Incorrect email or password. Please try again.')
      setPassword('')
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  return (
    <div style={styles.root}>

      {/* ── LEFT PANEL ── */}
      <div style={styles.left}>
        <div style={styles.leftInner}>

          {/* Logo + product name */}
          <div style={styles.logoArea}>
            <img src="/logo-white.svg" alt="US Bank" style={styles.logo} />
            <div style={styles.productDivider} />
            <div style={styles.productName}>Freight Analytics</div>
          </div>

          {/* Headline */}
          <div style={styles.headline}>
            Sign in to your account
          </div>
          <div style={styles.subline}>
            Access your freight analytics dashboard, carrier performance data, and AI-powered insights.
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.fieldWrap}>
              <label style={styles.fieldLabel} htmlFor="pg-email">
                Email address
              </label>
              <input
                id="pg-email"
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setError('') }}
                placeholder="you@usbank.com"
                autoComplete="email"
                style={styles.input}
              />
            </div>

            <div style={styles.fieldWrap}>
              <div style={styles.passwordRow}>
                <label style={styles.fieldLabel} htmlFor="pg-password">
                  Password
                </label>
                <button type="button" style={styles.forgotLink}>Forgot password &rsaquo;</button>
              </div>
              <input
                ref={inputRef}
                id="pg-password"
                type="password"
                value={password}
                onChange={e => { setPassword(e.target.value); setError('') }}
                placeholder="Enter your password"
                autoComplete="current-password"
                style={{
                  ...styles.input,
                  ...(error ? styles.inputError : {}),
                }}
              />
              <div style={styles.errorMsg} role="alert" aria-live="polite">
                {error}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !password}
              style={{
                ...styles.submitBtn,
                ...(loading || !password ? styles.submitBtnDisabled : {}),
              }}
            >
              {loading ? (
                <span style={styles.loadingDots}>
                  <span style={{ ...styles.dot, animationDelay: '0ms' }} />
                  <span style={{ ...styles.dot, animationDelay: '150ms' }} />
                  <span style={{ ...styles.dot, animationDelay: '300ms' }} />
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

</div>

        {/* Left footer */}
        <div style={styles.leftFooter}>
          © 2026 US Bank &nbsp;·&nbsp; Privacy Policy &nbsp;·&nbsp; Terms of Use
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div style={styles.right}>
        {/* Outgoing photo (fades out) */}
        <img
          key={`next-${nextIdx}`}
          src={PHOTOS[nextIdx]}
          alt=""
          style={styles.photo}
        />
        {/* Active photo (fades in over top) */}
        <img
          key={`active-${activeIdx}`}
          src={PHOTOS[activeIdx]}
          alt="Freight operations"
          style={{
            ...styles.photo,
            opacity: fading ? 0 : 1,
            transition: fading ? 'opacity 1s ease-in-out' : 'opacity 1s ease-in-out',
          }}
        />

        {/* Gradient overlays */}
        <div style={styles.overlayLeft} />
        <div style={styles.overlayBottom} />

      </div>

      <style>{`
        @keyframes dot-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40%            { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

/* ── Styles ── */
const NAV  = '#0C2074'   /* US Bank Deep Sapphire */
const NAV2 = '#091a5e'   /* slightly deeper for gradient */
const CER  = '#00438F'   /* US Bank Cerulean — primary actions */
const CER2 = '#003070'   /* cerulean hover */

const styles = {
  root: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    fontFamily: "'Inter', system-ui, sans-serif",
  },

  /* ── Left panel ── */
  left: {
    width: 460,
    flexShrink: 0,
    background: `linear-gradient(160deg, ${NAV} 0%, ${NAV2} 100%)`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '48px 48px 32px',
    position: 'relative',
    zIndex: 2,
    boxShadow: '8px 0 40px rgba(0,0,0,0.35)',
  },
  leftInner: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },

  logoArea: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    marginBottom: 40,
  },
  logo: {
    height: 28,
    width: 'auto',
    objectFit: 'contain',
  },
  productDivider: {
    width: 1,
    height: 20,
    background: 'rgba(255,255,255,0.25)',
  },
  productName: {
    fontSize: 14,
    fontWeight: 600,
    color: 'rgba(255,255,255,0.75)',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
  },

  headline: {
    fontSize: 26,
    fontWeight: 700,
    color: '#FFFFFF',
    lineHeight: 1.25,
    marginBottom: 14,
    letterSpacing: '-0.01em',
  },
  subline: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.58)',
    lineHeight: 1.65,
    marginBottom: 40,
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    marginBottom: 28,
  },
  fieldWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  passwordRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgotLink: {
    background: 'none',
    border: 'none',
    padding: 0,
    fontSize: 12,
    fontWeight: 500,
    color: 'rgba(255,255,255,0.60)',
    cursor: 'pointer',
    fontFamily: 'inherit',
    letterSpacing: '0.01em',
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
  },

  fieldLabel: {
    fontSize: 12,
    fontWeight: 600,
    textTransform: 'none',
    letterSpacing: '0.01em',
    color: 'rgba(255,255,255,0.70)',
  },
  input: {
    width: '100%',
    padding: '11px 0 11px 0',
    borderRadius: 0,
    border: 'none',
    borderBottom: '1.5px solid rgba(255,255,255,0.28)',
    background: 'transparent',
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.15s, box-shadow 0.15s',
    boxSizing: 'border-box',
    WebkitAppearance: 'none',
  },
  inputError: {
    borderColor: '#DE162B',
    borderBottomColor: '#DE162B',
  },
  errorMsg: {
    minHeight: 16,
    fontSize: 12,
    fontWeight: 600,
    color: '#FF6B7A',
  },

  submitBtn: {
    width: '100%',
    padding: '14px',
    borderRadius: 50,
    border: 'none',
    background: CER,
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 700,
    cursor: 'pointer',
    letterSpacing: '0.01em',
    transition: 'background 0.15s, opacity 0.15s, box-shadow 0.15s',
    boxShadow: '0 2px 12px rgba(0,67,143,0.40)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    fontFamily: 'inherit',
    marginTop: 8,
  },
  submitBtnDisabled: {
    opacity: 0.45,
    cursor: 'not-allowed',
    boxShadow: 'none',
  },
  loadingDots: {
    display: 'flex',
    gap: 5,
    alignItems: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: '#fff',
    animation: 'dot-bounce 1s infinite ease-in-out',
    display: 'inline-block',
  },

  hintToggle: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'rgba(255,255,255,0.40)',
    fontSize: 12,
    fontWeight: 500,
    fontFamily: 'inherit',
    padding: '4px 0',
    marginTop: 4,
  },
  hint: {
    padding: '10px 14px',
    borderRadius: 8,
    background: 'rgba(0,67,143,0.18)',
    border: '1px solid rgba(0,67,143,0.30)',
  },
  hintBody: { fontSize: 12, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 },
  code: {
    fontFamily: "'DM Mono', monospace",
    background: 'rgba(255,255,255,0.10)',
    borderRadius: 4,
    padding: '1px 6px',
    color: 'rgba(255,255,255,0.85)',
    fontSize: 11,
  },

  leftFooter: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.28)',
    letterSpacing: '0.04em',
    marginTop: 32,
  },

  /* ── Right panel ── */
  right: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  photo: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center 20%',
  },
  overlayLeft: {
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(to right, ${NAV2} 0%, rgba(9,26,94,0.55) 35%, rgba(9,26,94,0.0) 70%)`,
  },
  overlayBottom: {
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(to top, rgba(9,26,94,0.92) 0%, rgba(9,26,94,0.5) 38%, rgba(9,26,94,0.0) 62%)`,
  },

  rightContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '40px 44px',
  },

  eyebrow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: CER,
    marginBottom: 20,
  },
  eyebrowDot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: CER,
    boxShadow: `0 0 8px ${CER}`,
    display: 'inline-block',
  },

  capGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '10px 20px',
    marginBottom: 28,
  },
  capCard: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 10,
    padding: '10px 12px',
    borderRadius: 8,
    background: 'rgba(255,255,255,0.07)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255,255,255,0.10)',
  },
  capIcon: { fontSize: 14, flexShrink: 0, marginTop: 1 },
  capLabel: { fontSize: 12, fontWeight: 600, color: '#FFFFFF', lineHeight: 1.2, marginBottom: 2 },
  capDesc:  { fontSize: 10, color: 'rgba(255,255,255,0.55)', lineHeight: 1.4 },

  metaDivider: {
    height: 1,
    background: 'rgba(255,255,255,0.12)',
    marginBottom: 20,
  },
  metaRow: {
    display: 'flex',
    gap: 40,
    alignItems: 'flex-end',
  },
  metaItem: {},
  metaValue: {
    fontFamily: "'DM Mono', monospace",
    fontSize: 20,
    fontWeight: 500,
    color: '#FFFFFF',
    lineHeight: 1,
    marginBottom: 4,
  },
  metaLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.50)',
    letterSpacing: '0.04em',
  },

  rightLogo: {
    position: 'absolute',
    top: 36,
    right: 36,
    background: 'rgba(255,255,255,0.90)',
    borderRadius: 8,
    padding: '8px 16px',
    backdropFilter: 'blur(8px)',
  },
  rightLogoImg: {
    height: 22,
    width: 'auto',
    display: 'block',
  },
}
