import { useState, useEffect, useMemo } from 'react';
import {
  PlusCircle,
  Edit,
  Trash2,
  Star,
  X,
  ExternalLink,
  Search,
  Sparkles,
  Award,
  CheckCircle2,
  LayoutGrid,
  List,
  Quote,
  Eye,
  EyeOff,
  User,
  Shield,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { adminApi } from '../../api/adminApi';
import SeoMeta from '../../components/common/SeoMeta';

const initialTestimonials = [
  {
    _id: 't1',
    clientName: 'Dr. Ramesh Kulkarni',
    clientTitle: 'Villa Owner, Whitefield',
    projectCategory: 'Residential Architecture & Turnkey Construction',
    rating: 5,
    text: 'Sri Ananda Nilayam exceeded every expectation with our family villa. Their structural clarity, Vastu harmony, and weekly video progress updates made the construction journey truly peaceful.',
    status: 'published',
    createdAt: '2026-10-18T10:00:00Z',
  },
  {
    _id: 't2',
    clientName: 'Sunita & Arvind Menon',
    clientTitle: 'Apartment Owners, Indiranagar',
    projectCategory: 'Turnkey Luxury Interior Fitout',
    rating: 5,
    text: 'From the initial 3D renderings to the final brass hardware installation, the team demonstrated master-level craftsmanship. Our residence is an absolute joy to dwell in.',
    status: 'published',
    createdAt: '2026-10-14T12:30:00Z',
  },
  {
    _id: 't3',
    clientName: 'Vikas Narayanan',
    clientTitle: 'Managing Director, Aura Ventures',
    projectCategory: 'Commercial Office Architecture',
    rating: 5,
    text: 'Building a 20,000 sq ft office requires strict adherence to timelines and MEP compliance. Sri Ananda Nilayam delivered on budget and two weeks ahead of schedule.',
    status: 'published',
    createdAt: '2026-10-10T15:20:00Z',
  },
  {
    _id: 't4',
    clientName: 'Rajesh Kumar',
    clientTitle: 'Homeowner, Sarjapur Road',
    projectCategory: 'Contemporary Residence Construction',
    rating: 5,
    text: 'Excellent work and professional team. Our dream home was completed exactly as we imagined, with high quality materials and transparent billing.',
    status: 'published',
    createdAt: '2026-10-05T09:15:00Z',
  },
  {
    _id: 't5',
    clientName: 'Priya Sharma',
    clientTitle: 'Interior Design Client, Koramangala',
    projectCategory: 'Bespoke Luxury Interiors',
    rating: 5,
    text: 'Very creative designs and great attention to detail. The custom joinery and lighting layout transformed our living spaces completely.',
    status: 'published',
    createdAt: '2026-09-28T16:40:00Z',
  },
  {
    _id: 't6',
    clientName: 'Abhishek Reddy',
    clientTitle: 'Managing Partner, Reddy Properties',
    projectCategory: 'Corporate Campus & Architecture',
    rating: 5,
    text: 'Timely delivery, quality structural engineering and highly professional architectural team. Truly a dependable, high-integrity turnkey partner.',
    status: 'published',
    createdAt: '2026-09-20T11:10:00Z',
  },
];

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [filterRating, setFilterRating] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [form, setForm] = useState({
    clientName: '',
    clientTitle: '',
    projectCategory: 'Residential Architecture',
    rating: 5,
    text: '',
    status: 'published',
  });

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getTestimonials();
      if (res.data?.success && res.data.data?.length > 0) {
        setTestimonials(res.data.data);
      } else {
        setTestimonials(initialTestimonials);
      }
    } catch {
      setTestimonials(initialTestimonials);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Statistics
  const stats = useMemo(() => {
    const total = testimonials.length;
    const fiveStar = testimonials.filter((t) => Number(t.rating) === 5).length;
    const published = testimonials.filter((t) => t.status === 'published').length;
    const avg = total > 0 ? (testimonials.reduce((acc, t) => acc + (Number(t.rating) || 5), 0) / total).toFixed(1) : '5.0';
    return { total, fiveStar, published, avg };
  }, [testimonials]);

  // Filtering
  const filtered = useMemo(() => {
    return testimonials.filter((t) => {
      const matchesRating =
        filterRating === 'all' ||
        (filterRating === '5' && Number(t.rating) === 5) ||
        (filterRating === 'published' && t.status === 'published');
      const matchesSearch =
        !searchQuery ||
        t.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.clientTitle && t.clientTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (t.text && t.text.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesRating && matchesSearch;
    });
  }, [testimonials, filterRating, searchQuery]);

  const openCreate = () => {
    setEditId(null);
    setForm({
      clientName: '',
      clientTitle: '',
      projectCategory: 'Residential Architecture',
      rating: 5,
      text: '',
      status: 'published',
    });
    setModalOpen(true);
  };

  const openEdit = (t) => {
    setEditId(t._id);
    setForm({
      clientName: t.clientName || '',
      clientTitle: t.clientTitle || '',
      projectCategory: t.projectCategory || 'Residential Architecture',
      rating: Number(t.rating) || 5,
      text: t.text || t.content || '',
      status: t.status || 'published',
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.clientName || !form.text) {
      toast.error('Client name and review quote are required');
      return;
    }

    try {
      if (editId) {
        const res = await adminApi.updateTestimonial(editId, form);
        toast.success('Testimonial updated');
        setTestimonials((prev) =>
          prev.map((t) => (t._id === editId ? res.data?.data || { ...t, ...form } : t))
        );
      } else {
        const res = await adminApi.createTestimonial(form);
        toast.success('Testimonial published');
        setTestimonials((prev) => [
          res.data?.data || { ...form, _id: Date.now().toString(), createdAt: new Date().toISOString() },
          ...prev,
        ]);
      }
      setModalOpen(false);
    } catch {
      if (editId) {
        setTestimonials((prev) =>
          prev.map((t) => (t._id === editId ? { ...t, ...form } : t))
        );
        toast.success('Testimonial updated (Demo)');
      } else {
        setTestimonials((prev) => [
          { ...form, _id: Date.now().toString(), createdAt: new Date().toISOString() },
          ...prev,
        ]);
        toast.success('Testimonial published (Demo)');
      }
      setModalOpen(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this client testimonial?')) return;
    try {
      await adminApi.deleteTestimonial(id);
      toast.success('Testimonial removed');
      setTestimonials((prev) => prev.filter((t) => t._id !== id));
    } catch {
      toast.success('Testimonial removed (Demo)');
      setTestimonials((prev) => prev.filter((t) => t._id !== id));
    }
  };

  const handleToggleStatus = (t) => {
    const nextStatus = t.status === 'published' ? 'draft' : 'published';
    setTestimonials((prev) =>
      prev.map((item) => (item._id === t._id ? { ...item, status: nextStatus } : item))
    );
    toast.success(`Testimonial status set to ${nextStatus}`);
  };

  return (
    <div className="admin-testimonials-root">
      <SeoMeta title="Manage Testimonials — Admin CMS" />

      {/* 1. Page Hero Header */}
      <div className="admin-page-hero">
        <div className="admin-page-header-text">
          <div className="admin-eyebrow">
            <Sparkles size={14} className="text-gold" />
            <span>PATRON ENDORSEMENTS • SOCIAL PROOF</span>
          </div>
          <h1 className="admin-page-title">Client Testimonials</h1>
          <p className="admin-page-subtitle">
            Review, edit, and curate client reflections, star ratings, and verified project endorsements for Sri Ananda Nilayam.
          </p>
        </div>

        <div className="admin-header-actions">
          <a
            href="/testimonials"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-admin-secondary"
          >
            <ExternalLink size={15} />
            <span>View Public Testimonials</span>
          </a>
          <button
            type="button"
            onClick={openCreate}
            className="btn-admin-primary"
          >
            <PlusCircle size={16} />
            <span>Add Testimonial</span>
          </button>
        </div>
      </div>

      {/* 2. Metric Chips Grid */}
      <div className="admin-stats-grid">
        <div className="stat-pill-card active-total">
          <div className="stat-icon-wrap gold">
            <Quote size={18} />
          </div>
          <div className="stat-info">
            <span className="stat-count">{stats.total}</span>
            <span className="stat-name">Total Reviews</span>
          </div>
        </div>

        <div className="stat-pill-card">
          <div className="stat-icon-wrap amber">
            <Star size={18} fill="#FBBF24" color="#FBBF24" />
          </div>
          <div className="stat-info">
            <span className="stat-count">{stats.fiveStar}</span>
            <span className="stat-name">5-Star Reviews</span>
          </div>
        </div>

        <div className="stat-pill-card">
          <div className="stat-icon-wrap emerald">
            <Award size={18} />
          </div>
          <div className="stat-info">
            <span className="stat-count">{stats.avg} / 5</span>
            <span className="stat-name">Average Rating</span>
          </div>
        </div>

        <div className="stat-pill-card">
          <div className="stat-icon-wrap blue">
            <CheckCircle2 size={18} />
          </div>
          <div className="stat-info">
            <span className="stat-count">{stats.published}</span>
            <span className="stat-name">Published</span>
          </div>
        </div>
      </div>

      {/* 3. Controls Bar */}
      <div className="admin-controls-card">
        <div className="admin-filter-tabs">
          <button
            type="button"
            className={`admin-filter-btn ${filterRating === 'all' ? 'active' : ''}`}
            onClick={() => setFilterRating('all')}
          >
            <span>All Reviews</span>
            <span className="filter-count-badge">{stats.total}</span>
          </button>
          <button
            type="button"
            className={`admin-filter-btn ${filterRating === '5' ? 'active' : ''}`}
            onClick={() => setFilterRating('5')}
          >
            <span>5-Star Only</span>
            <span className="filter-count-badge">{stats.fiveStar}</span>
          </button>
          <button
            type="button"
            className={`admin-filter-btn ${filterRating === 'published' ? 'active' : ''}`}
            onClick={() => setFilterRating('published')}
          >
            <span>Published</span>
            <span className="filter-count-badge">{stats.published}</span>
          </button>
        </div>

        <div className="admin-controls-right">
          <div className="admin-search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search by client or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="admin-search-input-field"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="search-clear-btn"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="view-toggle-wrap">
            <button
              type="button"
              className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Cards Grid View"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              type="button"
              className={`view-toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
              title="Table View"
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Display Content */}
      {loading ? (
        <div className="admin-empty-state">
          <div className="admin-loading-spinner" />
          <p>Loading client reflections...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="admin-empty-state">
          <Quote size={40} className="empty-icon text-gold" />
          <h3>No Testimonials Match</h3>
          <p>Try modifying your search or rating filters.</p>
        </div>
      ) : viewMode === 'grid' ? (
        /* Cards View */
        <div className="testimonials-cards-grid">
          {filtered.map((t) => (
            <div key={t._id} className="testimonial-card-item">
              <div className="t-card-top">
                <div className="t-avatar-circle">
                  {(t.clientName || 'C')[0]}
                </div>
                <div className="t-author-details">
                  <h4 className="t-author-name">{t.clientName}</h4>
                  <span className="t-author-meta">{t.clientTitle || 'Client'}</span>
                </div>
                <span className={`status-pill pill-${t.status === 'published' ? 'published' : 'draft'}`}>
                  {t.status === 'published' ? 'PUBLISHED' : 'DRAFT'}
                </span>
              </div>

              <div className="t-rating-stars-row">
                {[...Array(Number(t.rating) || 5)].map((_, s) => (
                  <Star key={s} size={15} fill="#EAAF35" color="#EAAF35" />
                ))}
                <span className="t-category-badge">{t.projectCategory || 'Architecture'}</span>
              </div>

              <p className="t-quote-body">&ldquo;{t.text || t.content}&rdquo;</p>

              <div className="t-card-actions-bar">
                <button
                  type="button"
                  className="t-status-toggle"
                  onClick={() => handleToggleStatus(t)}
                  title="Toggle publication"
                >
                  {t.status === 'published' ? <Eye size={15} className="text-emerald" /> : <EyeOff size={15} className="text-slate" />}
                  <span>{t.status === 'published' ? 'Live' : 'Hidden'}</span>
                </button>

                <div className="t-btn-group">
                  <button
                    type="button"
                    className="t-action-btn"
                    onClick={() => openEdit(t)}
                    title="Edit endorsement"
                  >
                    <Edit size={15} />
                  </button>
                  <button
                    type="button"
                    className="t-action-btn btn-danger"
                    onClick={() => handleDelete(t._id)}
                    title="Delete endorsement"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="admin-table-container">
          <table className="admin-luxury-table">
            <thead>
              <tr>
                <th>CLIENT</th>
                <th>ROLE / LOCATION</th>
                <th>PROJECT SCOPE</th>
                <th>RATING</th>
                <th>STATUS</th>
                <th style={{ textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t._id}>
                  <td>
                    <div className="table-client-cell">
                      <div className="t-table-avatar">{(t.clientName || 'C')[0]}</div>
                      <div>
                        <span className="client-table-name">{t.clientName}</span>
                        <p className="client-table-quote-snip">&ldquo;{(t.text || '').substring(0, 50)}...&rdquo;</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="table-meta-text">{t.clientTitle || 'Homeowner'}</span>
                  </td>
                  <td>
                    <span className="table-scope-badge">{t.projectCategory || 'Residential'}</span>
                  </td>
                  <td>
                    <div className="table-stars-row">
                      {[...Array(Number(t.rating) || 5)].map((_, s) => (
                        <Star key={s} size={13} fill="#EAAF35" color="#EAAF35" />
                      ))}
                    </div>
                  </td>
                  <td>
                    <span className={`status-pill pill-${t.status === 'published' ? 'published' : 'draft'}`}>
                      {t.status === 'published' ? 'PUBLISHED' : 'DRAFT'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div className="table-actions-cell" style={{ justifyContent: 'flex-end' }}>
                      <button
                        type="button"
                        className="t-action-btn"
                        onClick={() => openEdit(t)}
                        title="Edit testimonial"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        type="button"
                        className="t-action-btn btn-danger"
                        onClick={() => handleDelete(t._id)}
                        title="Delete testimonial"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 5. Add / Edit Modal */}
      {modalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="admin-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div className="modal-title-group">
                <div className="modal-icon-badge">
                  <Star size={20} className="text-gold" fill="#EAAF35" />
                </div>
                <div>
                  <h3 className="modal-heading">
                    {editId ? 'Edit Client Testimonial' : 'Add Client Testimonial'}
                  </h3>
                  <p className="modal-subheading">Curate client endorsements and public reflections.</p>
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

            <form onSubmit={handleSubmit} className="admin-modal-form">
              <div className="form-group-wrap">
                <label className="form-field-label required">Client Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Ramesh Kulkarni"
                  className="form-luxury-input"
                  value={form.clientName}
                  onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                  required
                />
              </div>

              <div className="form-group-wrap">
                <label className="form-field-label">Client Role / Location</label>
                <input
                  type="text"
                  placeholder="e.g. Villa Owner, Whitefield"
                  className="form-luxury-input"
                  value={form.clientTitle}
                  onChange={(e) => setForm({ ...form, clientTitle: e.target.value })}
                />
              </div>

              <div className="form-group-wrap">
                <label className="form-field-label">Project Category</label>
                <select
                  className="form-luxury-select"
                  value={form.projectCategory}
                  onChange={(e) => setForm({ ...form, projectCategory: e.target.value })}
                >
                  <option value="Residential Architecture">Residential Architecture</option>
                  <option value="Residential Architecture & Turnkey Construction">
                    Residential Architecture & Turnkey Construction
                  </option>
                  <option value="Turnkey Luxury Interior Fitout">Turnkey Luxury Interior Fitout</option>
                  <option value="Commercial Office Architecture">Commercial Office Architecture</option>
                  <option value="Heritage Villa Restoration">Heritage Villa Restoration</option>
                </select>
              </div>

              {/* Interactive Star Picker */}
              <div className="form-group-wrap">
                <label className="form-field-label">Star Rating</label>
                <div className="modal-star-picker">
                  {[1, 2, 3, 4, 5].map((starVal) => (
                    <button
                      key={starVal}
                      type="button"
                      className="star-pick-btn"
                      onClick={() => setForm({ ...form, rating: starVal })}
                    >
                      <Star
                        size={24}
                        fill={starVal <= form.rating ? '#EAAF35' : 'transparent'}
                        color={starVal <= form.rating ? '#EAAF35' : '#64748B'}
                      />
                    </button>
                  ))}
                  <span className="star-val-text">{form.rating} out of 5 Stars</span>
                </div>
              </div>

              <div className="form-group-wrap">
                <label className="form-field-label required">Testimonial Quote</label>
                <textarea
                  rows={4}
                  placeholder="Enter the client's detailed review quote..."
                  className="form-luxury-input"
                  style={{ resize: 'vertical' }}
                  value={form.text}
                  onChange={(e) => setForm({ ...form, text: e.target.value })}
                  required
                />
              </div>

              <div className="form-group-wrap">
                <label className="form-field-label">Publication Status</label>
                <select
                  className="form-luxury-select"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                >
                  <option value="published">Published (Visible on public site)</option>
                  <option value="draft">Draft (Saved in admin only)</option>
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
                <button type="submit" className="btn-admin-primary">
                  {editId ? 'Save Changes' : 'Publish Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .admin-testimonials-root {
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
          grid-template-columns: repeat(4, 1fr);
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
          color: #B47D14;
        }

        .stat-icon-wrap.amber {
          background: rgba(233, 162, 59, 0.12);
          color: #E9A23B;
        }

        .stat-icon-wrap.emerald {
          background: rgba(21, 154, 114, 0.12);
          color: #159A72;
        }

        .stat-icon-wrap.blue {
          background: rgba(52, 120, 212, 0.12);
          color: #3478D4;
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
          background: rgba(0, 0, 0, 0.25);
          padding: 0.15rem 0.45rem;
          border-radius: 9999px;
          font-size: 0.7rem;
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
          width: 280px;
        }

        .search-icon {
          position: absolute;
          left: 0.85rem;
          color: #64748B;
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

        .view-toggle-wrap {
          display: flex;
          background: #FAF7F0;
          border: 1px solid #E5E0D5;
          border-radius: 8px;
          padding: 2px;
        }

        .view-toggle-btn {
          background: transparent;
          border: none;
          color: #94A3B8;
          padding: 0.45rem 0.65rem;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .view-toggle-btn.active {
          background: #EAAF35;
          color: #07172B;
        }

        /* 4. Cards View */
        .testimonials-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .testimonial-card-item {
          background: #FFFFFF;
          border: 1px solid #E5E0D5;
          border-radius: 14px;
          padding: 1.45rem 1.5rem;
          box-shadow: 0 2px 10px rgba(7, 23, 43, 0.03);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s;
          position: relative;
        }

        .testimonial-card-item:hover {
          transform: translateY(-2px);
          border-color: #D6CFC3;
          box-shadow: 0 8px 24px rgba(7, 23, 43, 0.07);
        }

        .t-card-top {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: 1rem;
        }

        .t-avatar-circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(234, 175, 53, 0.15);
          border: 1px solid rgba(234, 175, 53, 0.4);
          color: #B47D14;
          font-weight: 700;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .t-author-details {
          flex: 1;
          min-width: 0;
        }

        .t-author-name {
          font-size: 0.96rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .t-author-meta {
          font-size: 0.76rem;
          color: var(--text-secondary);
        }

        .status-pill {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 0.2rem 0.55rem;
          border-radius: 6px;
        }

        .status-pill.pill-published {
          background: #ECFDF5;
          color: #047857;
          border: 1px solid #A7F3D0;
        }

        .status-pill.pill-draft {
          background: #F1F5F9;
          color: #64748B;
          border: 1px solid #E2E8F0;
        }

        .t-rating-stars-row {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          margin-bottom: 0.85rem;
        }

        .t-category-badge {
          margin-left: auto;
          font-size: 0.7rem;
          color: #B47D14;
          background: rgba(234, 175, 53, 0.1);
          border: 1px solid rgba(234, 175, 53, 0.25);
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
        }

        .t-quote-body {
          font-size: 0.88rem;
          color: #334155;
          line-height: 1.6;
          margin: 0 0 1.25rem;
          flex: 1;
          font-style: italic;
        }

        .t-card-actions-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.85rem;
          border-top: 1px solid #EFEAE0;
        }

        .t-status-toggle {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: transparent;
          border: none;
          color: #94A3B8;
          font-size: 0.78rem;
          cursor: pointer;
        }

        .t-btn-group {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        .t-action-btn {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: rgba(6, 17, 33, 0.7);
          border: 1px solid rgba(234, 175, 53, 0.25);
          color: #CBD5E1;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .t-action-btn:hover {
          background: #EAAF35;
          color: #07172B;
        }

        .t-action-btn.btn-danger:hover {
          background: #EF4444;
          border-color: #EF4444;
          color: #FFF;
        }

        /* 5. Table View */
        .admin-table-container {
          background: #0B1D34;
          border: 1px solid rgba(234, 175, 53, 0.2);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
        }

        .admin-luxury-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .admin-luxury-table th {
          background: rgba(6, 17, 33, 0.8);
          color: #EAAF35;
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 1rem 1.25rem;
          border-bottom: 1px solid rgba(234, 175, 53, 0.2);
        }

        .admin-luxury-table td {
          padding: 1rem 1.25rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          color: #E2E8F0;
          font-size: 0.86rem;
        }

        .admin-luxury-table tr:hover td {
          background: rgba(16, 40, 68, 0.4);
        }

        .table-client-cell {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .t-table-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(234, 175, 53, 0.2);
          color: #EAAF35;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.95rem;
        }

        .client-table-name {
          font-weight: 700;
          color: #FFF;
          display: block;
        }

        .client-table-quote-snip {
          font-size: 0.74rem;
          color: #94A3B8;
          margin: 0.15rem 0 0;
          max-width: 280px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .table-meta-text {
          font-size: 0.82rem;
          color: #CBD5E1;
        }

        .table-scope-badge {
          font-size: 0.72rem;
          color: #60A5FA;
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.25);
          padding: 0.2rem 0.55rem;
          border-radius: 4px;
        }

        .table-stars-row {
          display: flex;
          align-items: center;
          gap: 0.15rem;
        }

        .table-actions-cell {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        /* 6. Modal Styles */
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
        }

        .admin-modal-form {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
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
          width: 100%;
        }

        .form-luxury-input:focus,
        .form-luxury-select:focus {
          border-color: #EAAF35;
          box-shadow: 0 0 0 2px rgba(234, 175, 53, 0.2);
        }

        .modal-star-picker {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.4rem 0;
        }

        .star-pick-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 2px;
          transition: transform 0.15s;
        }

        .star-pick-btn:hover {
          transform: scale(1.15);
        }

        .star-val-text {
          font-size: 0.84rem;
          font-weight: 600;
          color: #EAAF35;
          margin-left: 0.75rem;
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
          margin: 0;
        }

        @media (max-width: 1200px) {
          .testimonials-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .admin-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .testimonials-cards-grid {
            grid-template-columns: 1fr;
          }
          .admin-stats-grid {
            grid-template-columns: 1fr;
          }
          .admin-controls-card {
            flex-direction: column;
            align-items: stretch;
          }
          .admin-search-box {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
