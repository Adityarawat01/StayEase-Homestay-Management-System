import { useState, useRef, useEffect } from 'react'
import { Button } from '../components/ui'
import { toast } from '../components/ui'
import './AIAssistant.css'

const AI_RESPONSES = [
  "Great question! Based on your preferences, I'd recommend checking out **Hilltop Eco Lodge in Munnar** — it's solar-powered with stunning tea garden views. 🌄",
  "For a budget-friendly option under ₹2,500/night, **Pine Valley Stay in Kasol** is perfect for trekking enthusiasts surrounded by dense pine forests. 🌲",
  "The **Backwater Houseboat in Alleppey** is our most exclusive listing! It includes chef-prepared Kerala meals and a private deck overlooking the backwaters. ⛵",
  "I can help you find eco-stays! Are you looking for mountains, beaches, forests, or desert experiences? Just let me know your vibe! 🌿",
  "Absolutely! StayEase properties are all sustainability-certified. The **Green Escape Resort in Wayanad** even has elephant sightings and an ayurvedic spa. 🐘",
  "For a romantic getaway, the **Desert Oasis Camp in Jaisalmer** is magical — camel safaris by day, stargazing with folk music under the desert sky. 🌌",
  "I noticed you might enjoy outdoor adventures. **Riverside Cottage in Rishikesh** offers white-water rafting, yoga, and gorgeous Ganges river views. 🏄",
  "Our top-rated pick is **Mountain View Homestay in Manali** with a 4.9⭐ rating! Guests rave about waking up to snow-capped Kullu valley panoramas. 🏔️",
]

const QUICK_PROMPTS = [
  '🏔️ Best mountain stays',
  '💰 Budget under ₹2500',
  '🌊 Waterfront properties',
  '🌿 Most eco-friendly',
  '⭐ Top rated listings',
  '🧘 Wellness & yoga stays',
]

let msgIdCounter = 0

function Message({ msg }) {
  return (
    <div className={`ai-msg ai-msg--${msg.role}`}>
      {msg.role === 'assistant' && (
        <div className="ai-msg__avatar">🤖</div>
      )}
      <div className="ai-msg__bubble">
        {msg.role === 'assistant' && (
          <span className="ai-msg__name">StayEase AI</span>
        )}
        <p className="ai-msg__text"
          dangerouslySetInnerHTML={{
            __html: msg.text
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/\n/g, '<br/>')
          }}
        />
        <span className="ai-msg__time">{msg.time}</span>
      </div>
      {msg.role === 'user' && (
        <div className="ai-msg__avatar ai-msg__avatar--user">AR</div>
      )}
    </div>
  )
}

function TypingIndicator() {
  return (
    <div className="ai-msg ai-msg--assistant">
      <div className="ai-msg__avatar">🤖</div>
      <div className="ai-msg__bubble ai-msg__bubble--typing">
        <span className="ai-typing__name">StayEase AI</span>
        <div className="ai-typing">
          <span /><span /><span />
        </div>
      </div>
    </div>
  )
}

function getTime() {
  return new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
}

function AIAssistant() {
  const [messages, setMessages] = useState([
    {
      id: ++msgIdCounter,
      role: 'assistant',
      text: "Hi there! 👋 I'm your **StayEase AI Assistant**.\n\nI can help you discover eco-friendly homestays, compare properties, check availability, and plan your perfect sustainable getaway across India. What are you looking for today?",
      time: getTime(),
    },
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const sendMessage = (text) => {
    const msg = text.trim()
    if (!msg || isTyping) return

    const userMsg = { id: ++msgIdCounter, role: 'user', text: msg, time: getTime() }
    setMessages((prev) => [...prev, userMsg])
    setInputText('')
    setIsTyping(true)

    // Simulate AI response delay (1–2.5s)
    const delay = 1000 + Math.random() * 1500
    setTimeout(() => {
      const aiText = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)]
      const aiMsg = { id: ++msgIdCounter, role: 'assistant', text: aiText, time: getTime() }
      setMessages((prev) => [...prev, aiMsg])
      setIsTyping(false)
    }, delay)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sendMessage(inputText)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(inputText)
    }
  }

  const handleClear = () => {
    setMessages([{
      id: ++msgIdCounter,
      role: 'assistant',
      text: "Chat cleared! 🧹 How can I help you find your perfect eco-stay today?",
      time: getTime(),
    }])
    toast.info('Chat history cleared')
    inputRef.current?.focus()
  }

  return (
    <div className="ai-page page-enter">
      {/* Header */}
      <div className="ai-page__header">
        <div className="ai-page__header-bg" />
        <div className="container ai-page__header-inner">
          <div className="ai-page__header-info">
            <div className="ai-page__avatar-wrap">
              <div className="ai-page__avatar">🤖</div>
              <span className="ai-page__status-dot" />
            </div>
            <div>
              <h1 className="ai-page__title">StayEase AI Assistant</h1>
              <p className="ai-page__subtitle">
                <span className="ai-page__online-dot" />
                Online · Powered by eco-travel intelligence
              </p>
            </div>
          </div>
          <button className="ai-page__clear-btn" onClick={handleClear} aria-label="Clear chat">
            🗑️ Clear Chat
          </button>
        </div>
      </div>

      <div className="container ai-page__body">
        <div className="ai-chat">
          {/* Quick Prompts */}
          <div className="ai-chat__prompts">
            <p className="ai-chat__prompts-label">Quick questions:</p>
            <div className="ai-chat__prompts-list">
              {QUICK_PROMPTS.map((p) => (
                <button
                  key={p}
                  className="ai-chat__prompt-chip"
                  onClick={() => sendMessage(p)}
                  disabled={isTyping}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="ai-chat__messages" role="log" aria-live="polite" aria-label="Chat messages">
            {messages.map((msg) => (
              <Message key={msg.id} msg={msg} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="ai-chat__input-area">
            <form className="ai-chat__form" onSubmit={handleSubmit}>
              <textarea
                ref={inputRef}
                className="ai-chat__input"
                placeholder="Ask about eco-stays, pricing, locations… (Enter to send)"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                disabled={isTyping}
                aria-label="Message input"
                id="ai-chat-input"
              />
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={!inputText.trim() || isTyping}
                aria-label="Send message"
              >
                <span className="ai-chat__send-icon">➤</span>
                <span className="ai-chat__send-label">Send</span>
              </Button>
            </form>
            <p className="ai-chat__disclaimer">
              🌿 AI responses are illustrative. Always verify details directly with the host.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="ai-sidebar">
          <div className="ai-sidebar__card">
            <h3 className="ai-sidebar__title">💡 What I can help with</h3>
            <ul className="ai-sidebar__list">
              {[
                '🔍 Find properties by budget',
                '📍 Discover destinations',
                '🏡 Compare homestays',
                '📅 Booking guidance',
                '🌿 Eco certifications',
                '⭐ Top-rated picks',
                '🎒 Travel tips',
                '💰 Price comparisons',
              ].map((item) => (
                <li key={item} className="ai-sidebar__item">{item}</li>
              ))}
            </ul>
          </div>

          <div className="ai-sidebar__card ai-sidebar__card--accent">
            <div className="ai-sidebar__promo-icon">🌍</div>
            <h3 className="ai-sidebar__promo-title">50+ Destinations</h3>
            <p className="ai-sidebar__promo-desc">
              From the Himalayas to Kerala backwaters — ask me to find your perfect eco-stay!
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default AIAssistant
