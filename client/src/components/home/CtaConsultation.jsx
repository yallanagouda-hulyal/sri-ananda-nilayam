import { Link } from 'react-router-dom';
import { ArrowRight, Phone, ShieldCheck, Clock, CalendarDays } from 'lucide-react';
import { useSite } from '../../context/SiteContext';

// WhatsApp brand SVG icon matching official brand geometry
const WhatsAppIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.11 7.44C8.95 7.44 8.7 7.5 8.48 7.74C8.26 7.97 7.64 8.56 7.64 9.77C7.64 10.99 8.53 12.16 8.65 12.33C8.78 12.49 10.41 15 12.9 16.07C14.96 16.96 15.38 16.78 15.83 16.74C16.28 16.7 17.27 16.15 17.48 15.57C17.68 14.99 17.68 14.5 17.62 14.39C17.56 14.3 17.41 14.24 17.18 14.13C16.95 14.01 15.83 13.46 15.62 13.38C15.42 13.31 15.27 13.27 15.13 13.5C14.98 13.72 14.56 14.21 14.43 14.36C14.3 14.5 14.18 14.53 13.95 14.41C13.72 14.3 13 14.06 12.14 13.29C11.47 12.7 11.02 11.96 10.89 11.73C10.76 11.5 10.88 11.38 10.99 11.27C11.1 11.16 11.23 10.99 11.35 10.85C11.47 10.71 11.51 10.61 11.58 10.46C11.66 10.31 11.62 10.18 11.56 10.07C11.5 9.96 11.06 8.87 10.87 8.42C10.69 7.98 10.51 8.04 10.37 8.03H9.94C9.76 8.03 9.47 8.1 9.25 8.33C9.03 8.56 8.41 9.15 8.41 10.36C8.41 11.58 9.3 12.75 9.42 12.92" />
  </svg>
);

// High-rise architectural building icon for the floating badge
const BuildingBadgeIcon = ({ size = 26 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="11" height="18" rx="2" ry="2" />
    <path d="M14 8h7v14h-7" />
    <path d="M7 8h.01" />
    <path d="M10 8h.01" />
    <path d="M7 12h.01" />
    <path d="M10 12h.01" />
    <path d="M7 16h.01" />
    <path d="M10 16h.01" />
    <path d="M17 12h.01" />
    <path d="M17 16h.01" />
    <path d="M7 22v-2" />
  </svg>
);

export default function CtaConsultation() {
  const { settings } = useSite();

  return (
    <section className="cta-consultation-section">
      <div className="container">
        <div className="cta-consultation-card">
          {/* Top-Left Blue Dot Grid (4x4) */}
          <div className="cta-dots cta-dots-top-left" aria-hidden="true">
            {[...Array(16)].map((_, i) => (
              <span key={`tl-${i}`} className="cta-dot" />
            ))}
          </div>

          {/* Bottom-Right Blue Dot Grid (4x4) */}
          <div className="cta-dots cta-dots-bottom-right" aria-hidden="true">
            {[...Array(16)].map((_, i) => (
              <span key={`br-${i}`} className="cta-dot" />
            ))}
          </div>

          {/* Subtle Blueprint Wireframe Art in Top-Right Background */}
          <svg className="cta-blueprint-bg" viewBox="0 0 460 340" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <g stroke="#075BDB" strokeWidth="1" strokeOpacity="0.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="20" y1="280" x2="440" y2="280" strokeDasharray="4 4" strokeOpacity="0.16" />
              <line x1="60" y1="290" x2="440" y2="245" strokeOpacity="0.12" />
              
              {/* Ground Floor Foundation & Columns */}
              <polygon points="120,280 320,280 390,235 190,235" fill="none" />
              <line x1="120" y1="280" x2="120" y2="175" />
              <line x1="320" y1="280" x2="320" y2="175" />
              <line x1="390" y1="235" x2="390" y2="130" />
              <line x1="190" y1="235" x2="190" y2="130" />
              
              {/* Intermediate Concrete Slab */}
              <polygon points="110,175 330,175 400,130 180,130" fill="none" strokeWidth="1.4" />
              <polygon points="110,170 330,170 400,125 180,125" fill="none" />
              
              {/* Upper Floor Cantilever */}
              <line x1="145" y1="170" x2="145" y2="85" />
              <line x1="305" y1="170" x2="305" y2="85" />
              <line x1="375" y1="125" x2="375" y2="50" />
              <line x1="215" y1="125" x2="215" y2="50" />
              
              {/* Modern Flat Roof Overhang */}
              <polygon points="130,85 320,85 405,40 215,40" fill="none" strokeWidth="1.6" />
              <polygon points="130,80 320,80 405,35 215,35" fill="none" />
              
              {/* Window Paneling & Architectural Mullions */}
              <line x1="155" y1="280" x2="155" y2="175" />
              <line x1="200" y1="280" x2="200" y2="175" />
              <line x1="245" y1="280" x2="245" y2="175" />
              <line x1="285" y1="280" x2="285" y2="175" />
              <line x1="120" y1="225" x2="320" y2="225" strokeDasharray="3 3" strokeOpacity="0.14" />
              
              {/* Upper Windows & Balcony Glass */}
              <line x1="180" y1="170" x2="180" y2="85" />
              <line x1="220" y1="170" x2="220" y2="85" />
              <line x1="265" y1="170" x2="265" y2="85" />
              <line x1="145" y1="125" x2="305" y2="125" strokeOpacity="0.16" />
              
              {/* Cantilever Balcony Railing */}
              <line x1="320" y1="160" x2="380" y2="120" strokeWidth="1.1" />
              <line x1="320" y1="170" x2="320" y2="160" />
              <line x1="350" y1="150" x2="350" y2="140" />
              <line x1="380" y1="130" x2="380" y2="120" />
              
              {/* Dimension Extension Lines */}
              <line x1="90" y1="280" x2="90" y2="80" strokeDasharray="3 3" strokeOpacity="0.12" />
              <line x1="80" y1="80" x2="130" y2="80" strokeOpacity="0.14" />
              <line x1="80" y1="280" x2="120" y2="280" strokeOpacity="0.14" />
              <line x1="405" y1="40" x2="450" y2="30" strokeDasharray="2 3" strokeOpacity="0.1" />
            </g>
          </svg>

          {/* Two-Column Grid Layout */}
          <div className="cta-card-grid">
            {/* Left Column: Image with Layered Blue Shapes and Badge */}
            <div className="cta-image-col">
              <div className="cta-image-stack">
                {/* Layer 1: Pastel Light-Blue Shape */}
                <div className="cta-shape-light-blue" aria-hidden="true" />
                
                {/* Layer 2: Vivid Royal-Blue Angled Shape */}
                <div className="cta-shape-royal-blue" aria-hidden="true" />

                {/* Layer 3: Main Photograph Frame */}
                <div className="cta-photo-frame">
                  <img
                    src="/images/construction-team-consultation.jpg"
                    alt="Sri Ananda Nilayam architectural and construction team reviewing blueprint plans"
                    className="cta-team-image"
                    loading="eager"
                  />
                </div>

                {/* Layer 4: Dark Navy Overlay Badge */}
                <div className="cta-image-badge">
                  <div className="cta-badge-icon-box">
                    <BuildingBadgeIcon size={24} />
                  </div>
                  <div className="cta-badge-content">
                    <span className="cta-badge-title">Turning Your Vision</span>
                    <span className="cta-badge-subtitle">
                      Into <span className="cta-badge-gold">Timeless Spaces</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Architectural Consultation Content */}
            <div className="cta-content-col">
              {/* Eyebrow */}
              <div className="cta-eyebrow-container">
                <span className="cta-eyebrow-bar" />
                <span className="cta-eyebrow-label">YOUR VISION, OUR BLUEPRINT</span>
                <span className="cta-eyebrow-bar" />
              </div>

              {/* Main Heading */}
              <h2 className="cta-main-heading">
                Ready To Design &amp; Build
                <span className="cta-heading-accent">YOUR LANDMARK?</span>
              </h2>

              {/* Description */}
              <p className="cta-main-desc">
                Schedule an exclusive design &amp; feasibility session with our principal architect.
                We will evaluate your plot coordinates, zoning parameters, and lifestyle expectations with zero obligations.
              </p>

              {/* Action Buttons Row */}
              <div className="cta-actions-row">
                <Link to="/contact" className="cta-btn-primary">
                  <CalendarDays size={18} className="cta-btn-icon" />
                  <span>Book a Free Consultation</span>
                  <ArrowRight size={17} className="cta-btn-arrow" />
                </Link>

                <a
                  href={`https://wa.me/${settings.whatsappRaw || '919876543210'}?text=${encodeURIComponent('Hello Sri Ananda Nilayam, I would like to book a free consultation for our project.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-btn-secondary"
                >
                  <span className="cta-whatsapp-icon-wrap">
                    <WhatsAppIcon size={19} />
                  </span>
                  <span>WhatsApp Architect Directly</span>
                </a>
              </div>

              {/* Call Link Centered Under Buttons */}
              <div className="cta-contact-phone">
                <Phone size={15} className="cta-phone-icon" />
                <span className="cta-phone-text">
                  Or call{' '}
                  <a href={`tel:${settings.phoneRaw || '+919876543210'}`} className="cta-phone-highlight">
                    {settings.phone || '+91 98765 43210'}
                  </a>
                </span>
              </div>

              {/* Thin Divider */}
              <div className="cta-divider" />

              {/* Trust Indicators with Vertical Separator */}
              <div className="cta-trust-indicators">
                <div className="cta-trust-item">
                  <div className="cta-trust-badge">
                    <ShieldCheck size={20} />
                  </div>
                  <div className="cta-trust-text-group">
                    <span className="cta-trust-line">100% Confidential</span>
                    <span className="cta-trust-line">Project Analysis</span>
                  </div>
                </div>

                <div className="cta-trust-separator" aria-hidden="true" />

                <div className="cta-trust-item">
                  <div className="cta-trust-badge">
                    <Clock size={20} />
                  </div>
                  <div className="cta-trust-text-group">
                    <span className="cta-trust-line">Complimentary 48-Hour</span>
                    <span className="cta-trust-line">Feasibility Review</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* ==========================================================================
           CTA CONSULTATION REDESIGN - SRI ANANDA NILAYAM
           Pure White Background (#FFFFFF) + Two-Column Luxury Architecture Card
           ========================================================================== */

        .cta-consultation-section {
          background-color: #FFFFFF;
          padding: 4.5rem 0 5rem;
          position: relative;
          overflow: hidden;
        }

        .cta-consultation-card {
          background: #FFFFFF;
          border: 1px solid #E8EEF5;
          border-radius: 28px;
          box-shadow: 0 16px 45px -10px rgba(11, 35, 69, 0.08), 0 2px 12px rgba(11, 35, 69, 0.03);
          padding: 3.25rem 3.5rem 2.85rem 3.25rem;
          position: relative;
          overflow: hidden;
          animation: ctaFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes ctaFadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ── Blue Dot Patterns (4x4 Matrix) ── */
        .cta-dots {
          position: absolute;
          display: grid;
          grid-template-columns: repeat(4, 5px);
          grid-template-rows: repeat(4, 5px);
          gap: 12px;
          pointer-events: none;
          z-index: 1;
        }

        .cta-dots-top-left {
          top: 28px;
          left: 28px;
        }

        .cta-dots-bottom-right {
          bottom: 28px;
          right: 28px;
        }

        .cta-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: #075BDB;
          opacity: 0.55;
        }

        /* ── Blueprint Wireframe Illustration in Background ── */
        .cta-blueprint-bg {
          position: absolute;
          top: -10px;
          right: -10px;
          width: 450px;
          height: auto;
          pointer-events: none;
          z-index: 1;
          opacity: 0.9;
        }

        /* ── Two-Column Grid Layout ── */
        .cta-card-grid {
          display: grid;
          grid-template-columns: 44% 56%;
          gap: 3.25rem;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        /* ==========================================================================
           LEFT COLUMN - LAYERED IMAGE STACK
           ========================================================================== */

        .cta-image-col {
          position: relative;
          padding: 1rem 0.5rem 1.5rem 0.75rem;
        }

        .cta-image-stack {
          position: relative;
          width: 100%;
        }

        /* Layer 1: Pastel Light-Blue Shape */
        .cta-shape-light-blue {
          position: absolute;
          top: -12px;
          right: -10px;
          width: 96%;
          height: 94%;
          background: #D8E7FA;
          border-radius: 26px;
          z-index: 1;
          transition: transform 0.4s ease;
        }

        /* Layer 2: Vivid Royal-Blue Angled Shape */
        .cta-shape-royal-blue {
          position: absolute;
          bottom: -14px;
          left: -12px;
          width: 96%;
          height: 94%;
          background: #075BDB;
          border-radius: 26px;
          transform: rotate(-3.5deg);
          z-index: 2;
          transition: transform 0.4s ease;
        }

        .cta-image-stack:hover .cta-shape-light-blue {
          transform: translate(3px, -3px);
        }

        .cta-image-stack:hover .cta-shape-royal-blue {
          transform: rotate(-4.2deg) translate(-2px, 2px);
        }

        /* Layer 3: Main Photograph Frame with Slight Angle */
        .cta-photo-frame {
          position: relative;
          z-index: 3;
          border-radius: 20px;
          overflow: hidden;
          aspect-ratio: 4 / 3;
          background: #0B2345;
          transform: rotate(-1.5deg);
          box-shadow: 0 16px 36px -6px rgba(11, 35, 69, 0.22);
          transition: transform 0.4s ease;
        }

        .cta-image-stack:hover .cta-photo-frame {
          transform: rotate(0deg);
        }

        .cta-team-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cta-photo-frame:hover .cta-team-image {
          transform: scale(1.035);
        }

        /* Layer 4: Dark Navy Overlay Badge */
        .cta-image-badge {
          position: absolute;
          bottom: 16px;
          left: 12px;
          z-index: 5;
          background: linear-gradient(135deg, #0B2345 0%, #071930 100%);
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 12px;
          padding: 0.65rem 0.95rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .cta-badge-icon-box {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .cta-badge-content {
          display: flex;
          flex-direction: column;
          line-height: 1.25;
        }

        .cta-badge-title {
          font-family: var(--font-sans);
          font-size: 0.76rem;
          color: #FFFFFF;
          font-weight: 500;
          letter-spacing: 0.2px;
        }

        .cta-badge-subtitle {
          font-family: var(--font-sans);
          font-size: 0.84rem;
          color: #FFFFFF;
          font-weight: 700;
        }

        .cta-badge-gold {
          color: #FBBF24;
        }

        /* ==========================================================================
           RIGHT COLUMN - CONTENT & CALL TO ACTION
           ========================================================================== */

        .cta-content-col {
          display: flex;
          flex-direction: column;
        }

        /* ── Eyebrow ── */
        .cta-eyebrow-container {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.85rem;
        }

        .cta-eyebrow-bar {
          width: 24px;
          height: 1.5px;
          background-color: #075BDB;
          display: inline-block;
        }

        .cta-eyebrow-label {
          font-family: var(--font-sans);
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #075BDB;
        }

        /* ── Heading ── */
        .cta-main-heading {
          font-family: var(--font-serif);
          font-size: clamp(1.95rem, 2.7vw, 2.65rem);
          font-weight: 800;
          line-height: 1.2;
          color: #0B2345;
          margin-bottom: 1.15rem;
          letter-spacing: 0.5px;
        }

        .cta-heading-accent {
          display: block;
          color: #075BDB;
          margin-top: 0.2rem;
        }

        /* ── Description ── */
        .cta-main-desc {
          font-family: var(--font-sans);
          font-size: 0.96rem;
          color: #4A5568;
          line-height: 1.68;
          margin-bottom: 1.75rem;
          max-width: 560px;
        }

        /* ── Action Buttons Row ── */
        .cta-actions-row {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          flex-wrap: wrap;
          margin-bottom: 0.85rem;
        }

        /* Primary Button: Royal Blue */
        .cta-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          background: #075BDB;
          color: #FFFFFF;
          font-family: var(--font-sans);
          font-size: 0.92rem;
          font-weight: 600;
          padding: 0.82rem 1.45rem;
          border-radius: 10px;
          border: 1px solid #075BDB;
          box-shadow: 0 6px 20px rgba(7, 91, 219, 0.32);
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          white-space: nowrap;
          cursor: pointer;
        }

        .cta-btn-primary:hover {
          background: #0548B2;
          border-color: #0548B2;
          color: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(7, 91, 219, 0.45);
        }

        .cta-btn-icon {
          flex-shrink: 0;
        }

        .cta-btn-arrow {
          transition: transform 0.25s ease;
          flex-shrink: 0;
        }

        .cta-btn-primary:hover .cta-btn-arrow {
          transform: translateX(3px);
        }

        /* Secondary Button: White with Navy Border */
        .cta-btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          background: #FFFFFF;
          color: #0B2345;
          font-family: var(--font-sans);
          font-size: 0.92rem;
          font-weight: 600;
          padding: 0.82rem 1.45rem;
          border-radius: 10px;
          border: 1.5px solid #0B2345;
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          white-space: nowrap;
          cursor: pointer;
        }

        .cta-btn-secondary:hover {
          background: #0B2345;
          color: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(11, 35, 69, 0.18);
        }

        .cta-whatsapp-icon-wrap {
          color: #25D366;
          display: flex;
          align-items: center;
          transition: transform 0.25s ease;
          flex-shrink: 0;
        }

        .cta-btn-secondary:hover .cta-whatsapp-icon-wrap {
          transform: scale(1.08);
        }

        /* ── Call Contact Line ── */
        .cta-contact-phone {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-sans);
          font-size: 0.92rem;
          color: #4A5568;
          margin-bottom: 1.85rem;
        }

        .cta-phone-icon {
          color: #075BDB;
          flex-shrink: 0;
        }

        .cta-phone-text {
          color: #4A5568;
        }

        .cta-phone-highlight {
          color: #075BDB;
          font-weight: 700;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .cta-phone-highlight:hover {
          color: #0548B2;
          text-decoration: underline;
        }

        /* ── Thin Divider ── */
        .cta-divider {
          height: 1px;
          background: #E5EBF2;
          width: 100%;
          margin-bottom: 1.35rem;
        }

        /* ── Trust Indicators ── */
        .cta-trust-indicators {
          display: flex;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .cta-trust-item {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
        }

        .cta-trust-badge {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #E8F1FD;
          color: #075BDB;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.25s ease, background 0.25s ease;
        }

        .cta-trust-item:hover .cta-trust-badge {
          transform: scale(1.08);
          background: #D8E7FA;
        }

        .cta-trust-text-group {
          display: flex;
          flex-direction: column;
          line-height: 1.3;
        }

        .cta-trust-line {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 600;
          color: #0B2345;
          letter-spacing: 0.1px;
        }

        .cta-trust-separator {
          width: 1px;
          height: 28px;
          background: #E2E8F0;
        }

        /* ==========================================================================
           RESPONSIVE BREAKPOINTS
           ========================================================================== */

        @media (max-width: 1180px) {
          .cta-consultation-card {
            padding: 3rem 2.5rem 2.5rem 2.5rem;
          }
          .cta-card-grid {
            grid-template-columns: 46% 54%;
            gap: 2.5rem;
          }
          .cta-main-heading {
            font-size: 2.15rem;
          }
          .cta-btn-primary,
          .cta-btn-secondary {
            padding: 0.78rem 1.25rem;
            font-size: 0.88rem;
          }
        }

        @media (max-width: 991px) {
          .cta-consultation-section {
            padding: 4rem 0;
          }
          .cta-consultation-card {
            padding: 2.75rem 2rem 2.25rem 2rem;
            border-radius: 24px;
          }
          .cta-card-grid {
            grid-template-columns: 1fr;
            gap: 2.75rem;
          }
          .cta-image-col {
            max-width: 540px;
            margin: 0 auto;
            padding: 1rem 0.5rem 1.25rem 0.75rem;
            width: 100%;
          }
          .cta-content-col {
            align-items: center;
            text-align: center;
          }
          .cta-main-desc {
            margin-left: auto;
            margin-right: auto;
          }
          .cta-actions-row {
            justify-content: center;
          }
          .cta-contact-phone {
            justify-content: center;
          }
          .cta-trust-indicators {
            justify-content: center;
            gap: 1.5rem;
          }
        }

        @media (max-width: 640px) {
          .cta-consultation-section {
            padding: 3rem 0;
          }
          .cta-consultation-card {
            padding: 2rem 1.25rem 1.75rem 1.25rem;
            border-radius: 20px;
          }
          .cta-dots {
            display: none;
          }
          .cta-blueprint-bg {
            display: none;
          }
          .cta-image-col {
            padding: 0.5rem 0.25rem 1rem 0.5rem;
          }
          .cta-photo-frame {
            border-radius: 16px;
            transform: none;
          }
          .cta-image-badge {
            bottom: 12px;
            left: 10px;
            padding: 0.5rem 0.75rem;
            gap: 0.6rem;
            border-radius: 10px;
          }
          .cta-badge-icon-box svg {
            width: 22px;
            height: 22px;
          }
          .cta-badge-title {
            font-size: 0.72rem;
          }
          .cta-badge-subtitle {
            font-size: 0.78rem;
          }
          .cta-main-heading {
            font-size: 1.65rem;
          }
          .cta-main-desc {
            font-size: 0.9rem;
            margin-bottom: 1.4rem;
          }
          .cta-actions-row {
            flex-direction: column;
            width: 100%;
            gap: 0.75rem;
          }
          .cta-btn-primary,
          .cta-btn-secondary {
            width: 100%;
            padding: 0.85rem 1.25rem;
            font-size: 0.9rem;
          }
          .cta-trust-indicators {
            flex-direction: column;
            align-items: center;
            gap: 0.85rem;
            text-align: left;
          }
          .cta-trust-separator {
            display: none;
          }
          .cta-trust-item {
            width: 100%;
            justify-content: flex-start;
          }
        }
      `}</style>
    </section>
  );
}
