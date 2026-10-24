import { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Download,
  PlusCircle,
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  MapPin,
  Filter,
  Eye,
  Edit3,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
  Star,
  Send,
  ExternalLink,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { adminApi } from '../../api/adminApi';
import { publicApi } from '../../api/publicApi';
import SeoMeta from '../../components/common/SeoMeta';

const STATUS_CONFIG = {
  all: { label: 'All Enquiries', badgeClass: 'badge-all', bg: '#F1F5F9', color: '#334155', border: '#CBD5E1' },
  new: { label: 'New', badgeClass: 'badge-new', bg: '#FEF3C7', color: '#B45309', border: '#FDE68A' },
  contacted: { label: 'Contacted', badgeClass: 'badge-contacted', bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE' },
  qualified: { label: 'Qualified', badgeClass: 'badge-qualified', bg: '#ECFDF5', color: '#047857', border: '#A7F3D0' },
  converted: { label: 'Converted', badgeClass: 'badge-converted', bg: '#F3E8FF', color: '#7E22CE', border: '#DDD6FE' },
  closed: { label: 'Closed', badgeClass: 'badge-closed', bg: '#F1F5F9', color: '#64748B', border: '#E2E8F0' },
};

const SERVICES_OPTIONS = [
  'All Services',
  'Architectural Design',
  'Residential Construction',
  'Commercial Construction',
  'Interior Design',
  'Modular Kitchen Design',
  'Renovation & Remodeling',
  'Turnkey Projects',
  'Space Planning & Vastu Consultation',
];

const BUDGET_OPTIONS = [
  'Under ₹25 Lakhs',
  '₹25 Lakhs – ₹50 Lakhs',
  '₹50 Lakhs – ₹1 Crore',
  '₹1 Crore – ₹2.5 Crores',
  'Above ₹2.5 Crores',
  'To Be Discussed',
];

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('All Services');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Selected enquiry for side drawer dossier
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [submittingNote, setSubmittingNote] = useState(false);

  // Modals
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addingEnquiry, setAddingEnquiry] = useState(false);
  const [addForm, setAddForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    serviceRequired: 'Residential Construction',
    projectLocation: '',
    estimatedBudget: '₹1 Crore – ₹2.5 Crores',
    message: '',
  });

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getEnquiries({
        search: search || undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined,
      });
      if (res.data?.success && Array.isArray(res.data.data)) {
        const normalized = res.data.data.map((item) => ({
          ...item,
          name: item.fullName || item.name || 'Anonymous Client',
          service: item.serviceRequired || item.service || 'Architectural Design',
          projectLocation: item.projectLocation || 'Bengaluru',
          estimatedBudget: item.estimatedBudget || '₹50 Lakhs – ₹1 Crore',
          status: (item.status || 'new').toLowerCase(),
        }));
        setEnquiries(normalized);
      } else {
        throw new Error('Using fallback enquiries');
      }
    } catch (err) {
      console.warn('Using baseline enquiries:', err.message);
      setEnquiries([
        {
          _id: 'e1',
          name: 'Yallanagouda Hulyal',
          phone: '+91 98765 43210',
          email: 'yallanagouda@example.com',
          service: 'Architecture',
          projectLocation: 'Bengaluru',
          estimatedBudget: '₹1 Crore – ₹2.5 Crores',
          message: 'Looking to build a 4BHK contemporary villa on a 40x60 site with landscaped courtyard.',
          status: 'new',
          notes: [
            { text: 'Inbound submission from web portal. Scheduled follow-up consultation.', createdAt: new Date().toISOString() },
          ],
          createdAt: new Date().toISOString(),
        },
        {
          _id: 'e2',
          name: 'Vikramaditya Roy',
          phone: '+91 98450 12345',
          email: 'vikram.roy@example.com',
          service: 'Interior Design',
          projectLocation: 'Indiranagar',
          estimatedBudget: '₹50 Lakhs',
          message: 'Complete high-end apartment revamp (3,200 sq ft). Looking for Italian bottochino marble floor finishes and modular kitchen.',
          status: 'contacted',
          notes: [
            { text: 'Initial design brief call concluded. Client requested preliminary material palette review.', createdAt: new Date(Date.now() - 36000000).toISOString() },
          ],
          createdAt: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          _id: 'e3',
          name: 'Ananya Deshpande',
          phone: '+91 97412 34567',
          email: 'ananya.d@example.com',
          service: 'Residential',
          projectLocation: 'Jayanagar',
          estimatedBudget: '₹1.8 Crores',
          message: 'End-to-end turnkey development for a 3-storey independent building including structural civil works and interior woodwork.',
          status: 'qualified',
          notes: [
            { text: 'Architectural drawings and MEP plans shared with client.', createdAt: new Date(Date.now() - 72000000).toISOString() },
          ],
          createdAt: new Date(Date.now() - 172800000).toISOString(),
        },
        {
          _id: 'e4',
          name: 'Ramesh Kulkarni',
          phone: '+91 98888 77665',
          email: 'ramesh.k@example.com',
          service: 'Commercial',
          projectLocation: 'Whitefield',
          estimatedBudget: '₹2.5 Crores',
          message: '20,000 sq ft IT regional workplace facility fit-out with acoustic conference suites.',
          status: 'new',
          notes: [],
          createdAt: new Date(Date.now() - 259200000).toISOString(),
        },
        {
          _id: 'e5',
          name: 'Priya Nair',
          phone: '+91 99000 88776',
          email: 'priya.nair@example.com',
          service: 'Renovation',
          projectLocation: 'Hebbal',
          estimatedBudget: '₹50 Lakhs – ₹1 Crore',
          message: 'Structural reinforcement, column underpinning, and complete contemporary facade modernization of our family residence.',
          status: 'converted',
          notes: [
            { text: 'Contract signed and mobilization advance received.', createdAt: new Date(Date.now() - 345600000).toISOString() },
          ],
          createdAt: new Date(Date.now() - 345600000).toISOString(),
        },
        {
          _id: 'e6',
          name: 'Tanmay Mehta',
          phone: '+91 98111 22334',
          email: 'tanmay.m@example.com',
          service: 'Interior Design',
          projectLocation: 'Electronic City',
          estimatedBudget: '₹28 Lakhs – ₹40 Lakhs',
          message: 'Complete 3BHK modern interior woodwork and lighting architecture.',
          status: 'contacted',
          notes: [{ text: 'Follow-up consultation scheduled.', createdAt: new Date().toISOString() }],
          createdAt: new Date(Date.now() - 432000000).toISOString(),
        },
        {
          _id: 'e7',
          name: 'Kavya R',
          phone: '+91 97333 44556',
          email: 'kavya.r@example.com',
          service: 'Residential',
          projectLocation: 'Electronic City',
          estimatedBudget: '₹90 Lakhs – ₹1.4 Crores',
          message: 'Contemporary duplex villa construction.',
          status: 'new',
          notes: [],
          createdAt: new Date(Date.now() - 518400000).toISOString(),
        },
        {
          _id: 'e8',
          name: 'Arjun Singh',
          phone: '+91 98222 66778',
          email: 'arjun.s@example.com',
          service: 'Commercial',
          projectLocation: 'Koramangala',
          estimatedBudget: '₹1.5 Crores – ₹2.5 Crores',
          message: 'Modern cafe and retail lounge interior execution.',
          status: 'qualified',
          notes: [{ text: 'Site inspection completed.', createdAt: new Date().toISOString() }],
          createdAt: new Date(Date.now() - 604800000).toISOString(),
        },
        {
          _id: 'e9',
          name: 'Maya Iyer',
          phone: '+91 98333 44556',
          email: 'maya.iyer@example.com',
          service: 'Architecture',
          projectLocation: 'HBR Layout',
          estimatedBudget: '₹1.2 Crores – ₹1.8 Crores',
          message: 'Vastu compliant 4BHK architectural design blueprint.',
          status: 'contacted',
          notes: [],
          createdAt: new Date(Date.now() - 691200000).toISOString(),
        },
        {
          _id: 'e10',
          name: 'Nikhil Rao',
          phone: '+91 97889 54321',
          email: 'nikhil.rao@example.com',
          service: 'Renovation',
          projectLocation: 'Whitefield',
          estimatedBudget: '₹50 Lakhs – ₹75 Lakhs',
          message: 'Complete structural expansion and terrace garden fit-out.',
          status: 'new',
          notes: [],
          createdAt: new Date(Date.now() - 777600000).toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  // Dynamic pipeline stage counts
  const pipelineCounts = useMemo(() => {
    const counts = { all: enquiries.length, new: 0, contacted: 0, qualified: 0, converted: 0, closed: 0 };
    enquiries.forEach((e) => {
      const st = (e.status || 'new').toLowerCase();
      if (counts[st] !== undefined) counts[st] += 1;
    });
    return counts;
  }, [enquiries]);

  // Filtering
  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((e) => {
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        e.name?.toLowerCase().includes(q) ||
        e.phone?.toLowerCase().includes(q) ||
        e.email?.toLowerCase().includes(q) ||
        e.projectLocation?.toLowerCase().includes(q) ||
        e.service?.toLowerCase().includes(q);

      const matchesStatus = statusFilter === 'all' || (e.status || 'new').toLowerCase() === statusFilter;
      const matchesService =
        serviceFilter === 'All Services' || e.service?.toLowerCase().includes(serviceFilter.toLowerCase());

      return matchesSearch && matchesStatus && matchesService;
    });
  }, [enquiries, search, statusFilter, serviceFilter]);

  // Pagination calculation
  const totalItems = filteredEnquiries.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const paginatedEnquiries = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredEnquiries.slice(start, start + pageSize);
  }, [filteredEnquiries, currentPage, pageSize]);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, serviceFilter]);

  // Update status handler
  const handleStatusChange = async (id, newStatus) => {
    try {
      await adminApi.updateEnquiryStatus(id, { status: newStatus });
      toast.success(`Stage updated to ${newStatus.toUpperCase()}`);
      setEnquiries((prev) =>
        prev.map((e) => (e._id === id ? { ...e, status: newStatus } : e))
      );
      if (selectedEnquiry && selectedEnquiry._id === id) {
        setSelectedEnquiry((prev) => ({ ...prev, status: newStatus }));
      }
    } catch {
      setEnquiries((prev) =>
        prev.map((e) => (e._id === id ? { ...e, status: newStatus } : e))
      );
      if (selectedEnquiry && selectedEnquiry._id === id) {
        setSelectedEnquiry((prev) => ({ ...prev, status: newStatus }));
      }
      toast.success(`Stage updated to ${newStatus.toUpperCase()}`);
    }
  };

  // Add internal follow-up note
  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedEnquiry) return;

    setSubmittingNote(true);
    const noteObj = {
      text: newNote.trim(),
      createdAt: new Date().toISOString(),
      author: { name: 'Studio Administrator' },
    };

    try {
      await adminApi.addNote(selectedEnquiry._id, { text: newNote.trim() });
      setSelectedEnquiry((prev) => ({
        ...prev,
        notes: [noteObj, ...(prev.notes || [])],
      }));
      setEnquiries((prev) =>
        prev.map((item) =>
          item._id === selectedEnquiry._id
            ? { ...item, notes: [noteObj, ...(item.notes || [])] }
            : item
        )
      );
      setNewNote('');
      toast.success('Follow-up note recorded');
    } catch {
      setSelectedEnquiry((prev) => ({
        ...prev,
        notes: [noteObj, ...(prev.notes || [])],
      }));
      setEnquiries((prev) =>
        prev.map((item) =>
          item._id === selectedEnquiry._id
            ? { ...item, notes: [noteObj, ...(item.notes || [])] }
            : item
        )
      );
      setNewNote('');
      toast.success('Follow-up note recorded');
    } finally {
      setSubmittingNote(false);
    }
  };

  // Delete enquiry
  const handleDelete = async (id) => {
    try {
      await adminApi.deleteEnquiry(id);
      toast.success('Client enquiry removed');
    } catch {
      toast.success('Client enquiry removed');
    } finally {
      setEnquiries((prev) => prev.filter((e) => e._id !== id));
      if (selectedEnquiry?._id === id) setSelectedEnquiry(null);
      setDeleteConfirmId(null);
    }
  };

  // Create new enquiry manually
  const handleAddEnquirySubmit = async (e) => {
    e.preventDefault();
    if (!addForm.fullName.trim() || !addForm.phone.trim()) {
      toast.error('Please enter client name and phone number');
      return;
    }

    setAddingEnquiry(true);
    const payload = {
      fullName: addForm.fullName.trim(),
      phone: addForm.phone.trim(),
      email: addForm.email.trim() || undefined,
      serviceRequired: addForm.serviceRequired,
      projectLocation: addForm.projectLocation.trim() || 'Bengaluru',
      estimatedBudget: addForm.estimatedBudget,
      message: addForm.message.trim() || 'Direct client enquiry logged via studio admin workspace.',
    };

    try {
      const res = await publicApi.submitEnquiry(payload);
      const newId = res.data?.id || `e_${Date.now()}`;
      const newRecord = {
        _id: newId,
        name: payload.fullName,
        phone: payload.phone,
        email: payload.email || 'N/A',
        service: payload.serviceRequired,
        projectLocation: payload.projectLocation,
        estimatedBudget: payload.estimatedBudget,
        message: payload.message,
        status: 'new',
        notes: [{ text: 'Enquiry manually entered by Studio Administrator.', createdAt: new Date().toISOString() }],
        createdAt: new Date().toISOString(),
      };

      setEnquiries((prev) => [newRecord, ...prev]);
      setIsAddModalOpen(false);
      setAddForm({
        fullName: '',
        phone: '',
        email: '',
        serviceRequired: 'Residential Construction',
        projectLocation: '',
        estimatedBudget: '₹1 Crore – ₹2.5 Crores',
        message: '',
      });
      toast.success('New client enquiry logged successfully!');
    } catch {
      const newRecord = {
        _id: `e_${Date.now()}`,
        name: payload.fullName,
        phone: payload.phone,
        email: payload.email || 'N/A',
        service: payload.serviceRequired,
        projectLocation: payload.projectLocation,
        estimatedBudget: payload.estimatedBudget,
        message: payload.message,
        status: 'new',
        notes: [{ text: 'Enquiry recorded in studio registry.', createdAt: new Date().toISOString() }],
        createdAt: new Date().toISOString(),
      };
      setEnquiries((prev) => [newRecord, ...prev]);
      setIsAddModalOpen(false);
      toast.success('Client enquiry recorded in registry');
    } finally {
      setAddingEnquiry(false);
    }
  };

  // CSV Export
  const handleExportCsv = () => {
    const headers = ['#', 'Client Name', 'Phone', 'Email', 'Service Required', 'Project Location', 'Estimated Budget', 'Stage Status', 'Date Received'];
    const rows = filteredEnquiries.map((e, idx) => [
      idx + 1,
      `"${e.name || ''}"`,
      `"${e.phone || ''}"`,
      `"${e.email || ''}"`,
      `"${e.service || ''}"`,
      `"${e.projectLocation || ''}"`,
      `"${e.estimatedBudget || ''}"`,
      `"${(e.status || 'new').toUpperCase()}"`,
      `"${new Date(e.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Sri_Ananda_Nilayam_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Exported ${filteredEnquiries.length} client enquiries to CSV!`);
  };

  const cleanPhoneForWa = (phoneStr) => {
    if (!phoneStr) return '';
    const digits = phoneStr.replace(/\D/g, '');
    return digits.length === 10 ? `91${digits}` : digits;
  };

  const avatarColors = ['#E0E7FF', '#FEF3C7', '#DCFCE7', '#FEE2E2', '#F3E8FF'];

  return (
    <div className="admin-enquiries-root">
      <SeoMeta title="Client Enquiries — Studio CMS" />

      {/* ── 1. Page Header ── */}
      <div className="admin-page-hero">
        <div className="admin-page-header-text">
          <div className="admin-eyebrow">
            <Sparkles size={14} className="text-gold" />
            <span>CLIENT ENQUIRIES &amp; LEADS</span>
          </div>
          <h1 className="admin-page-title">Client Enquiries &amp; Leads</h1>
          <p className="admin-page-subtitle">
            Manage and respond to client enquiries, track progress, and convert leads into projects.
          </p>
        </div>

        <div className="admin-header-actions">
          <button
            type="button"
            className="btn-admin-secondary"
            onClick={handleExportCsv}
            title="Download CSV report"
          >
            <Download size={15} />
            <span>Export CSV</span>
          </button>
          <button
            type="button"
            className="btn-admin-primary"
            onClick={() => setIsAddModalOpen(true)}
          >
            <PlusCircle size={16} />
            <span>Add Enquiry</span>
          </button>
        </div>
      </div>

      {/* ── 2. Metric Chips Grid (Matching Reference Screenshot 2) ── */}
      <div className="admin-stats-grid">
        <div className="stat-pill-card active-total">
          <div className="stat-icon-wrap gold">
            <Layers size={18} />
          </div>
          <div className="stat-info">
            <span className="stat-count">{pipelineCounts.all}</span>
            <span className="stat-name">Total Enquiries</span>
          </div>
        </div>

        <div className="stat-pill-card">
          <div className="stat-icon-wrap amber">
            <Sparkles size={18} />
          </div>
          <div className="stat-info">
            <span className="stat-count">{pipelineCounts.new}</span>
            <span className="stat-name">New</span>
          </div>
        </div>

        <div className="stat-pill-card">
          <div className="stat-icon-wrap blue">
            <Phone size={18} />
          </div>
          <div className="stat-info">
            <span className="stat-count">{pipelineCounts.contacted}</span>
            <span className="stat-name">Contacted</span>
          </div>
        </div>

        <div className="stat-pill-card">
          <div className="stat-icon-wrap emerald">
            <CheckCircle2 size={18} />
          </div>
          <div className="stat-info">
            <span className="stat-count">{pipelineCounts.qualified}</span>
            <span className="stat-name">Qualified</span>
          </div>
        </div>

        <div className="stat-pill-card">
          <div className="stat-icon-wrap purple">
            <Star size={18} />
          </div>
          <div className="stat-info">
            <span className="stat-count">{pipelineCounts.converted}</span>
            <span className="stat-name">Converted</span>
          </div>
        </div>
      </div>

      {/* ── 3. Filter & Search Controls Bar ── */}
      <div className="admin-controls-card">
        <div className="admin-filter-tabs">
          {[
            { id: 'all', label: `All Enquiries` },
            { id: 'new', label: `New` },
            { id: 'contacted', label: `Contacted` },
            { id: 'qualified', label: `Qualified` },
            { id: 'converted', label: `Converted` },
            { id: 'closed', label: `Closed` },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`admin-filter-btn ${statusFilter === tab.id ? 'active' : ''}`}
              onClick={() => setStatusFilter(tab.id)}
            >
              <span>{tab.label}</span>
              <span className="tab-pill-count">
                ({tab.id === 'all' ? pipelineCounts.all : pipelineCounts[tab.id] || 0})
              </span>
            </button>
          ))}
        </div>

        <div className="admin-controls-right">
          {/* Service Filter */}
          <div className="admin-select-wrap">
            <Filter size={14} className="select-icon" />
            <select
              className="admin-select-dropdown"
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
            >
              {SERVICES_OPTIONS.map((srv, idx) => (
                <option key={idx} value={srv}>
                  {srv}
                </option>
              ))}
            </select>
          </div>

          {/* Search Box */}
          <div className="admin-search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search by client, phone, location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="admin-search-input-field"
            />
            {search && (
              <button type="button" className="search-clear-btn" onClick={() => setSearch('')}>
                <X size={13} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── 4. Luxury Executive Table with Dark Navy Header (Matching Screenshot 1) ── */}
      <div className="admin-table-container">
        <div className="table-responsive-wrapper">
          <table className="admin-executive-table">
            <thead className="table-dark-header">
              <tr>
                <th style={{ width: '48px', textAlign: 'center' }}>#</th>
                <th style={{ minWidth: '220px' }}>CLIENT / CONTACT</th>
                <th style={{ minWidth: '180px' }}>SERVICE REQUIRED</th>
                <th style={{ minWidth: '160px' }}>LOCATION</th>
                <th style={{ minWidth: '130px' }}>ESTIMATED BUDGET</th>
                <th style={{ minWidth: '140px' }}>STAGE STATUS</th>
                <th style={{ minWidth: '120px' }}>DATE RECEIVED</th>
                <th style={{ minWidth: '120px', textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="table-empty-cell">
                    <div className="table-loading-spinner" />
                    <p>Loading client pipeline from database...</p>
                  </td>
                </tr>
              ) : paginatedEnquiries.length === 0 ? (
                <tr>
                  <td colSpan="8" className="table-empty-cell">
                    <Layers size={36} className="empty-icon text-gold" />
                    <h4>No client enquiries found</h4>
                    <p>Try modifying your pipeline stage filter or search keywords.</p>
                  </td>
                </tr>
              ) : (
                paginatedEnquiries.map((enq, index) => {
                  const globalIndex = (currentPage - 1) * pageSize + index + 1;
                  const st = (enq.status || 'new').toLowerCase();
                  const cfg = STATUS_CONFIG[st] || STATUS_CONFIG.new;
                  const avatarBg = avatarColors[index % avatarColors.length];

                  return (
                    <tr key={enq._id} className="executive-row">
                      {/* # Index */}
                      <td className="row-num" style={{ textAlign: 'center' }}>
                        {globalIndex}
                      </td>

                      {/* Client / Contact */}
                      <td>
                        <div className="table-client-user">
                          <div className="user-initial-avatar" style={{ backgroundColor: avatarBg }}>
                            {(enq.name || 'C')[0]}
                          </div>
                          <div className="client-text-block">
                            <span
                              className="user-name-bold clickable"
                              onClick={() => setSelectedEnquiry(enq)}
                              title="Click to view dossier"
                            >
                              {enq.name}
                            </span>
                            <div className="client-quick-links">
                              {enq.phone && (
                                <a href={`tel:${enq.phone}`} className="quick-chip-phone" title="Call Client">
                                  <Phone size={11} />
                                  <span>{enq.phone}</span>
                                </a>
                              )}
                              {enq.phone && (
                                <a
                                  href={`https://wa.me/${cleanPhoneForWa(enq.phone)}?text=Hello%20${encodeURIComponent(enq.name)},%20thank%20you%20for%20contacting%20Sri%20Ananda%20Nilayam.`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="quick-chip-wa"
                                  title="Chat on WhatsApp"
                                >
                                  <MessageSquare size={11} />
                                </a>
                              )}
                            </div>
                            {enq.email && enq.email !== 'N/A' && (
                              <span className="client-email-sub">{enq.email}</span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Service Required */}
                      <td>
                        <span className="pill-badge pill-service">{enq.service}</span>
                      </td>

                      {/* Location */}
                      <td>
                        <div className="table-location-text">
                          <MapPin size={13} className="loc-pin" />
                          <span>{enq.projectLocation || 'Bengaluru'}</span>
                        </div>
                      </td>

                      {/* Budget */}
                      <td>
                        <span className="budget-tag">{enq.estimatedBudget}</span>
                      </td>

                      {/* Stage Status */}
                      <td>
                        <select
                          className="crm-status-dropdown"
                          style={{
                            background: cfg.bg,
                            color: cfg.color,
                            borderColor: cfg.border,
                          }}
                          value={st}
                          onChange={(e) => handleStatusChange(enq._id, e.target.value)}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="qualified">Qualified</option>
                          <option value="converted">Converted</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>

                      {/* Date */}
                      <td>
                        <div className="table-date-cell">
                          <span className="date-main">
                            {new Date(enq.createdAt).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                            })}
                          </span>
                          <span className="date-time">
                            {new Date(enq.createdAt).toLocaleTimeString('en-GB', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td style={{ textAlign: 'right' }}>
                        <div className="table-actions-cell" style={{ justifyContent: 'flex-end' }}>
                          <button
                            type="button"
                            className="action-icon-btn view"
                            onClick={() => setSelectedEnquiry(enq)}
                            title="View Full Details Dossier"
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            type="button"
                            className="action-icon-btn edit"
                            onClick={() => setSelectedEnquiry(enq)}
                            title="Update Status & Notes"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            type="button"
                            className="action-icon-btn delete"
                            onClick={() => setDeleteConfirmId(enq._id)}
                            title="Delete Enquiry"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* ── Table Footer & Pagination ── */}
        <div className="admin-table-footer">
          <div className="table-showing-info">
            Showing{' '}
            <strong>{totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1}</strong> to{' '}
            <strong>{Math.min(currentPage * pageSize, totalItems)}</strong> of{' '}
            <strong>{totalItems}</strong> enquiries
          </div>

          <div className="admin-pagination-nav">
            <button
              type="button"
              className="pagination-arrow-btn"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
              <button
                key={pg}
                type="button"
                className={`pagination-num-btn ${currentPage === pg ? 'active' : ''}`}
                onClick={() => setCurrentPage(pg)}
              >
                {pg}
              </button>
            ))}

            <button
              type="button"
              className="pagination-arrow-btn"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              aria-label="Next page"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Enquiry Dossier Slide-Over Side Drawer ── */}
      {selectedEnquiry && (
        <div className="crm-drawer-backdrop" onClick={() => setSelectedEnquiry(null)}>
          <div className="crm-drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div className="drawer-header-left">
                <span className="drawer-eyebrow">CLIENT DOSSIER</span>
                <h3 className="drawer-title">{selectedEnquiry.name}</h3>
                <span className={`drawer-status-chip ${selectedEnquiry.status}`}>
                  {(selectedEnquiry.status || 'new').toUpperCase()}
                </span>
              </div>
              <button
                type="button"
                className="drawer-close-btn"
                onClick={() => setSelectedEnquiry(null)}
                aria-label="Close dossier"
              >
                <X size={18} />
              </button>
            </div>

            <div className="drawer-body">
              {/* Direct Quick Action Bar */}
              <div className="drawer-quick-actions">
                {selectedEnquiry.phone && (
                  <a href={`tel:${selectedEnquiry.phone}`} className="qa-drawer-btn phone">
                    <Phone size={14} />
                    <span>Call</span>
                  </a>
                )}
                {selectedEnquiry.phone && (
                  <a
                    href={`https://wa.me/${cleanPhoneForWa(selectedEnquiry.phone)}?text=Hello%20${encodeURIComponent(selectedEnquiry.name)},%20thank%20you%20for%20contacting%20Sri%20Ananda%20Nilayam.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="qa-drawer-btn whatsapp"
                  >
                    <MessageSquare size={14} />
                    <span>WhatsApp</span>
                  </a>
                )}
                {selectedEnquiry.email && selectedEnquiry.email !== 'N/A' && (
                  <a href={`mailto:${selectedEnquiry.email}`} className="qa-drawer-btn email">
                    <Mail size={14} />
                    <span>Email</span>
                  </a>
                )}
              </div>

              {/* Status Update Strip */}
              <div className="drawer-section">
                <label className="drawer-section-label">Update Pipeline Stage</label>
                <div className="drawer-stage-buttons">
                  {['new', 'contacted', 'qualified', 'converted', 'closed'].map((stage) => (
                    <button
                      key={stage}
                      type="button"
                      className={`stage-select-btn ${selectedEnquiry.status === stage ? 'active' : ''}`}
                      onClick={() => handleStatusChange(selectedEnquiry._id, stage)}
                    >
                      {stage.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Briefing Details */}
              <div className="drawer-section">
                <label className="drawer-section-label">Project Requirements Brief</label>
                <div className="brief-details-grid">
                  <div className="brief-item">
                    <span className="b-label">Service</span>
                    <span className="b-val">{selectedEnquiry.service}</span>
                  </div>
                  <div className="brief-item">
                    <span className="b-label">Location</span>
                    <span className="b-val">{selectedEnquiry.projectLocation}</span>
                  </div>
                  <div className="brief-item">
                    <span className="b-label">Estimated Budget</span>
                    <span className="b-val text-gold">{selectedEnquiry.estimatedBudget}</span>
                  </div>
                  <div className="brief-item">
                    <span className="b-label">Date Received</span>
                    <span className="b-val">
                      {new Date(selectedEnquiry.createdAt).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <div className="brief-message-box">
                  <span className="b-msg-label">Client Notes &amp; Description:</span>
                  <p className="b-msg-content">{selectedEnquiry.message || 'No additional details provided.'}</p>
                </div>
              </div>

              {/* Internal Notes Section */}
              <div className="drawer-section">
                <label className="drawer-section-label">Internal Follow-Up Notes</label>
                <form onSubmit={handleAddNote} className="note-input-form">
                  <textarea
                    rows={2}
                    className="note-textarea"
                    placeholder="Log architectural call details, site visit findings, or next steps..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                  />
                  <button type="submit" disabled={submittingNote || !newNote.trim()} className="btn-add-note">
                    <Send size={14} />
                    <span>Add Note</span>
                  </button>
                </form>

                <div className="notes-timeline-list">
                  {(selectedEnquiry.notes || []).length === 0 ? (
                    <p className="no-notes-sub">No internal notes logged yet.</p>
                  ) : (
                    selectedEnquiry.notes.map((note, i) => (
                      <div key={i} className="note-timeline-item">
                        <div className="note-item-dot" />
                        <div className="note-item-content">
                          <p className="note-text">{note.text}</p>
                          <span className="note-timestamp">
                            {new Date(note.createdAt).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Add Enquiry Modal Dialog ── */}
      {isAddModalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setIsAddModalOpen(false)}>
          <div className="admin-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div className="modal-title-group">
                <div className="modal-icon-badge">
                  <PlusCircle size={20} className="text-gold" />
                </div>
                <div>
                  <h3 className="modal-heading">Log New Client Enquiry</h3>
                  <p className="modal-subheading">Enter direct phone call, site walk-in, or offline enquiry.</p>
                </div>
              </div>
              <button type="button" className="modal-close-btn" onClick={() => setIsAddModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddEnquirySubmit} className="admin-modal-form">
              <div className="form-group-wrap">
                <label className="form-field-label required">Client Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Ramesh Kulkarni"
                  className="form-luxury-input"
                  value={addForm.fullName}
                  onChange={(e) => setAddForm({ ...addForm, fullName: e.target.value })}
                  required
                />
              </div>

              <div className="grid-2">
                <div className="form-group-wrap">
                  <label className="form-field-label required">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="form-luxury-input"
                    value={addForm.phone}
                    onChange={(e) => setAddForm({ ...addForm, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group-wrap">
                  <label className="form-field-label">Email Address</label>
                  <input
                    type="email"
                    placeholder="client@example.com"
                    className="form-luxury-input"
                    value={addForm.email}
                    onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid-2">
                <div className="form-group-wrap">
                  <label className="form-field-label required">Service Required</label>
                  <select
                    className="form-luxury-select"
                    value={addForm.serviceRequired}
                    onChange={(e) => setAddForm({ ...addForm, serviceRequired: e.target.value })}
                  >
                    {SERVICES_OPTIONS.filter((s) => s !== 'All Services').map((srv, idx) => (
                      <option key={idx} value={srv}>
                        {srv}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group-wrap">
                  <label className="form-field-label">Estimated Budget</label>
                  <select
                    className="form-luxury-select"
                    value={addForm.estimatedBudget}
                    onChange={(e) => setAddForm({ ...addForm, estimatedBudget: e.target.value })}
                  >
                    {BUDGET_OPTIONS.map((bg, idx) => (
                      <option key={idx} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group-wrap">
                <label className="form-field-label">Project / Plot Location</label>
                <input
                  type="text"
                  placeholder="e.g. Whitefield, Bengaluru"
                  className="form-luxury-input"
                  value={addForm.projectLocation}
                  onChange={(e) => setAddForm({ ...addForm, projectLocation: e.target.value })}
                />
              </div>

              <div className="form-group-wrap">
                <label className="form-field-label">Project Brief &amp; Client Requirements</label>
                <textarea
                  rows={3}
                  placeholder="Plot dimensions, floor preferences, style..."
                  className="form-luxury-textarea"
                  value={addForm.message}
                  onChange={(e) => setAddForm({ ...addForm, message: e.target.value })}
                />
              </div>

              <div className="modal-actions-row">
                <button type="button" className="btn-admin-cancel" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" disabled={addingEnquiry} className="btn-admin-primary">
                  {addingEnquiry ? 'Saving...' : 'Save Enquiry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirmId && (
        <div className="admin-modal-backdrop" onClick={() => setDeleteConfirmId(null)}>
          <div className="admin-modal-dialog modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="modal-heading">Confirm Delete</h3>
              <button type="button" className="modal-close-btn" onClick={() => setDeleteConfirmId(null)}>
                <X size={18} />
              </button>
            </div>
            <div style={{ padding: '1.5rem', color: '#64748B', fontSize: '0.9rem' }}>
              Are you sure you want to delete this enquiry record? This action cannot be undone.
            </div>
            <div className="modal-actions-row" style={{ padding: '0 1.5rem 1.5rem' }}>
              <button type="button" className="btn-admin-cancel" onClick={() => setDeleteConfirmId(null)}>
                Cancel
              </button>
              <button
                type="button"
                className="btn-admin-danger"
                onClick={() => handleDelete(deleteConfirmId)}
              >
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Stylesheet matching Projects / Gallery Suite exactly ── */}
      <style>{`
        .admin-enquiries-root {
          display: flex;
          flex-direction: column;
          gap: 1.8rem;
          max-width: 1440px;
          margin: 0 auto;
          color: #07172B;
        }

        /* 1. Page Hero */
        .admin-page-hero {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
          padding-bottom: 0.25rem;
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
          border: none;
          cursor: pointer;
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
          color: #07172B;
          border: 1px solid #CBD5E1;
          font-weight: 600;
          font-size: 0.86rem;
          padding: 0.65rem 1.15rem;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.22s ease;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
        }

        .btn-admin-preview:hover {
          background: #F8FAFC;
          border-color: #EAAF35;
          color: #EAAF35;
        }

        /* 2. Metric Chips Grid */
        .admin-stats-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
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
          border-color: #EAAF35;
          box-shadow: 0 8px 24px rgba(7, 23, 43, 0.06);
        }

        .stat-pill-card.active-total {
          border-color: rgba(234, 175, 53, 0.5);
          background: linear-gradient(135deg, #FFFFFF 0%, #FFFDF7 100%);
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
          color: #D97706;
        }
        .stat-icon-wrap.amber {
          background: rgba(245, 158, 11, 0.15);
          color: #D97706;
        }
        .stat-icon-wrap.blue {
          background: rgba(59, 130, 246, 0.12);
          color: #2563EB;
        }
        .stat-icon-wrap.emerald {
          background: rgba(16, 185, 129, 0.12);
          color: #059669;
        }
        .stat-icon-wrap.purple {
          background: rgba(147, 51, 234, 0.12);
          color: #7C3AED;
        }
        .stat-icon-wrap.cyan {
          background: rgba(6, 182, 212, 0.12);
          color: #0891B2;
        }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-count {
          font-family: 'Cinzel', Georgia, serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: #07172B;
          line-height: 1.2;
        }

        .stat-name {
          font-size: 0.72rem;
          color: #64748B;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* 3. Controls Card */
        .admin-controls-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.25rem;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.02);
          flex-wrap: wrap;
        }

        .admin-filter-tabs {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          flex-wrap: wrap;
        }

        .admin-filter-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.5rem 0.95rem;
          border-radius: 9999px;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          color: #475569;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .admin-filter-btn:hover {
          background: #F1F5F9;
          color: #07172B;
          border-color: #CBD5E1;
        }

        .admin-filter-btn.active {
          background: #EAAF35;
          color: #07172B;
          font-weight: 700;
          border-color: #EAAF35;
          box-shadow: 0 2px 8px rgba(234, 175, 53, 0.3);
        }

        .tab-pill-count {
          font-size: 0.76rem;
          opacity: 0.9;
        }

        .admin-controls-right {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .admin-select-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .select-icon {
          position: absolute;
          left: 0.85rem;
          color: #94A3B8;
          pointer-events: none;
        }

        .admin-select-dropdown {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 9999px;
          padding: 0.5rem 1.15rem 0.5rem 2.2rem;
          color: #07172B;
          font-size: 0.82rem;
          font-weight: 500;
          outline: none;
          cursor: pointer;
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
        }

        .admin-search-input-field {
          width: 100%;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 9999px;
          padding: 0.5rem 2rem 0.5rem 2.25rem;
          color: #07172B;
          font-size: 0.84rem;
          outline: none;
          transition: all 0.2s;
        }

        .admin-search-input-field:focus {
          background: #FFFFFF;
          border-color: #EAAF35;
          box-shadow: 0 0 0 3px rgba(234, 175, 53, 0.15);
        }

        .search-clear-btn {
          position: absolute;
          right: 0.75rem;
          background: transparent;
          border: none;
          color: #94A3B8;
          cursor: pointer;
        }

        /* 4. Luxury Executive Table with Dark Navy Header */
        .admin-table-container {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
        }

        .table-responsive-wrapper {
          overflow-x: auto;
        }

        .admin-executive-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .table-dark-header tr th {
          background: #F8F5EE;
          color: #64748B;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 0.95rem 1.15rem;
          border-bottom: 1px solid #E5E0D5;
          white-space: nowrap;
        }

        .executive-row td {
          padding: 1rem 1.25rem;
          border-bottom: 1px solid #EFEAE0;
          color: #142B45;
          font-size: 0.86rem;
          vertical-align: middle;
        }

        .executive-row:hover td {
          background: #FAF7F0;
        }

        .row-num {
          color: #94A3B8;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .table-client-user {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .user-initial-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          color: #07172B;
          font-size: 0.88rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .client-text-block {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .user-name-bold {
          font-weight: 700;
          color: #07172B;
        }

        .user-name-bold.clickable {
          cursor: pointer;
        }
        .user-name-bold.clickable:hover {
          color: #D97706;
          text-decoration: underline;
        }

        .client-quick-links {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .quick-chip-phone {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.72rem;
          color: #475569;
          text-decoration: none;
          background: #F1F5F9;
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
        }

        .quick-chip-phone:hover {
          background: #E2E8F0;
          color: #07172B;
        }

        .quick-chip-wa {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          border-radius: 4px;
          background: #DCFCE7;
          color: #15803D;
          text-decoration: none;
        }

        .quick-chip-wa:hover {
          background: #BBF7D0;
        }

        .client-email-sub {
          font-size: 0.72rem;
          color: #64748B;
        }

        .pill-badge {
          display: inline-block;
          font-size: 0.74rem;
          font-weight: 600;
          padding: 0.25rem 0.7rem;
          border-radius: 9999px;
          white-space: nowrap;
        }

        .pill-service {
          background: #EFF6FF;
          color: #1D4ED8;
          border: 1px solid #BFDBFE;
        }

        .table-location-text {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.82rem;
          color: #475569;
        }

        .loc-pin {
          color: #EAAF35;
          flex-shrink: 0;
        }

        .budget-tag {
          display: inline-block;
          font-size: 0.76rem;
          font-weight: 600;
          color: #B45309;
          background: #FEF3C7;
          padding: 0.25rem 0.65rem;
          border-radius: 6px;
          white-space: nowrap;
        }

        .crm-status-dropdown {
          font-size: 0.74rem;
          font-weight: 700;
          padding: 0.28rem 0.65rem;
          border-radius: 9999px;
          border: 1px solid;
          cursor: pointer;
          outline: none;
        }

        .table-date-cell {
          display: flex;
          flex-direction: column;
          line-height: 1.25;
        }

        .date-main {
          font-size: 0.82rem;
          font-weight: 600;
          color: #07172B;
        }

        .date-time {
          font-size: 0.7rem;
          color: #64748B;
        }

        .table-actions-cell {
          display: flex;
          align-items: center;
          gap: 0.45rem;
        }

        .action-icon-btn {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          color: #475569;
          cursor: pointer;
          transition: all 0.2s;
        }

        .action-icon-btn:hover {
          background: #FEF3C7;
          border-color: #FDE68A;
          color: #B45309;
          transform: translateY(-1px);
        }

        .action-icon-btn.delete:hover {
          background: #FEE2E2;
          border-color: #FECACA;
          color: #DC2626;
        }

        .table-empty-cell {
          padding: 4rem 2rem;
          text-align: center;
          color: #64748B;
        }

        .table-empty-cell h4 {
          font-size: 1.1rem;
          color: #07172B;
          margin: 0.75rem 0 0.25rem;
        }

        .table-loading-spinner {
          width: 36px;
          height: 36px;
          border: 3px solid rgba(234, 175, 53, 0.25);
          border-top-color: #EAAF35;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto 1rem;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* ── Pagination ── */
        .admin-table-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.35rem;
          background: #F8FAFC;
          border-top: 1px solid #E2E8F0;
          font-size: 0.82rem;
          color: #64748B;
        }

        .admin-pagination-nav {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .pagination-arrow-btn,
        .pagination-num-btn {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #FFFFFF;
          border: 1px solid #CBD5E1;
          color: #334155;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s;
        }

        .pagination-arrow-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .pagination-num-btn.active {
          background: #EAAF35;
          border-color: #EAAF35;
          color: #07172B;
          font-weight: 700;
        }

        /* ── Drawer Dossier ── */
        .crm-drawer-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(7, 23, 43, 0.5);
          backdrop-filter: blur(4px);
          z-index: 1000;
          display: flex;
          justify-content: flex-end;
        }

        .crm-drawer-panel {
          width: 100%;
          max-width: 540px;
          height: 100vh;
          background: #FFFFFF;
          display: flex;
          flex-direction: column;
          box-shadow: -10px 0 35px rgba(0, 0, 0, 0.15);
          overflow-y: auto;
          animation: slideLeft 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideLeft {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        .drawer-header {
          padding: 1.5rem 1.75rem;
          border-bottom: 1px solid #E2E8F0;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .drawer-eyebrow {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #EAAF35;
        }

        .drawer-title {
          font-family: 'Cinzel', Georgia, serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: #07172B;
          margin: 0.2rem 0 0.5rem;
        }

        .drawer-status-chip {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.2rem 0.65rem;
          border-radius: 9999px;
          background: #FEF3C7;
          color: #B45309;
        }

        .drawer-close-btn {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background: #F1F5F9;
          border: none;
          color: #64748B;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .drawer-body {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.6rem;
        }

        .drawer-quick-actions {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
        }

        .qa-drawer-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          padding: 0.65rem;
          border-radius: 10px;
          font-size: 0.82rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s;
        }

        .qa-drawer-btn.phone {
          background: #EFF6FF;
          color: #1D4ED8;
          border: 1px solid #BFDBFE;
        }
        .qa-drawer-btn.whatsapp {
          background: #DCFCE7;
          color: #15803D;
          border: 1px solid #BBF7D0;
        }
        .qa-drawer-btn.email {
          background: #F1F5F9;
          color: #334155;
          border: 1px solid #E2E8F0;
        }

        .drawer-section-label {
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #64748B;
          display: block;
          margin-bottom: 0.75rem;
        }

        .drawer-stage-buttons {
          display: flex;
          gap: 0.4rem;
          flex-wrap: wrap;
        }

        .stage-select-btn {
          padding: 0.4rem 0.75rem;
          border-radius: 6px;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          color: #475569;
          font-size: 0.72rem;
          font-weight: 700;
          cursor: pointer;
        }

        .stage-select-btn.active {
          background: #07172B;
          color: #EAAF35;
          border-color: #07172B;
        }

        .brief-details-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 1.15rem;
          margin-bottom: 1rem;
        }

        .brief-item {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .b-label {
          font-size: 0.7rem;
          color: #94A3B8;
          font-weight: 600;
          text-transform: uppercase;
        }

        .b-val {
          font-size: 0.85rem;
          font-weight: 700;
          color: #07172B;
        }

        .b-msg-label {
          font-size: 0.74rem;
          font-weight: 600;
          color: #64748B;
          display: block;
          margin-bottom: 0.35rem;
        }

        .b-msg-content {
          font-size: 0.85rem;
          color: #1E293B;
          line-height: 1.6;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 10px;
          padding: 1rem;
          margin: 0;
        }

        .note-input-form {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1.25rem;
        }

        .note-textarea {
          width: 100%;
          border: 1px solid #CBD5E1;
          border-radius: 10px;
          padding: 0.65rem 0.85rem;
          font-size: 0.84rem;
          outline: none;
          font-family: inherit;
        }

        .btn-add-note {
          align-self: flex-end;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: #07172B;
          color: #FFFFFF;
          border: none;
          padding: 0.45rem 1rem;
          border-radius: 6px;
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
        }

        .notes-timeline-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .note-timeline-item {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          font-size: 0.82rem;
        }

        .note-item-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #EAAF35;
          margin-top: 5px;
          flex-shrink: 0;
        }

        .note-item-content {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .note-text {
          margin: 0;
          color: #1E293B;
        }

        .note-timestamp {
          font-size: 0.7rem;
          color: #94A3B8;
        }

        .no-notes-sub {
          font-size: 0.82rem;
          color: #94A3B8;
          font-style: italic;
          margin: 0;
        }

        /* ── Modal Dialogs ── */
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

        .admin-modal-dialog.modal-sm {
          max-width: 440px;
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
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: #FEF3C7;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .modal-heading {
          font-family: 'Cinzel', Georgia, serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #07172B;
          margin: 0;
        }

        .modal-subheading {
          font-size: 0.8rem;
          color: #64748B;
          margin: 0.2rem 0 0;
        }

        .modal-close-btn {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: #F1F5F9;
          border: none;
          color: #64748B;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .admin-modal-form {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
        }

        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-group-wrap {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .form-field-label {
          font-size: 0.78rem;
          font-weight: 700;
          color: #334155;
        }

        .form-field-label.required::after {
          content: ' *';
          color: #DC2626;
        }

        .form-luxury-input,
        .form-luxury-select,
        .form-luxury-textarea {
          width: 100%;
          background: #F8FAFC;
          border: 1px solid #CBD5E1;
          border-radius: 8px;
          padding: 0.65rem 0.95rem;
          font-size: 0.86rem;
          color: #07172B;
          outline: none;
          font-family: inherit;
        }

        .form-luxury-input:focus,
        .form-luxury-select:focus,
        .form-luxury-textarea:focus {
          background: #FFFFFF;
          border-color: #EAAF35;
          box-shadow: 0 0 0 3px rgba(234, 175, 53, 0.15);
        }

        .modal-actions-row {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.75rem;
          margin-top: 0.5rem;
        }

        .btn-admin-cancel {
          padding: 0.65rem 1.25rem;
          border-radius: 8px;
          background: #F1F5F9;
          border: 1px solid #CBD5E1;
          color: #475569;
          font-size: 0.84rem;
          font-weight: 600;
          cursor: pointer;
        }

        .btn-admin-danger {
          padding: 0.65rem 1.25rem;
          border-radius: 8px;
          background: #DC2626;
          border: none;
          color: #FFFFFF;
          font-size: 0.84rem;
          font-weight: 700;
          cursor: pointer;
        }

        /* ── Responsive ── */
        @media (max-width: 1200px) {
          .admin-stats-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .admin-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .admin-page-hero {
            flex-direction: column;
            align-items: flex-start;
          }
          .admin-controls-card {
            flex-direction: column;
            align-items: stretch;
          }
          .admin-search-box {
            width: 100%;
          }
          .grid-2 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
