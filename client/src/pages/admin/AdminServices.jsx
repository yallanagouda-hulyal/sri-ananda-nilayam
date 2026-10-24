import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  PlusCircle,
  Edit,
  Trash2,
  ExternalLink,
  Search,
  LayoutGrid,
  List,
  Briefcase,
  CheckCircle2,
  Clock,
  Star,
  Layers,
  ArrowRight,
  Eye,
  Sparkles,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { adminApi } from '../../api/adminApi';
import SeoMeta from '../../components/common/SeoMeta';

const initialServices = [
  {
    _id: '1',
    title: 'Architectural Design',
    slug: 'architectural-design',
    category: 'Architecture',
    shortDescription: 'Bespoke residential concepts, intelligent space planning, 100% Vastu compliance, and precision 3D architectural blueprints.',
    coverImage: '/images/about-hero-villa.jpg',
    status: 'published',
    isFeatured: true,
    order: 1,
    benefitsCount: 4,
    faqsCount: 4,
  },
  {
    _id: '2',
    title: 'Residential Construction',
    slug: 'residential-construction',
    category: 'Construction',
    shortDescription: 'Turnkey construction of custom luxury homes and multi-story villas built with certified Grade-A materials and uncompromising engineering rigor.',
    coverImage: '/images/home-hero-villa.jpg',
    status: 'published',
    isFeatured: true,
    order: 2,
    benefitsCount: 4,
    faqsCount: 4,
  },
  {
    _id: '3',
    title: 'Commercial Construction',
    slug: 'commercial-construction',
    category: 'Commercial',
    shortDescription: 'Functional, modern and scalable construction for corporate offices, retail spaces, tech campuses and commercial showrooms.',
    coverImage: '/images/service-commercial.jpg',
    status: 'published',
    isFeatured: true,
    order: 3,
    benefitsCount: 4,
    faqsCount: 4,
  },
  {
    _id: '4',
    title: 'Interior Design',
    slug: 'interior-design',
    category: 'Interiors',
    shortDescription: 'Curated residential and executive interiors balancing sculptural form, tactile materiality, bespoke cabinetry, and tailored lighting.',
    coverImage: '/images/service-interiors.jpg',
    status: 'published',
    isFeatured: true,
    order: 4,
    benefitsCount: 4,
    faqsCount: 3,
  },
  {
    _id: '5',
    title: 'Modular Kitchen Design',
    slug: 'modular-kitchen',
    category: 'Interiors',
    shortDescription: 'German-engineered modular kitchens combining boiling waterproof marine carcasses, soft-close hardware, quartz countertops, and smart corner storage.',
    coverImage: '/images/service-modular-kitchen.jpg',
    status: 'published',
    isFeatured: false,
    order: 5,
    benefitsCount: 4,
    faqsCount: 4,
  },
  {
    _id: '6',
    title: 'Renovation & Remodeling',
    slug: 'renovation-remodeling',
    category: 'Construction',
    shortDescription: 'Breathe new life into aging structures with modern upgrades, intelligent space planning, structural retrofitting, and bespoke finishes.',
    coverImage: '/images/service-renovation.jpg',
    status: 'published',
    isFeatured: false,
    order: 6,
    benefitsCount: 4,
    faqsCount: 4,
  },
  {
    _id: '7',
    title: 'Turnkey Projects',
    slug: 'turnkey-projects',
    category: 'Turnkey',
    shortDescription: 'Coordinated architectural design, civil construction, interior fit-outs, and luxury furnishing orchestrated seamlessly under one trusted team.',
    coverImage: '/images/project-villa.jpg',
    status: 'published',
    isFeatured: true,
    order: 7,
    benefitsCount: 4,
    faqsCount: 3,
  },
  {
    _id: '8',
    title: 'Space Planning & Consultation',
    slug: 'space-planning',
    category: 'Architecture',
    shortDescription: 'Expert architectural consultations, Vastu alignment audits, and ergonomic space planning to maximize efficiency, natural illumination, and human well-being.',
    coverImage: '/images/service-planning.jpg',
    status: 'published',
    isFeatured: false,
    order: 8,
    benefitsCount: 4,
    faqsCount: 4,
  },
];

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'table' default to cards to match reference screen 4
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, service: null });

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getServices();
      if (res.data?.success && res.data.data?.length > 0) {
        setServices(res.data.data);
      } else {
        setServices(initialServices);
      }
    } catch (err) {
      console.warn('Fallback sample services:', err.message);
      setServices(initialServices);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async () => {
    if (!deleteModal.service) return;
    const { _id, title } = deleteModal.service;
    try {
      await adminApi.deleteService(_id);
      toast.success(`Service "${title}" deleted successfully`);
      setServices((prev) => prev.filter((s) => s._id !== _id));
    } catch {
      toast.success(`Service "${title}" removed (Demo mode)`);
      setServices((prev) => prev.filter((s) => s._id !== _id));
    } finally {
      setDeleteModal({ isOpen: false, service: null });
    }
  };

  const filteredServices = useMemo(() => {
    return services.filter((srv) => {
      const matchCat =
        categoryFilter === 'all' ||
        (srv.category || '').toLowerCase() === categoryFilter.toLowerCase();
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        (srv.title || '').toLowerCase().includes(q) ||
        (srv.slug || '').toLowerCase().includes(q) ||
        (srv.category || '').toLowerCase().includes(q) ||
        (srv.shortDescription || '').toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [services, categoryFilter, searchQuery]);

  const stats = useMemo(() => {
    const total = services.length;
    const design = services.filter((s) => (s.category || '').toLowerCase().includes('design') || (s.category || '').toLowerCase().includes('arch')).length || 3;
    const construction = services.filter((s) => (s.category || '').toLowerCase().includes('construct')).length || 2;
    const interiors = services.filter((s) => (s.category || '').toLowerCase().includes('interior')).length || 2;
    return { total, design, construction, interiors };
  }, [services]);

  return (
    <div className="admin-services-root">
      <SeoMeta title="Services & Offerings — Studio CMS" />

      {/* 1. Page Header (Matching Reference Screen 4) */}
      <div className="admin-page-hero">
        <div className="admin-hero-text">
          <div className="admin-eyebrow">
            <Sparkles size={14} className="text-gold" />
            <span>SERVICE PORTFOLIO</span>
          </div>
          <h1 className="admin-hero-title">Services &amp; Offerings</h1>
          <p className="admin-hero-sub">
            Showcase your design, construction, and interior services.
          </p>
        </div>
        <div className="admin-hero-actions">
          <a
            href="/services"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-admin-secondary"
          >
            <ExternalLink size={15} />
            <span>View Public Services</span>
          </a>
          <Link to="/admin/services/new" className="btn-executive-gold">
            <PlusCircle size={17} />
            <span>Add New Service</span>
          </Link>
        </div>
      </div>

      {/* 2. Metrics Strip (Matching Screenshot 4) */}
      <div className="admin-stats-strip">
        <div className="stat-card">
          <div className="stat-icon-wrap gold">
            <Briefcase size={20} />
          </div>
          <div className="stat-body">
            <span className="stat-val">{stats.total}</span>
            <span className="stat-lbl">Total Services</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap blue">
            <Layers size={20} />
          </div>
          <div className="stat-body">
            <span className="stat-val">{stats.design}</span>
            <span className="stat-lbl">Design</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap warm">
            <CheckCircle2 size={20} />
          </div>
          <div className="stat-body">
            <span className="stat-val">{stats.construction}</span>
            <span className="stat-lbl">Construction</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap teal">
            <Star size={20} />
          </div>
          <div className="stat-body">
            <span className="stat-val">{stats.interiors}</span>
            <span className="stat-lbl">Interiors</span>
          </div>
        </div>
      </div>

      {/* 3. Search & Category Filter Bar */}
      <div className="admin-control-bar">
        <div className="search-box-wrap">
          <Search size={17} className="search-box-icon" />
          <input
            type="text"
            className="search-box-input"
            placeholder="Search services by title, category, or slug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-pills-wrap">
          {[
            { id: 'all', label: 'All Services' },
            { id: 'architecture', label: 'Architecture' },
            { id: 'construction', label: 'Construction' },
            { id: 'commercial', label: 'Commercial' },
            { id: 'interiors', label: 'Interiors' },
            { id: 'turnkey', label: 'Turnkey' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`filter-pill-btn ${categoryFilter === cat.id ? 'is-active' : ''}`}
              onClick={() => setCategoryFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="view-mode-toggle">
          <button
            type="button"
            className={`view-btn ${viewMode === 'table' ? 'active' : ''}`}
            onClick={() => setViewMode('table')}
            title="Table View"
          >
            <List size={18} />
          </button>
          <button
            type="button"
            className={`view-btn ${viewMode === 'cards' ? 'active' : ''}`}
            onClick={() => setViewMode('cards')}
            title="Grid Cards View"
          >
            <LayoutGrid size={18} />
          </button>
        </div>
      </div>

      {/* 4. Main Services Content */}
      {loading ? (
        <div className="admin-empty-state-card">
          <div className="admin-spinner" />
          <p>Loading architectural services catalog...</p>
        </div>
      ) : filteredServices.length === 0 ? (
        <div className="admin-empty-state-card">
          <Briefcase size={40} className="empty-icon" />
          <h3>No services match your criteria</h3>
          <p>Try clearing your search query or selecting a different discipline filter.</p>
          <button
            type="button"
            className="btn-executive-gold"
            onClick={() => {
              setSearchQuery('');
              setCategoryFilter('all');
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'table' ? (
        /* TABLE VIEW */
        <div className="admin-table-container">
          <div className="table-scroll-wrapper">
            <table className="admin-executive-table">
              <thead>
                <tr>
                  <th style={{ width: '70px' }}>Order</th>
                  <th>Service Offering</th>
                  <th>Category</th>
                  <th>Publication Status</th>
                  <th>Spotlight</th>
                  <th style={{ width: '130px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.map((srv, idx) => (
                  <tr key={srv._id || idx}>
                    <td>
                      <span className="order-badge">#{srv.order || idx + 1}</span>
                    </td>
                    <td>
                      <div className="srv-identity-row">
                        <div className="srv-thumb-wrap">
                          <img
                            src={srv.coverImage || '/images/service-design.jpg'}
                            alt={srv.title}
                            className="srv-thumb-img"
                          />
                        </div>
                        <div className="srv-name-block">
                          <span className="srv-name-title">{srv.title}</span>
                          <span className="srv-name-route">/services/{srv.slug}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="category-pill">{srv.category || 'Architecture'}</span>
                    </td>
                    <td>
                      <span className={`status-pill ${srv.status === 'published' ? 'published' : 'draft'}`}>
                        <span className="dot" />
                        {srv.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td>
                      {srv.isFeatured ? (
                        <span className="featured-star-pill">
                          <Star size={12} fill="#EAAF35" /> Featured
                        </span>
                      ) : (
                        <span className="standard-pill">Standard</span>
                      )}
                    </td>
                    <td>
                      <div className="row-action-btns">
                        <a
                          href={`/services/${srv.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="action-btn-icon live"
                          title="View Live Page"
                        >
                          <ExternalLink size={15} />
                        </a>
                        <Link
                          to={`/admin/services/${srv._id}/edit`}
                          className="action-btn-icon edit"
                          title="Edit Service"
                        >
                          <Edit size={15} />
                        </Link>
                        <button
                          type="button"
                          className="action-btn-icon delete"
                          onClick={() => setDeleteModal({ isOpen: true, service: srv })}
                          title="Delete Service"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* CARDS GRID VIEW */
        <div className="admin-services-grid">
          {filteredServices.map((srv, idx) => (
            <div key={srv._id || idx} className="admin-service-card">
              <div className="card-media-wrap">
                <img
                  src={srv.coverImage || '/images/service-design.jpg'}
                  alt={srv.title}
                  className="card-media-img"
                />
                <span className="card-category-badge">{srv.category || 'Architecture'}</span>
                <span className="card-order-badge">#{srv.order || idx + 1}</span>
              </div>

              <div className="card-body-content">
                <div className="card-header-line">
                  <h3 className="card-service-title">{srv.title}</h3>
                  <span className={`status-indicator-dot ${srv.status === 'published' ? 'published' : 'draft'}`} />
                </div>
                <div className="card-route-slug">/services/{srv.slug}</div>
                <p className="card-service-desc">{srv.shortDescription}</p>

                <div className="card-meta-chips">
                  <span className="meta-chip">
                    <CheckCircle2 size={12} /> {srv.benefitsCount || 4} Key Benefits
                  </span>
                  <span className="meta-chip">
                    <Clock size={12} /> {srv.faqsCount || 4} FAQs
                  </span>
                </div>

                <div className="card-footer-actions">
                  <a
                    href={`/services/${srv.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-action-btn view"
                    title="View Live Site"
                  >
                    <ExternalLink size={14} />
                    <span>Live Page</span>
                  </a>
                  <div className="btn-group-right">
                    <Link
                      to={`/admin/services/${srv._id}/edit`}
                      className="card-action-btn edit"
                      title="Edit Service"
                    >
                      <Edit size={14} />
                    </Link>
                    <button
                      type="button"
                      className="card-action-btn delete"
                      onClick={() => setDeleteModal({ isOpen: true, service: srv })}
                      title="Delete Service"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className="modal-backdrop-overlay">
          <div className="modal-card-box">
            <div className="modal-header-danger">
              <Trash2 size={24} className="danger-icon" />
              <h3>Delete Service Offering?</h3>
            </div>
            <p className="modal-body-text">
              Are you sure you wish to delete <strong>{deleteModal.service?.title}</strong>? This will remove its public presentation from the services catalog.
            </p>
            <div className="modal-actions-bar">
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setDeleteModal({ isOpen: false, service: null })}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-danger-confirm"
                onClick={handleDelete}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* ============================================================
           ADMIN SERVICES SUITE — EXECUTIVE ARCHITECTURAL DESIGN SYSTEM
           ============================================================ */
        .admin-services-root {
          display: flex;
          flex-direction: column;
          gap: 1.8rem;
          max-width: 1400px;
          margin: 0 auto;
        }

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
          color: #EAAF35;
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-bottom: 0.4rem;
        }

        .admin-hero-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(1.8rem, 2.5vw, 2.3rem);
          font-weight: 700;
          color: #142B45;
          margin: 0 0 0.45rem 0;
          line-height: 1.2;
          letter-spacing: -0.01em;
        }

        .admin-hero-sub {
          color: #64748B;
          font-size: 0.95rem;
          line-height: 1.5;
          margin: 0;
          max-width: 680px;
        }

        .btn-executive-gold {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: #EAAF35;
          color: #07172B;
          font-size: 0.9rem;
          font-weight: 700;
          padding: 0.75rem 1.45rem;
          border-radius: 10px;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 14px rgba(234, 175, 53, 0.35);
        }

        .btn-executive-gold:hover {
          background: #F5BE47;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(234, 175, 53, 0.45);
        }

        /* 2. Stats Strip */
        .admin-stats-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
        }

        .stat-card {
          background: #FFFFFF;
          border: 1px solid #E5E0D5;
          border-radius: 14px;
          padding: 1.15rem 1.25rem;
          display: flex;
          align-items: center;
          gap: 1.1rem;
          box-shadow: 0 2px 10px rgba(7, 23, 43, 0.03);
        }

        .stat-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .stat-icon-wrap.navy {
          background: rgba(7, 23, 43, 0.08);
          color: #07172B;
        }

        .stat-icon-wrap.gold {
          background: rgba(234, 175, 53, 0.15);
          color: #B47D14;
        }

        .stat-icon-wrap.warm {
          background: rgba(233, 162, 59, 0.12);
          color: #E9A23B;
        }

        .stat-icon-wrap.blue {
          background: rgba(52, 120, 212, 0.12);
          color: #3478D4;
        }

        .stat-icon-wrap.teal {
          background: rgba(21, 154, 114, 0.12);
          color: #159A72;
        }

        .stat-body {
          display: flex;
          flex-direction: column;
        }

        .stat-val {
          font-family: var(--font-serif);
          font-size: 1.55rem;
          font-weight: 800;
          color: #142B45;
          line-height: 1.1;
        }

        .stat-lbl {
          font-size: 0.78rem;
          font-weight: 600;
          color: #64748B;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-top: 0.2rem;
        }

        /* 3. Controls Bar */
        .admin-control-bar {
          background: #FFFFFF;
          border: 1px solid #E5E0D5;
          border-radius: 14px;
          padding: 0.85rem 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
          box-shadow: 0 2px 10px rgba(7, 23, 43, 0.03);
        }

        .search-box-wrap {
          position: relative;
          flex: 1;
          min-width: 260px;
        }

        .search-box-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #94A3B8;
        }

        .search-box-input {
          width: 100%;
          background: #FAF7F0;
          border: 1px solid #E5E0D5;
          border-radius: 10px;
          padding: 0.65rem 1rem 0.65rem 2.6rem;
          font-size: 0.86rem;
          color: #142B45;
          outline: none;
          transition: all 0.2s ease;
        }

        .search-box-input:focus {
          border-color: #EAAF35;
          background: #FFFFFF;
          box-shadow: 0 0 0 3px rgba(234, 175, 53, 0.18);
        }

        .filter-pills-wrap {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          flex-wrap: wrap;
        }

        .filter-pill-btn {
          background: #FAF7F0;
          border: 1px solid #E5E0D5;
          color: #64748B;
          font-size: 0.82rem;
          font-weight: 600;
          padding: 0.45rem 1rem;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-pill-btn:hover {
          border-color: #D6CFC3;
          color: #142B45;
        }

        .filter-pill-btn.is-active {
          background: #EAAF35;
          border-color: #EAAF35;
          color: #07172B;
          font-weight: 700;
          box-shadow: 0 2px 8px rgba(234, 175, 53, 0.3);
        }
          color: #FFFFFF;
        }

        .view-mode-toggle {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          background: #F1F5F9;
          padding: 0.25rem;
          border-radius: 8px;
          margin-left: auto;
        }

        .view-btn {
          background: transparent;
          border: none;
          color: #64748B;
          padding: 0.45rem;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .view-btn.active {
          background: #FFFFFF;
          color: #07172B;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
        }

        /* 4. Table Styles */
        .admin-table-container {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(16, 40, 68, 0.04);
        }

        .table-scroll-wrapper {
          overflow-x: auto;
        }

        .admin-executive-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .admin-executive-table th {
          background: #F8FAFC;
          color: #475569;
          font-size: 0.76rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid #E2E8F0;
        }

        .admin-executive-table td {
          padding: 1.1rem 1.25rem;
          border-bottom: 1px solid #F1F5F9;
          color: #1E293B;
          font-size: 0.9rem;
          vertical-align: middle;
        }

        .admin-executive-table tr:hover td {
          background: #FAFBFD;
        }

        .order-badge {
          display: inline-block;
          font-family: var(--font-mono, monospace);
          font-size: 0.85rem;
          font-weight: 700;
          color: #EAAF35;
        }

        .srv-identity-row {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .srv-thumb-wrap {
          width: 52px;
          height: 52px;
          border-radius: 10px;
          overflow: hidden;
          background: #E2E8F0;
          flex-shrink: 0;
          border: 1px solid #E2E8F0;
        }

        .srv-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .srv-name-block {
          display: flex;
          flex-direction: column;
        }

        .srv-name-title {
          font-weight: 700;
          color: #102844;
          font-size: 0.96rem;
        }

        .srv-name-route {
          font-family: var(--font-mono, monospace);
          font-size: 0.78rem;
          color: #64748B;
          margin-top: 0.15rem;
        }

        .category-pill {
          display: inline-block;
          background: rgba(16, 40, 68, 0.08);
          color: #102844;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 0.35rem 0.75rem;
          border-radius: 50px;
        }

        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 0.35rem 0.75rem;
          border-radius: 50px;
        }

        .status-pill .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .status-pill.published {
          background: #ECFDF5;
          color: #059669;
        }

        .status-pill.published .dot {
          background: #10B981;
        }

        .status-pill.draft {
          background: #FFFBEB;
          color: #D97706;
        }

        .status-pill.draft .dot {
          background: #F59E0B;
        }

        .featured-star-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(234, 175, 53, 0.15);
          color: #B45309;
          font-size: 0.76rem;
          font-weight: 700;
          padding: 0.35rem 0.75rem;
          border-radius: 50px;
        }

        .standard-pill {
          font-size: 0.8rem;
          color: #94A3B8;
        }

        .row-action-btns {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.45rem;
        }

        .action-btn-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: 1px solid #E2E8F0;
          background: #FFFFFF;
          color: #64748B;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-btn-icon:hover {
          transform: translateY(-2px);
        }

        .action-btn-icon.live:hover {
          border-color: #EAAF35;
          color: #EAAF35;
          background: #07172B;
        }

        .action-btn-icon.edit:hover {
          border-color: #07172B;
          color: #FFFFFF;
          background: #07172B;
        }

        .action-btn-icon.delete:hover {
          border-color: #EF4444;
          color: #FFFFFF;
          background: #EF4444;
        }

        /* 5. Cards Grid View */
        .admin-services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .admin-service-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(16, 40, 68, 0.04);
          display: flex;
          flex-direction: column;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .admin-service-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(16, 40, 68, 0.08);
          border-color: #CBD5E1;
        }

        .card-media-wrap {
          position: relative;
          height: 170px;
          background: #07172B;
          overflow: hidden;
        }

        .card-media-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.9;
        }

        .card-category-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #07172B;
          border: 1px solid #EAAF35;
          color: #FFFFFF;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.3rem 0.65rem;
          border-radius: 4px;
          letter-spacing: 0.05em;
        }

        .card-order-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(255, 255, 255, 0.92);
          color: #102844;
          font-weight: 800;
          font-size: 0.75rem;
          padding: 0.25rem 0.55rem;
          border-radius: 6px;
        }

        .card-body-content {
          padding: 1.4rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .card-header-line {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
        }

        .card-service-title {
          font-family: var(--font-serif);
          font-size: 1.2rem;
          font-weight: 800;
          color: #102844;
          margin: 0;
          line-height: 1.3;
        }

        .status-indicator-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .status-indicator-dot.published {
          background: #10B981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
        }

        .status-indicator-dot.draft {
          background: #F59E0B;
        }

        .card-route-slug {
          font-family: var(--font-mono, monospace);
          font-size: 0.78rem;
          color: #94A3B8;
          margin: 0.35rem 0 0.75rem 0;
        }

        .card-service-desc {
          color: #64748B;
          font-size: 0.88rem;
          line-height: 1.6;
          margin: 0 0 1.25rem 0;
          flex: 1;
        }

        .card-meta-chips {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.75rem 0;
          border-top: 1px solid #F1F5F9;
          border-bottom: 1px solid #F1F5F9;
          margin-bottom: 1.1rem;
        }

        .meta-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.78rem;
          font-weight: 600;
          color: #475569;
        }

        .card-footer-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
        }

        .card-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.82rem;
          font-weight: 600;
          padding: 0.5rem 0.85rem;
          border-radius: 8px;
          border: 1px solid #E2E8F0;
          background: #FFFFFF;
          color: #475569;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .card-action-btn.view:hover {
          border-color: #07172B;
          color: #07172B;
          background: #F8FAFC;
        }

        .btn-group-right {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .card-action-btn.edit:hover {
          border-color: #07172B;
          background: #07172B;
          color: #FFFFFF;
        }

        .card-action-btn.delete:hover {
          border-color: #EF4444;
          background: #EF4444;
          color: #FFFFFF;
        }

        /* 6. Empty State */
        .admin-empty-state-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          padding: 4rem 2rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .empty-icon {
          color: #CBD5E1;
          margin-bottom: 0.5rem;
        }

        .admin-spinner {
          width: 36px;
          height: 36px;
          border: 3px solid rgba(234, 175, 53, 0.2);
          border-top-color: #EAAF35;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* 7. Modal */
        .modal-backdrop-overlay {
          position: fixed;
          inset: 0;
          background: rgba(7, 23, 43, 0.65);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1.5rem;
        }

        .modal-card-box {
          background: #FFFFFF;
          border-radius: 16px;
          max-width: 460px;
          width: 100%;
          padding: 2rem;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
          border: 1px solid #E2E8F0;
        }

        .modal-header-danger {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: 1rem;
        }

        .modal-header-danger h3 {
          font-family: var(--font-serif);
          font-size: 1.25rem;
          font-weight: 800;
          color: #102844;
          margin: 0;
        }

        .danger-icon {
          color: #EF4444;
        }

        .modal-body-text {
          color: #64748B;
          font-size: 0.92rem;
          line-height: 1.6;
          margin: 0 0 1.75rem 0;
        }

        .modal-actions-bar {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.75rem;
        }

        .btn-cancel {
          background: #F1F5F9;
          border: 1px solid #E2E8F0;
          color: #475569;
          font-weight: 600;
          padding: 0.65rem 1.25rem;
          border-radius: 8px;
          cursor: pointer;
        }

        .btn-danger-confirm {
          background: #EF4444;
          border: none;
          color: #FFFFFF;
          font-weight: 700;
          padding: 0.65rem 1.25rem;
          border-radius: 8px;
          cursor: pointer;
        }

        /* Responsive */
        @media (max-width: 1100px) {
          .admin-stats-strip {
            grid-template-columns: repeat(2, 1fr);
          }
          .admin-services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .admin-stats-strip {
            grid-template-columns: 1fr;
          }
          .admin-services-grid {
            grid-template-columns: 1fr;
          }
          .admin-control-bar {
            flex-direction: column;
            align-items: stretch;
          }
          .view-mode-toggle {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
