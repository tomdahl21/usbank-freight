import { createContext, useContext, useState, useEffect } from 'react'

const VALID_PASSWORDS = ['USBank2026', 'freight2026']
const SESSION_KEY = 'freightAccessApproved'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [unlocked, setUnlocked] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === 'true') {
      setUnlocked(true)
    }
    setChecking(false)
  }, [])

  function unlock(password) {
    if (VALID_PASSWORDS.includes(password.trim())) {
      sessionStorage.setItem(SESSION_KEY, 'true')
      setUnlocked(true)
      return true
    }
    return false
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY)
    setUnlocked(false)
  }

  return (
    <AuthContext.Provider value={{ unlocked, checking, unlock, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
