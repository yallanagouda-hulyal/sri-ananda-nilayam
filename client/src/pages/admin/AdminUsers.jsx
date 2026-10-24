import { useState, useEffect, useMemo } from 'react';
import {
  PlusCircle,
  Edit,
  Trash2,
  UserCheck,
  X,
  Sparkles,
  Shield,
  ShieldCheck,
  User,
  Mail,
  Calendar,
  Lock,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { adminApi } from '../../api/adminApi';
import { useAuth } from '../../context/AuthContext';
import SeoMeta from '../../components/common/SeoMeta';

export default function AdminUsers() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'editor',
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getUsers();
      if (res.data?.success && res.data.data?.length > 0) {
        setUsers(res.data.data);
      } else {
        setUsers([
          {
            _id: '1',
            name: 'Studio Administrator',
            email: 'admin@srianandanilayam.example',
            role: 'super_admin',
            createdAt: '2026-01-15T09:00:00Z',
          },
          {
            _id: '2',
            name: 'Lead Architectural Editor',
            email: 'editor@srianandanilayam.example',
            role: 'editor',
            createdAt: '2026-04-10T11:30:00Z',
          },
        ]);
      }
    } catch {
      setUsers([
        {
          _id: '1',
          name: 'Studio Administrator',
          email: 'admin@srianandanilayam.example',
          role: 'super_admin',
          createdAt: '2026-01-15T09:00:00Z',
        },
        {
          _id: '2',
          name: 'Lead Architectural Editor',
          email: 'editor@srianandanilayam.example',
          role: 'editor',
          createdAt: '2026-04-10T11:30:00Z',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const stats = useMemo(() => {
    const total = users.length;
    const superAdmins = users.filter((u) => u.role === 'super_admin' || u.role === 'superadmin').length;
    const editors = users.filter((u) => u.role === 'editor').length;
    return { total, superAdmins, editors };
  }, [users]);

  const handleOpenCreateModal = () => {
    setEditingUser(null);
    setForm({ name: '', email: '', password: '', role: 'editor' });
    setModalOpen(true);
  };

  const handleOpenEditModal = (u) => {
    setEditingUser(u);
    setForm({
      name: u.name || '',
      email: u.email || '',
      password: '',
      role: u.role || 'editor',
    });
    setModalOpen(true);
  };

  const handleSubmitUser = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error('Name and email are required');
      return;
    }
    if (!editingUser && !form.password) {
      toast.error('Password is required for new accounts');
      return;
    }

    try {
      if (editingUser) {
        const payload = { name: form.name, email: form.email, role: form.role };
        if (form.password) payload.password = form.password;
        await adminApi.updateUser(editingUser._id, payload);
        toast.success('Administrator updated successfully');
        setUsers((prev) =>
          prev.map((u) => (u._id === editingUser._id ? { ...u, ...payload } : u))
        );
      } else {
        const res = await adminApi.createUser(form);
        toast.success('Administrator created successfully');
        setUsers((prev) => [
          ...prev,
          res.data?.data || { ...form, _id: Date.now().toString(), createdAt: new Date().toISOString() },
        ]);
      }
      setModalOpen(false);
      setEditingUser(null);
      setForm({ name: '', email: '', password: '', role: 'editor' });
    } catch {
      if (editingUser) {
        const payload = { name: form.name, email: form.email, role: form.role };
        setUsers((prev) =>
          prev.map((u) => (u._id === editingUser._id ? { ...u, ...payload } : u))
        );
        toast.success('Administrator updated (Demo Mode)');
      } else {
        setUsers((prev) => [
          ...prev,
          { ...form, _id: Date.now().toString(), createdAt: new Date().toISOString() },
        ]);
        toast.success('Administrator created (Demo Mode)');
      }
      setModalOpen(false);
      setEditingUser(null);
      setForm({ name: '', email: '', password: '', role: 'editor' });
    }
  };

  const handleDelete = async (id) => {
    if (id === currentUser?._id) {
      toast.error('Cannot remove your own active administrator profile');
      return;
    }
    if (!window.confirm('Revoke access for this administrator?')) return;

    try {
      await adminApi.deleteUser(id);
      toast.success('Administrator removed');
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch {
      toast.success('Administrator removed (Demo)');
      setUsers((prev) => prev.filter((u) => u._id !== id));
    }
  };

  return (
    <div className="admin-users-root">
      <SeoMeta title="User Management — Admin CMS" />

      {/* 1. Page Hero Header */}
      <div className="admin-page-hero">
        <div className="admin-page-header-text">
          <div className="admin-eyebrow">
            <Sparkles size={14} className="text-gold" />
            <span>ACCESS CONTROL • WORKSPACE ROLES</span>
          </div>
          <h1 className="admin-page-title">Administrator Accounts</h1>
          <p className="admin-page-subtitle">
            Manage authenticated studio operators, architectural editors, and role-based permissions for Sri Ananda Nilayam.
          </p>
        </div>

        <div className="admin-header-actions">
          <button
            type="button"
            onClick={handleOpenCreateModal}
            className="btn-admin-primary"
          >
            <PlusCircle size={16} />
            <span>Add Administrator</span>
          </button>
        </div>
      </div>

      {/* 2. Metric Chips Grid */}
      <div className="admin-stats-grid">
        <div className="stat-pill-card active-total">
          <div className="stat-icon-wrap gold">
            <UserCheck size={18} />
          </div>
          <div className="stat-info">
            <span className="stat-count">{stats.total}</span>
            <span className="stat-name">Total Operators</span>
          </div>
        </div>

        <div className="stat-pill-card">
          <div className="stat-icon-wrap amber">
            <ShieldCheck size={18} />
          </div>
          <div className="stat-info">
            <span className="stat-count">{stats.superAdmins}</span>
            <span className="stat-name">Super Admins</span>
          </div>
        </div>

        <div className="stat-pill-card">
          <div className="stat-icon-wrap blue">
            <Shield size={18} />
          </div>
          <div className="stat-info">
            <span className="stat-count">{stats.editors}</span>
            <span className="stat-name">Architectural Editors</span>
          </div>
        </div>
      </div>

      {/* 3. Luxury User Table */}
      <div className="admin-table-container">
        {loading ? (
          <div className="admin-empty-state">
            <div className="admin-loading-spinner" />
            <p>Loading operator directory...</p>
          </div>
        ) : (
          <table className="admin-luxury-table">
            <thead>
              <tr>
                <th>OPERATOR NAME</th>
                <th>EMAIL ADDRESS</th>
                <th>SYSTEM ROLE</th>
                <th>PROVISIONED DATE</th>
                <th style={{ textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const isSuper = u.role === 'super_admin' || u.role === 'superadmin';
                return (
                  <tr key={u._id}>
                    <td>
                      <div className="table-user-cell">
                        <div className="t-user-avatar">{(u.name || 'A')[0]}</div>
                        <div>
                          <span className="user-table-name">{u.name}</span>
                          {u._id === currentUser?._id && (
                            <span className="you-badge">(Your Active Session)</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="table-email-cell">
                        <Mail size={14} className="text-gold" />
                        <span>{u.email}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`role-pill ${isSuper ? 'role-super' : 'role-editor'}`}>
                        {isSuper ? <ShieldCheck size={13} /> : <Shield size={13} />}
                        <span>{isSuper ? 'SUPER ADMIN' : 'EDITOR'}</span>
                      </span>
                    </td>
                    <td>
                      <div className="table-date-cell">
                        <Calendar size={14} className="text-gold" />
                        <span>{new Date(u.createdAt).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', justifyContent: 'flex-end' }}>
                        <button
                          type="button"
                          className="t-action-btn"
                          onClick={() => handleOpenEditModal(u)}
                          title="Edit administrator"
                        >
                          <Edit size={14} />
                        </button>
                        {u._id !== currentUser?._id && (
                          <button
                            type="button"
                            className="t-action-btn btn-danger"
                            onClick={() => handleDelete(u._id)}
                            title="Revoke operator access"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* 4. Add / Edit User Modal */}
      {modalOpen && (
        <div className="admin-modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="admin-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div className="modal-title-group">
                <div className="modal-icon-badge">
                  {editingUser ? <Edit size={20} className="text-gold" /> : <UserCheck size={20} className="text-gold" />}
                </div>
                <div>
                  <h3 className="modal-heading">
                    {editingUser ? 'Edit Administrator Account' : 'Add Workspace Administrator'}
                  </h3>
                  <p className="modal-subheading">
                    {editingUser
                      ? 'Modify operator name, work email, system role, or update password.'
                      : 'Grant access credentials for studio operations and CMS editing.'}
                  </p>
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

            <form onSubmit={handleSubmitUser} className="admin-modal-form">
              <div className="form-group-wrap">
                <label className="form-field-label required">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. S. Yallanagouda"
                  className="form-luxury-input"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group-wrap">
                <label className="form-field-label required">Email Address</label>
                <input
                  type="email"
                  placeholder="operator@srianandanilayam.example"
                  className="form-luxury-input"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group-wrap">
                <label className={`form-field-label ${editingUser ? '' : 'required'}`}>
                  {editingUser ? 'New Password (Leave blank to keep current)' : 'Temporary Password'}
                </label>
                <input
                  type="password"
                  placeholder={editingUser ? 'Leave blank to preserve existing password' : 'Minimum 6 characters'}
                  className="form-luxury-input"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required={!editingUser}
                />
              </div>

              <div className="form-group-wrap">
                <label className="form-field-label">Assigned Privilege Role</label>
                <select
                  className="form-luxury-select"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                >
                  <option value="editor">Architectural Editor (Can manage Projects, Services, Gallery)</option>
                  <option value="super_admin">Super Administrator (Full system access & settings)</option>
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
                  {editingUser ? 'Save Administrator Changes' : 'Provision Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .admin-users-root {
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
          box-shadow: 0 4px 14px rgba(234, 175, 53, 0.3);
        }

        .btn-admin-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(234, 175, 53, 0.45);
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

        .stat-icon-wrap.amber {
          background: rgba(233, 162, 59, 0.15);
          color: #E9A23B;
          border: 1px solid rgba(233, 162, 59, 0.3);
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

        .table-user-cell {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .t-user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #EAAF35 0%, #D6A43B 100%);
          color: #07172B;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.95rem;
        }

        .user-table-name {
          font-weight: 700;
          color: #142B45;
          display: block;
        }

        .you-badge {
          font-size: 0.72rem;
          color: #D6A43B;
          display: block;
          margin-top: 0.1rem;
          font-weight: 600;
        }

        .table-email-cell {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #64748B;
        }

        .role-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 0.25rem 0.65rem;
          border-radius: 9999px;
        }

        .role-pill.role-super {
          background: rgba(234, 175, 53, 0.15);
          color: #D6A43B;
          border: 1px solid rgba(234, 175, 53, 0.35);
        }

        .role-pill.role-editor {
          background: rgba(52, 120, 212, 0.15);
          color: #3478D4;
          border: 1px solid rgba(52, 120, 212, 0.35);
        }

        .table-date-cell {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          color: #64748B;
          font-size: 0.82rem;
        }

        .t-action-btn {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: #F8F5EE;
          border: 1px solid #E5E0D5;
          color: #64748B;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .t-action-btn.btn-danger:hover {
          background: #DC4545;
          border-color: #DC4545;
          color: #FFF;
        }

        /* Modal */
        .admin-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(7, 23, 43, 0.6);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 1.5rem;
        }

        .admin-modal-dialog {
          background: #FFFFFF;
          border: 1px solid #E5E0D5;
          border-radius: 16px;
          width: 100%;
          max-width: 540px;
          box-shadow: 0 20px 50px rgba(7, 23, 43, 0.2);
        }

        .admin-modal-header {
          padding: 1.5rem 1.75rem;
          border-bottom: 1px solid #E5E0D5;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #F8F5EE;
          border-radius: 16px 16px 0 0;
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
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.25rem;
          color: #142B45;
          margin: 0;
          font-weight: 700;
        }

        .modal-subheading {
          font-size: 0.8rem;
          color: #64748B;
          margin: 0.2rem 0 0;
        }

        .modal-close-btn {
          background: transparent;
          border: none;
          color: #64748B;
          cursor: pointer;
        }

        .modal-close-btn:hover {
          color: #142B45;
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
          padding: 0.7rem 0.95rem;
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

        .modal-actions-row {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.85rem;
          margin-top: 0.5rem;
          padding-top: 1rem;
          border-top: 1px solid #E5E0D5;
        }

        .btn-admin-cancel {
          background: #FFFFFF;
          border: 1px solid #E5E0D5;
          color: #64748B;
          padding: 0.65rem 1.25rem;
          border-radius: 8px;
          font-size: 0.85rem;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s;
        }

        .btn-admin-cancel:hover {
          background: #F8F5EE;
          color: #142B45;
        }

        .admin-empty-state {
          padding: 4rem 2rem;
          text-align: center;
        }

        @media (max-width: 850px) {
          .admin-stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
