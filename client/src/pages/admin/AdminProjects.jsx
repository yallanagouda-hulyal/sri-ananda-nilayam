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
  MapPin,
  Building2,
  Layers,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { adminApi } from '../../api/adminApi';
import SeoMeta from '../../components/common/SeoMeta';

const initialProjectsData = [
  {
    _id: 'p1',
    title: 'The Solarium Luxury Villa',
    slug: 'solarium-luxury-villa',
    category: 'residential',
    location: 'Whitefield, Bengaluru',
    shortDescription:
      'A modern luxury villa with spacious living, landscaped exteriors, and premium interiors crafted for a contemporary lifestyle.',
    projectStatus: 'completed',
    status: 'published',
    isFeatured: true,
    coverImage: '/images/project-villa.jpg',
    completionDate: '2024',
  },
  {
    _id: 'p2',
    title: 'Aura Corporate Headquarters',
    slug: 'aura-corporate-headquarters',
    category: 'commercial',
    location: 'Outer Ring Road, Bengaluru',
    shortDescription:
      'A premium corporate office space with modern architecture, efficient planning and a professional work environment.',
    projectStatus: 'completed',
    status: 'published',
    isFeatured: true,
    coverImage: '/images/project-commercial.jpg',
    completionDate: '2023',
  },
  {
    _id: 'p3',
    title: 'Bespoke Penthouse Living',
    slug: 'bespoke-penthouse-living',
    category: 'interior',
    location: 'Indiranagar, Bengaluru',
    shortDescription:
      'Elegant interiors with refined materials, smart space planning, and a timeless design language.',
    projectStatus: 'completed',
    status: 'published',
    isFeatured: true,
    coverImage: '/images/interior-living-room.jpg',
    completionDate: '2024',
  },
  {
    _id: 'p4',
    title: 'Heritage Villa Restoration',
    slug: 'heritage-villa-restoration',
    category: 'renovation',
    location: 'Sadashivanagar, Bengaluru',
    shortDescription:
      'A complete renovation project blending modern aesthetics with structural improvements and enhanced functionality.',
    projectStatus: 'completed',
    status: 'published',
    isFeatured: true,
    coverImage: '/images/hero-villa.jpg',
    completionDate: '2023',
  },
  {
    _id: 'p5',
    title: 'Serene Haven Residence',
    slug: 'serene-haven-residence',
    category: 'residential',
    location: 'Sarjapur Road, Bengaluru',
    shortDescription:
      'A contemporary residence designed with optimal space utilisation and natural lighting.',
    projectStatus: 'ongoing',
    status: 'published',
    isFeatured: true,
    coverImage: '/images/construction-site.jpg',
    completionDate: '2025',
  },
  {
    _id: 'p6',
    title: 'Culinary Master Modular Kitchen',
    slug: 'culinary-master-modular-kitchen',
    category: 'interior',
    location: 'Koramangala, Bengaluru',
    shortDescription:
      'A stylish and functional modular kitchen designed for modern urban living.',
    projectStatus: 'completed',
    status: 'published',
    isFeatured: false,
    coverImage: '/images/service-modular-kitchen.jpg',
    completionDate: '2024',
  },
  {
    _id: 'p7',
    title: 'Palatial Master Suite & Walk-in Wardrobe',
    slug: 'palatial-master-suite',
    category: 'interior',
    location: 'Lavelle Road, Bengaluru',
    shortDescription:
      'A luxurious master suite with a bespoke walk-in wardrobe and elegant interior finishes.',
    projectStatus: 'completed',
    status: 'published',
    isFeatured: true,
    coverImage: '/images/interior-bedroom.jpg',
    completionDate: '2024',
  },
  {
    _id: 'p8',
    title: 'Skyline Twin Villas',
    slug: 'skyline-twin-villas',
    category: 'residential',
    location: 'Hennur Road, Bengaluru',
    shortDescription:
      'Twin villas with modern elevations, premium interiors, and landscaped surroundings.',
    projectStatus: 'ongoing',
    status: 'published',
    isFeatured: false,
    coverImage: '/images/about-villa-showcase.jpg',
    completionDate: '2025',
  },
];

export default function AdminProjects() {
  const [projects, setProjects] = useState(initialProjectsData);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'cards'

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getProjects();
      if (res.data?.success && res.data.data?.length > 0) {
        setProjects(res.data.data);
      }
    } catch (err) {
      console.warn('Fallback sample projects loaded:', err.message);
      setProjects(initialProjectsData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you wish to delete "${title || 'this project'}"?`)) return;
    try {
      await adminApi.deleteProject(id);
      toast.success('Project deleted successfully');
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch {
      toast.success('Project removed (Demo mode)');
      setProjects((prev) => prev.filter((p) => p._id !== id));
    }
  };

  // Filter calculations
  const filterTabs = [
    { id: 'all', label: 'All Projects' },
    { id: 'residential', label: 'Residential' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'interior', label: 'Interior Design' },
    { id: 'renovation', label: 'Renovation' },
    { id: 'ongoing', label: 'Ongoing' },
    { id: 'completed', label: 'Completed' },
  ];

  const stats = useMemo(() => {
    return {
      total: projects.length,
      residential: projects.filter((p) => p.category === 'residential').length,
      commercial: projects.filter((p) => p.category === 'commercial').length,
      interior: projects.filter((p) => (p.category || '').includes('interior')).length,
      renovation: projects.filter((p) => p.category === 'renovation').length,
      ongoing: projects.filter((p) => p.projectStatus === 'ongoing').length,
      completed: projects.filter((p) => p.projectStatus === 'completed').length,
    };
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((proj) => {
      const cat = (proj.category || '').toLowerCase();
      const stage = (proj.projectStatus || '').toLowerCase();

      let matchesTab = false;
      if (activeTab === 'all') matchesTab = true;
      else if (activeTab === 'residential') matchesTab = cat === 'residential';
      else if (activeTab === 'commercial') matchesTab = cat === 'commercial';
      else if (activeTab === 'interior') matchesTab = cat === 'interior' || cat.includes('interior');
      else if (activeTab === 'renovation') matchesTab = cat === 'renovation';
      else if (activeTab === 'ongoing') matchesTab = stage === 'ongoing';
      else if (activeTab === 'completed') matchesTab = stage === 'completed';

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        proj.title.toLowerCase().includes(q) ||
        (proj.location && proj.location.toLowerCase().includes(q)) ||
        (proj.slug && proj.slug.toLowerCase().includes(q)) ||
        (proj.category && proj.category.toLowerCase().includes(q));

      return matchesTab && matchesSearch;
    });
  }, [projects, activeTab, searchQuery]);

  return (
    <div className="admin-projects-root">
      <SeoMeta title="Manage Projects — Admin CMS" />

      {/* 1. Header Section */}
      <div className="admin-page-hero">
        <div className="admin-page-header-text">
          <div className="admin-eyebrow">
            <Sparkles size={14} className="text-gold" />
            <span>EXECUTIVE PORTFOLIO MANAGEMENT</span>
          </div>
          <h1 className="admin-page-title">Portfolio Projects</h1>
          <p className="admin-page-subtitle">
            Curate luxury residential showcases, corporate headquarters, and turnkey interior exhibits for Sri Ananda Nilayam.
          </p>
        </div>

        <div className="admin-header-actions">
          <a
            href="/projects"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-admin-secondary"
          >
            <ExternalLink size={15} />
            <span>View Public Projects</span>
          </a>
          <Link to="/admin/projects/new" className="btn-admin-primary">
            <PlusCircle size={16} />
            <span>Add New Project</span>
          </Link>
        </div>
      </div>

      {/* 2. Portfolio Metric Chips */}
      <div className="admin-stats-grid">
        <div className="stat-pill-card active-total">
          <div className="stat-icon-wrap gold">
            <Layers size={18} />
          </div>
          <div className="stat-info">
            <span className="stat-count">{stats.total}</span>
            <span className="stat-name">Total Projects</span>
          </div>
        </div>

        <div className="stat-pill-card">
          <div className="stat-icon-wrap blue">
            <Building2 size={18} />
          </div>
          <div className="stat-info">
            <span className="stat-count">{stats.residential}</span>
            <span className="stat-name">Residential</span>
          </div>
        </div>

        <div className="stat-pill-card">
          <div className="stat-icon-wrap cyan">
            <Building2 size={18} />
          </div>
          <div className="stat-info">
            <span className="stat-count">{stats.commercial}</span>
            <span className="stat-name">Commercial</span>
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
          <div className="stat-icon-wrap emerald">
            <CheckCircle2 size={18} />
          </div>
          <div className="stat-info">
            <span className="stat-count">{stats.completed}</span>
            <span className="stat-name">Completed</span>
          </div>
        </div>

        <div className="stat-pill-card">
          <div className="stat-icon-wrap orange">
            <Clock size={18} />
          </div>
          <div className="stat-info">
            <span className="stat-count">{stats.ongoing}</span>
            <span className="stat-name">Ongoing</span>
          </div>
        </div>
      </div>

      {/* 3. Filter & Search Controls Bar */}
      <div className="admin-controls-card">
        <div className="admin-filter-tabs">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`admin-filter-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="admin-controls-right">
          <div className="admin-search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search by title, location or slug..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="admin-search-input-field"
            />
          </div>

          <div className="view-toggle-wrap">
            <button
              type="button"
              className={`view-toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
              title="Table View"
              aria-label="Table View"
            >
              <List size={17} />
            </button>
            <button
              type="button"
              className={`view-toggle-btn ${viewMode === 'cards' ? 'active' : ''}`}
              onClick={() => setViewMode('cards')}
              title="Cards Grid View"
              aria-label="Cards Grid View"
            >
              <LayoutGrid size={17} />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Main Content: Table View OR Cards Grid View */}
      {loading ? (
        <div className="admin-loading-card">
          <div className="admin-spinner" />
          <p>Loading portfolio showcases...</p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="admin-empty-card">
          <Layers size={40} className="empty-icon" />
          <h3>No projects found</h3>
          <p>Try modifying your category filters or search keywords.</p>
          <button
            type="button"
            className="btn-admin-secondary"
            onClick={() => {
              setActiveTab('all');
              setSearchQuery('');
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'table' ? (
        /* TABLE VIEW */
        <div className="admin-table-container">
          <div className="table-responsive-wrapper">
            <table className="admin-executive-table">
              <thead>
                <tr>
                  <th style={{ width: '80px' }}>Exhibit</th>
                  <th>Project Details</th>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Execution Stage</th>
                  <th>Publish Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((proj) => (
                  <tr key={proj._id}>
                    <td>
                      <div className="table-thumb-box">
                        <img
                          src={proj.coverImage || '/images/project-villa.jpg'}
                          alt={proj.title}
                          className="table-thumb-img"
                        />
                      </div>
                    </td>

                    <td>
                      <div className="table-project-meta">
                        <span className="table-project-title">{proj.title}</span>
                        <a
                          href={`/projects/${proj.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="table-project-slug"
                        >
                          <span>/projects/{proj.slug}</span>
                          <ExternalLink size={11} />
                        </a>
                      </div>
                    </td>

                    <td>
                      <span className="pill-badge pill-category">
                        {(proj.category || 'RESIDENTIAL').toUpperCase()}
                      </span>
                    </td>

                    <td>
                      <div className="table-location-text">
                        <MapPin size={13} className="loc-pin" />
                        <span>{proj.location || 'Bengaluru'}</span>
                      </div>
                    </td>

                    <td>
                      <span
                        className={`pill-badge ${
                          proj.projectStatus === 'ongoing' ? 'pill-ongoing' : 'pill-completed'
                        }`}
                      >
                        {proj.projectStatus === 'ongoing' ? 'Ongoing' : 'Completed'}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`pill-badge ${
                          proj.status === 'draft' ? 'pill-draft' : 'pill-published'
                        }`}
                      >
                        {proj.status === 'draft' ? 'Draft' : 'Published'}
                      </span>
                    </td>

                    <td>
                      <div className="table-actions-cell">
                        <a
                          href={`/projects/${proj.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="action-icon-btn live"
                          title="View Live Page"
                        >
                          <ExternalLink size={15} />
                        </a>
                        <Link
                          to={`/admin/projects/${proj._id}/edit`}
                          className="action-icon-btn edit"
                          title="Edit Project"
                        >
                          <Edit size={15} />
                        </Link>
                        <button
                          type="button"
                          className="action-icon-btn delete"
                          onClick={() => handleDelete(proj._id, proj.title)}
                          title="Delete Project"
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
        <div className="admin-cards-grid">
          {filteredProjects.map((proj) => (
            <div key={proj._id} className="admin-project-card">
              <div className="card-media-wrap">
                <img
                  src={proj.coverImage || '/images/project-villa.jpg'}
                  alt={proj.title}
                  className="card-media-img"
                />
                <span className="card-badge-cat">
                  {(proj.category || 'RESIDENTIAL').toUpperCase()}
                </span>
                <span
                  className={`card-badge-stage ${
                    proj.projectStatus === 'ongoing' ? 'ongoing' : 'completed'
                  }`}
                >
                  {proj.projectStatus === 'ongoing' ? 'Ongoing' : 'Completed'}
                </span>
              </div>

              <div className="card-body-content">
                <h3 className="card-title-text">{proj.title}</h3>
                <div className="card-location-line">
                  <MapPin size={13} className="loc-pin" />
                  <span>{proj.location || 'Bengaluru'}</span>
                </div>
                <p className="card-desc-text">{proj.shortDescription}</p>

                <div className="card-admin-footer">
                  <div className="card-slug-pill">/projects/{proj.slug}</div>
                  <div className="card-action-btns">
                    <a
                      href={`/projects/${proj.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-icon-btn live"
                      title="View Live Page"
                    >
                      <ExternalLink size={14} />
                    </a>
                    <Link
                      to={`/admin/projects/${proj._id}/edit`}
                      className="action-icon-btn edit"
                      title="Edit Project"
                    >
                      <Edit size={14} />
                    </Link>
                    <button
                      type="button"
                      className="action-icon-btn delete"
                      onClick={() => handleDelete(proj._id, proj.title)}
                      title="Delete Project"
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

      <style>{`
        /* ============================================================
           ADMIN PROJECTS PAGE — EXECUTIVE ARCHITECTURAL SUITE
           ============================================================ */

        .admin-projects-root {
          display: flex;
          flex-direction: column;
          gap: 1.8rem;
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
          background: #EAAF35;
          color: #07172B;
          font-weight: 700;
          font-size: 0.88rem;
          padding: 0.65rem 1.3rem;
          border-radius: 9999px;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(234, 175, 53, 0.35);
          transition: all 0.22s ease;
        }

        .btn-admin-primary:hover {
          background: #F5BE47;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(234, 175, 53, 0.45);
        }

        .btn-admin-preview {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: #FFFFFF;
          color: #142B45;
          border: 1px solid #E5E0D5;
          font-weight: 600;
          font-size: 0.86rem;
          padding: 0.65rem 1.15rem;
          border-radius: 9999px;
          text-decoration: none;
          transition: all 0.22s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .btn-admin-preview:hover {
          background: #F8F5EE;
          color: #07172B;
          border-color: #EAAF35;
        }

        /* 2. Metric Chips Grid */
        .admin-stats-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 1rem;
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

        .stat-pill-card.active-total {
          border-color: rgba(234, 175, 53, 0.5);
          background: linear-gradient(135deg, #FFFFFF 0%, #FFFDF7 100%);
        }

        .stat-icon-wrap {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .stat-icon-wrap.gold {
          background: rgba(234, 175, 53, 0.15);
          color: #B47D14;
        }
        .stat-icon-wrap.blue {
          background: rgba(52, 120, 212, 0.12);
          color: #3478D4;
        }
        .stat-icon-wrap.cyan {
          background: rgba(6, 182, 212, 0.12);
          color: #0891B2;
        }
        .stat-icon-wrap.amber {
          background: rgba(233, 162, 59, 0.12);
          color: #E9A23B;
        }
        .stat-icon-wrap.emerald {
          background: rgba(21, 154, 114, 0.12);
          color: #159A72;
        }
        .stat-icon-wrap.orange {
          background: rgba(249, 115, 22, 0.12);
          color: #EA580C;
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
          line-height: 1.2;
        }

        .stat-name {
          font-size: 0.72rem;
          color: var(--text-secondary);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* 3. Controls Card */
        .admin-controls-card {
          background: #FFFFFF;
          border: 1px solid #E5E0D5;
          border-radius: 16px;
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.2rem;
          flex-wrap: wrap;
          box-shadow: 0 2px 10px rgba(7, 23, 43, 0.03);
        }

        .admin-filter-tabs {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          flex-wrap: wrap;
        }

        .admin-filter-btn {
          background: #FAF7F0;
          border: 1px solid #E5E0D5;
          color: var(--text-secondary);
          font-size: 0.82rem;
          font-weight: 600;
          padding: 0.45rem 1rem;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .admin-filter-btn:hover {
          background: #F0EAE0;
          color: var(--text-primary);
          border-color: #D6CFC3;
        }

        .admin-filter-btn.active {
          background: var(--brand-gold);
          color: var(--brand-navy);
          border-color: var(--brand-gold);
          font-weight: 700;
          box-shadow: 0 2px 8px rgba(234, 175, 53, 0.3);
        }

        .admin-controls-right {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          flex-wrap: wrap;
        }

        .admin-search-box {
          position: relative;
          display: flex;
          align-items: center;
          width: 280px;
        }

        .admin-search-box .search-icon {
          position: absolute;
          left: 0.85rem;
          color: #94A3B8;
        }

        .admin-search-input-field {
          width: 100%;
          background: #FAF7F0;
          border: 1px solid #E5E0D5;
          border-radius: 9999px;
          padding: 0.48rem 1rem 0.48rem 2.3rem;
          color: var(--text-primary);
          font-size: 0.82rem;
          outline: none;
          transition: all 0.2s;
        }

        .admin-search-input-field:focus {
          border-color: var(--brand-gold);
          background: #FFFFFF;
          box-shadow: 0 0 0 3px rgba(234, 175, 53, 0.18);
        }

        .view-toggle-wrap {
          display: flex;
          align-items: center;
          background: #FAF7F0;
          border: 1px solid #E5E0D5;
          border-radius: 9px;
          padding: 2px;
        }

        .view-toggle-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          padding: 0.4rem 0.6rem;
          border-radius: 7px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .view-toggle-btn.active {
          background: #FFFFFF;
          color: var(--brand-navy);
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
        }

        /* 4. Table View */
        .admin-table-container {
          background: #FFFFFF;
          border: 1px solid #E5E0D5;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 18px rgba(7, 23, 43, 0.04);
        }

        .table-responsive-wrapper {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .admin-executive-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .admin-executive-table th {
          background: #F8F5EE;
          color: #64748B;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 0.95rem 1.25rem;
          border-bottom: 1px solid #E5E0D5;
          white-space: nowrap;
        }

        .admin-executive-table td {
          padding: 1rem 1.25rem;
          border-bottom: 1px solid #EFEAE0;
          color: var(--text-primary);
          font-size: 0.86rem;
          vertical-align: middle;
        }

        .admin-executive-table tr:hover td {
          background: #FAF7F0;
        }

        .table-thumb-box {
          width: 60px;
          height: 44px;
          border-radius: 8px;
          overflow: hidden;
          background: #FAF7F0;
          border: 1px solid #E5E0D5;
          flex-shrink: 0;
        }

        .table-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .table-project-meta {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .table-project-title {
          font-weight: 700;
          color: var(--text-primary);
          font-size: 0.92rem;
        }

        .table-project-slug {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          color: #B47D14;
          font-size: 0.74rem;
          text-decoration: none;
        }

        .table-location-text {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          color: var(--text-secondary);
          font-size: 0.82rem;
        }

        .loc-pin {
          color: #B47D14;
          flex-shrink: 0;
        }

        /* Pill Badges */
        .pill-badge {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.25rem 0.7rem;
          border-radius: 9999px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          white-space: nowrap;
        }

        .pill-category {
          background: #EEF4FD;
          color: #3478D4;
        }

        .pill-ongoing {
          background: #FEF3C7;
          color: #B45309;
        }

        .pill-completed {
          background: #ECFDF5;
          color: #047857;
        }

        .pill-published {
          background: #ECFDF5;
          color: #047857;
        }

        .pill-draft {
          background: #F1F5F9;
          color: #64748B;
        }

        /* Table Action Buttons */
        .table-actions-cell {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.45rem;
        }

        .action-icon-btn {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #FFFFFF;
          border: 1px solid #E5E0D5;
          color: var(--text-secondary);
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-icon-btn:hover {
          background: #FAF7F0;
          color: var(--text-primary);
          border-color: #D6CFC3;
        }

        .action-icon-btn.edit:hover {
          color: #B47D14;
          border-color: rgba(234, 175, 53, 0.4);
          background: rgba(234, 175, 53, 0.12);
        }

        .action-icon-btn.delete:hover {
          color: #DC4545;
          border-color: rgba(220, 69, 69, 0.3);
          background: rgba(220, 69, 69, 0.1);
        }

        /* 5. Cards Grid View */
        .admin-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .admin-project-card {
          background: #FFFFFF;
          border: 1px solid #E5E0D5;
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 18px rgba(7, 23, 43, 0.04);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .admin-project-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 28px rgba(7, 23, 43, 0.08);
          border-color: #D6CFC3;
        }

        .card-media-wrap {
          position: relative;
          height: 180px;
          background: #FAF7F0;
        }

        .card-media-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-badge-cat {
          position: absolute;
          top: 10px;
          left: 10px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(4px);
          border: 1px solid #E5E0D5;
          color: #B47D14;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 0.25rem 0.65rem;
          border-radius: 9999px;
        }

        .card-badge-stage {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 0.68rem;
          font-weight: 700;
          padding: 0.25rem 0.65rem;
          border-radius: 9999px;
        }

        .card-badge-stage.ongoing {
          background: #FEF3C7;
          color: #B45309;
        }

        .card-badge-stage.completed {
          background: #ECFDF5;
          color: #047857;
        }

        .card-body-content {
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .card-title-text {
          font-family: var(--font-serif);
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0 0 0.35rem;
          line-height: 1.35;
        }

        .card-location-line {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          color: #B47D14;
          font-size: 0.82rem;
          font-weight: 600;
          margin-bottom: 0.65rem;
        }

        .card-desc-text {
          font-size: 0.82rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 1.2rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-admin-footer {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.85rem;
          border-top: 1px solid #EFEAE0;
        }

        .card-slug-pill {
          font-size: 0.72rem;
          color: var(--text-secondary);
          font-family: monospace;
          max-width: 140px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .card-action-btns {
          display: flex;
          gap: 0.35rem;
        }

        /* Loading / Empty States */
        .admin-loading-card,
        .admin-empty-card {
          padding: 4rem 2rem;
          text-align: center;
          background: #FFFFFF;
          border-radius: 16px;
          border: 1px solid #E5E0D5;
        }

        .admin-spinner {
          width: 36px;
          height: 36px;
          border: 3px solid rgba(234, 175, 53, 0.2);
          border-top-color: #EAAF35;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto 1rem;
        }

        .empty-icon {
          color: #EAAF35;
          opacity: 0.6;
          margin-bottom: 1rem;
        }

        .admin-empty-card h3 {
          color: var(--text-primary);
          margin-bottom: 0.5rem;
          font-size: 1.3rem;
        }

        .admin-empty-card p {
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }

        .btn-admin-secondary {
          background: #07172B;
          color: #EAAF35;
          border: 1px solid #EAAF35;
          padding: 0.55rem 1.4rem;
          border-radius: 9999px;
          font-weight: 700;
          cursor: pointer;
        }

        /* ============================================================
           RESPONSIVE BREAKPOINTS
           ============================================================ */

        @media (max-width: 1200px) {
          .admin-stats-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .admin-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .admin-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .admin-cards-grid {
            grid-template-columns: 1fr;
          }
          .admin-page-hero {
            flex-direction: column;
          }
          .admin-header-actions {
            width: 100%;
            justify-content: flex-start;
          }
          .admin-controls-card {
            flex-direction: column;
            align-items: stretch;
          }
          .admin-search-box {
            width: 100%;
          }
          .admin-controls-right {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>
    </div>
  );
}
