import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Phone, MapPin, Clock, Menu, X, ArrowRight } from 'lucide-react';
import { useSite } from '../../context/SiteContext';
import BrandLogo from './BrandLogo';

const InstagramIcon = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const LinkedinIcon = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" r="2" />
  </svg>
);

const YoutubeIcon = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
  </svg>
);

export default function Header() {
  const { settings } = useSite();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Scroll listener for sticky header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className={`header-root ${isScrolled ? 'header-scrolled' : ''}`}>
      {/* 1. Top Information Bar */}
      <div className="top-bar">
        <div className="container top-bar-container">
          <div className="top-bar-left">
            <span className="top-info-item">
              <MapPin size={13} className="top-icon" />
              <span>{settings.address || '123 Main Road, Bengaluru, Karnataka 560001'}</span>
            </span>
            <span className="top-info-item">
              <Clock size={13} className="top-icon" />
              <span>{settings.workingHours || 'Monday–Saturday, 9:00 AM – 6:00 PM'}</span>
            </span>
          </div>

          <div className="top-bar-right">
            <a href={`tel:${settings.phoneRaw || '+919876543210'}`} className="top-phone-link">
              <Phone size={13} className="top-icon" />
              <span>{settings.phone || '+91 98765 43210'}</span>
            </a>

            <div className="top-socials">
              <a href={settings.instagram || 'https://instagram.com'} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="top-social-link">
                <InstagramIcon size={13} />
              </a>
              <a href={settings.facebook || 'https://facebook.com'} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="top-social-link">
                <FacebookIcon size={13} />
              </a>
              <a href={settings.linkedin || 'https://linkedin.com'} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="top-social-link">
                <LinkedinIcon size={13} />
              </a>
              <a href={settings.youtube || 'https://youtube.com'} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="top-social-link">
                <YoutubeIcon size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar: Floating Pill */}
      <div className="main-nav-bar">
        <div className="container">
          <div className="main-nav-container">
            {/* Brand Logo */}
            <Link to="/" className="brand-logo-link" aria-label="Shri Ananda Nilayam - Return to Homepage">
              <BrandLogo variant="dark" height={42} />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="desktop-nav" aria-label="Main Navigation">
              {navLinks.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
                  end={item.path === '/'}
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>

            {/* Consultation CTA & Mobile Toggle */}
            <div className="nav-actions">
              <Link to="/contact" className="btn-header-consultation btn-shimmer">
                <span>Get a Free Consultation</span>
                <ArrowRight size={14} className="cta-arrow" />
              </Link>

              <button
                type="button"
                className="mobile-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Mobile Navigation Drawer */}
      <div
        className={`mobile-drawer-backdrop ${mobileMenuOpen ? 'backdrop-active' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      <div
        className={`mobile-drawer ${mobileMenuOpen ? 'mobile-drawer-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <div className="mobile-drawer-inner">
          <div className="mobile-drawer-header">
            <BrandLogo variant="light" height={38} />
            <button
              type="button"
              className="mobile-close-btn"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="mobile-nav-links" aria-label="Mobile Navigation Links">
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `mobile-nav-link ${isActive ? 'mobile-nav-link-active' : ''}`}
                end={item.path === '/'}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>{item.name}</span>
                <ArrowRight size={14} className="mobile-link-arrow" />
              </NavLink>
            ))}
          </nav>

          <div className="mobile-drawer-footer">
            <Link
              to="/contact"
              className="btn btn-primary w-full"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Get a Free Consultation</span>
              <ArrowRight size={16} />
            </Link>

            <div className="mobile-contact-info">
              <a href={`tel:${settings.phoneRaw || '+919876543210'}`} className="mobile-contact-line">
                <Phone size={14} className="text-gold" />
                <span>{settings.phone || '+91 98765 43210'}</span>
              </a>
              <div className="mobile-contact-line">
                <MapPin size={14} className="text-gold" />
                <span>{settings.address || 'Bengaluru, Karnataka'}</span>
              </div>
              <div className="mobile-contact-line">
                <Clock size={14} className="text-gold" />
                <span>{settings.workingHours || 'Mon – Sat: 9:00 AM – 6:00 PM'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Header Root Container */
        .header-root {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transition: background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
        }

        /* 1. Top Bar */
        .top-bar {
          background: #061426;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 0.4rem 0;
          font-size: 0.8rem;
          color: var(--color-slate-light);
          transition: max-height 0.3s ease, opacity 0.3s ease, padding 0.3s ease;
        }

        .header-scrolled .top-bar {
          max-height: 0;
          opacity: 0;
          padding: 0;
          overflow: hidden;
          border-bottom: none;
        }

        .top-bar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .top-bar-left, .top-bar-right {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .top-info-item {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          color: var(--color-slate-light);
          letter-spacing: 0.2px;
        }

        .top-icon {
          color: var(--color-gold);
          flex-shrink: 0;
        }

        .top-divider {
          color: rgba(255, 255, 255, 0.15);
        }

        .top-phone-link {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          color: var(--color-ivory);
          font-weight: 600;
          letter-spacing: 0.3px;
          transition: color 0.2s ease;
        }

        .top-phone-link:hover {
          color: var(--color-gold);
        }

        .top-socials {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          border-left: 1px solid rgba(255, 255, 255, 0.12);
          padding-left: 0.85rem;
        }

        .top-social-link {
          color: var(--color-slate-light);
          transition: color 0.2s ease;
        }

        .top-social-link:hover {
          color: var(--color-gold);
        }

        /* 2. Main Navigation Bar: Floating Pill Design */
        .main-nav-bar {
          background: transparent;
          padding: 0.8rem 0;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .header-scrolled .main-nav-bar {
          padding: 0.35rem 0;
        }

        .main-nav-container {
          background: #FFFFFF;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.45rem 1.75rem;
          height: 72px;
          box-shadow: 0 10px 32px rgba(0, 0, 0, 0.28), 0 0 0 1px rgba(214, 164, 59, 0.25);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .header-scrolled .main-nav-container {
          height: 62px;
          padding: 0.35rem 1.45rem;
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(214, 164, 59, 0.4);
        }

        /* Brand Logo */
        .brand-logo-link {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          text-decoration: none;
          transition: transform 0.25s ease;
        }

        .brand-logo-link:hover {
          transform: translateY(-1px);
        }

        /* Desktop Nav Links */
        .desktop-nav {
          display: flex;
          align-items: center;
          gap: clamp(0.75rem, 1.35vw, 1.75rem);
          flex-shrink: 1;
        }

        .nav-link {
          font-family: var(--font-sans);
          font-size: clamp(0.8rem, 0.88vw, 0.88rem);
          font-weight: 700;
          color: #102A4C;
          text-decoration: none;
          padding: 0.45rem 0;
          position: relative;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          white-space: nowrap;
          transition: color 0.25s ease;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 3px;
          border-radius: 3px;
          background: #E5AE3F;
          box-shadow: 0 0 8px rgba(229, 174, 63, 0.6);
          transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .nav-link:hover {
          color: #E5AE3F;
        }

        .nav-link:hover::after {
          width: 80%;
        }

        .nav-link.nav-link-active {
          color: #E5AE3F;
          font-weight: 700;
        }

        .nav-link.nav-link-active::after {
          width: 80%;
        }

        /* Nav Action CTA */
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-shrink: 0;
        }

        .btn-header-consultation {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.65rem 1.35rem;
          white-space: nowrap;
          flex-shrink: 0;
          background: linear-gradient(135deg, #F3CA68 0%, #E5AE3F 100%);
          color: #061426;
          font-family: var(--font-sans);
          font-size: 0.88rem;
          font-weight: 700;
          letter-spacing: 0.3px;
          border-radius: 9999px;
          text-decoration: none;
          border: none;
          box-shadow: 0 4px 14px rgba(229, 174, 63, 0.35);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-header-consultation:hover {
          background: linear-gradient(135deg, #FADBA0 0%, #F3CA68 100%);
          color: #000;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(229, 174, 63, 0.5);
        }

        .btn-header-consultation .cta-arrow {
          transition: transform 0.25s ease;
        }

        .btn-header-consultation:hover .cta-arrow {
          transform: translateX(3px);
        }

        /* Mobile Hamburger Toggle */
        .mobile-toggle-btn {
          display: none;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          background: #FFFFFF;
          border: 1px solid rgba(214, 164, 59, 0.4);
          border-radius: 50%;
          color: #102A4C;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .mobile-toggle-btn:hover {
          border-color: var(--color-gold);
          color: var(--color-gold);
        }

        /* 3. Mobile Navigation Drawer */
        .mobile-drawer-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(6, 17, 33, 0.75);
          backdrop-filter: blur(4px);
          opacity: 0;
          visibility: hidden;
          transition: all 0.35s ease;
          z-index: 1001;
        }

        .mobile-drawer-backdrop.backdrop-active {
          opacity: 1;
          visibility: visible;
        }

        .mobile-drawer {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 320px;
          max-width: 85vw;
          background: #0A1B33;
          border-left: 1px solid rgba(214, 164, 59, 0.35);
          box-shadow: -10px 0 35px rgba(0, 0, 0, 0.7);
          z-index: 1002;
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          overflow-y: auto;
        }

        .mobile-drawer.mobile-drawer-open {
          transform: translateX(0);
        }

        .mobile-drawer-inner {
          display: flex;
          flex-direction: column;
          min-height: 100%;
          padding: 1.5rem;
        }

        .mobile-drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 1.5rem;
        }

        .mobile-logo {
          height: 36px;
          width: auto;
        }

        .mobile-close-btn {
          width: 36px;
          height: 36px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: var(--radius-sm);
          color: var(--color-ivory);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .mobile-close-btn:hover {
          border-color: var(--color-gold);
          color: var(--color-gold);
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          flex: 1;
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem 1rem;
          font-family: var(--font-sans);
          font-size: 1rem;
          font-weight: 500;
          color: var(--color-ivory);
          text-decoration: none;
          border-radius: var(--radius-sm);
          transition: all 0.2s ease;
        }

        .mobile-nav-link:hover,
        .mobile-nav-link.mobile-nav-link-active {
          background: rgba(214, 164, 59, 0.12);
          color: var(--color-gold);
          padding-left: 1.25rem;
        }

        .mobile-link-arrow {
          opacity: 0.5;
          transition: transform 0.2s ease;
        }

        .mobile-nav-link:hover .mobile-link-arrow,
        .mobile-nav-link.mobile-nav-link-active .mobile-link-arrow {
          opacity: 1;
          transform: translateX(3px);
          color: var(--color-gold);
        }

        .mobile-drawer-footer {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .mobile-contact-info {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          font-size: 0.82rem;
          color: var(--color-slate-light);
        }

        .mobile-contact-line {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--color-slate-light);
          text-decoration: none;
        }

        .mobile-contact-line a:hover {
          color: var(--color-gold);
        }

        .w-full {
          width: 100%;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1140px) {
          .main-nav-container {
            padding: 0.45rem 1.15rem;
          }
          .desktop-nav {
            gap: 0.85rem;
          }
          .btn-header-consultation {
            padding: 0.6rem 1.1rem;
            font-size: 0.84rem;
          }
        }

        @media (max-width: 980px) {
          .top-bar-left span.top-divider,
          .top-bar-left .top-info-item:nth-child(3) {
            display: none;
          }
          .desktop-nav {
            display: none;
          }
          .btn-header-consultation {
            display: none;
          }
          .mobile-toggle-btn {
            display: inline-flex;
          }
        }

        @media (max-width: 600px) {
          .top-bar-left {
            display: none;
          }
          .top-bar-container {
            justify-content: flex-end;
          }
          .brand-logo-img {
            height: 36px;
          }
          .main-nav-container {
            height: 62px;
          }
        }
      `}</style>
    </header>
  );
}
