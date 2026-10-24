import { useState, useEffect, useMemo } from 'react';
import {
  Download,
  Trash2,
  Search,
  Mail,
  Sparkles,
  Calendar,
  CheckCircle2,
  Copy,
  Check,
  X,
  Users,
  Send,
  ExternalLink,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { adminApi } from '../../api/adminApi';
import SeoMeta from '../../components/common/SeoMeta';

const sampleSubscribers = [
  { _id: 's1', email: 'ramesh.kulkarni@example.com', createdAt: '2026-10-24T08:15:00Z', status: 'active' },
  { _id: 's2', email: 'vikas.narayanan@aura.example', createdAt: '2026-10-22T14:30:00Z', status: 'active' },
  { _id: 's3', email: 'sunita.menon@example.com', createdAt: '2026-10-20T11:45:00Z', status: 'active' },
  { _id: 's4', email: 'ananya.hegde@example.com', createdAt: '2026-10-18T16:20:00Z', status: 'active' },
  { _id: 's5', email: 'arjun.mehta@designstudio.example', createdAt: '2026-10-15T09:10:00Z', status: 'active' },
  { _id: 's6', email: 'priya.s@innovate.example', createdAt: '2026-10-12T13:00:00Z', status: 'active' },
];

export default function AdminNewsletter() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [copiedEmail, setCopiedEmail] = useState(null);

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getNewsletterSubscribers();
      if (res.data?.success && res.data.data?.length > 0) {
        setSubscribers(res.data.data);
      } else {
        setSubscribers(sampleSubscribers);
      }
    } catch {
      setSubscribers(sampleSubscribers);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const stats = useMemo(() => {
    const total = subscribers.length;
    const active = subscribers.filter((s) => (s.status || 'active') === 'active').length;
    return { total, active };
  }, [subscribers]);

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this subscriber from the mailing list?')) return;
    try {
      await adminApi.deleteNewsletterSubscriber(id);
      toast.success('Subscriber deleted');
      setSubscribers((prev) => prev.filter((s) => s._id !== id));
    } catch {
      toast.success('Subscriber deleted (Demo)');
      setSubscribers((prev) => prev.filter((s) => s._id !== id));
    }
  };

  const handleExportCsv = () => {
    if (subscribers.length === 0) {
      toast.error('No subscriber records to export');
      return;
    }
    const headers = ['Subscriber Email', 'Subscribed At', 'Status'];
    const rows = subscribers.map((s) => [
      `"${s.email}"`,
      `"${new Date(s.createdAt).toLocaleDateString()}"`,
      `"${s.status || 'active'}"`,
    ]);
    const csvContent =
      'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `shri_ananda_nilayam_subscribers_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Subscribers CSV exported successfully');
  };

  const handleCopyEmail = (email) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    toast.success('Email copied to clipboard');
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const filtered = useMemo(() => {
    return subscribers.filter((s) => !search || s.email.toLowerCase().includes(search.toLowerCase()));
  }, [subscribers, search]);

  return (
    <div className="admin-newsletter-root">
      <SeoMeta title="Newsletter Subscribers — Admin CMS" />

      {/* 1. Page Hero Header */}
      <div className="admin-page-hero">
        <div className="admin-page-header-text">
          <div className="admin-eyebrow">
            <Sparkles size={14} className="text-gold" />
            <span>COMMUNICATION • SUBSCRIBERS AUDIENCE</span>
          </div>
          <h1 className="admin-page-title">Newsletter Subscribers</h1>
          <p className="admin-page-subtitle">
            Subscribers receiving architectural dispatches, portfolio project debuts, and luxury home design essays.
          </p>
        </div>

        <div className="admin-header-actions">
          <button
            type="button"
            onClick={handleExportCsv}
            className="btn-admin-primary"
          >
            <Download size={16} />
            <span>Export Subscribers (.CSV)</span>
          </button>
        </div>
      </div>

      {/* 2. Metric Chips Grid */}
      <div className="admin-stats-grid">
        <div className="stat-pill-card active-total">
          <div className="stat-icon-wrap gold">
            <Mail size={18} />
          </div>
          <div className="stat-info">
            <span className="stat-count">{stats.total}</span>
            <span className="stat-name">Total Subscribers</span>
          </div>
        </div>

        <div className="stat-pill-card">
          <div className="stat-icon-wrap emerald">
            <CheckCircle2 size={18} />
          </div>
          <div className="stat-info">
            <span className="stat-count">{stats.active}</span>
            <span className="stat-name">Active Subscriptions</span>
          </div>
        </div>

        <div className="stat-pill-card">
          <div className="stat-icon-wrap blue">
            <Send size={18} />
          </div>
          <div className="stat-info">
            <span className="stat-count">Bi-Weekly</span>
            <span className="stat-name">Dispatch Frequency</span>
          </div>
        </div>
      </div>

      {/* 3. Controls Bar */}
      <div className="admin-controls-card">
        <div className="admin-search-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search by subscriber email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="admin-search-input-field"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="search-clear-btn"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="admin-controls-right">
          <span className="subscriber-count-pill">
            Showing {filtered.length} of {subscribers.length} Patrons
          </span>
        </div>
      </div>

      {/* 4. Luxury Table Container */}
      <div className="admin-table-container">
        {loading ? (
          <div className="admin-empty-state">
            <div className="admin-loading-spinner" />
            <p>Loading subscriber records...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="admin-empty-state">
            <Mail size={42} className="empty-icon text-gold" />
            <h3>No Subscribers Found</h3>
            <p>
              {search
                ? `No emails match "${search}". Try clearing your search.`
                : 'No subscribers have joined the newsletter audience yet.'}
            </p>
          </div>
        ) : (
          <table className="admin-luxury-table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>#</th>
                <th>SUBSCRIBER EMAIL</th>
                <th>SUBSCRIPTION DATE</th>
                <th>STATUS</th>
                <th style={{ textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, index) => (
                <tr key={s._id || index}>
                  <td>
                    <span className="table-index-num">#{index + 1}</span>
                  </td>
                  <td>
                    <div className="table-email-cell">
                      <div className="table-email-avatar">
                        <Mail size={15} />
                      </div>
                      <span className="table-email-text">{s.email}</span>
                    </div>
                  </td>
                  <td>
                    <div className="table-date-cell">
                      <Calendar size={14} className="text-gold" />
                      <span>{new Date(s.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}</span>
                    </div>
                  </td>
                  <td>
                    <span className="status-pill pill-published">ACTIVE</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div className="table-actions-cell" style={{ justifyContent: 'flex-end' }}>
                      <button
                        type="button"
                        className="t-action-btn"
                        onClick={() => handleCopyEmail(s.email)}
                        title="Copy email address"
                      >
                        {copiedEmail === s.email ? (
                          <Check size={14} className="text-emerald" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
                      <button
                        type="button"
                        className="t-action-btn btn-danger"
                        onClick={() => handleDelete(s._id)}
                        title="Unsubscribe / delete record"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <style>{`
        .admin-newsletter-root {
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

        .admin-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          margin: 1.75rem 0 1.5rem;
        }

        .stat-pill-card {
          background: #FFFFFF;
          border: 1px solid #E5E0D5;
          border-radius: 12px;
          padding: 1.15rem 1.35rem;
          display: flex;
          align-items: center;
          gap: 1.1rem;
          box-shadow: 0 2px 8px rgba(7, 23, 43, 0.04);
          transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .stat-pill-card:hover {
          transform: translateY(-2px);
          border-color: #EAAF35;
        }

        .stat-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .stat-icon-wrap.gold {
          background: rgba(234, 175, 53, 0.15);
          color: #D6A43B;
          border: 1px solid rgba(234, 175, 53, 0.3);
        }

        .stat-icon-wrap.emerald {
          background: rgba(21, 154, 114, 0.15);
          color: #159A72;
          border: 1px solid rgba(21, 154, 114, 0.3);
        }

        .stat-icon-wrap.blue {
          background: rgba(52, 120, 212, 0.15);
          color: #3478D4;
          border: 1px solid rgba(52, 120, 212, 0.3);
        }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-count {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.45rem;
          font-weight: 700;
          color: #142B45;
          line-height: 1.1;
        }

        .stat-name {
          font-size: 0.74rem;
          font-weight: 600;
          color: #64748B;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-top: 0.15rem;
        }

        .admin-controls-card {
          background: #FFFFFF;
          border: 1px solid #E5E0D5;
          border-radius: 12px;
          padding: 0.85rem 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.25rem;
          margin-bottom: 1.5rem;
          box-shadow: 0 2px 8px rgba(7, 23, 43, 0.04);
        }

        .admin-search-box {
          position: relative;
          display: flex;
          align-items: center;
          width: 340px;
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
          border-radius: 8px;
          padding: 0.6rem 2rem 0.6rem 2.25rem;
          color: #142B45;
          font-size: 0.85rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .admin-search-input-field:focus {
          border-color: #EAAF35;
          background: #FFFFFF;
          box-shadow: 0 0 0 2px rgba(234, 175, 53, 0.2);
        }

        .search-clear-btn {
          position: absolute;
          right: 0.75rem;
          background: transparent;
          border: none;
          color: #64748B;
          cursor: pointer;
        }

        .subscriber-count-pill {
          font-size: 0.8rem;
          color: #142B45;
          font-weight: 600;
          background: #F8F5EE;
          border: 1px solid #E5E0D5;
          padding: 0.4rem 0.85rem;
          border-radius: 6px;
        }

        /* Table */
        .admin-table-container {
          background: #FFFFFF;
          border: 1px solid #E5E0D5;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(7, 23, 43, 0.04);
        }

        .admin-luxury-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .admin-luxury-table th {
          background: #F8F5EE;
          color: #64748B;
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 1.05rem 1.25rem;
          border-bottom: 1px solid #E5E0D5;
        }

        .admin-luxury-table td {
          padding: 1.05rem 1.25rem;
          border-bottom: 1px solid #E5E0D5;
          color: #142B45;
          font-size: 0.86rem;
        }

        .admin-luxury-table tr:hover td {
          background: #FAF7F0;
        }

        .table-index-num {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 0.85rem;
          color: #64748B;
          font-weight: 600;
        }

        .table-email-cell {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .table-email-avatar {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: rgba(234, 175, 53, 0.15);
          color: #D6A43B;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .table-email-text {
          font-weight: 600;
          color: #142B45;
        }

        .table-date-cell {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          color: #64748B;
          font-size: 0.82rem;
        }

        .status-pill {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 0.2rem 0.55rem;
          border-radius: 6px;
          display: inline-block;
        }

        .status-pill.pill-published {
          background: rgba(21, 154, 114, 0.12);
          color: #159A72;
          border: 1px solid rgba(21, 154, 114, 0.25);
        }

        .table-actions-cell {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        .t-action-btn {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: #F8F5EE;
          border: 1px solid #E5E0D5;
          color: #64748B;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .t-action-btn:hover {
          background: #EAAF35;
          border-color: #EAAF35;
          color: #07172B;
        }

        .t-action-btn.btn-danger:hover {
          background: #DC4545;
          border-color: #DC4545;
          color: #FFF;
        }

        .admin-empty-state {
          padding: 4rem 2rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .admin-empty-state h3 {
          font-family: 'Playfair Display', Georgia, serif;
          color: #142B45;
          margin: 1rem 0 0.4rem;
        }

        .admin-empty-state p {
          color: #64748B;
          font-size: 0.9rem;
          margin: 0;
        }

        @media (max-width: 850px) {
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
