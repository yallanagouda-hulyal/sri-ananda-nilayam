import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Send, ArrowRight } from 'lucide-react';
import { publicApi } from '../../api/publicApi';
import { useSite } from '../../context/SiteContext';
import BrandLogo from './BrandLogo';
import toast from 'react-hot-toast';

const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const YoutubeIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
  </svg>
);

export default function Footer() {
  const { settings } = useSite();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const currentYear = new Date().getFullYear();

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail || !/^\S+@\S+\.\S+$/.test(newsletterEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }
    setSubmitting(true);
    try {
      const res = await publicApi.subscribeNewsletter({ email: newsletterEmail });
      if (res.data?.success) {
        toast.success(res.data.message || 'Subscribed successfully!');
        setNewsletterEmail('');
      } else {
        toast.error(res.data?.message || 'Subscription failed');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Could not subscribe. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const servicesList = [
    { title: 'Architectural Design', slug: 'architectural-design' },
    { title: 'Residential Construction', slug: 'residential-construction' },
    { title: 'Commercial Construction', slug: 'commercial-construction' },
    { title: 'Interior Design', slug: 'interior-design' },
    { title: 'Modular Kitchen Design', slug: 'modular-kitchen' },
    { title: 'Renovation & Remodeling', slug: 'renovation-remodeling' },
    { title: 'Turnkey Projects', slug: 'turnkey-projects' },
    { title: 'Space Planning & Consultation', slug: 'space-planning' },
  ];

  return (
    <footer className="footer-root">
      {/* Newsletter Strip - Displayed ONLY on the Home page */}
      {isHomePage && (
        <div className="newsletter-strip">
        <img src="/images/foliage-accent.jpg" alt="" className="newsletter-foliage foliage-left" aria-hidden="true" />
        <img src="/images/foliage-accent.jpg" alt="" className="newsletter-foliage foliage-right" aria-hidden="true" />
        <div className="container newsletter-container">
          <div className="newsletter-text">
            <span className="newsletter-badge">— STAY INSPIRED —</span>
            <h3 className="newsletter-title">Subscribe to Our<br />Architecture &amp; Design Journal</h3>
            <p className="newsletter-desc">Receive exclusive insights on luxury villa trends, construction best practices, and bespoke interior inspiration.</p>
          </div>
          <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
            <div className="newsletter-input-wrap">
              <Mail size={18} className="newsletter-mail-icon" />
              <input
                type="email"
                placeholder="Enter your email address..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="newsletter-input"
                required
              />
              <button type="submit" disabled={submitting} className="newsletter-submit-btn">
                <span>{submitting ? 'Subscribing...' : 'Subscribe'}</span>
                <ArrowRight size={15} />
              </button>
            </div>
            <span className="newsletter-disclaimer">We respect your privacy. No spam, ever.</span>
          </form>
        </div>
      </div>
      )}

      {/* Main Footer Content */}
      <div className="container footer-main">
        <div className="footer-grid">
          {/* Column 1: Company Profile */}
          <div className="footer-col col-brand">
            <Link to="/" className="footer-logo-link">
              <BrandLogo variant="light" height={48} />
            </Link>
            <p className="footer-about-text">
              Transforming visions into timeless architectural realities. We specialize in luxury residential construction, commercial landmarks, and bespoke turnkey interiors engineered for generations.
            </p>
            <div className="footer-socials">
              <a href={settings.instagram || 'https://instagram.com'} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon-btn instagram">
                <InstagramIcon size={18} />
              </a>
              <a href={settings.facebook || 'https://facebook.com'} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-icon-btn facebook">
                <FacebookIcon size={18} />
              </a>
              <a href={settings.linkedin || 'https://linkedin.com'} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon-btn linkedin">
                <LinkedinIcon size={18} />
              </a>
              <a href={settings.youtube || 'https://youtube.com'} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="social-icon-btn youtube">
                <YoutubeIcon size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">Quick Navigation</h4>
            <ul className="footer-links-list">
              <li><Link to="/"><ArrowRight size={13} /> Home</Link></li>
              <li><Link to="/about"><ArrowRight size={13} /> About Us</Link></li>
              <li><Link to="/services"><ArrowRight size={13} /> Our Services</Link></li>
              <li><Link to="/projects"><ArrowRight size={13} /> Portfolio Projects</Link></li>
              <li><Link to="/gallery"><ArrowRight size={13} /> Visual Gallery</Link></li>
              <li><Link to="/testimonials"><ArrowRight size={13} /> Client Reviews</Link></li>
              <li><Link to="/contact"><ArrowRight size={13} /> Contact & Consultation</Link></li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="footer-col">
            <h4 className="footer-col-title">Our Capabilities</h4>
            <ul className="footer-links-list">
              {servicesList.map((srv) => (
                <li key={srv.slug}>
                  <Link to={`/services/${srv.slug}`}><ArrowRight size={13} /> {srv.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Office */}
          <div className="footer-col">
            <h4 className="footer-col-title">Contact & Studio</h4>
            <ul className="footer-contact-list">
              <li className="footer-contact-item">
                <MapPin size={18} className="footer-contact-icon" />
                <span>{settings.address}</span>
              </li>
              <li className="footer-contact-item">
                <Phone size={18} className="footer-contact-icon" />
                <a href={`tel:${settings.phoneRaw}`} className="footer-link-highlight">{settings.phone}</a>
              </li>
              <li className="footer-contact-item">
                <Mail size={18} className="footer-contact-icon" />
                <a href={`mailto:${settings.email}`} className="footer-link-highlight">{settings.email}</a>
              </li>
              <li className="footer-contact-item">
                <Clock size={18} className="footer-contact-icon" />
                <span>{settings.workingHours}</span>
              </li>
            </ul>
            <div className="footer-admin-link-wrap">
              <Link to="/admin/login" className="admin-portal-link">Staff & Admin Portal →</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sub-footer */}
      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <div className="footer-copyright">
            © {currentYear} <strong>{settings.companyName || 'Sri Ananda Nilayam'}</strong>. All rights reserved.
          </div>

          <div className="footer-credits">
            Designed and developed by{' '}
            <a
              href="https://bookmywebsite.in"
              target="_blank"
              rel="noopener noreferrer"
              className="credit-link"
            >
              bookmywebsite.in
            </a>
          </div>

          <div className="footer-legal">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <span className="legal-dot">•</span>
            <Link to="/terms">Terms & Conditions</Link>
          </div>
        </div>
      </div>

      <style>{`
        .footer-root {
          background: #061426;
          color: var(--color-ivory);
          border-top: 1px solid rgba(229, 174, 63, 0.25);
          position: relative;
        }

        .newsletter-strip {
          background: #FFFFFF;
          border-bottom: 1px solid rgba(16, 42, 76, 0.08);
          padding: 4.5rem 0 4rem;
          position: relative;
          overflow: hidden;
        }

        .newsletter-foliage {
          position: absolute;
          bottom: -20px;
          width: 190px;
          height: 190px;
          object-fit: contain;
          pointer-events: none;
          opacity: 0.95;
          z-index: 1;
        }

        .foliage-left {
          left: -20px;
          transform: scaleX(1);
        }

        .foliage-right {
          right: -20px;
          transform: scaleX(-1);
        }

        .newsletter-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 3rem;
          flex-wrap: wrap;
          position: relative;
          z-index: 2;
        }

        .newsletter-text {
          flex: 1 1 450px;
        }

        .newsletter-badge {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 700;
          color: #E5AE3F;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }

        .newsletter-title {
          font-family: var(--font-serif);
          font-size: clamp(1.85rem, 2.5vw, 2.3rem);
          color: #102A4C;
          line-height: 1.25;
          margin-bottom: 0.75rem;
          font-weight: 700;
        }

        .newsletter-desc {
          font-size: 0.95rem;
          color: #64748B;
          margin-bottom: 0;
          line-height: 1.6;
          max-width: 480px;
        }

        .newsletter-form {
          flex: 1 1 420px;
        }

        .newsletter-input-wrap {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #FFFFFF;
          border: 1.5px solid rgba(16, 42, 76, 0.16);
          border-radius: 50px;
          padding: 0.35rem 0.45rem 0.35rem 1.25rem;
          box-shadow: 0 4px 18px rgba(16, 42, 76, 0.05);
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .newsletter-input-wrap:focus-within {
          border-color: #E5AE3F;
          box-shadow: 0 0 0 3px rgba(229, 174, 63, 0.18);
        }

        .newsletter-mail-icon {
          color: #94A3B8;
          flex-shrink: 0;
        }

        .newsletter-input {
          flex: 1;
          background: transparent;
          border: none;
          color: #102A4C;
          padding: 0.6rem 0.5rem;
          font-size: 0.95rem;
          outline: none;
        }

        .newsletter-input::placeholder {
          color: #94A3B8;
        }

        .newsletter-submit-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #E5AE3F;
          color: #061426;
          border: none;
          border-radius: 50px;
          padding: 0.75rem 1.75rem;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.25s ease;
          white-space: nowrap;
        }

        .newsletter-submit-btn:hover {
          background: #F3CA68;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(229, 174, 63, 0.35);
        }

        .newsletter-disclaimer {
          display: block;
          font-size: 0.8rem;
          color: #94A3B8;
          margin-top: 0.65rem;
        }

        .footer-main {
          padding: 5rem 1.5rem 3.5rem;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1.2fr 1.3fr;
          gap: 3rem;
        }

        .footer-col-title {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          color: var(--color-gold-light);
          margin-bottom: 1.5rem;
          position: relative;
          padding-bottom: 0.6rem;
        }

        .footer-col-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 32px;
          height: 2px;
          background: var(--color-gold);
        }

        .footer-logo {
          height: 42px;
          width: auto;
          margin-bottom: 1.25rem;
        }

        .footer-about-text {
          font-size: 0.92rem;
          color: var(--color-slate-light);
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        .footer-socials {
          display: flex;
          gap: 0.75rem;
        }

        .social-icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: var(--color-ivory);
          transition: all 0.25s ease;
        }

        .social-icon-btn:hover {
          transform: translateY(-3px);
        }

        .social-icon-btn.instagram {
          border-color: rgba(225, 48, 108, 0.45);
          color: #F7779F;
        }
        .social-icon-btn.instagram:hover {
          background: #E1306C;
          border-color: #E1306C;
          color: #FFF;
        }

        .social-icon-btn.facebook {
          border-color: rgba(24, 119, 242, 0.45);
          color: #68A5F8;
        }
        .social-icon-btn.facebook:hover {
          background: #1877F2;
          border-color: #1877F2;
          color: #FFF;
        }

        .social-icon-btn.linkedin {
          border-color: rgba(10, 102, 194, 0.45);
          color: #4C9DF5;
        }
        .social-icon-btn.linkedin:hover {
          background: #0A66C2;
          border-color: #0A66C2;
          color: #FFF;
        }

        .social-icon-btn.youtube {
          border-color: rgba(255, 0, 0, 0.45);
          color: #FF5A5A;
        }
        .social-icon-btn.youtube:hover {
          background: #FF0000;
          border-color: #FF0000;
          color: #FFF;
        }

        .footer-links-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .footer-links-list a {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--color-slate-light);
          font-size: 0.9rem;
          transition: all 0.2s ease;
        }

        .footer-links-list a:hover {
          color: var(--color-gold-light);
          padding-left: 4px;
        }

        .footer-contact-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .footer-contact-item {
          display: flex;
          gap: 0.75rem;
          font-size: 0.9rem;
          color: var(--color-slate-light);
        }

        .footer-contact-icon {
          color: var(--color-gold);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .footer-link-highlight {
          color: var(--color-ivory);
          font-weight: 500;
        }

        .footer-link-highlight:hover {
          color: var(--color-gold-light);
        }

        .footer-admin-link-wrap {
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .admin-portal-link {
          font-size: 0.8rem;
          color: var(--color-gold);
          opacity: 0.75;
          transition: opacity 0.2s ease;
        }

        .admin-portal-link:hover {
          opacity: 1;
        }

        .footer-bottom {
          background: #040B16;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          padding: 1.4rem 0;
          font-size: 0.85rem;
          color: var(--color-slate);
        }

        .footer-bottom-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .credit-link {
          color: var(--color-gold);
          font-weight: 600;
        }

        .credit-link:hover {
          color: var(--color-gold-light);
          text-decoration: underline;
        }

        .footer-legal {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .footer-legal a {
          color: var(--color-slate);
        }

        .footer-legal a:hover {
          color: var(--color-ivory);
        }

        .legal-dot {
          color: rgba(255, 255, 255, 0.2);
        }

        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2.5rem;
          }
        }

        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr;
          }
          .newsletter-container {
            flex-direction: column;
          }
          .footer-bottom-container {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
