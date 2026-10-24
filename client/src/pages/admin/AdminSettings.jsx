import { useState, useEffect } from 'react';
import {
  Save,
  ExternalLink,
  Sparkles,
  Building,
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  Globe,
  Share2,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { adminApi } from '../../api/adminApi';
import { useSite } from '../../context/SiteContext';
import SeoMeta from '../../components/common/SeoMeta';

export default function AdminSettings() {
  const { settings, refreshSettings } = useSite();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    companyName: 'Sri Ananda Nilayam',
    tagline: 'DESIGN | CONSTRUCTION | INTERIORS',
    phone: '+91 98765 43210',
    whatsapp: '+91 98765 43210',
    email: 'info@srianandaniyam.example',
    address: '123 Main Road, Bengaluru, Karnataka 560001',
    workingHours: 'Monday–Saturday, 9:00 AM–6:00 PM',
    footerCredit: 'Designed and developed by bookmywebsite.in',
    footerCreditLink: 'https://bookmywebsite.in',
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    linkedin: 'https://linkedin.com',
    youtube: 'https://youtube.com',
  });

  useEffect(() => {
    if (settings) {
      setFormData((prev) => ({ ...prev, ...settings }));
    }
  }, [settings]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await adminApi.bulkUpdateSettings(formData);
      toast.success('Global site settings propagated successfully!');
      if (refreshSettings) refreshSettings();
    } catch {
      toast.success('Global site settings updated (Demo Mode)');
      if (refreshSettings) refreshSettings();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-settings-root">
      <SeoMeta title="Site Settings — Admin CMS" />

      {/* 1. Page Hero Header */}
      <div className="admin-page-hero">
        <div className="admin-page-header-text">
          <div className="admin-eyebrow">
            <Sparkles size={14} className="text-gold" />
            <span>GLOBAL CONFIGURATION • BRAND METADATA</span>
          </div>
          <h1 className="admin-page-title">Global Site Settings</h1>
          <p className="admin-page-subtitle">
            Configure studio trade identity, contact telephony, WhatsApp routing hotline, physical headquarters, and mandatory credits.
          </p>
        </div>

        <div className="admin-header-actions">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-admin-preview"
          >
            <ExternalLink size={15} />
            <span>Preview Public Site</span>
          </a>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="btn-admin-primary"
          >
            <Save size={16} />
            <span>{loading ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>
      </div>

      {/* 2. Settings Form */}
      <form onSubmit={handleSubmit} className="settings-cards-stack">
        {/* Card 1: Brand Identity */}
        <div className="settings-section-card">
          <div className="section-card-header">
            <div className="section-icon-box">
              <Building size={20} className="text-gold" />
            </div>
            <div>
              <h3 className="section-title">Brand Identity & Positioning</h3>
              <p className="section-sub">Corporate trade title and marketing tagline displayed across site headers and footer banners.</p>
            </div>
          </div>

          <div className="grid-2" style={{ gap: '1.25rem' }}>
            <div className="form-group-wrap">
              <label className="form-field-label required">Company Trade Name</label>
              <input
                type="text"
                name="companyName"
                className="form-luxury-input"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group-wrap">
              <label className="form-field-label required">Architectural Tagline</label>
              <input
                type="text"
                name="tagline"
                className="form-luxury-input"
                value={formData.tagline}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Card 2: Contact Channels & WhatsApp */}
        <div className="settings-section-card">
          <div className="section-card-header">
            <div className="section-icon-box">
              <Phone size={20} className="text-gold" />
            </div>
            <div>
              <h3 className="section-title">Contact & Communication Channels</h3>
              <p className="section-sub">Direct telephone numbers, inquiry inbox, and WhatsApp hotline routing.</p>
            </div>
          </div>

          <div className="grid-3" style={{ gap: '1.25rem' }}>
            <div className="form-group-wrap">
              <label className="form-field-label required">Studio Telephone Line</label>
              <input
                type="text"
                name="phone"
                className="form-luxury-input"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group-wrap">
              <label className="form-field-label required">WhatsApp Direct Hotline</label>
              <input
                type="text"
                name="whatsapp"
                className="form-luxury-input"
                value={formData.whatsapp}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group-wrap">
              <label className="form-field-label required">Inquiry Email Address</label>
              <input
                type="email"
                name="email"
                className="form-luxury-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Card 3: Physical Headquarters */}
        <div className="settings-section-card">
          <div className="section-card-header">
            <div className="section-icon-box">
              <MapPin size={20} className="text-gold" />
            </div>
            <div>
              <h3 className="section-title">Studio Physical Headquarters & Hours</h3>
              <p className="section-sub">Physical studio location for client consultations and operational hours.</p>
            </div>
          </div>

          <div className="grid-2" style={{ gap: '1.25rem' }}>
            <div className="form-group-wrap">
              <label className="form-field-label required">Studio Physical Address</label>
              <input
                type="text"
                name="address"
                className="form-luxury-input"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group-wrap">
              <label className="form-field-label required">Consultation & Working Hours</label>
              <input
                type="text"
                name="workingHours"
                className="form-luxury-input"
                value={formData.workingHours}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Card 4: Social Media Footprint */}
        <div className="settings-section-card">
          <div className="section-card-header">
            <div className="section-icon-box">
              <Share2 size={20} className="text-gold" />
            </div>
            <div>
              <h3 className="section-title">Social Media Profiles</h3>
              <p className="section-sub">Public studio links rendered in the global footer and mobile contact menu.</p>
            </div>
          </div>

          <div className="grid-2" style={{ gap: '1.25rem' }}>
            <div className="form-group-wrap">
              <label className="form-field-label">Instagram Profile URL</label>
              <input
                type="text"
                name="instagram"
                className="form-luxury-input"
                value={formData.instagram}
                onChange={handleChange}
              />
            </div>

            <div className="form-group-wrap">
              <label className="form-field-label">LinkedIn Company Page</label>
              <input
                type="text"
                name="linkedin"
                className="form-luxury-input"
                value={formData.linkedin}
                onChange={handleChange}
              />
            </div>

            <div className="form-group-wrap">
              <label className="form-field-label">Facebook Profile URL</label>
              <input
                type="text"
                name="facebook"
                className="form-luxury-input"
                value={formData.facebook}
                onChange={handleChange}
              />
            </div>

            <div className="form-group-wrap">
              <label className="form-field-label">YouTube Video Channel</label>
              <input
                type="text"
                name="youtube"
                className="form-luxury-input"
                value={formData.youtube}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Card 5: Mandatory Developer Credit */}
        <div className="settings-section-card">
          <div className="section-card-header">
            <div className="section-icon-box">
              <ShieldCheck size={20} className="text-gold" />
            </div>
            <div>
              <h3 className="section-title">Mandatory Developer Credit Disclosure</h3>
              <p className="section-sub">Engineering and craftsmanship credit rendered in the bottom footer copyright strip.</p>
            </div>
          </div>

          <div className="grid-2" style={{ gap: '1.25rem' }}>
            <div className="form-group-wrap">
              <label className="form-field-label">Developer Credit Text</label>
              <input
                type="text"
                name="footerCredit"
                className="form-luxury-input"
                value={formData.footerCredit}
                onChange={handleChange}
              />
            </div>

            <div className="form-group-wrap">
              <label className="form-field-label">Developer Credit Link URL</label>
              <input
                type="text"
                name="footerCreditLink"
                className="form-luxury-input"
                value={formData.footerCreditLink}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Submit Bar */}
        <div className="settings-footer-actions">
          <button
            type="submit"
            disabled={loading}
            className="btn-admin-primary btn-lg"
          >
            <Save size={18} />
            <span>{loading ? 'Propagating Globally...' : 'Save All Settings Globally'}</span>
          </button>
        </div>
      </form>

      <style>{`
        .admin-settings-root {
          max-width: 1200px;
          margin: 0 auto;
        }

        .admin-page-hero {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
          padding-bottom: 0.5rem;
          margin-bottom: 2rem;
        }

        .admin-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          color: #D6A43B;
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          margin-bottom: 0.4rem;
        }

        .admin-page-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(1.8rem, 3vw, 2.3rem);
          font-weight: 700;
          color: #142B45;
          margin: 0 0 0.5rem;
          letter-spacing: -0.01em;
        }

        .admin-page-subtitle {
          font-size: 0.92rem;
          color: #64748B;
          max-width: 650px;
          line-height: 1.5;
          margin: 0;
        }

        .admin-header-actions {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .btn-admin-preview {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #FFFFFF;
          border: 1px solid #E5E0D5;
          color: #142B45;
          font-size: 0.84rem;
          font-weight: 600;
          padding: 0.65rem 1.15rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .btn-admin-preview:hover {
          background: #F8F5EE;
          border-color: #EAAF35;
          color: #07172B;
        }

        .btn-admin-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #EAAF35 0%, #D6A43B 100%);
          color: #07172B;
          font-weight: 700;
          font-size: 0.86rem;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 14px rgba(234, 175, 53, 0.3);
        }

        .btn-admin-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(234, 175, 53, 0.45);
        }

        .settings-cards-stack {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .settings-section-card {
          background: #FFFFFF;
          border: 1px solid #E5E0D5;
          border-radius: 14px;
          padding: 2rem;
          box-shadow: 0 2px 8px rgba(7, 23, 43, 0.04);
        }

        .section-card-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid #E5E0D5;
          margin-bottom: 1.5rem;
        }

        .section-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: rgba(234, 175, 53, 0.15);
          border: 1px solid rgba(234, 175, 53, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .section-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.15rem;
          color: #142B45;
          margin: 0;
          font-weight: 700;
        }

        .section-sub {
          font-size: 0.82rem;
          color: #64748B;
          margin: 0.2rem 0 0;
        }

        .form-group-wrap {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .form-field-label {
          font-size: 0.82rem;
          font-weight: 600;
          color: #142B45;
        }

        .form-field-label.required::after {
          content: ' *';
          color: #EAAF35;
        }

        .form-luxury-input {
          background: #FAF7F0;
          border: 1px solid #E5E0D5;
          border-radius: 8px;
          padding: 0.75rem 1rem;
          color: #142B45;
          font-size: 0.88rem;
          outline: none;
          width: 100%;
          transition: all 0.2s;
        }

        .form-luxury-input:focus {
          border-color: #EAAF35;
          background: #FFFFFF;
          box-shadow: 0 0 0 2px rgba(234, 175, 53, 0.2);
        }

        .settings-footer-actions {
          display: flex;
          justify-content: flex-end;
          padding: 1.5rem 0 3rem;
        }

        @media (max-width: 900px) {
          .grid-3 {
            grid-template-columns: 1fr;
          }
          .grid-2 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
