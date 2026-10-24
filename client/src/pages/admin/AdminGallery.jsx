import { useState, useEffect, useMemo } from 'react';
import {
  Trash2,
  PlusCircle,
  ExternalLink,
  Search,
  Sparkles,
  Image as ImageIcon,
  CheckCircle2,
  Maximize2,
  Copy,
  Check,
  X,
  Layers,
  Home,
  Hammer,
  RefreshCw,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { adminApi } from '../../api/adminApi';
import SeoMeta from '../../components/common/SeoMeta';

const samplePresets = [
  { url: '/images/hero-villa.jpg', caption: 'Luxury Villa Twilight Facade with Ambient Lighting', category: 'exterior' },
  { url: '/images/interior-living-room.jpg', caption: 'Double-Height Living Salon with Travertine Marble', category: 'interior' },
  { url: '/images/project-villa.jpg', caption: 'Cantilevered Glass Villa Architecture in Whitefield', category: 'exterior' },
  { url: '/images/interior-kitchen.jpg', caption: 'Minimalist Modular Kitchen with Quartz Island', category: 'interior' },
  { url: '/images/project-commercial.jpg', caption: 'Commercial Campus Facade with Solar Shading', category: 'construction' },
  { url: '/images/interior-bedroom.jpg', caption: 'Master Suite with Fluted Acoustic Teak Wood', category: 'interior' },
  { url: '/images/construction-site.jpg', caption: 'Concrete Shuttering & Seismic Steel Reinforcement', category: 'construction' },
  { url: '/images/about-architecture.jpg', caption: 'Architectural Blueprint Deliberations & 3D Spatial Studies', category: 'renovation' },
  { url: '/images/service-design.jpg', caption: 'Photorealistic 3D Facade Rendering for Luxury Residence', category: 'exterior' },
  { url: '/images/service-interiors.jpg', caption: 'Bespoke Dining Suite with Handcrafted Chandelier', category: 'interior' },
  { url: '/images/service-construction.jpg', caption: 'Precision Masonry & Reinforced Structural Columns', category: 'construction' },
];

export default function AdminGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCat, setActiveCat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [previewModalImg, setPreviewModalImg] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  // New Image Form state
  const [newImage, setNewImage] = useState({
    url: '',
    caption: '',
    category: 'exterior',
  });
  const [adding, setAdding] = useState(false);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getGallery();
      if (res.data?.success && res.data.data?.length > 0) {
        setImages(res.data.data);
      } else {
        setImages(samplePresets.map((p, idx) => ({ ...p, _id: `preset-${idx + 1}` })));
      }
    } catch {
      setImages(samplePresets.map((p, idx) => ({ ...p, _id: `preset-${idx + 1}` })));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // Compute category statistics
  const stats = useMemo(() => {
    const total = images.length;
    const exterior = images.filter((img) => img.category === 'exterior').length;
    const interior = images.filter((img) => img.category === 'interior').length;
    const construction = images.filter((img) => img.category === 'construction').length;
    const renovation = images.filter((img) => img.category === 'renovation').length;
    return { total, exterior, interior, construction, renovation };
  }, [images]);

  const categories = [
    { id: 'all', label: 'All Exhibits', count: stats.total },
    { id: 'exterior', label: 'Exterior', count: stats.exterior },
    { id: 'interior', label: 'Interior', count: stats.interior },
    { id: 'construction', label: 'Construction', count: stats.construction },
    { id: 'renovation', label: 'Renovation', count: stats.renovation },
  ];

  const filteredImages = useMemo(() => {
    return images.filter((img) => {
      const matchesCat = activeCat === 'all' || img.category === activeCat;
      const matchesSearch =
        !searchQuery ||
        (img.caption && img.caption.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (img.url && img.url.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [images, activeCat, searchQuery]);

  const handleAddImage = async (e) => {
    e.preventDefault();
    if (!newImage.url.trim()) {
      toast.error('Image URL is required');
      return;
    }

    setAdding(true);
    try {
      const res = await adminApi.uploadImage(newImage);
      toast.success('Gallery photograph published');
      setImages((prev) => [res.data?.data || { ...newImage, _id: Date.now().toString() }, ...prev]);
      setNewImage({ url: '', caption: '', category: 'exterior' });
      setModalOpen(false);
    } catch {
      setImages((prev) => [{ ...newImage, _id: Date.now().toString() }, ...prev]);
      setNewImage({ url: '', caption: '', category: 'exterior' });
      toast.success('Gallery photograph published (Demo)');
      setModalOpen(false);
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this photograph from the visual gallery?')) return;
    try {
      await adminApi.deleteImage(id);
      toast.success('Exhibit removed from gallery');
      setImages((prev) => prev.filter((img) => img._id !== id));
    } catch {
      toast.success('Exhibit removed (Demo)');
      setImages((prev) => prev.filter((img) => img._id !== id));
    }
  };

  const handleCopyUrl = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast.success('Image URL copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSelectPreset = (preset) => {
    setNewImage({
      url: preset.url,
      caption: preset.caption,
      category: preset.category,
    });
  };

  return (
    <div className="admin-gallery-root">
      <SeoMeta title="Manage Visual Gallery — Admin CMS" />

      {/* 1. Page Header (Matching Reference Screen 6) */}
      <div className="admin-page-hero">
        <div className="admin-page-header-text">
          <div className="admin-eyebrow">
            <Sparkles size={14} className="text-gold" />
            <span>VISUAL CURATION</span>
          </div>
          <h1 className="admin-page-title">Gallery &amp; Media</h1>
          <p className="admin-page-subtitle">
            Manage project images, architectural photography, and visual archives.
          </p>
        </div>

        <div className="admin-header-actions">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="btn-admin-primary"
          >
            <PlusCircle size={16} />
            <span>Add Photograph</span>
          </button>
        </div>
      </div>

      {/* 2. Metric Chips Row */}
      <div className="admin-stats-grid">
        <div className="stat-pill-card active-total">
          <div className="stat-icon-wrap gold">
            <Layers size={18} />
          </div>
          <div className="stat-info">
            <span className="stat-count">{stats.total}</span>
            <span className="stat-name">Total Exhibits</span>
          </div>
        </div>

        <div className="stat-pill-card">
          <div className="stat-icon-wrap blue">
            <Home size={18} />
          </div>
          <div className="stat-info">
            <span className="stat-count">{stats.exterior}</span>
            <span className="stat-name">Exterior</span>
          </div>
        </div>

        <div className="stat-pill-card">
          <div className="stat-icon-wrap amber">
            <Sparkles size={18} />
          </div>
          <div className="stat-info">
            <span className="stat-count">{stats.interior}</span>
            <span className="stat-name">Interiors</span>
          </div>
        </div>

        <div className="stat-pill-card">
          <div className="stat-icon-wrap cyan">
            <Hammer size={18} />
          </div>
          <div className="stat-info">
            <span className="stat-count">{stats.construction}</span>
            <span className="stat-name">Construction</span>
          </div>
        </div>

        <div className="stat-pill-card">
          <div className="stat-icon-wrap emerald">
            <RefreshCw size={18} />
          </div>
          <div className="stat-info">
            <span className="stat-count">{stats.renovation}</span>
            <span className="stat-name">Renovation</span>
          </div>
        </div>
      </div>

      {/* 3. Controls Bar: Category Pills + Search Box */}
      <div className="admin-controls-card">
        <div className="admin-filter-tabs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`admin-filter-btn ${activeCat === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCat(cat.id)}
            >
              <span>{cat.label}</span>
              <span className="filter-count-badge">{cat.count}</span>
            </button>
          ))}
        </div>

        <div className="admin-controls-right">
          <div className="admin-search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search by caption or URL..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="admin-search-input-field"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="search-clear-btn"
                title="Clear Search"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 4. Gallery Grid */}
      <div className="gallery-display-wrapper">
        {loading ? (
          <div className="admin-empty-state">
            <div className="admin-loading-spinner" />
            <p>Loading curated gallery photography...</p>
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="admin-empty-state">
            <ImageIcon size={44} className="empty-icon text-gold" />
            <h3>No Photographs Found</h3>
            <p>No gallery exhibits match your current filter or search criteria.</p>
            <button
              type="button"
              className="btn-admin-primary"
              style={{ marginTop: '1rem' }}
              onClick={() => {
                setActiveCat('all');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="gallery-cards-grid">
            {filteredImages.map((item) => (
              <div key={item._id} className="gallery-card-item">
                <div className="g-card-media-wrap">
                  <img
                    src={item.url}
                    alt={item.caption || 'Gallery Exhibit'}
                    className="g-card-img"
                    onError={(e) => {
                      e.target.src = '/images/hero-villa.jpg';
                    }}
                  />
                  <div className="g-card-top-tags">
                    <span className={`cat-chip cat-${item.category || 'exterior'}`}>
                      {(item.category || 'EXHIBIT').toUpperCase()}
                    </span>
                  </div>

                  {/* Hover Actions Toolbar */}
                  <div className="g-card-hover-actions">
                    <button
                      type="button"
                      className="g-action-btn"
                      onClick={() => setPreviewModalImg(item)}
                      title="Enlarge photograph"
                    >
                      <Maximize2 size={16} />
                    </button>
                    <button
                      type="button"
                      className="g-action-btn"
                      onClick={() => handleCopyUrl(item.url, item._id)}
                      title="Copy Image URL"
                    >
                      {copiedId === item._id ? <Check size={16} className="text-emerald" /> : <Copy size={16} />}
                    </button>
                    <button
                      type="button"
                      className="g-action-btn btn-danger"
                      onClick={() => handleDelete(item._id)}
                      title="Delete photograph"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="g-card-footer">
                  <p className="g-card-caption" title={item.caption}>
                    {item.caption || 'Bespoke architectural capture'}
                  </p>
                  <span className="g-card-url-sub" title={item.url}>
                    {item.url}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. Add Photograph Modal */}
      {modalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="admin-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div className="modal-title-group">
                <div className="modal-icon-badge">
                  <PlusCircle size={20} className="text-gold" />
                </div>
                <div>
                  <h3 className="modal-heading">Add Gallery Photograph</h3>
                  <p className="modal-subheading">Publish high-resolution architectural imagery to the public gallery.</p>
                </div>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddImage} className="admin-modal-form">
              {/* Image Preview Window */}
              {newImage.url ? (
                <div className="modal-preview-box">
                  <img
                    src={newImage.url}
                    alt="Preview"
                    className="modal-preview-img"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <span className="preview-label">Live Preview</span>
                </div>
              ) : (
                <div className="modal-preview-placeholder">
                  <ImageIcon size={32} className="text-gold" style={{ opacity: 0.6 }} />
                  <span>Enter image path or select a preset to preview</span>
                </div>
              )}

              {/* Sample Presets Quick-Select */}
              <div className="form-group-wrap">
                <label className="form-field-label">Quick Sample Presets</label>
                <div className="preset-buttons-row">
                  {samplePresets.slice(0, 4).map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="preset-chip-btn"
                      onClick={() => handleSelectPreset(preset)}
                    >
                      {preset.category.toUpperCase()} • {preset.caption.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group-wrap">
                <label className="form-field-label required">Image Path or URL</label>
                <input
                  type="text"
                  placeholder="/images/hero-villa.jpg or https://..."
                  className="form-luxury-input"
                  value={newImage.url}
                  onChange={(e) => setNewImage({ ...newImage, url: e.target.value })}
                  required
                />
              </div>

              <div className="form-group-wrap">
                <label className="form-field-label">Caption / Architectural Description</label>
                <input
                  type="text"
                  placeholder="e.g. Master Suite Fluted Acoustic Paneling"
                  className="form-luxury-input"
                  value={newImage.caption}
                  onChange={(e) => setNewImage({ ...newImage, caption: e.target.value })}
                />
              </div>

              <div className="form-group-wrap">
                <label className="form-field-label">Gallery Category</label>
                <select
                  className="form-luxury-select"
                  value={newImage.category}
                  onChange={(e) => setNewImage({ ...newImage, category: e.target.value })}
                >
                  <option value="exterior">Exterior Architecture</option>
                  <option value="interior">Interior Sanctuaries</option>
                  <option value="construction">Structural & Civil Construction</option>
                  <option value="renovation">Renovation & Restorations</option>
                </select>
              </div>

              <div className="modal-actions-row">
                <button
                  type="button"
                  className="btn-admin-cancel"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={adding}
                  className="btn-admin-primary"
                >
                  {adding ? 'Publishing...' : 'Publish Photograph'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. Lightbox Preview Modal */}
      {previewModalImg && (
        <div className="admin-modal-backdrop" onClick={() => setPreviewModalImg(null)}>
          <div className="admin-lightbox-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={() => setPreviewModalImg(null)}
            >
              <X size={22} />
            </button>
            <img
              src={previewModalImg.url}
              alt={previewModalImg.caption}
              className="lightbox-large-img"
            />
            <div className="lightbox-info-bar">
              <div>
                <span className={`cat-chip cat-${previewModalImg.category || 'exterior'}`} style={{ marginBottom: '0.4rem', display: 'inline-block' }}>
                  {(previewModalImg.category || 'EXHIBIT').toUpperCase()}
                </span>
                <h4 style={{ margin: 0, color: '#F7F5F0', fontSize: '1.05rem', fontWeight: 600 }}>
                  {previewModalImg.caption || 'Archived Photograph'}
                </h4>
              </div>
              <button
                type="button"
                className="btn-admin-preview"
                onClick={() => handleCopyUrl(previewModalImg.url, previewModalImg._id)}
              >
                <Copy size={15} />
                <span>Copy URL</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .admin-gallery-root {
          max-width: 1400px;
          margin: 0 auto;
        }

        /* 1. Page Hero */
        .admin-page-hero {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
          padding-bottom: 0.5rem;
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
          padding: 0.65rem 1.25rem;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(234, 175, 53, 0.3);
        }

        .btn-admin-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(234, 175, 53, 0.45);
          filter: brightness(1.05);
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

        /* 2. Metric Chips Grid */
        .admin-stats-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1rem;
          margin: 2rem 0 1.5rem;
        }

        .stat-pill-card {
          background: #FFFFFF;
          border: 1px solid #E5E0D5;
          border-radius: 14px;
          padding: 0.95rem 1.15rem;
          display: flex;
          align-items: center;
          gap: 0.85rem;
          box-shadow: 0 2px 10px rgba(7, 23, 43, 0.03);
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s;
        }

        .stat-pill-card:hover {
          transform: translateY(-2px);
          border-color: #D6CFC3;
          box-shadow: 0 6px 18px rgba(7, 23, 43, 0.06);
        }

        .stat-icon-wrap {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .stat-icon-wrap.gold {
          background: rgba(234, 175, 53, 0.15);
          color: #EAAF35;
          border: 1px solid rgba(234, 175, 53, 0.3);
        }

        .stat-icon-wrap.blue {
          background: rgba(59, 130, 246, 0.15);
          color: #60A5FA;
          border: 1px solid rgba(59, 130, 246, 0.3);
        }

        .stat-icon-wrap.amber {
          background: rgba(245, 158, 11, 0.15);
          color: #FBBF24;
          border: 1px solid rgba(245, 158, 11, 0.3);
        }

        .stat-icon-wrap.cyan {
          background: rgba(6, 182, 212, 0.15);
          color: #22D3EE;
          border: 1px solid rgba(6, 182, 212, 0.3);
        }

        .stat-icon-wrap.emerald {
          background: rgba(16, 185, 129, 0.15);
          color: #34D399;
          border: 1px solid rgba(16, 185, 129, 0.3);
        }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-count {
          font-family: var(--font-serif);
          font-size: 1.45rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.1;
        }

        .stat-name {
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-top: 0.15rem;
        }

        /* 3. Controls Card */
        .admin-controls-card {
          background: #FFFFFF;
          border: 1px solid #E5E0D5;
          border-radius: 14px;
          padding: 0.75rem 1.15rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.25rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 2px 10px rgba(7, 23, 43, 0.03);
          flex-wrap: wrap;
        }

        .admin-filter-tabs {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          overflow-x: auto;
        }

        .admin-filter-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.45rem 0.95rem;
          border-radius: 9999px;
          background: #FAF7F0;
          border: 1px solid #E5E0D5;
          color: var(--text-secondary);
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .admin-filter-btn:hover {
          color: var(--text-primary);
          border-color: #D6CFC3;
        }

        .admin-filter-btn.active {
          color: #07172B;
          background: #EAAF35;
          border-color: #EAAF35;
          font-weight: 700;
          box-shadow: 0 2px 8px rgba(234, 175, 53, 0.3);
        }

        .filter-count-badge {
          background: rgba(0, 0, 0, 0.1);
          padding: 0.12rem 0.45rem;
          border-radius: 9999px;
          font-size: 0.7rem;
        }

        .admin-filter-btn.active .filter-count-badge {
          background: rgba(7, 23, 43, 0.18);
          color: #07172B;
        }

        .admin-controls-right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .admin-search-box {
          position: relative;
          display: flex;
          align-items: center;
          width: 290px;
        }

        .search-icon {
          position: absolute;
          left: 0.85rem;
          color: #94A3B8;
          pointer-events: none;
        }

        .admin-search-input-field {
          width: 100%;
          background: #FAF7F0;
          border: 1px solid #E5E0D5;
          border-radius: 9999px;
          padding: 0.5rem 2rem 0.5rem 2.25rem;
          color: var(--text-primary);
          font-size: 0.82rem;
          outline: none;
          transition: all 0.2s;
        }

        .admin-search-input-field:focus {
          border-color: #EAAF35;
          background: #FFFFFF;
          box-shadow: 0 0 0 3px rgba(234, 175, 53, 0.18);
        }

        .search-clear-btn {
          position: absolute;
          right: 0.75rem;
          background: transparent;
          border: none;
          color: #94A3B8;
          cursor: pointer;
        }

        /* 4. Gallery Cards Grid */
        .gallery-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .gallery-card-item {
          background: #FFFFFF;
          border: 1px solid #E5E0D5;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(7, 23, 43, 0.04);
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
          display: flex;
          flex-direction: column;
        }

        .gallery-card-item:hover {
          transform: translateY(-3px);
          border-color: #D6CFC3;
          box-shadow: 0 8px 24px rgba(7, 23, 43, 0.08);
        }

        .g-card-media-wrap {
          position: relative;
          width: 100%;
          height: 190px;
          overflow: hidden;
          background: #FAF7F0;
        }

        .g-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .gallery-card-item:hover .g-card-img {
          transform: scale(1.05);
        }

        .g-card-top-tags {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          z-index: 2;
        }

        .cat-chip {
          display: inline-block;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 0.25rem 0.65rem;
          border-radius: 6px;
          backdrop-filter: blur(8px);
        }

        .cat-chip.cat-exterior {
          background: rgba(7, 23, 43, 0.88);
          color: #EAAF35;
          border: 1px solid rgba(234, 175, 53, 0.5);
        }

        .cat-chip.cat-interior {
          background: rgba(7, 23, 43, 0.88);
          color: #FBBF24;
          border: 1px solid rgba(245, 158, 11, 0.5);
        }

        .cat-chip.cat-construction {
          background: rgba(7, 23, 43, 0.88);
          color: #38BDF8;
          border: 1px solid rgba(56, 189, 248, 0.5);
        }

        .cat-chip.cat-renovation {
          background: rgba(7, 23, 43, 0.88);
          color: #34D399;
          border: 1px solid rgba(52, 211, 153, 0.5);
        }

        .g-card-hover-actions {
          position: absolute;
          inset: 0;
          background: rgba(7, 23, 43, 0.6);
          backdrop-filter: blur(2px);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
          opacity: 0;
          transition: opacity 0.2s ease;
          z-index: 3;
        }

        .gallery-card-item:hover .g-card-hover-actions {
          opacity: 1;
        }

        .g-action-btn {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: #FFFFFF;
          border: 1px solid #E5E0D5;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .g-action-btn:hover {
          background: #EAAF35;
          border-color: #EAAF35;
          color: #07172B;
          transform: translateY(-2px);
        }

        .g-action-btn.btn-danger:hover {
          background: #EF4444;
          border-color: #EF4444;
          color: #FFF;
        }

        .g-card-footer {
          padding: 0.95rem 1.15rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          background: #FFFFFF;
          border-top: 1px solid #EFEAE0;
        }

        .g-card-caption {
          font-size: 0.86rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .g-card-url-sub {
          font-size: 0.72rem;
          color: var(--text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* 5. Modals */
        .admin-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(4, 11, 22, 0.8);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1.5rem;
        }

        .admin-modal-dialog {
          background: #0B1D34;
          border: 1px solid rgba(234, 175, 53, 0.35);
          border-radius: 16px;
          width: 100%;
          max-width: 580px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
        }

        .admin-modal-header {
          padding: 1.5rem 1.75rem;
          border-bottom: 1px solid rgba(234, 175, 53, 0.15);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .modal-title-group {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .modal-icon-badge {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: rgba(234, 175, 53, 0.15);
          border: 1px solid rgba(234, 175, 53, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-heading {
          font-family: 'Cinzel', Georgia, serif;
          font-size: 1.25rem;
          color: #FFFFFF;
          margin: 0;
        }

        .modal-subheading {
          font-size: 0.78rem;
          color: #94A3B8;
          margin: 0.2rem 0 0;
        }

        .modal-close-btn {
          background: transparent;
          border: none;
          color: #94A3B8;
          cursor: pointer;
          padding: 0.4rem;
          border-radius: 6px;
          transition: color 0.2s;
        }

        .modal-close-btn:hover {
          color: #FFF;
        }

        .admin-modal-form {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .modal-preview-box {
          position: relative;
          width: 100%;
          height: 180px;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid rgba(234, 175, 53, 0.3);
        }

        .modal-preview-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .preview-label {
          position: absolute;
          bottom: 0.5rem;
          right: 0.5rem;
          background: rgba(7, 23, 43, 0.85);
          color: #EAAF35;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
        }

        .modal-preview-placeholder {
          height: 130px;
          border: 2px dashed rgba(234, 175, 53, 0.25);
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          color: #94A3B8;
          font-size: 0.82rem;
          background: rgba(6, 17, 33, 0.4);
        }

        .preset-buttons-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-top: 0.35rem;
        }

        .preset-chip-btn {
          background: rgba(16, 40, 68, 0.6);
          border: 1px solid rgba(234, 175, 53, 0.2);
          color: #CBD5E1;
          font-size: 0.72rem;
          padding: 0.35rem 0.65rem;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .preset-chip-btn:hover {
          background: rgba(234, 175, 53, 0.15);
          border-color: #EAAF35;
          color: #EAAF35;
        }

        .form-group-wrap {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .form-field-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: #CBD5E1;
        }

        .form-field-label.required::after {
          content: ' *';
          color: #EAAF35;
        }

        .form-luxury-input,
        .form-luxury-select {
          background: rgba(6, 17, 33, 0.7);
          border: 1px solid rgba(234, 175, 53, 0.25);
          border-radius: 8px;
          padding: 0.65rem 0.95rem;
          color: #FFFFFF;
          font-size: 0.88rem;
          outline: none;
          transition: all 0.2s;
          width: 100%;
        }

        .form-luxury-input:focus,
        .form-luxury-select:focus {
          border-color: #EAAF35;
          box-shadow: 0 0 0 2px rgba(234, 175, 53, 0.2);
        }

        .modal-actions-row {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.85rem;
          margin-top: 0.5rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .btn-admin-cancel {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #94A3B8;
          padding: 0.65rem 1.25rem;
          border-radius: 8px;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-admin-cancel:hover {
          color: #FFF;
          border-color: rgba(255, 255, 255, 0.3);
        }

        /* Lightbox Dialog */
        .admin-lightbox-dialog {
          position: relative;
          max-width: 900px;
          width: 100%;
          background: #07172B;
          border: 1px solid rgba(234, 175, 53, 0.4);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8);
        }

        .lightbox-close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #FFF;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
        }

        .lightbox-large-img {
          width: 100%;
          max-height: 70vh;
          object-fit: contain;
          background: #040A14;
        }

        .lightbox-info-bar {
          padding: 1.25rem 1.75rem;
          background: #0B1D34;
          border-top: 1px solid rgba(234, 175, 53, 0.2);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .admin-empty-state {
          padding: 4rem 2rem;
          text-align: center;
          background: #0B1D34;
          border: 1px dashed rgba(234, 175, 53, 0.3);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .admin-empty-state h3 {
          font-family: 'Cinzel', Georgia, serif;
          color: #FFF;
          margin: 1rem 0 0.4rem;
        }

        .admin-empty-state p {
          color: #94A3B8;
          font-size: 0.9rem;
          max-width: 450px;
          margin: 0;
        }

        @media (max-width: 1200px) {
          .gallery-cards-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .admin-stats-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 850px) {
          .gallery-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .admin-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .admin-controls-card {
            flex-direction: column;
            align-items: stretch;
          }
          .admin-search-box {
            width: 100%;
          }
        }

        @media (max-width: 550px) {
          .gallery-cards-grid {
            grid-template-columns: 1fr;
          }
          .admin-stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
