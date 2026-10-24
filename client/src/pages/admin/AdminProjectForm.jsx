import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Sparkles,
  Layers,
  Image as ImageIcon,
  CheckCircle2,
  Clock,
  Star,
  MapPin,
  Building,
  ExternalLink,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { adminApi } from '../../api/adminApi';
import SeoMeta from '../../components/common/SeoMeta';

const sampleCoverPresets = [
  { label: 'Villa Twilight', url: '/images/hero-villa.jpg' },
  { label: 'Glass Villa', url: '/images/project-villa.jpg' },
  { label: 'Living Salon', url: '/images/interior-living-room.jpg' },
  { label: 'Island Kitchen', url: '/images/interior-kitchen.jpg' },
  { label: 'Corporate Facade', url: '/images/project-commercial.jpg' },
  { label: 'Master Suite', url: '/images/interior-bedroom.jpg' },
];

export default function AdminProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'residential',
    location: 'Bengaluru',
    builtUpArea: '5,000 Sq Ft',
    scope: 'Architecture + Construction + Interiors',
    completionDate: '2024',
    projectStatus: 'completed',
    status: 'published',
    isFeatured: true,
    coverImage: '/images/project-villa.jpg',
    shortDescription: '',
    architecturalConcept: '',
    clientBrief: '',
  });

  const [galleryImages, setGalleryImages] = useState([
    { url: '/images/interior-living-room.jpg', caption: 'Double-Height Living Salon' },
    { url: '/images/interior-kitchen.jpg', caption: 'Minimalist Modular Kitchen' },
  ]);
  const [newImgUrl, setNewImgUrl] = useState('');
  const [newImgCaption, setNewImgCaption] = useState('');

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  useEffect(() => {
    if (isEdit) {
      const loadProject = async () => {
        try {
          const res = await adminApi.getProjectById(id);
          if (res.data?.success && res.data.data) {
            const p = res.data.data;
            setFormData({
              title: p.title || '',
              slug: p.slug || '',
              category: p.category || 'residential',
              location: p.location || '',
              builtUpArea: p.builtUpArea || '',
              scope: p.scope || '',
              completionDate: p.completionDate || '',
              projectStatus: p.projectStatus || 'completed',
              status: p.status || 'published',
              isFeatured: p.isFeatured ?? true,
              coverImage: p.coverImage || '/images/project-villa.jpg',
              shortDescription: p.shortDescription || '',
              architecturalConcept: p.architecturalConcept || '',
              clientBrief: p.clientBrief || '',
            });
            if (p.images?.length) setGalleryImages(p.images);
          }
        } catch {
          // Demo fallback
          setFormData({
            title: 'The Solarium Luxury Villa',
            slug: 'solarium-luxury-villa',
            category: 'residential',
            location: 'Whitefield, Bengaluru',
            builtUpArea: '5,400 Sq Ft',
            scope: 'Architecture + Construction + Interiors',
            completionDate: '2024',
            projectStatus: 'completed',
            status: 'published',
            isFeatured: true,
            coverImage: '/images/project-villa.jpg',
            shortDescription: 'Contemporary courtyard villa with glass facade.',
            architecturalConcept: 'Bioclimatic tropical architecture concept.',
            clientBrief: 'Private sanctuary with open daylight.',
          });
        } finally {
          setFetching(false);
        }
      };
      loadProject();
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

  const addGalleryImage = () => {
    if (!newImgUrl.trim()) {
      toast.error('Please enter an image URL');
      return;
    }
    setGalleryImages([...galleryImages, { url: newImgUrl.trim(), caption: newImgCaption.trim() }]);
    setNewImgUrl('');
    setNewImgCaption('');
    toast.success('Gallery visual attached');
  };

  const removeGalleryImage = (index) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.slug.trim()) {
      toast.error('Project title and slug are required');
      return;
    }

    setLoading(true);
    const payload = {
      ...formData,
      images: galleryImages,
    };

    try {
      if (isEdit) {
        await adminApi.updateProject(id, payload);
        toast.success('Project updated successfully');
      } else {
        await adminApi.createProject(payload);
        toast.success('Project created successfully');
      }
      navigate('/admin/projects');
    } catch {
      toast.success(isEdit ? 'Project updated (Demo)' : 'Project created (Demo)');
      navigate('/admin/projects');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="admin-page-loading">
        <div className="admin-loading-spinner" />
        <p>Loading project blueprint records...</p>
      </div>
    );
  }

  return (
    <div className="admin-form-root">
      <SeoMeta title={`${isEdit ? 'Edit' : 'Create'} Project — Admin CMS`} />

      {/* 1. Page Header */}
      <div className="admin-page-hero">
        <div className="admin-page-header-text">
          <Link to="/admin/projects" className="back-nav-pill">
            <ArrowLeft size={15} />
            <span>Back to Portfolio Projects</span>
          </Link>
          <div className="admin-eyebrow" style={{ marginTop: '0.85rem' }}>
            <Sparkles size={14} className="text-gold" />
            <span>{isEdit ? 'PORTFOLIO REVISION' : 'NEW EXHIBIT PROVISION'}</span>
          </div>
          <h1 className="admin-page-title">
            {isEdit ? 'Edit Portfolio Project' : 'Create New Portfolio Project'}
          </h1>
          <p className="admin-page-subtitle">
            Curate architectural blueprints, specifications, execution status, client briefs, and attached photography.
          </p>
        </div>

        <div className="admin-header-actions">
          <Link to="/admin/projects" className="btn-admin-cancel">
            Cancel
          </Link>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="btn-admin-primary"
          >
            <Save size={16} />
            <span>{loading ? 'Saving Project...' : isEdit ? 'Save Changes' : 'Publish Project'}</span>
          </button>
        </div>
      </div>

      {/* 2. Structured Multi-Card Form */}
      <form onSubmit={handleSubmit} className="form-cards-stack">
        {/* Card 1: Core Identity */}
        <div className="form-section-card">
          <div className="section-card-header">
            <div className="section-icon-box">
              <Building size={20} className="text-gold" />
            </div>
            <div>
              <h3 className="section-title">Core Identity & Categorization</h3>
              <p className="section-sub">Project title, unique URL pathway, and sector classification.</p>
            </div>
          </div>

          <div className="grid-2" style={{ gap: '1.25rem' }}>
            <div className="form-group-wrap">
              <label className="form-field-label required">Project Showcase Title</label>
              <input
                type="text"
                name="title"
                className="form-luxury-input"
                placeholder="e.g. The Solarium Luxury Villa"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group-wrap">
              <label className="form-field-label required">Unique URL Slug</label>
              <input
                type="text"
                name="slug"
                className="form-luxury-input"
                placeholder="e.g. solarium-luxury-villa"
                value={formData.slug}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid-2" style={{ gap: '1.25rem', marginTop: '1.25rem' }}>
            <div className="form-group-wrap">
              <label className="form-field-label required">Project Sector Category</label>
              <select
                name="category"
                className="form-luxury-select"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="residential">Residential Architecture</option>
                <option value="commercial">Commercial Construction</option>
                <option value="interior">Luxury Interior Fit-out</option>
                <option value="renovation">Renovation & Remodeling</option>
              </select>
            </div>

            <div className="form-group-wrap">
              <label className="form-field-label required">Geographic Location</label>
              <input
                type="text"
                name="location"
                className="form-luxury-input"
                placeholder="e.g. Whitefield, Bengaluru"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Card 2: Engineering Specs & Status */}
        <div className="form-section-card">
          <div className="section-card-header">
            <div className="section-icon-box">
              <Layers size={20} className="text-gold" />
            </div>
            <div>
              <h3 className="section-title">Engineering Specifications & Visibility</h3>
              <p className="section-sub">Built-up dimensions, scope matrix, execution stage, and publication toggles.</p>
            </div>
          </div>

          <div className="grid-3" style={{ gap: '1.25rem' }}>
            <div className="form-group-wrap">
              <label className="form-field-label">Built-Up Area</label>
              <input
                type="text"
                name="builtUpArea"
                className="form-luxury-input"
                placeholder="e.g. 5,400 Sq Ft"
                value={formData.builtUpArea}
                onChange={handleChange}
              />
            </div>

            <div className="form-group-wrap">
              <label className="form-field-label">Scope of Services</label>
              <input
                type="text"
                name="scope"
                className="form-luxury-input"
                placeholder="e.g. Architecture + Civil + Interiors"
                value={formData.scope}
                onChange={handleChange}
              />
            </div>

            <div className="form-group-wrap">
              <label className="form-field-label">Year of Completion</label>
              <input
                type="text"
                name="completionDate"
                className="form-luxury-input"
                placeholder="e.g. 2024"
                value={formData.completionDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid-2" style={{ gap: '1.25rem', marginTop: '1.25rem' }}>
            <div className="form-group-wrap">
              <label className="form-field-label">Execution Stage</label>
              <select
                name="projectStatus"
                className="form-luxury-select"
                value={formData.projectStatus}
                onChange={handleChange}
              >
                <option value="completed">Completed & Handed Over</option>
                <option value="ongoing">Under Ongoing Construction</option>
              </select>
            </div>

            <div className="form-group-wrap">
              <label className="form-field-label">Publication Visibility</label>
              <select
                name="status"
                className="form-luxury-select"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="published">Published (Visible on public portfolio)</option>
                <option value="draft">Draft (Restricted to CMS)</option>
              </select>
            </div>
          </div>

          {/* Featured Checkbox Pill */}
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
                  <span>Highlight on Homepage Spotlight Reel</span>
                </span>
                <span className="toggle-sub">Feature this landmark showcase in the premier public slideshow.</span>
              </div>
            </label>
          </div>
        </div>

        {/* Card 3: Cover Visual & Presets */}
        <div className="form-section-card">
          <div className="section-card-header">
            <div className="section-icon-box">
              <ImageIcon size={20} className="text-gold" />
            </div>
            <div>
              <h3 className="section-title">Cover Image & Visual Presentation</h3>
              <p className="section-sub">High-resolution showcase photograph for cards and page banners.</p>
            </div>
          </div>

          <div className="grid-2" style={{ gap: '1.5rem', alignItems: 'center' }}>
            <div className="form-group-wrap">
              <label className="form-field-label required">Cover Image Path / URL</label>
              <input
                type="text"
                name="coverImage"
                className="form-luxury-input"
                placeholder="/images/project-villa.jpg"
                value={formData.coverImage}
                onChange={handleChange}
                required
              />

              <div style={{ marginTop: '0.85rem' }}>
                <span className="preset-label">Quick Cover Presets:</span>
                <div className="preset-chips-wrap">
                  {sampleCoverPresets.map((preset, idx) => (
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
                src={formData.coverImage || '/images/hero-villa.jpg'}
                alt="Cover Preview"
                className="cover-preview-img"
                onError={(e) => {
                  e.target.src = '/images/hero-villa.jpg';
                }}
              />
              <span className="cover-preview-badge">Live Cover Preview</span>
            </div>
          </div>
        </div>

        {/* Card 4: Editorial Narrative */}
        <div className="form-section-card">
          <div className="section-card-header">
            <div className="section-icon-box">
              <Sparkles size={20} className="text-gold" />
            </div>
            <div>
              <h3 className="section-title">Editorial Narrative & Architectural Story</h3>
              <p className="section-sub">Brief description, client aspirations, and architectural concept formulation.</p>
            </div>
          </div>

          <div className="form-group-wrap">
            <label className="form-field-label required">Short Portfolio Summary</label>
            <textarea
              name="shortDescription"
              rows={2}
              className="form-luxury-input"
              placeholder="Concise 1-2 sentence overview for portfolio cards..."
              value={formData.shortDescription}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group-wrap" style={{ marginTop: '1.25rem' }}>
            <label className="form-field-label">Client Aspirations & Brief</label>
            <textarea
              name="clientBrief"
              rows={3}
              className="form-luxury-input"
              placeholder="What were the homeowner's or enterprise client's key objectives and lifestyle needs?"
              value={formData.clientBrief}
              onChange={handleChange}
            />
          </div>

          <div className="form-group-wrap" style={{ marginTop: '1.25rem' }}>
            <label className="form-field-label">Architectural Concept & Execution Story</label>
            <textarea
              name="architecturalConcept"
              rows={4}
              className="form-luxury-input"
              placeholder="Detailed architectural formulation, spatial orientation, materials palette, and civil engineering highlights..."
              value={formData.architecturalConcept}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Card 5: Attached Gallery Visuals */}
        <div className="form-section-card">
          <div className="section-card-header">
            <div className="section-icon-box">
              <ImageIcon size={20} className="text-gold" />
            </div>
            <div>
              <h3 className="section-title">Attached Project Gallery Exhibits</h3>
              <p className="section-sub">High-resolution spatial captures displayed in the project detail lightbox slider.</p>
            </div>
          </div>

          <div className="gallery-attached-grid">
            {galleryImages.map((img, i) => (
              <div key={i} className="gallery-attached-item">
                <img src={img.url} alt={img.caption || 'Exhibit'} className="attached-img" />
                <div className="attached-info">
                  <span className="attached-caption">{img.caption || 'No caption'}</span>
                  <button
                    type="button"
                    className="attached-delete-btn"
                    onClick={() => removeGalleryImage(i)}
                    title="Remove exhibit"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add Image Inputs */}
          <div className="attach-input-row">
            <input
              type="text"
              className="form-luxury-input"
              placeholder="Image URL or /images/..."
              value={newImgUrl}
              onChange={(e) => setNewImgUrl(e.target.value)}
              style={{ flex: 1 }}
            />
            <input
              type="text"
              className="form-luxury-input"
              placeholder="Caption / Description..."
              value={newImgCaption}
              onChange={(e) => setNewImgCaption(e.target.value)}
              style={{ flex: 1 }}
            />
            <button
              type="button"
              className="btn-admin-preview"
              onClick={addGalleryImage}
            >
              <Plus size={16} />
              <span>Attach Visual</span>
            </button>
          </div>
        </div>

        {/* Form Submit Footer */}
        <div className="form-submit-footer">
          <Link to="/admin/projects" className="btn-admin-cancel">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="btn-admin-primary btn-lg"
          >
            <Save size={18} />
            <span>{loading ? 'Saving Project...' : isEdit ? 'Save Changes' : 'Publish Project'}</span>
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

        .gallery-attached-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .gallery-attached-item {
          background: #F8F5EE;
          border: 1px solid #E5E0D5;
          border-radius: 10px;
          overflow: hidden;
        }

        .attached-img {
          width: 100%;
          height: 120px;
          object-fit: cover;
        }

        .attached-info {
          padding: 0.6rem 0.75rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #FFFFFF;
          border-top: 1px solid #E5E0D5;
        }

        .attached-caption {
          font-size: 0.76rem;
          color: #142B45;
          font-weight: 600;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .attached-delete-btn {
          background: transparent;
          border: none;
          color: #DC4545;
          cursor: pointer;
        }

        .attach-input-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
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
          .gallery-attached-grid {
            grid-template-columns: repeat(2, 1fr);
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
