import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Sparkles,
  Briefcase,
  Image as ImageIcon,
  CheckCircle2,
  HelpCircle,
  Star,
  ExternalLink,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { adminApi } from '../../api/adminApi';
import SeoMeta from '../../components/common/SeoMeta';

const sampleServicePresets = [
  { label: 'Architectural Blueprint', url: '/images/service-design.jpg' },
  { label: 'Turnkey Construction', url: '/images/service-construction.jpg' },
  { label: 'Luxury Interiors', url: '/images/service-interiors.jpg' },
  { label: 'Commercial Complex', url: '/images/service-commercial.jpg' },
  { label: 'Villa Twilight', url: '/images/hero-villa.jpg' },
  { label: 'Island Kitchen', url: '/images/interior-kitchen.jpg' },
];

export default function AdminServiceForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Architecture',
    shortDescription: '',
    description: '',
    coverImage: '/images/service-design.jpg',
    order: 1,
    status: 'published',
    isFeatured: true,
  });

  const [benefits, setBenefits] = useState([
    'Custom bespoke layout blueprints',
    '3D photorealistic spatial visualizations',
    '100% Vastu-compliant orientation',
    'BBMP & local authority permit assistance',
  ]);
  const [newBenefit, setNewBenefit] = useState('');

  const [faqs, setFaqs] = useState([
    {
      question: 'How long does the architectural design phase typically take?',
      answer: 'Depending on spatial scope and villa footprint, complete blueprints take 4 to 8 weeks.',
    },
    {
      question: 'Do you provide on-site structural inspections during construction?',
      answer: 'Yes, our senior structural engineers conduct weekly multi-point audits on all RCC concrete shuttering.',
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  useEffect(() => {
    if (isEdit) {
      const loadService = async () => {
        try {
          const res = await adminApi.getServiceById(id);
          if (res.data?.success && res.data.data) {
            const s = res.data.data;
            setFormData({
              title: s.title || '',
              slug: s.slug || '',
              category: s.category || 'Architecture',
              shortDescription: s.shortDescription || '',
              description: s.description || '',
              coverImage: s.coverImage || '/images/service-design.jpg',
              order: s.order || 1,
              status: s.status || 'published',
              isFeatured: s.isFeatured ?? true,
            });
            if (s.benefits?.length) setBenefits(s.benefits);
            if (s.faqs?.length) setFaqs(s.faqs);
          }
        } catch {
          setFormData({
            title: 'Architectural Design',
            slug: 'architectural-design',
            category: 'Architecture',
            shortDescription: 'Innovative architectural blueprints and 3D models.',
            description: 'Full architectural master planning and bespoke residential design services.',
            coverImage: '/images/service-design.jpg',
            order: 1,
            status: 'published',
            isFeatured: true,
          });
        } finally {
          setFetching(false);
        }
      };
      loadService();
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      const next = { ...prev, [name]: type === 'checkbox' ? checked : value };
      if (name === 'title' && !isEdit) {
        next.slug = value
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');
      }
      return next;
    });
  };

  const addBenefit = () => {
    if (!newBenefit.trim()) {
      toast.error('Please enter a benefit item');
      return;
    }
    setBenefits([...benefits, newBenefit.trim()]);
    setNewBenefit('');
    toast.success('Benefit item added');
  };

  const removeBenefit = (index) => {
    setBenefits(benefits.filter((_, i) => i !== index));
  };

  const addFaq = () => {
    setFaqs([...faqs, { question: '', answer: '' }]);
  };

  const updateFaq = (index, field, val) => {
    const updated = [...faqs];
    updated[index][field] = val;
    setFaqs(updated);
  };

  const removeFaq = (index) => {
    setFaqs(faqs.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.slug.trim()) {
      toast.error('Service title and slug are required');
      return;
    }

    setLoading(true);
    const payload = {
      ...formData,
      benefits,
      faqs,
    };

    try {
      if (isEdit) {
        await adminApi.updateService(id, payload);
        toast.success('Service updated successfully');
      } else {
        await adminApi.createService(payload);
        toast.success('Service provisioned successfully');
      }
      navigate('/admin/services');
    } catch {
      toast.success(isEdit ? 'Service updated (Demo)' : 'Service created (Demo)');
      navigate('/admin/services');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="admin-page-loading">
        <div className="admin-loading-spinner" />
        <p>Loading service catalog record...</p>
      </div>
    );
  }

  return (
    <div className="admin-form-root">
      <SeoMeta title={`${isEdit ? 'Edit' : 'Create'} Service — Admin CMS`} />

      {/* 1. Page Header */}
      <div className="admin-page-hero">
        <div className="admin-page-header-text">
          <Link to="/admin/services" className="back-nav-pill">
            <ArrowLeft size={15} />
            <span>Back to Services Catalog</span>
          </Link>
          <div className="admin-eyebrow" style={{ marginTop: '0.85rem' }}>
            <Sparkles size={14} className="text-gold" />
            <span>{isEdit ? 'SERVICE REVISION' : 'NEW CAPABILITY PROVISION'}</span>
          </div>
          <h1 className="admin-page-title">
            {isEdit ? 'Edit Service Offering' : 'Create New Service Offering'}
          </h1>
          <p className="admin-page-subtitle">
            Configure architectural scope, client value benefits, execution workflows, and client consultation FAQs.
          </p>
        </div>

        <div className="admin-header-actions">
          <Link to="/admin/services" className="btn-admin-cancel">
            Cancel
          </Link>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="btn-admin-primary"
          >
            <Save size={16} />
            <span>{loading ? 'Saving Service...' : isEdit ? 'Save Changes' : 'Publish Service'}</span>
          </button>
        </div>
      </div>

      {/* 2. Form Stack */}
      <form onSubmit={handleSubmit} className="form-cards-stack">
        {/* Card 1: Identity & Order */}
        <div className="form-section-card">
          <div className="section-card-header">
            <div className="section-icon-box">
              <Briefcase size={20} className="text-gold" />
            </div>
            <div>
              <h3 className="section-title">Service Identity & Ordering</h3>
              <p className="section-sub">Service nomenclature, unique URL pathway, and presentation order.</p>
            </div>
          </div>

          <div className="grid-2" style={{ gap: '1.25rem' }}>
            <div className="form-group-wrap">
              <label className="form-field-label required">Service Offering Title</label>
              <input
                type="text"
                name="title"
                className="form-luxury-input"
                placeholder="e.g. Architectural Design"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group-wrap">
              <label className="form-field-label required">URL Slug</label>
              <input
                type="text"
                name="slug"
                className="form-luxury-input"
                placeholder="e.g. architectural-design"
                value={formData.slug}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid-3" style={{ gap: '1.25rem', marginTop: '1.25rem' }}>
            <div className="form-group-wrap">
              <label className="form-field-label">Service Classification</label>
              <select
                name="category"
                className="form-luxury-select"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Architecture">Architecture</option>
                <option value="Construction">Civil Construction</option>
                <option value="Commercial">Commercial Infrastructure</option>
                <option value="Interior">Luxury Interiors</option>
                <option value="Renovation">Renovation & Remodeling</option>
              </select>
            </div>

            <div className="form-group-wrap">
              <label className="form-field-label">Display Order Index</label>
              <input
                type="number"
                name="order"
                className="form-luxury-input"
                value={formData.order}
                onChange={handleChange}
                min={1}
              />
            </div>

            <div className="form-group-wrap">
              <label className="form-field-label">Publication Visibility</label>
              <select
                name="status"
                className="form-luxury-select"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="published">Published (Visible on site)</option>
                <option value="draft">Draft (Restricted to CMS)</option>
              </select>
            </div>
          </div>

          {/* Featured Toggle */}
          <div className="featured-pill-row">
            <label className="featured-toggle-label">
              <input
                type="checkbox"
                name="isFeatured"
                className="luxury-checkbox"
                checked={formData.isFeatured}
                onChange={handleChange}
              />
              <div className="toggle-label-content">
                <span className="toggle-title">
                  <Star size={15} fill={formData.isFeatured ? '#EAAF35' : 'transparent'} color="#EAAF35" />
                  <span>Highlight on Homepage Services Grid</span>
                </span>
                <span className="toggle-sub">Feature this core capability prominently on the front page.</span>
              </div>
            </label>
          </div>
        </div>

        {/* Card 2: Cover Media & Presets */}
        <div className="form-section-card">
          <div className="section-card-header">
            <div className="section-icon-box">
              <ImageIcon size={20} className="text-gold" />
            </div>
            <div>
              <h3 className="section-title">Cover Visual & Banner Imagery</h3>
              <p className="section-sub">High-resolution architectural photograph for cards and detailed overview banner.</p>
            </div>
          </div>

          <div className="grid-2" style={{ gap: '1.5rem', alignItems: 'center' }}>
            <div className="form-group-wrap">
              <label className="form-field-label required">Cover Image Path / URL</label>
              <input
                type="text"
                name="coverImage"
                className="form-luxury-input"
                placeholder="/images/service-design.jpg"
                value={formData.coverImage}
                onChange={handleChange}
                required
              />

              <div style={{ marginTop: '0.85rem' }}>
                <span className="preset-label">Quick Cover Presets:</span>
                <div className="preset-chips-wrap">
                  {sampleServicePresets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="preset-chip-btn"
                      onClick={() => setFormData({ ...formData, coverImage: preset.url })}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Cover Preview */}
            <div className="cover-preview-card">
              <img
                src={formData.coverImage || '/images/service-design.jpg'}
                alt="Cover Preview"
                className="cover-preview-img"
                onError={(e) => {
                  e.target.src = '/images/service-design.jpg';
                }}
              />
              <span className="cover-preview-badge">Live Cover Preview</span>
            </div>
          </div>
        </div>

        {/* Card 3: Narrative Descriptions */}
        <div className="form-section-card">
          <div className="section-card-header">
            <div className="section-icon-box">
              <Sparkles size={20} className="text-gold" />
            </div>
            <div>
              <h3 className="section-title">Narrative Overview & Scope</h3>
              <p className="section-sub">Card preview summary and detailed service description.</p>
            </div>
          </div>

          <div className="form-group-wrap">
            <label className="form-field-label required">Short Catalog Summary</label>
            <textarea
              name="shortDescription"
              rows={2}
              className="form-luxury-input"
              placeholder="Concise 1-2 sentence overview for service catalog cards..."
              value={formData.shortDescription}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group-wrap" style={{ marginTop: '1.25rem' }}>
            <label className="form-field-label required">Comprehensive Architectural Scope</label>
            <textarea
              name="description"
              rows={5}
              className="form-luxury-input"
              placeholder="In-depth description of engineering methods, material specifications, design workflows, and deliverables..."
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Card 4: Client Value Benefits Checklist */}
        <div className="form-section-card">
          <div className="section-card-header">
            <div className="section-icon-box">
              <CheckCircle2 size={20} className="text-gold" />
            </div>
            <div>
              <h3 className="section-title">Key Value Benefits Checklist</h3>
              <p className="section-sub">Distinctive value propositions highlighted on the service detail page.</p>
            </div>
          </div>

          <div className="benefits-chips-container">
            {benefits.map((b, i) => (
              <div key={i} className="benefit-tag-item">
                <CheckCircle2 size={14} className="text-gold" />
                <span>{b}</span>
                <button
                  type="button"
                  className="benefit-remove-btn"
                  onClick={() => removeBenefit(i)}
                  title="Remove benefit"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>

          <div className="attach-input-row" style={{ marginTop: '1.25rem' }}>
            <input
              type="text"
              className="form-luxury-input"
              placeholder="e.g. 10-Year Comprehensive Structural Warranty..."
              value={newBenefit}
              onChange={(e) => setNewBenefit(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addBenefit();
                }
              }}
              style={{ flex: 1 }}
            />
            <button
              type="button"
              className="btn-admin-preview"
              onClick={addBenefit}
            >
              <Plus size={16} />
              <span>Add Benefit</span>
            </button>
          </div>
        </div>

        {/* Card 5: FAQs Builder */}
        <div className="form-section-card">
          <div className="section-card-header">
            <div className="section-icon-box">
              <HelpCircle size={20} className="text-gold" />
            </div>
            <div>
              <h3 className="section-title">Service Consultation FAQs Accordion</h3>
              <p className="section-sub">Frequently asked questions addressing timelines, permits, approvals, and warranties.</p>
            </div>
          </div>

          <div className="faqs-stack-list">
            {faqs.map((faq, i) => (
              <div key={i} className="faq-editor-box">
                <div className="faq-editor-top">
                  <span className="faq-num-pill">FAQ #{i + 1}</span>
                  <button
                    type="button"
                    className="faq-delete-btn"
                    onClick={() => removeFaq(i)}
                    title="Remove question"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="form-group-wrap" style={{ marginBottom: '0.85rem' }}>
                  <label className="form-field-label">Question</label>
                  <input
                    type="text"
                    className="form-luxury-input"
                    placeholder="e.g. What is the typical residential construction timeline?"
                    value={faq.question}
                    onChange={(e) => updateFaq(i, 'question', e.target.value)}
                  />
                </div>

                <div className="form-group-wrap">
                  <label className="form-field-label">Answer</label>
                  <textarea
                    rows={2}
                    className="form-luxury-input"
                    placeholder="Provide a reassuring, precise response..."
                    value={faq.answer}
                    onChange={(e) => updateFaq(i, 'answer', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '1.25rem' }}>
            <button
              type="button"
              className="btn-admin-preview"
              onClick={addFaq}
            >
              <Plus size={16} />
              <span>Add Another FAQ</span>
            </button>
          </div>
        </div>

        {/* Submit Actions Footer */}
        <div className="form-submit-footer">
          <Link to="/admin/services" className="btn-admin-cancel">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="btn-admin-primary btn-lg"
          >
            <Save size={18} />
            <span>{loading ? 'Saving Service...' : isEdit ? 'Save Changes' : 'Publish Service'}</span>
          </button>
        </div>
      </form>

      <style>{`
        .admin-form-root {
          max-width: 1200px;
          margin: 0 auto;
        }

        .back-nav-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          color: #64748B;
          font-size: 0.82rem;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s;
        }

        .back-nav-pill:hover {
          color: #142B45;
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

        .btn-admin-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #EAAF35 0%, #D6A43B 100%);
          color: #07172B;
          font-weight: 700;
          font-size: 0.86rem;
          padding: 0.75rem 1.45rem;
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

        .btn-admin-cancel {
          background: #FFFFFF;
          border: 1px solid #E5E0D5;
          color: #64748B;
          padding: 0.75rem 1.35rem;
          border-radius: 8px;
          font-size: 0.86rem;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s;
        }

        .btn-admin-cancel:hover {
          color: #142B45;
          background: #F8F5EE;
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
          white-space: nowrap;
        }

        .btn-admin-preview:hover {
          background: #F8F5EE;
          border-color: #EAAF35;
          color: #07172B;
        }

        .form-cards-stack {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }

        .form-section-card {
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

        .form-luxury-input,
        .form-luxury-select {
          background: #FAF7F0;
          border: 1px solid #E5E0D5;
          border-radius: 8px;
          padding: 0.75rem 1rem;
          color: #142B45;
          font-size: 0.88rem;
          outline: none;
          width: 100%;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .form-luxury-input:focus,
        .form-luxury-select:focus {
          border-color: #EAAF35;
          background: #FFFFFF;
          box-shadow: 0 0 0 2px rgba(234, 175, 53, 0.2);
        }

        .featured-pill-row {
          margin-top: 1.5rem;
          background: #F8F5EE;
          border: 1px solid #E5E0D5;
          border-radius: 10px;
          padding: 1rem 1.25rem;
        }

        .featured-toggle-label {
          display: flex;
          align-items: center;
          gap: 1rem;
          cursor: pointer;
        }

        .luxury-checkbox {
          width: 20px;
          height: 20px;
          accent-color: #EAAF35;
          cursor: pointer;
        }

        .toggle-label-content {
          display: flex;
          flex-direction: column;
        }

        .toggle-title {
          font-size: 0.88rem;
          font-weight: 700;
          color: #142B45;
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        .toggle-sub {
          font-size: 0.78rem;
          color: #64748B;
        }

        .preset-label {
          font-size: 0.74rem;
          color: #64748B;
          font-weight: 600;
        }

        .preset-chips-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-top: 0.35rem;
        }

        .preset-chip-btn {
          background: #F8F5EE;
          border: 1px solid #E5E0D5;
          color: #142B45;
          font-size: 0.72rem;
          padding: 0.35rem 0.65rem;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
          font-weight: 500;
        }

        .preset-chip-btn:hover {
          background: #FAF7F0;
          border-color: #EAAF35;
          color: #07172B;
        }

        .cover-preview-card {
          position: relative;
          width: 100%;
          height: 190px;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #E5E0D5;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
        }

        .cover-preview-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .cover-preview-badge {
          position: absolute;
          bottom: 0.65rem;
          right: 0.65rem;
          background: rgba(7, 23, 43, 0.85);
          color: #EAAF35;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.25rem 0.65rem;
          border-radius: 4px;
        }

        .benefits-chips-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.65rem;
        }

        .benefit-tag-item {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          background: #F8F5EE;
          border: 1px solid #E5E0D5;
          color: #142B45;
          font-size: 0.84rem;
          font-weight: 500;
          padding: 0.45rem 0.85rem;
          border-radius: 8px;
        }

        .benefit-remove-btn {
          background: transparent;
          border: none;
          color: #64748B;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          margin-left: 0.25rem;
        }

        .benefit-remove-btn:hover {
          color: #DC4545;
        }

        .attach-input-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .faqs-stack-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .faq-editor-box {
          background: #F8F5EE;
          border: 1px solid #E5E0D5;
          border-radius: 10px;
          padding: 1.25rem;
        }

        .faq-editor-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.85rem;
        }

        .faq-num-pill {
          font-size: 0.74rem;
          font-weight: 700;
          color: #07172B;
          background: #EAAF35;
          border: 1px solid #EAAF35;
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
        }

        .faq-delete-btn {
          background: transparent;
          border: none;
          color: #DC4545;
          cursor: pointer;
        }

        .form-submit-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 1rem;
          padding: 1.5rem 0 3rem;
        }

        .admin-page-loading {
          padding: 6rem 2rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #64748B;
        }

        @media (max-width: 900px) {
          .grid-3 {
            grid-template-columns: 1fr;
          }
          .grid-2 {
            grid-template-columns: 1fr;
          }
          .attach-input-row {
            flex-direction: column;
            align-items: stretch;
          }
        }
      `}</style>
    </div>
  );
}
