import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Phone, MessageSquare, Sparkles } from 'lucide-react';
import { useSite } from '../../context/SiteContext';

const FAQ_KNOWLEDGE = [
  {
    triggers: ['service', 'services', 'offer', 'what do you do', 'architectural', 'construction', 'interiors'],
    reply: 'Sri Ananda Nilayam specializes in 3 core disciplines across 8 comprehensive services:\n• Architectural Design & 3D Renderings\n• Luxury Residential Construction\n• Commercial Building Construction\n• Bespoke Interior Design & Styling\n• Modular Kitchen Design & Execution\n• Renovation & Complete Property Remodeling\n• Turnkey Design + Build Projects\n• Space Planning & Vastu Consultation',
  },
  {
    triggers: ['consult', 'consultation', 'book', 'appointment', 'meeting', 'free consultation'],
    reply: 'We offer an initial complimentary design & feasibility consultation! You can book by clicking "Get a Free Consultation" on our website, sending an enquiry via our Contact page, or messaging our principal architect directly on WhatsApp.',
  },
  {
    triggers: ['cost', 'price', 'pricing', 'rate', 'sq ft', 'budget', 'estimate'],
    reply: 'Our project investments vary based on finish specifications and structural requirements:\n• Architecture & Planning: tailored to project scope and built-up area\n• Residential Construction: starting from ₹1,850 to ₹3,200 per sq ft for premium turnkey structural & civil packages\n• Interior Design: customized packages starting from ₹800 to ₹2,500+ per sq ft\n• Contact us with your plot or floor plan for a complimentary detailed quote!',
  },
  {
    triggers: ['timeline', 'duration', 'time', 'how long', 'months'],
    reply: 'Project timelines depend on square footage and finishes:\n• Architectural Blueprinting & Approvals: 4–8 weeks\n• Custom Luxury Villa (2,500–5,000 sq ft): 12–16 months\n• Full Home Interior Fitout: 6–8 weeks\n• Modular Kitchens: 3–4 weeks from design signoff',
  },
  {
    triggers: ['location', 'address', 'office', 'where', 'city', 'bangalore', 'bengaluru'],
    reply: 'Our headquarters and design studio is located in Bengaluru, Karnataka at:\n123 Main Road, Bengaluru, Karnataka 560001.\nWe execute premium projects across Bengaluru, Mysuru, and neighboring Karnataka regions.',
  },
  {
    triggers: ['contact', 'phone', 'call', 'email', 'whatsapp', 'number'],
    reply: 'You can reach Sri Ananda Nilayam directly via:\n• Phone: +91 98765 43210\n• WhatsApp: +91 98765 43210\n• Email: info@srianandaniyam.example\n• Working Hours: Monday–Saturday, 9:00 AM–6:00 PM',
  },
  {
    triggers: ['turnkey', 'turnkey project', 'ready to move'],
    reply: 'Our Turnkey Project service provides single-point accountability from architectural drawings and municipal approvals to civil construction, interior carpentry, lighting, and handover with key-ready perfection.',
  },
];

export default function ChatbotModal({ isOpen, onClose }) {
  const { settings } = useSite();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Namaste! Welcome to Sri Ananda Nilayam. I am your architectural concierge. How may I assist your vision today?',
      time: 'Just now',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef(null);

  const quickQuestions = [
    'What services do you offer?',
    'How do I book a consultation?',
    'What is your pricing & cost estimate?',
    'What is your typical project timeline?',
    'Where is your design studio located?',
    'How can I speak to an architect?',
  ];

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    // Match response from FAQ knowledge
    setTimeout(() => {
      const qLower = query.toLowerCase();
      let matched = FAQ_KNOWLEDGE.find((item) =>
        item.triggers.some((trig) => qLower.includes(trig))
      );

      const botReplyText = matched
        ? matched.reply
        : `Thank you for your enquiry regarding "${query}". For specific structural evaluations and custom floor plans, our senior team will gladly assist you. You can connect instantly via WhatsApp or phone.`;

      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botReplyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 400);
  };

  if (!isOpen) return null;

  return (
    <div className="chatbot-backdrop" onClick={onClose}>
      <div className="chatbot-window" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-avatar-wrap">
            <Bot size={22} className="chatbot-bot-icon" />
            <div>
              <h4 className="chatbot-title">Nilayam Architectural Concierge</h4>
              <span className="chatbot-status">
                <span className="chatbot-status-dot" /> Online • Ready to Assist
              </span>
            </div>
          </div>
          <button type="button" onClick={onClose} className="chatbot-close-btn" aria-label="Close Assistant">
            <X size={20} />
          </button>
        </div>

        {/* Messages Body */}
        <div className="chatbot-body">
          {messages.map((m) => (
            <div key={m.id} className={`chatbot-msg ${m.sender === 'user' ? 'msg-user' : 'msg-bot'}`}>
              <div className="msg-bubble">
                <p className="msg-content">{m.text}</p>
                <span className="msg-time">{m.time}</span>
              </div>
            </div>
          ))}

          {/* Quick suggestions */}
          <div className="chatbot-chips-container">
            <span className="chips-label"><Sparkles size={13} /> Frequently Asked:</span>
            <div className="chips-grid">
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  type="button"
                  className="chatbot-chip"
                  onClick={() => handleSend(q)}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <div ref={chatEndRef} />
        </div>

        {/* Actions bar */}
        <div className="chatbot-actions-bar">
          <a
            href={`https://wa.me/${settings.whatsappRaw}?text=${encodeURIComponent('Hello Sri Ananda Nilayam, I would like to schedule an architectural consultation.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="chatbot-action-link whatsapp-link"
          >
            <MessageSquare size={14} /> WhatsApp Us
          </a>
          <a href={`tel:${settings.phoneRaw}`} className="chatbot-action-link phone-link">
            <Phone size={14} /> Call Architect
          </a>
        </div>

        {/* Input area */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="chatbot-input-form"
        >
          <input
            type="text"
            placeholder="Ask about design, construction, or budget..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="chatbot-input"
          />
          <button type="submit" className="chatbot-send-btn" aria-label="Send Message">
            <Send size={16} />
          </button>
        </form>
      </div>

      <style>{`
        .chatbot-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(4, 11, 22, 0.6);
          backdrop-filter: blur(4px);
          z-index: 9999;
          display: flex;
          align-items: flex-end;
          justify-content: flex-start;
          padding: 2rem;
        }

        .chatbot-window {
          width: 100%;
          max-width: 440px;
          height: 600px;
          max-height: 85vh;
          background: #0A1B33;
          border: 1px solid rgba(214, 164, 59, 0.4);
          border-radius: var(--radius-lg);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(214, 164, 59, 0.2);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: slideUpFade 0.3s ease-out;
        }

        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .chatbot-header {
          background: #102A4C;
          border-bottom: 1px solid rgba(214, 164, 59, 0.25);
          padding: 1rem 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .chatbot-avatar-wrap {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .chatbot-bot-icon {
          color: var(--color-gold);
          background: rgba(214, 164, 59, 0.15);
          padding: 6px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(214, 164, 59, 0.3);
        }

        .chatbot-title {
          font-family: var(--font-serif);
          font-size: 0.98rem;
          color: #FFF;
          margin-bottom: 2px;
        }

        .chatbot-status {
          font-size: 0.75rem;
          color: var(--color-slate-light);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .chatbot-status-dot {
          width: 8px;
          height: 8px;
          background: #10B981;
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 8px #10B981;
        }

        .chatbot-close-btn {
          background: transparent;
          border: none;
          color: var(--color-slate-light);
          cursor: pointer;
          transition: color 0.2s;
        }

        .chatbot-close-btn:hover {
          color: #FFF;
        }

        .chatbot-body {
          flex: 1;
          padding: 1.25rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          background: #08162A;
        }

        .chatbot-msg {
          display: flex;
          max-width: 85%;
        }

        .msg-bot {
          align-self: flex-start;
        }

        .msg-user {
          align-self: flex-end;
        }

        .msg-bubble {
          padding: 0.85rem 1.1rem;
          border-radius: 14px;
          font-size: 0.9rem;
          line-height: 1.55;
          white-space: pre-line;
        }

        .msg-bot .msg-bubble {
          background: rgba(16, 42, 76, 0.85);
          color: var(--color-ivory-warm);
          border: 1px solid rgba(214, 164, 59, 0.2);
          border-bottom-left-radius: 4px;
        }

        .msg-user .msg-bubble {
          background: var(--grad-gold);
          color: #061121;
          font-weight: 500;
          border-bottom-right-radius: 4px;
        }

        .msg-content {
          margin-bottom: 0.3rem;
        }

        .msg-time {
          display: block;
          font-size: 0.7rem;
          opacity: 0.7;
          text-align: right;
        }

        .chatbot-chips-container {
          margin-top: 0.5rem;
        }

        .chips-label {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.75rem;
          color: var(--color-gold);
          text-transform: uppercase;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .chips-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .chatbot-chip {
          background: rgba(16, 42, 76, 0.6);
          border: 1px solid rgba(214, 164, 59, 0.25);
          color: var(--color-ivory);
          font-size: 0.78rem;
          padding: 0.4rem 0.75rem;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }

        .chatbot-chip:hover {
          background: rgba(214, 164, 59, 0.2);
          border-color: var(--color-gold);
          color: var(--color-gold-light);
        }

        .chatbot-actions-bar {
          display: flex;
          background: #0B1D38;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding: 0.5rem 1rem;
          gap: 0.75rem;
        }

        .chatbot-action-link {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          padding: 0.45rem 0.65rem;
          font-size: 0.8rem;
          border-radius: var(--radius-sm);
          font-weight: 600;
          text-decoration: none;
        }

        .whatsapp-link {
          background: rgba(37, 211, 102, 0.15);
          color: #25D366;
          border: 1px solid rgba(37, 211, 102, 0.3);
        }

        .phone-link {
          background: rgba(214, 164, 59, 0.15);
          color: var(--color-gold-light);
          border: 1px solid rgba(214, 164, 59, 0.3);
        }

        .chatbot-input-form {
          padding: 0.75rem 1rem;
          background: #102A4C;
          border-top: 1px solid rgba(214, 164, 59, 0.2);
          display: flex;
          gap: 0.5rem;
        }

        .chatbot-input {
          flex: 1;
          background: rgba(6, 17, 33, 0.85);
          border: 1px solid rgba(214, 164, 59, 0.25);
          border-radius: var(--radius-sm);
          color: #FFF;
          padding: 0.65rem 0.85rem;
          font-size: 0.88rem;
          outline: none;
        }

        .chatbot-input:focus {
          border-color: var(--color-gold);
        }

        .chatbot-send-btn {
          background: var(--grad-gold);
          border: none;
          color: #061121;
          width: 40px;
          height: 40px;
          border-radius: var(--radius-sm);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s;
        }

        .chatbot-send-btn:hover {
          transform: scale(1.05);
        }

        @media (max-width: 640px) {
          .chatbot-backdrop {
            padding: 0;
          }
          .chatbot-window {
            max-width: 100%;
            height: 100vh;
            max-height: 100vh;
            border-radius: 0;
          }
        }
      `}</style>
    </div>
  );
}
