import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Building2,
  ShieldCheck,
  Calendar,
  Compass,
  ArrowRight,
} from 'lucide-react';
import toast from 'react-hot-toast';
import PageBanner from '../components/common/PageBanner';
import SeoMeta from '../components/common/SeoMeta';
import { useSite } from '../context/SiteContext';
import { publicApi } from '../api/publicApi';

const SERVICES_OPTIONS = [
  'Architectural Design',
  'Residential Construction',
  'Commercial Construction',
  'Interior Design',
  'Modular Kitchen Design',
  'Renovation & Remodeling',
  'Turnkey Projects',
  'Space Planning & Vastu Consultation',
  'Other Bespoke Architectural Requirements',
];

const BUDGET_OPTIONS = [
  'Under ₹25 Lakhs',
  '₹25 Lakhs – ₹50 Lakhs',
  '₹50 Lakhs – ₹1 Crore',
  '₹1 Crore – ₹2.5 Crores',
  'Above ₹2.5 Crores',
  'To Be Discussed during Consultation',
];

export default function Contact() {
  const { settings } = useSite();
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Architectural Design',
    projectLocation: '',
    estimatedBudget: '₹1 Crore – ₹2.5 Crores',
    preferredContact: 'WhatsApp',
    message: '',
    consent: true,
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null); // { success: true, id: '...' }
  const [errorMessage, setErrorMessage] = useState('');

  // Extract service or project from query param e.g. /contact?service=Residential%20Construction
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serviceParam = params.get('service');
    const projectParam = params.get('project');
    if (serviceParam) {
      setFormData((prev) => ({ ...prev, service: serviceParam }));
    } else if (projectParam) {
      setFormData((prev) => ({
        ...prev,
        message: `I am interested in discussing an architectural project similar to "${projectParam}".`,
      }));
    }
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errorMessage) setErrorMessage('');
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleContactMethodSelect = (method) => {
    setFormData((prev) => ({ ...prev, preferredContact: method }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    const errors = {};

    const nameVal = (formData.name || '').trim();
    const phoneVal = (formData.phone || '').trim();
    const emailVal = (formData.email || '').trim();
    const messageVal = (formData.message || '').trim();
    const locationVal = (formData.projectLocation || '').trim() || 'Bengaluru';
    const serviceVal = formData.service || 'Architectural Design';
    const budgetVal = formData.estimatedBudget || '₹1 Crore – ₹2.5 Crores';
    const consentVal = formData.consent;

    // Field-specific validation
    if (!nameVal) {
      errors.name = 'Full name is required';
    }

    const cleanPhone = phoneVal.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errors.phone = 'Please provide a valid 10-digit mobile number';
    }

    if (!emailVal || !emailVal.includes('@')) {
      errors.email = 'Please provide a valid email address';
    }

    if (!messageVal) {
      errors.message = 'Please provide brief details about your project or plot requirements';
    }

    if (!consentVal) {
      errors.consent = 'Consent is required to allow us to contact you';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setErrorMessage('Please fix the highlighted fields below before submitting.');
      toast.error('Please complete all required fields correctly');
      return;
    }

    setSubmitting(true);
    setFieldErrors({});

    const payload = {
      fullName: nameVal,
      phone: phoneVal,
      email: emailVal,
      serviceRequired: serviceVal,
      projectLocation: locationVal,
      estimatedBudget: budgetVal,
      preferredContactMethod: formData.preferredContact || 'WhatsApp',
      message: `${messageVal}\n[Preferred Contact Method: ${formData.preferredContact || 'WhatsApp'}]`,
    };

    try {
      const res = await publicApi.submitEnquiry(payload);
      if (res.data?.success) {
        setSubmissionResult({
          success: true,
          id: res.data.id || `SAN-${Date.now().toString().slice(-6)}`,
          clientName: nameVal,
          service: serviceVal,
        });
        toast.success('Your project enquiry has been successfully registered!');
        // Reset form
        setFormData({
          name: '',
          phone: '',
          email: '',
          service: 'Architectural Design',
          projectLocation: '',
          estimatedBudget: '₹1 Crore – ₹2.5 Crores',
          preferredContact: 'WhatsApp',
          message: '',
          consent: true,
        });
      } else {
        throw new Error(res.data?.message || 'Server was unable to process your request.');
      }
    } catch (err) {
      console.error('Enquiry submission error:', err);
      const msg = err.response?.data?.message || err.message || 'Network error submitting enquiry. Please check your connection and retry.';
      setErrorMessage(msg);
      toast.error('Submission failed. Your entered details have been preserved.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSubmissionResult(null);
    setErrorMessage('');
  };

  return (
    <div className="client-enquiry-page">
      <SeoMeta
        title="Client Enquiry & Architectural Consultation — Sri Ananda Nilayam"
        description="Connect with Sri Ananda Nilayam in Bengaluru. Schedule an architectural consultation, discuss site feasibility, or inquire about bespoke residential and turnkey projects."
        canonicalUrl="/contact"
      />

      <PageBanner
        eyebrow="CLIENT ENQUIRY &amp; CONSULTATION"
        title="Start Your Architectural Journey"
        subtitle="Connect with our principal architects and master builders to bring your bespoke spatial vision to reality."
        bgImage="/images/hero-villa.jpg"
        breadcrumbs={[{ name: 'Contact & Enquiry' }]}
      />

      {/* ── Two-Column Desktop Layout ── */}
      <section className="section-padding enquiry-main-section">
        <div className="container">
          <div className="enquiry-2col-layout">
            {/* ── Column 1: Left Column — Elegant photograph, introduction, and studio contact details ── */}
            <div className="enquiry-left-col">
              {/* Photo Card with Overlay */}
              <div className="left-photo-card">
                <img
                  src="/images/consultation-villa.jpg"
                  alt="Sri Ananda Nilayam Architectural Excellence"
                  className="left-photo-img"
                  onError={(e) => {
                    e.target.src = '/images/hero-villa.jpg';
                  }}
                />
                <div className="left-photo-overlay">
                  <span className="left-photo-badge">
                    <Sparkles size={13} className="text-gold" />
                    <span>ESTD. BENGALURU • DESIGN &amp; BUILD</span>
                  </span>
                  <h3 className="left-photo-title">Designing Legacies, Building Realities</h3>
                  <p className="left-photo-sub">
                    Over two decades of precision architectural engineering, turnkey villa construction, and bespoke interiors.
                  </p>
                </div>
              </div>

              {/* Studio Introduction Card */}
              <div className="left-intro-card">
                <h3 className="intro-heading">Let&apos;s Build Something Exceptional</h3>
                <p className="intro-text">
                  Whether you are embarking on a luxury independent villa, commercial workspace fit-out, or comprehensive structural renovation, our senior architectural desk reviews site viability, zoning bylaws, and Vastu alignment before crafting your detailed proposal.
                </p>

                {/* Studio Direct Contact Items */}
                <div className="left-contact-list">
                  <div className="contact-item-row">
                    <div className="contact-icon-circle">
                      <MapPin size={18} className="text-gold" />
                    </div>
                    <div className="contact-item-content">
                      <span className="c-label">Studio &amp; Experience Centre</span>
                      <span className="c-val">{settings.address || '123 Main Road, Bengaluru, Karnataka 560001'}</span>
                    </div>
                  </div>

                  <div className="contact-item-row">
                    <div className="contact-icon-circle">
                      <Phone size={18} className="text-gold" />
                    </div>
                    <div className="contact-item-content">
                      <span className="c-label">Direct Phone &amp; Consultations</span>
                      <a href={`tel:${settings.phoneRaw || '+919876543210'}`} className="c-link">
                        {settings.phone || '+91 98765 43210'}
                      </a>
                    </div>
                  </div>

                  <div className="contact-item-row">
                    <div className="contact-icon-circle">
                      <MessageSquare size={18} className="text-gold" />
                    </div>
                    <div className="contact-item-content">
                      <span className="c-label">WhatsApp Architectural Desk</span>
                      <a
                        href="https://wa.me/919876543210?text=Hello%20Sri%20Ananda%20Nilayam,%20I%20would%20like%20to%20discuss%20a%20new%20project."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="c-link text-whatsapp"
                      >
                        +91 98765 43210 (Instant Chat)
                      </a>
                    </div>
                  </div>

                  <div className="contact-item-row">
                    <div className="contact-icon-circle">
                      <Mail size={18} className="text-gold" />
                    </div>
                    <div className="contact-item-content">
                      <span className="c-label">Official Correspondence</span>
                      <a href={`mailto:${settings.email || 'info@shrianandanilayam.in'}`} className="c-link">
                        {settings.email || 'info@shrianandanilayam.in'}
                      </a>
                    </div>
                  </div>

                  <div className="contact-item-row">
                    <div className="contact-icon-circle">
                      <Clock size={18} className="text-gold" />
                    </div>
                    <div className="contact-item-content">
                      <span className="c-label">Working Hours</span>
                      <span className="c-val">{settings.workingHours || 'Monday–Saturday: 9:00 AM – 6:30 PM'}</span>
                    </div>
                  </div>
                </div>

                {/* Trust & Assurance Footer */}
                <div className="left-assurance-box">
                  <div className="assurance-item">
                    <ShieldCheck size={18} className="text-gold" />
                    <span>Complimentary Site Viability Review</span>
                  </div>
                  <div className="assurance-item">
                    <Calendar size={18} className="text-gold" />
                    <span>Guaranteed Response within 24 Business Hours</span>
                  </div>
                </div>
              </div>

              {/* Embedded Location Map Preview */}
              <div className="left-map-card">
                <iframe
                  title="Sri Ananda Nilayam Studio Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124414.28741369344!2d77.53424754516602!3d12.97542971206121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="220"
                  style={{ border: 0, borderRadius: '12px', display: 'block' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* ── Column 2: Right Column — Clean White Enquiry Form Card with Gold Accents ── */}
            <div className="enquiry-right-col">
              <div className="enquiry-form-card">
                {submissionResult?.success ? (
                  /* ── Success State after confirmed backend response ── */
                  <div className="enquiry-success-state animate-fade-in text-center">
                    <div className="success-icon-badge">
                      <CheckCircle2 size={54} color="#059669" />
                    </div>
                    <span className="badge-ref">REFERENCE ID: #{submissionResult.id}</span>
                    <h3 className="success-title">Enquiry Successfully Registered!</h3>
                    <p className="success-lead">
                      Thank you, <strong>{submissionResult.clientName}</strong>. Your enquiry for{' '}
                      <strong>{submissionResult.service}</strong> has been logged in our studio registry.
                    </p>
                    <p className="success-sub">
                      One of our principal architects will examine your requirements, review site feasibility, and connect with you via your preferred channel within 24 business hours.
                    </p>

                    <div className="success-cta-box">
                      <button
                        type="button"
                        className="btn-submit-another"
                        onClick={handleResetForm}
                      >
                        Submit Another Enquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  /* ── Public Enquiry Form ── */
                  <div>
                    {/* Header */}
                    <div className="form-card-header">
                      <div className="form-eyebrow">
                        <span className="gold-accent-line" />
                        <span>PROJECT ENQUIRY DOSSIER</span>
                      </div>
                      <h2 className="form-card-title">Initiate Your Project Consultation</h2>
                      <p className="form-card-subtitle">
                        Share your spatial vision. We evaluate land topography, architectural preferences, and budget to prepare a bespoke design consultation.
                      </p>
                    </div>

                    {/* Error Banner */}
                    {errorMessage && (
                      <div className="form-error-banner" role="alert">
                        <AlertCircle size={18} className="err-icon" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="enquiry-form-element" noValidate>
                      {/* Row 1: Full Name & Phone Number */}
                      <div className="form-row-2col">
                        <div className="form-field-group">
                          <label className="form-field-label required" htmlFor="field-name">
                            Full Name
                          </label>
                          <input
                            id="field-name"
                            type="text"
                            name="name"
                            className={`form-input-element ${fieldErrors.name ? 'has-error' : ''}`}
                            placeholder="e.g. Dr. Ramesh Kulkarni"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                          {fieldErrors.name && (
                            <span className="field-error-msg">{fieldErrors.name}</span>
                          )}
                        </div>

                        <div className="form-field-group">
                          <label className="form-field-label required" htmlFor="field-phone">
                            Phone Number
                          </label>
                          <div className={`phone-prefix-wrap ${fieldErrors.phone ? 'has-error' : ''}`}>
                            <span className="phone-prefix">+91</span>
                            <input
                              id="field-phone"
                              type="tel"
                              name="phone"
                              className="form-input-element phone-input"
                              placeholder="98765 43210"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          {fieldErrors.phone && (
                            <span className="field-error-msg">{fieldErrors.phone}</span>
                          )}
                        </div>
                      </div>

                      {/* Row 2: Email Address & Service Required */}
                      <div className="form-row-2col">
                        <div className="form-field-group">
                          <label className="form-field-label required" htmlFor="field-email">
                            Email Address
                          </label>
                          <input
                            id="field-email"
                            type="email"
                            name="email"
                            className={`form-input-element ${fieldErrors.email ? 'has-error' : ''}`}
                            placeholder="e.g. ramesh.k@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                          {fieldErrors.email && (
                            <span className="field-error-msg">{fieldErrors.email}</span>
                          )}
                        </div>

                        <div className="form-field-group">
                          <label className="form-field-label required" htmlFor="field-service">
                            Service Required
                          </label>
                          <select
                            id="field-service"
                            name="service"
                            className="form-select-element"
                            value={formData.service}
                            onChange={handleChange}
                            required
                          >
                            {SERVICES_OPTIONS.map((srv, idx) => (
                              <option key={idx} value={srv}>
                                {srv}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Row 3: Project Location & Estimated Budget */}
                      <div className="form-row-2col">
                        <div className="form-field-group">
                          <label className="form-field-label" htmlFor="field-location">
                            Project / Plot Location
                          </label>
                          <input
                            id="field-location"
                            type="text"
                            name="projectLocation"
                            className="form-input-element"
                            placeholder="e.g. Whitefield, Bengaluru"
                            value={formData.projectLocation}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="form-field-group">
                          <label className="form-field-label" htmlFor="field-budget">
                            Estimated Budget
                          </label>
                          <select
                            id="field-budget"
                            name="estimatedBudget"
                            className="form-select-element"
                            value={formData.estimatedBudget}
                            onChange={handleChange}
                          >
                            {BUDGET_OPTIONS.map((bg, idx) => (
                              <option key={idx} value={bg}>
                                {bg}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Preferred Contact Method */}
                      <div className="form-field-group">
                        <label className="form-field-label">Preferred Contact Method</label>
                        <div className="contact-methods-pill-group">
                          {['WhatsApp', 'Phone Call', 'Email'].map((method) => (
                            <button
                              key={method}
                              type="button"
                              className={`contact-method-pill ${
                                formData.preferredContact === method ? 'is-selected' : ''
                              }`}
                              onClick={() => handleContactMethodSelect(method)}
                            >
                              {method === 'WhatsApp' && <MessageSquare size={14} className="method-ico" />}
                              {method === 'Phone Call' && <Phone size={14} className="method-ico" />}
                              {method === 'Email' && <Mail size={14} className="method-ico" />}
                              <span>{method}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Project Details & Description */}
                      <div className="form-field-group">
                        <label className="form-field-label required" htmlFor="field-message">
                          Project Description
                        </label>
                        <textarea
                          id="field-message"
                          name="message"
                          className={`form-textarea-element ${fieldErrors.message ? 'has-error' : ''}`}
                          rows={4}
                          placeholder="Please describe plot dimensions (e.g. 50x80 ft), built-up area preference, number of floors/bedrooms, architectural style (Contemporary, Classical, Chettinad), or specific timelines..."
                          value={formData.message}
                          onChange={handleChange}
                          required
                        />
                        {fieldErrors.message && (
                          <span className="field-error-msg">{fieldErrors.message}</span>
                        )}
                      </div>

                      {/* Consent Checkbox */}
                      <div className="consent-checkbox-row">
                        <input
                          id="consent-check"
                          type="checkbox"
                          name="consent"
                          className="consent-checkbox-input"
                          checked={formData.consent}
                          onChange={handleChange}
                        />
                        <label htmlFor="consent-check" className="consent-checkbox-text">
                          I consent to Sri Ananda Nilayam reaching out to me via phone, email, or WhatsApp regarding this project enquiry. We respect your privacy and never share your data.
                        </label>
                      </div>
                      {fieldErrors.consent && (
                        <span className="field-error-msg">{fieldErrors.consent}</span>
                      )}

                      {/* Prominent Gold Submit Button with Loading State */}
                      <button
                        type="submit"
                        disabled={submitting}
                        className="btn-gold-submit"
                        id="submit-enquiry-btn"
                      >
                        {submitting ? (
                          <div className="submit-loading-state">
                            <div className="submit-spinner" />
                            <span>Submitting Enquiry...</span>
                          </div>
                        ) : (
                          <div className="submit-content-state">
                            <span>Submit Enquiry</span>
                            <ArrowRight size={18} />
                          </div>
                        )}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Executive Client Enquiry CSS ── */}
      <style>{`
        .client-enquiry-page {
          background: #F5F7FA;
          color: #07172B;
        }

        .enquiry-main-section {
          padding-top: 3.5rem;
          padding-bottom: 5rem;
        }

        /* ── Two-Column Desktop Layout ── */
        .enquiry-2col-layout {
          display: grid;
          grid-template-columns: minmax(360px, 440px) 1fr;
          gap: 2.75rem;
          align-items: start;
        }

        /* ── Left Column ── */
        .enquiry-left-col {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .left-photo-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 28px rgba(7, 23, 43, 0.12);
          border: 1px solid rgba(234, 175, 53, 0.3);
          aspect-ratio: 16 / 10;
        }

        .left-photo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .left-photo-card:hover .left-photo-img {
          transform: scale(1.03);
        }

        .left-photo-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(7, 23, 43, 0.2) 0%, rgba(7, 23, 43, 0.92) 85%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1.5rem;
          color: #FFFFFF;
        }

        .left-photo-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 1.4px;
          color: #EAAF35;
          margin-bottom: 0.4rem;
        }

        .left-photo-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #FFFFFF;
          margin: 0 0 0.35rem 0;
          letter-spacing: -0.2px;
        }

        .left-photo-sub {
          font-size: 0.8rem;
          color: #CBD5E1;
          margin: 0;
          line-height: 1.45;
        }

        .left-intro-card {
          background: #FFFFFF;
          border-radius: 16px;
          padding: 1.85rem;
          border: 1px solid #E2E8F0;
          box-shadow: 0 4px 20px rgba(7, 23, 43, 0.04);
        }

        .intro-heading {
          font-size: 1.15rem;
          font-weight: 700;
          color: #07172B;
          margin: 0 0 0.5rem 0;
        }

        .intro-text {
          font-size: 0.86rem;
          color: #64748B;
          line-height: 1.6;
          margin: 0 0 1.5rem 0;
        }

        .left-contact-list {
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
          margin-bottom: 1.75rem;
        }

        .contact-item-row {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .contact-icon-circle {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: #07172B;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 3px 10px rgba(7, 23, 43, 0.15);
        }

        .contact-item-content {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .c-label {
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          color: #94A3B8;
          letter-spacing: 0.6px;
        }

        .c-val {
          font-size: 0.88rem;
          color: #07172B;
          font-weight: 600;
          line-height: 1.45;
        }

        .c-link {
          font-size: 0.88rem;
          color: #07172B;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s;
        }

        .c-link:hover {
          color: #EAAF35;
        }

        .c-link.text-whatsapp {
          color: #15803D;
        }

        .left-assurance-box {
          padding-top: 1.25rem;
          border-top: 1px solid #F1F5F9;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .assurance-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: #102844;
        }

        .left-map-card {
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid #E2E8F0;
          box-shadow: 0 4px 16px rgba(7, 23, 43, 0.04);
        }

        /* ── Right Column: Enquiry Form Card ── */
        .enquiry-form-card {
          background: #FFFFFF;
          border-radius: 18px;
          padding: 2.75rem 2.5rem;
          border: 1px solid #E2E8F0;
          box-shadow: 0 10px 32px rgba(7, 23, 43, 0.06);
          position: relative;
        }

        .form-card-header {
          margin-bottom: 2rem;
        }

        .form-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 1.8px;
          color: #EAAF35;
          margin-bottom: 0.5rem;
        }

        .gold-accent-line {
          width: 24px;
          height: 2px;
          background: #EAAF35;
        }

        .form-card-title {
          font-size: 1.95rem;
          font-weight: 700;
          color: #07172B;
          margin: 0 0 0.5rem 0;
          letter-spacing: -0.4px;
        }

        .form-card-subtitle {
          font-size: 0.9rem;
          color: #64748B;
          line-height: 1.55;
          margin: 0;
        }

        .form-error-banner {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          background: #FEF2F2;
          border: 1px solid #FCA5A5;
          color: #DC2626;
          padding: 0.85rem 1.15rem;
          border-radius: 8px;
          font-size: 0.84rem;
          font-weight: 500;
          margin-bottom: 1.5rem;
        }

        .err-icon {
          flex-shrink: 0;
        }

        .enquiry-form-element {
          display: flex;
          flex-direction: column;
          gap: 1.35rem;
        }

        .form-row-2col {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }

        .form-field-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .form-field-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: #1E293B;
          display: flex;
          align-items: center;
        }

        .form-field-label.required::after {
          content: ' *';
          color: #DC2626;
          font-weight: 700;
        }

        .form-input-element,
        .form-select-element,
        .form-textarea-element {
          width: 100%;
          background: #F8FAFC;
          border: 1px solid #CBD5E1;
          color: #07172B;
          font-size: 0.88rem;
          padding: 0.75rem 1rem;
          border-radius: 10px;
          outline: none;
          transition: all 0.2s;
          font-family: inherit;
        }

        .form-input-element:focus,
        .form-select-element:focus,
        .form-textarea-element:focus {
          background: #FFFFFF;
          border-color: #EAAF35;
          box-shadow: 0 0 0 3px rgba(234, 175, 53, 0.16);
        }

        .form-select-element {
          cursor: pointer;
        }

        .phone-prefix-wrap {
          display: flex;
          align-items: stretch;
          background: #F8FAFC;
          border: 1px solid #CBD5E1;
          border-radius: 10px;
          overflow: hidden;
          transition: all 0.2s;
        }

        .phone-prefix-wrap:focus-within {
          background: #FFFFFF;
          border-color: #EAAF35;
          box-shadow: 0 0 0 3px rgba(234, 175, 53, 0.16);
        }

        .phone-prefix {
          display: flex;
          align-items: center;
          padding: 0 0.85rem;
          background: #E2E8F0;
          color: #475569;
          font-size: 0.84rem;
          font-weight: 600;
          border-right: 1px solid #CBD5E1;
        }

        .phone-input {
          border: none !important;
          background: transparent !important;
          box-shadow: none !important;
          padding-left: 0.75rem;
        }

        .contact-methods-pill-group {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .contact-method-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: #F8FAFC;
          border: 1px solid #CBD5E1;
          color: #475569;
          font-size: 0.82rem;
          font-weight: 600;
          padding: 0.55rem 1.15rem;
          border-radius: 30px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .contact-method-pill:hover {
          border-color: #EAAF35;
          color: #07172B;
        }

        .contact-method-pill.is-selected {
          background: #07172B;
          border-color: #07172B;
          color: #EAAF35;
          box-shadow: 0 3px 10px rgba(7, 23, 43, 0.15);
        }

        .method-ico {
          color: inherit;
        }

        .consent-checkbox-row {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          margin-top: 0.25rem;
        }

        .consent-checkbox-input {
          width: 18px;
          height: 18px;
          margin-top: 2px;
          accent-color: #EAAF35;
          cursor: pointer;
          flex-shrink: 0;
        }

        .consent-checkbox-text {
          font-size: 0.8rem;
          color: #64748B;
          line-height: 1.5;
          cursor: pointer;
        }

        /* ── Prominent Gold Submit Button & Error Styles ── */
        .btn-gold-submit {
          width: 100%;
          background: linear-gradient(135deg, #EAAF35 0%, #D6A43B 100%);
          border: none;
          color: #07172B;
          font-size: 1.05rem;
          font-weight: 700;
          padding: 1rem 1.75rem;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.25s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 0.75rem;
          box-shadow: 0 4px 18px rgba(234, 175, 53, 0.4);
        }

        .btn-gold-submit:hover:not(:disabled) {
          background: linear-gradient(135deg, #F5BE47 0%, #EAAF35 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 26px rgba(234, 175, 53, 0.55);
        }

        .btn-gold-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .submit-content-state {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
        }

        .submit-loading-state {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          color: #07172B;
          font-weight: 700;
        }

        .submit-spinner {
          width: 22px;
          height: 22px;
          border: 3px solid rgba(7, 23, 43, 0.25);
          border-top-color: #07172B;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        .field-error-msg {
          font-size: 0.74rem;
          color: #DC2626;
          font-weight: 600;
          margin-top: 0.25rem;
          display: block;
        }

        .form-input-element.has-error,
        .phone-prefix-wrap.has-error,
        .form-textarea-element.has-error {
          border-color: #EF4444 !important;
          background: #FEF2F2 !important;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* ── Success State ── */
        .enquiry-success-state {
          padding: 3rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .success-icon-badge {
          margin-bottom: 1.25rem;
        }

        .badge-ref {
          display: inline-block;
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          background: #ECFDF5;
          color: #047857;
          border: 1px solid #A7F3D0;
          padding: 0.35rem 0.85rem;
          border-radius: 20px;
          margin-bottom: 1rem;
        }

        .success-title {
          font-size: 1.85rem;
          font-weight: 700;
          color: #07172B;
          margin: 0 0 0.75rem 0;
        }

        .success-lead {
          font-size: 1rem;
          color: #334155;
          line-height: 1.6;
          max-width: 500px;
          margin: 0 0 0.5rem 0;
        }

        .success-sub {
          font-size: 0.88rem;
          color: #64748B;
          line-height: 1.6;
          max-width: 480px;
          margin: 0 0 2rem 0;
        }

        .btn-submit-another {
          background: #EAAF35;
          border: 1px solid #D69E2E;
          color: #07172B;
          font-size: 0.88rem;
          font-weight: 700;
          padding: 0.75rem 1.75rem;
          border-radius: 9px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-submit-another:hover {
          background: #D69E2E;
          transform: translateY(-1px);
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .enquiry-2col-layout {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .left-photo-card {
            aspect-ratio: 21 / 9;
          }
        }

        @media (max-width: 768px) {
          .enquiry-form-card {
            padding: 1.85rem 1.35rem;
          }
          .form-row-2col {
            grid-template-columns: 1fr;
            gap: 1.15rem;
          }
          .form-card-title {
            font-size: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .enquiry-form-card {
            padding: 1.4rem 0.95rem;
            border-radius: 12px;
          }
          .form-card-title {
            font-size: 1.35rem;
          }
          .left-contact-info-card {
            padding: 1.5rem 1rem;
          }
        }
      `}</style>
    </div>
  );
}
