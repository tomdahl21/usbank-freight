import { createContext, useContext, useState, useCallback, useRef } from 'react'
import { resolveQuery } from '../services/aiService.js'

const ChatContext = createContext(null)

const SEED_MESSAGES = [
  {
    id: 'seed-1',
    role: 'ai',
    time: '7:42 AM',
    text: 'Good morning, Marcus. Your OTIF is 94.2% — up 1.4 pts. You have 12 open exceptions, 4 of which are BOL mismatches I can batch-dispute. What would you like to dig into?',
    response: null,
  },
]

export function ChatProvider({ children }) {
  const [messages, setMessages]   = useState(SEED_MESSAGES)
  const [loading, setLoading]     = useState(false)
  const [pageContext, setPageContext] = useState(null)
  const idRef = useRef(100)

  const sendMessage = useCallback(async (text) => {
    const userMsg = {
      id: `u-${idRef.current++}`,
      role: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text,
      response: null,
    }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    // Simulate network latency
    await new Promise(r => setTimeout(r, 600 + Math.random() * 400))

    const response = resolveQuery(text)
    const aiMsg = {
      id: `a-${idRef.current++}`,
      role: 'ai',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: response.text || '',
      response,
    }

    setMessages(prev => [...prev, aiMsg])
    setLoading(false)
    return response
  }, [])

  const clearHistory = useCallback(() => {
    setMessages(SEED_MESSAGES)
  }, [])

  return (
    <ChatContext.Provider value={{ messages, loading, pageContext, setPageContext, sendMessage, clearHistory }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  return useContext(ChatContext)
}
