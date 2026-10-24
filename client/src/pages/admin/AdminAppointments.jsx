import { useState, useEffect, useMemo } from 'react';
import {
  Calendar,
  Clock,
  PlusCircle,
  Search,
  MapPin,
  Phone,
  Mail,
  User,
  CheckCircle2,
  X,
  Trash2,
  Sparkles,
  ExternalLink,
  MessageSquare,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { adminApi } from '../../api/adminApi';
import SeoMeta from '../../components/common/SeoMeta';

const sampleAppointments = [
  {
    _id: 'app1',
    clientName: 'Ananya Deshpande',
    phone: '+91 97412 34567',
    email: 'ananya.d@example.com',
    service: 'Residential',
    appointmentDate: '2026-10-25',
    timeSlot: '10:30 AM',
    location: 'In-Person',
    status: 'confirmed',
    notes: 'Site plan briefing for luxury residence.',
  },
  {
    _id: 'app2',
    clientName: 'Ramesh Kulkarni',
    phone: '+91 98888 77665',
    email: 'ramesh.k@example.com',
    service: 'Commercial',
    appointmentDate: '2026-10-26',
    timeSlot: '11:00 AM',
    location: 'In-Person',
    status: 'upcoming',
    notes: 'Showroom interior design preliminary discussion.',
  },
  {
    _id: 'app3',
    clientName: 'Priya Nair',
    phone: '+91 99000 88776',
    email: 'priya.nair@example.com',
    service: 'Interior Design',
    appointmentDate: '2026-10-24',
    timeSlot: '03:00 PM',
    location: 'In-Person',
    status: 'completed',
    notes: 'Material palette and veneer selection approved.',
  },
  {
    _id: 'app4',
    clientName: 'Vikramaditya Rao',
    phone: '+91 98450 12345',
    email: 'vikram.roy@example.com',
    service: 'Renovation',
    appointmentDate: '2026-10-23',
    timeSlot: '04:30 PM',
    location: 'Virtual',
    status: 'upcoming',
    notes: 'Virtual 3D walk-through and budget review.',
  },
  {
    _id: 'app5',
    clientName: 'Meera Iyer',
    phone: '+91 98333 44556',
    email: 'meera.iyer@example.com',
    service: 'Architecture',
    appointmentDate: '2026-10-22',
    timeSlot: '11:00 AM',
    location: 'In-Person',
    status: 'cancelled',
    notes: 'Rescheduling requested by client.',
  },
  {
    _id: 'app6',
    clientName: 'Yallanagouda Hulyal',
    phone: '+91 98765 43210',
    email: 'yallanagouda@example.com',
    service: 'Architecture',
    appointmentDate: '2026-10-26',
    timeSlot: '02:00 PM',
    location: 'In-Person',
    status: 'confirmed',
    notes: 'Villa structural blueprint consultation.',
  },
];

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState(sampleAppointments);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);

  const [form, setForm] = useState({
    clientName: '',
    phone: '',
    email: '',
    service: 'Residential',
    appointmentDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    timeSlot: '10:30 AM',
    location: 'In-Person',
    status: 'upcoming',
    notes: '',
  });

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getAppointments({
        status: statusFilter !== 'all' ? statusFilter : undefined,
        search: search || undefined,
      });
      if (res.data?.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
        setAppointments(res.data.data);
      } else {
        setAppointments(sampleAppointments);
      }
    } catch {
      setAppointments(sampleAppointments);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [statusFilter]);

  const stats = useMemo(() => {
    const total = appointments.length;
    const upcoming = appointments.filter((a) => a.status === 'upcoming').length;
    const confirmed = appointments.filter((a) => a.status === 'confirmed').length;
    const completed = appointments.filter((a) => a.status === 'completed').length;
    const cancelled = appointments.filter((a) => a.status === 'cancelled').length;
    return { total, upcoming, confirmed, completed, cancelled };
  }, [appointments]);

  const filtered = useMemo(() => {
    return appointments.filter((a) => {
      const matchesSearch =
        !search ||
        a.clientName.toLowerCase().includes(search.toLowerCase()) ||
        a.phone.includes(search) ||
        (a.service && a.service.toLowerCase().includes(search.toLowerCase()));
      return matchesSearch;
    });
  }, [appointments, search]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.clientName || !form.phone || !form.appointmentDate) {
      toast.error('Client name, phone and date are required');
      return;
    }
    try {
      const res = await adminApi.createAppointment(form);
      toast.success('Appointment scheduled successfully');
      setAppointments([res.data?.data || { ...form, _id: Date.now().toString() }, ...appointments]);
      setModalOpen(false);
      setForm({
        clientName: '',
        phone: '',
        email: '',
        service: 'Architectural Consultation',
        appointmentDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        timeSlot: '10:00 AM - 11:30 AM',
        location: 'Studio Headquarters, Bengaluru',
        notes: '',
      });
    } catch {
      toast.success('Appointment scheduled (Demo)');
      setAppointments([{ ...form, _id: Date.now().toString(), status: 'scheduled' }, ...appointments]);
      setModalOpen(false);
    }
  };

  const handleToggleStatus = async (app) => {
    const nextStatus = app.status === 'scheduled' ? 'completed' : 'scheduled';
    try {
      await adminApi.updateAppointment(app._id, { status: nextStatus });
      toast.success(`Appointment marked as ${nextStatus}`);
      setAppointments(appointments.map((a) => (a._id === app._id ? { ...a, status: nextStatus } : a)));
    } catch {
      toast.success(`Appointment status updated (Demo)`);
      setAppointments(appointments.map((a) => (a._id === app._id ? { ...a, status: nextStatus } : a)));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this appointment record?')) return;
    try {
      await adminApi.deleteAppointment(id);
      toast.success('Appointment deleted');
      setAppointments(appointments.filter((a) => a._id !== id));
    } catch {
      toast.success('Appointment deleted (Demo)');
      setAppointments(appointments.filter((a) => a._id !== id));
    }
  };

  return (
    <div className="admin-appointments-root">
      <SeoMeta title="Appointments — Studio CMS" />

      {/* Header */}
      <div className="admin-page-hero">
        <div className="admin-page-header-text">
          <div className="admin-eyebrow">
            <Sparkles size={14} className="text-gold" />
            <span>STUDIO CONSULTATIONS</span>
          </div>
          <h1 className="admin-page-title">Client Appointments</h1>
          <p className="admin-page-subtitle">
            Manage studio consultations and project meetings.
          </p>
        </div>

        <div className="admin-header-actions">
          <button type="button" onClick={() => setModalOpen(true)} className="btn-admin-primary">
            <PlusCircle size={16} />
            <span>Add Appointment</span>
          </button>
        </div>
      </div>

      {/* Stats Cards (5 cards matching Screenshot 5) */}
      <div className="admin-stats-grid">
        <div className="stat-pill-card active-total">
          <div className="stat-icon-wrap gold">
            <Calendar size={18} />
          </div>
          <div className="stat-info">
            <span className="stat-count">{stats.total}</span>
            <span className="stat-name">Total Appointments</span>
          </div>
        </div>

        <div className="stat-pill-card">
          <div className="stat-icon-wrap blue">
            <Clock size={18} />
          </div>
          <div className="stat-info">
            <span className="stat-count">{stats.upcoming}</span>
            <span className="stat-name">Upcoming</span>
          </div>
        </div>

        <div className="stat-pill-card">
          <div className="stat-icon-wrap teal">
            <CheckCircle2 size={18} />
          </div>
          <div className="stat-info">
            <span className="stat-count">{stats.confirmed}</span>
            <span className="stat-name">Confirmed</span>
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
          <div className="stat-icon-wrap rose">
            <X size={18} />
          </div>
          <div className="stat-info">
            <span className="stat-count">{stats.cancelled}</span>
            <span className="stat-name">Cancelled</span>
          </div>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="admin-controls-card">
        <div className="admin-filter-tabs">
          {[
            { id: 'all', label: `All (${stats.total})` },
            { id: 'upcoming', label: `Upcoming (${stats.upcoming})` },
            { id: 'confirmed', label: `Confirmed (${stats.confirmed})` },
            { id: 'completed', label: `Completed (${stats.completed})` },
            { id: 'cancelled', label: `Cancelled (${stats.cancelled})` },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`admin-filter-btn ${statusFilter === tab.id ? 'active' : ''}`}
              onClick={() => setStatusFilter(tab.id)}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="admin-controls-right">
          <div className="admin-search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search by client name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="admin-search-input-field"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="admin-table-container">
        {loading ? (
          <div className="admin-empty-state">
            <div className="admin-loading-spinner" />
            <p>Loading appointments calendar...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="admin-empty-state">
            <Calendar size={42} className="empty-icon text-gold" />
            <h3>No Appointments Found</h3>
            <p>No client consultations found matching this criteria.</p>
          </div>
        ) : (
          <table className="admin-luxury-table">
            <thead>
              <tr>
                <th style={{ width: '45px', textAlign: 'center' }}>#</th>
                <th>CLIENT</th>
                <th>SERVICE</th>
                <th>DATE &amp; TIME</th>
                <th>TYPE</th>
                <th>STATUS</th>
                <th style={{ textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a, index) => (
                <tr key={a._id || index}>
                  <td style={{ textAlign: 'center', color: '#94A3B8', fontSize: '0.78rem' }}>{index + 1}</td>
                  <td>
                    <div className="table-client-cell">
                      <div className="t-user-avatar">{(a.clientName || 'C')[0]}</div>
                      <div>
                        <span className="client-table-name">{a.clientName}</span>
                        <span className="client-contact-sub">{a.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="table-scope-badge">{a.service}</span>
                  </td>
                  <td>
                    <div className="table-date-cell">
                      <span>{a.appointmentDate ? new Date(a.appointmentDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '25 Oct 2026'}, {a.timeSlot || '10:30 AM'}</span>
                    </div>
                  </td>
                  <td>
                    <span className="type-badge">{a.location || 'In-Person'}</span>
                  </td>
                  <td>
                    <span className={`status-pill pill-${(a.status || 'upcoming').toLowerCase()}`}>
                      {a.status ? a.status.charAt(0).toUpperCase() + a.status.slice(1) : 'Upcoming'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div className="table-actions-cell" style={{ justifyContent: 'flex-end' }}>
                      <button
                        type="button"
                        className="t-action-btn"
                        onClick={() => handleToggleStatus(a)}
                        title={a.status === 'completed' ? 'Reopen Consultation' : 'Mark Completed'}
                      >
                        <CheckCircle2 size={14} className={a.status === 'completed' ? 'text-emerald' : ''} />
                      </button>
                      <a
                        href={`https://wa.me/${a.phone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="t-action-btn"
                        title="Chat on WhatsApp"
                      >
                        <MessageSquare size={14} />
                      </a>
                      <button
                        type="button"
                        className="t-action-btn btn-danger"
                        onClick={() => handleDelete(a._id)}
                        title="Delete record"
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

      {/* Modal */}
      {modalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="admin-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div className="modal-title-group">
                <div className="modal-icon-badge">
                  <Calendar size={20} className="text-gold" />
                </div>
                <div>
                  <h3 className="modal-heading">Schedule Consultation</h3>
                  <p className="modal-subheading">Book an architectural briefing or site review with a prospective client.</p>
                </div>
              </div>
              <button type="button" className="modal-close-btn" onClick={() => setModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreate} className="admin-modal-form">
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

              <div className="grid-2" style={{ gap: '1rem' }}>
                <div className="form-group-wrap">
                  <label className="form-field-label required">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="form-luxury-input"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group-wrap">
                  <label className="form-field-label">Email Address</label>
                  <input
                    type="email"
                    placeholder="client@example.com"
                    className="form-luxury-input"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group-wrap">
                <label className="form-field-label required">Service Required</label>
                <select
                  className="form-luxury-select"
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                >
                  <option value="Architectural Consultation">Architectural Consultation</option>
                  <option value="Residential Construction Review">Residential Construction Review</option>
                  <option value="Interior Design & Modular Fit-out">Interior Design & Modular Fit-out</option>
                  <option value="Commercial Infrastructure Planning">Commercial Infrastructure Planning</option>
                  <option value="Structural & Vastu Audit">Structural & Vastu Audit</option>
                </select>
              </div>

              <div className="grid-2" style={{ gap: '1rem' }}>
                <div className="form-group-wrap">
                  <label className="form-field-label required">Date</label>
                  <input
                    type="date"
                    className="form-luxury-input"
                    value={form.appointmentDate}
                    onChange={(e) => setForm({ ...form, appointmentDate: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group-wrap">
                  <label className="form-field-label required">Time Slot</label>
                  <input
                    type="text"
                    placeholder="10:00 AM - 11:30 AM"
                    className="form-luxury-input"
                    value={form.timeSlot}
                    onChange={(e) => setForm({ ...form, timeSlot: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="form-group-wrap">
                <label className="form-field-label">Consultation Venue / Location</label>
                <input
                  type="text"
                  placeholder="Studio Headquarters, Bengaluru or On-Site"
                  className="form-luxury-input"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                />
              </div>

              <div className="modal-actions-row">
                <button type="button" className="btn-admin-cancel" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-admin-primary">
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .admin-appointments-root {
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

        .btn-admin-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--brand-gold);
          color: var(--brand-navy);
          font-weight: 700;
          font-size: 0.86rem;
          padding: 0.65rem 1.25rem;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 2px 10px rgba(234, 175, 53, 0.3);
        }

        .btn-admin-primary:hover {
          background: var(--brand-gold-hover);
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(234, 175, 53, 0.4);
        }

        .admin-stats-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1rem;
          margin: 1.5rem 0;
        }

        .stat-pill-card {
          background: #FFFFFF;
          border: 1px solid #E5E0D5;
          border-radius: 14px;
          padding: 1rem 1.15rem;
          display: flex;
          align-items: center;
          gap: 0.9rem;
          box-shadow: 0 2px 10px rgba(7, 23, 43, 0.03);
          transition: transform 0.2s;
        }

        .stat-pill-card:hover {
          transform: translateY(-2px);
          border-color: #D6CFC3;
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
        .stat-icon-wrap.blue {
          background: rgba(52, 120, 212, 0.12);
          color: #3478D4;
        }
        .stat-icon-wrap.teal {
          background: rgba(21, 154, 114, 0.12);
          color: #159A72;
        }
        .stat-icon-wrap.emerald {
          background: rgba(16, 185, 129, 0.12);
          color: #059669;
        }
        .stat-icon-wrap.rose {
          background: rgba(220, 69, 69, 0.12);
          color: #DC4545;
        }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-count {
          font-family: var(--font-serif);
          font-size: 1.5rem;
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
          flex-wrap: wrap;
        }

        .admin-filter-btn {
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
          color: var(--brand-navy);
          background: var(--brand-gold);
          border-color: var(--brand-gold);
          font-weight: 700;
          box-shadow: 0 2px 8px rgba(234, 175, 53, 0.3);
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
          color: #94A3B8;
        }

        .admin-search-input-field {
          width: 100%;
          background: #FAF7F0;
          border: 1px solid #E5E0D5;
          border-radius: 9999px;
          padding: 0.5rem 1rem 0.5rem 2.25rem;
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

        .admin-table-container {
          background: #FFFFFF;
          border: 1px solid #E5E0D5;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 4px 18px rgba(7, 23, 43, 0.04);
        }

        .admin-luxury-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .admin-luxury-table th {
          background: #F8F5EE;
          color: #64748B;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 0.95rem 1.15rem;
          border-bottom: 1px solid #E5E0D5;
          white-space: nowrap;
        }

        .admin-luxury-table td {
          padding: 1rem 1.15rem;
          border-bottom: 1px solid #EFEAE0;
          color: var(--text-primary);
          font-size: 0.86rem;
          vertical-align: middle;
        }

        .admin-luxury-table tr:hover td {
          background: #FAF7F0;
        }

        .type-badge {
          display: inline-block;
          background: #F1F5F9;
          color: #475569;
          padding: 0.2rem 0.65rem;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .status-pill {
          display: inline-flex;
          align-items: center;
          padding: 0.22rem 0.7rem;
          border-radius: 9999px;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: capitalize;
        }

        .status-pill.pill-confirmed {
          background: #ECFDF5;
          color: #047857;
        }

        .status-pill.pill-upcoming,
        .status-pill.pill-scheduled {
          background: #EFF6FF;
          color: #1D4ED8;
        }

        .status-pill.pill-completed {
          background: #ECFDF5;
          color: #047857;
        }

        .status-pill.pill-cancelled {
          background: #FEE2E2;
          color: #DC2626;
        }

        .admin-luxury-table tr:hover td {
          background: #F8FAFC;
        }

        .table-client-cell {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .t-user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #FEF3C7;
          color: #B45309;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .client-table-name {
          font-weight: 700;
          color: #07172B;
          display: block;
        }

        .client-contact-sub {
          font-size: 0.74rem;
          color: #64748B;
        }

        .table-scope-badge {
          font-size: 0.72rem;
          color: #1E40AF;
          background: #EFF6FF;
          border: 1px solid #BFDBFE;
          padding: 0.2rem 0.55rem;
          border-radius: 6px;
        }

        .table-date-cell {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          color: #334155;
          font-size: 0.82rem;
        }

        .time-pill {
          font-size: 0.7rem;
          color: #64748B;
          background: #F1F5F9;
          padding: 0.15rem 0.45rem;
          border-radius: 4px;
        }

        .table-loc-text {
          font-size: 0.82rem;
          color: #64748B;
        }

        .status-pill {
          font-size: 0.68rem;
          font-weight: 700;
          padding: 0.2rem 0.55rem;
          border-radius: 6px;
        }

        .status-pill.pill-scheduled {
          background: #FEF3C7;
          color: #B45309;
          border: 1px solid #FDE68A;
        }
        .status-pill.pill-completed {
          background: #ECFDF5;
          color: #047857;
          border: 1px solid #A7F3D0;
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
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          color: #475569;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .t-action-btn:hover {
          background: #FEF3C7;
          color: #07172B;
        }

        .t-action-btn.btn-danger:hover {
          background: #FEE2E2;
          color: #DC2626;
        }

        .admin-empty-state {
          padding: 4rem 2rem;
          text-align: center;
        }

        /* Modal */
        .admin-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(7, 23, 43, 0.6);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1.5rem;
        }

        .admin-modal-dialog {
          background: #FFFFFF;
          border-radius: 16px;
          width: 100%;
          max-width: 580px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
        }

        .admin-modal-header {
          padding: 1.5rem 1.75rem;
          border-bottom: 1px solid #E2E8F0;
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
          background: #FEF3C7;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-heading {
          font-family: 'Cinzel', Georgia, serif;
          font-size: 1.25rem;
          color: #07172B;
          margin: 0;
        }

        .modal-subheading {
          font-size: 0.78rem;
          color: #64748B;
          margin: 0.2rem 0 0;
        }

        .modal-close-btn {
          background: transparent;
          border: none;
          color: #64748B;
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
          color: #334155;
        }

        .form-field-label.required::after {
          content: ' *';
          color: #EAAF35;
        }

        .form-luxury-input,
        .form-luxury-select {
          background: #F8FAFC;
          border: 1px solid #CBD5E1;
          border-radius: 8px;
          padding: 0.65rem 0.95rem;
          color: #07172B;
          font-size: 0.88rem;
          outline: none;
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
          border-top: 1px solid #E2E8F0;
        }

        .btn-admin-cancel {
          background: transparent;
          border: 1px solid #CBD5E1;
          color: #64748B;
          padding: 0.65rem 1.25rem;
          border-radius: 8px;
          font-size: 0.85rem;
          cursor: pointer;
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
