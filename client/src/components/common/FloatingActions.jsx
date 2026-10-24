import { useState } from 'react';
import { Phone, Bot } from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import ChatbotModal from './ChatbotModal';

const WhatsAppIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.11 7.44C8.95 7.44 8.7 7.5 8.48 7.74C8.26 7.97 7.64 8.56 7.64 9.77C7.64 10.99 8.53 12.16 8.65 12.33C8.78 12.49 10.41 15 12.9 16.07C14.96 16.96 15.38 16.78 15.83 16.74C16.28 16.7 17.27 16.15 17.48 15.57C17.68 14.99 17.68 14.5 17.62 14.39C17.56 14.3 17.41 14.24 17.18 14.13C16.95 14.01 15.83 13.46 15.62 13.38C15.42 13.31 15.27 13.27 15.13 13.5C14.98 13.72 14.56 14.21 14.43 14.36C14.3 14.5 14.18 14.53 13.95 14.41C13.72 14.3 13 14.06 12.14 13.29C11.47 12.7 11.02 11.96 10.89 11.73C10.76 11.5 10.88 11.38 10.99 11.27C11.1 11.16 11.23 10.99 11.35 10.85C11.47 10.71 11.51 10.61 11.58 10.46C11.66 10.31 11.62 10.18 11.56 10.07C11.5 9.96 11.06 8.87 10.87 8.42C10.69 7.98 10.51 8.04 10.37 8.03H9.94C9.76 8.03 9.47 8.1 9.25 8.33C9.03 8.56 8.41 9.15 8.41 10.36C8.41 11.58 9.3 12.75 9.42 12.92" />
  </svg>
);

export default function FloatingActions() {
  const { settings } = useSite();
  const [chatOpen, setChatOpen] = useState(false);

  const whatsappMessage = encodeURIComponent(
    'Hello Sri Ananda Nilayam, I would like to enquire about your architectural design, construction & interior services.'
  );

  return (
    <>
      <div className="floating-controls-wrap">
        {/* Left Side: Concierge Chatbot with Speech Bubble matching mockup */}
        <div className="floating-left">
          <div className="chatbot-launcher-pill" onClick={() => setChatOpen(true)}>
            <div className="chatbot-avatar-circle">
              <Bot size={22} />
            </div>
            <div className="chatbot-speech-bubble">
              <span>Hi! How can I help you?</span>
            </div>
          </div>
        </div>

        {/* Right Side: Circular WhatsApp and Call Us Stack matching mockup */}
        <div className="floating-right">
          {/* WhatsApp Action */}
          <a
            href={`https://wa.me/${settings.whatsappRaw || '919876543210'}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="floating-circle-btn btn-whatsapp"
            aria-label="Chat on WhatsApp"
            title="Chat on WhatsApp"
          >
            <div className="fc-icon-wrap">
              <WhatsAppIcon size={24} />
            </div>
          </a>

          {/* Call Us Action */}
          <a
            href={`tel:${settings.phoneRaw || '+919876543210'}`}
            className="floating-circle-btn btn-call"
            aria-label="Call Us"
            title="Call Us"
          >
            <div className="fc-icon-wrap">
              <Phone size={20} />
            </div>
          </a>
        </div>
      </div>

      {/* Interactive FAQ Chatbot Modal */}
      <ChatbotModal isOpen={chatOpen} onClose={() => setChatOpen(false)} />

      <style>{`
        .floating-controls-wrap {
          position: fixed;
          bottom: 1.5rem;
          left: 0;
          right: 0;
          pointer-events: none;
          z-index: 990;
          display: flex;
          justify-content: space-between;
          padding: 0 1.5rem;
        }

        .floating-left, .floating-right {
          display: flex;
          align-items: flex-end;
          pointer-events: auto;
        }

        .floating-right {
          flex-direction: column;
          gap: 0.65rem;
        }

        /* Chatbot Launcher with Speech Bubble */
        .chatbot-launcher-pill {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          transition: transform 0.25s ease;
        }

        .chatbot-launcher-pill:hover {
          transform: translateY(-2px) scale(1.02);
        }

        .chatbot-avatar-circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0D2038 0%, #061426 100%);
          border: 1.5px solid #E5AE3F;
          color: #E5AE3F;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.45), 0 0 12px rgba(229, 174, 63, 0.3);
        }

        .chatbot-speech-bubble {
          background: #FFFFFF;
          color: #061426;
          font-family: var(--font-sans);
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.4rem 0.85rem;
          border-radius: 16px;
          border-bottom-left-radius: 3px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
          white-space: nowrap;
          border: 1px solid rgba(229, 174, 63, 0.3);
          position: relative;
        }

        /* Right Floating Circular Action Buttons */
        .floating-circle-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          text-decoration: none;
          transition: transform 0.25s ease;
        }

        .floating-circle-btn:hover {
          transform: translateY(-2px) scale(1.05);
        }

        .fc-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
        }

        .btn-whatsapp .fc-icon-wrap {
          background: #25D366;
          color: #FFFFFF;
          box-shadow: 0 4px 16px rgba(37, 211, 102, 0.35);
        }

        .btn-call .fc-icon-wrap {
          background: linear-gradient(135deg, #F3BA4E 0%, #E5AE3F 100%);
          color: #061426;
          box-shadow: 0 4px 16px rgba(229, 174, 63, 0.35);
        }

        .fc-label {
          font-family: var(--font-sans);
          font-size: 0.7rem;
          font-weight: 600;
          color: #F8F6F0;
          background: rgba(6, 20, 38, 0.9);
          padding: 0.2rem 0.55rem;
          border-radius: 8px;
          border: 1px solid rgba(229, 174, 63, 0.2);
          letter-spacing: 0.2px;
        }

        @media (max-width: 768px) {
          .floating-controls-wrap {
            padding: 0 1rem;
            bottom: 1rem;
          }
          .fc-label {
            display: none;
          }
          .chatbot-speech-bubble {
            display: none;
          }
          .chatbot-avatar-circle,
          .fc-icon-wrap {
            width: 42px;
            height: 42px;
          }
        }
      `}</style>
    </>
  );
}
