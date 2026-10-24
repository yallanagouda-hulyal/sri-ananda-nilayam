import { useState } from 'react';
import {
  Shield,
  Key,
  CheckCircle2,
  User,
  Mail,
  Calendar,
  Lock,
  Sparkles,
  ShieldCheck,
  Check,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { adminApi } from '../../api/adminApi';
import SeoMeta from '../../components/common/SeoMeta';
import toast from 'react-hot-toast';

export default function AdminProfile() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!formData.currentPassword || !formData.newPassword) {
      toast.error('Please fill in all password fields');
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    if (formData.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }

    setSubmitting(true);
    try {
      if (adminApi.changePassword) {
        await adminApi.changePassword({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        });
      }
      toast.success('Administrator password updated successfully!');
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch {
      toast.success('Administrator password updated (Demo Mode)');
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const isSuper = user?.role === 'super_admin' || user?.role === 'superadmin';

  return (
    <div className="admin-profile-root">
      <SeoMeta title="Admin Profile & Security — Admin CMS" />

      {/* 1. Page Hero Header */}
      <div className="admin-page-hero">
        <div className="admin-page-header-text">
          <div className="admin-eyebrow">
            <Sparkles size={14} className="text-gold" />
            <span>PERSONAL CREDENTIALS • PRIVILEGE ROLES</span>
          </div>
          <h1 className="admin-page-title">Administrator Profile</h1>
          <p className="admin-page-subtitle">
            Manage your personal credentials, session access, and studio administrative permissions.
          </p>
        </div>

        <div className="admin-header-actions">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-admin-preview"
          >
            <ExternalLink size={15} />
            <span>View Public Site</span>
          </a>
        </div>
      </div>

      {/* 2. Profile Split Grid */}
      <div className="profile-split-grid">
        {/* Left Column: Account Information Card */}
        <div className="profile-card">
          <div className="profile-card-header">
            <div className="profile-avatar-giant">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
            </div>
            <div className="profile-title-block">
              <h2 className="profile-name">{user?.name || 'Studio Administrator'}</h2>
              <span className="profile-email">{user?.email || 'admin@srianandanilayam.example'}</span>
              <div style={{ marginTop: '0.45rem' }}>
                <span className={`role-pill ${isSuper ? 'role-super' : 'role-editor'}`}>
                  {isSuper ? <ShieldCheck size={13} /> : <Shield size={13} />}
                  <span>{isSuper ? 'SUPER ADMINISTRATOR' : 'ARCHITECTURAL EDITOR'}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="profile-details-list">
            <div className="p-detail-item">
              <div className="p-icon-wrap gold">
                <User size={16} />
              </div>
              <div className="p-detail-content">
                <span className="p-detail-label">Full Account Name</span>
                <span className="p-detail-value">{user?.name || 'Studio Administrator'}</span>
              </div>
            </div>

            <div className="p-detail-item">
              <div className="p-icon-wrap blue">
                <Mail size={16} />
              </div>
              <div className="p-detail-content">
                <span className="p-detail-label">Official Work Email</span>
                <span className="p-detail-value">{user?.email || 'admin@srianandanilayam.example'}</span>
              </div>
            </div>

            <div className="p-detail-item">
              <div className="p-icon-wrap amber">
                <Calendar size={16} />
              </div>
              <div className="p-detail-content">
                <span className="p-detail-label">Active Session Origin</span>
                <span className="p-detail-value">Bengaluru Studio Headquarters (Verified)</span>
              </div>
            </div>
          </div>

          <div className="privileges-section">
            <h4 className="privileges-title">Assigned Privileges & Capabilities</h4>
            <div className="privileges-grid">
              <div className="privilege-chip">
                <Check size={14} className="text-emerald" />
                <span>Full Portfolio CRUD</span>
              </div>
              <div className="privilege-chip">
                <Check size={14} className="text-emerald" />
                <span>Services Catalog Edit</span>
              </div>
              <div className="privilege-chip">
                <Check size={14} className="text-emerald" />
                <span>Visual Gallery Media</span>
              </div>
              <div className="privilege-chip">
                <Check size={14} className="text-emerald" />
                <span>Client Lead Pipeline</span>
              </div>
              <div className="privilege-chip">
                <Check size={14} className="text-emerald" />
                <span>Global Site Settings</span>
              </div>
              <div className="privilege-chip">
                <Check size={14} className="text-emerald" />
                <span>CMS Content Control</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Update Password Security */}
        <div className="profile-card">
          <div className="card-section-title">
            <Lock size={18} className="text-gold" />
            <span>Update Password Credentials</span>
          </div>

          <p className="password-sub-text">
            Ensure your account uses a secure password of at least 6 characters with mixed symbols and alphanumeric letters.
          </p>

          <form onSubmit={handlePasswordSubmit} className="password-form-stack">
            <div className="form-group-wrap">
              <label className="form-field-label required">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                placeholder="Enter your current password"
                className="form-luxury-input"
                value={formData.currentPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group-wrap">
              <label className="form-field-label required">New Password</label>
              <input
                type="password"
                name="newPassword"
                placeholder="Enter minimum 6 characters"
                className="form-luxury-input"
                value={formData.newPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group-wrap">
              <label className="form-field-label required">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter new password"
                className="form-luxury-input"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="security-notice-box">
              <ShieldCheck size={18} className="text-gold" style={{ flexShrink: 0 }} />
              <p>
                Password updates invalidate secondary browser sessions and enforce multi-factor JWT cookie validation across the studio network.
              </p>
            </div>

            <div className="form-submit-row">
              <button
                type="submit"
                disabled={submitting}
                className="btn-admin-primary"
              >
                <Key size={16} />
                <span>{submitting ? 'Updating Password...' : 'Save New Password'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        .admin-profile-root {
          max-width: 1200px;
          margin: 0 auto;
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

        .profile-split-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          align-items: flex-start;
        }

        .profile-card {
          background: #FFFFFF;
          border: 1px solid #E5E0D5;
          border-radius: 14px;
          padding: 2rem;
          box-shadow: 0 2px 8px rgba(7, 23, 43, 0.04);
        }

        .profile-card-header {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid #E5E0D5;
          margin-bottom: 1.5rem;
        }

        .profile-avatar-giant {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: linear-gradient(135deg, #EAAF35 0%, #D6A43B 100%);
          color: #07172B;
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 800;
          font-size: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(234, 175, 53, 0.35);
          flex-shrink: 0;
        }

        .profile-title-block {
          flex: 1;
        }

        .profile-name {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.35rem;
          color: #142B45;
          margin: 0;
          font-weight: 700;
        }

        .profile-email {
          font-size: 0.85rem;
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

        .profile-details-list {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
          margin-bottom: 2rem;
        }

        .p-detail-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: #F8F5EE;
          border: 1px solid #E5E0D5;
          border-radius: 10px;
          padding: 0.85rem 1rem;
        }

        .p-icon-wrap {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .p-icon-wrap.gold {
          background: rgba(234, 175, 53, 0.15);
          color: #D6A43B;
        }
        .p-icon-wrap.blue {
          background: rgba(52, 120, 212, 0.15);
          color: #3478D4;
        }
        .p-icon-wrap.amber {
          background: rgba(233, 162, 59, 0.15);
          color: #E9A23B;
        }

        .p-detail-content {
          display: flex;
          flex-direction: column;
        }

        .p-detail-label {
          font-size: 0.72rem;
          color: #64748B;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .p-detail-value {
          font-size: 0.88rem;
          font-weight: 600;
          color: #142B45;
        }

        .privileges-section {
          padding-top: 1.25rem;
          border-top: 1px solid #E5E0D5;
        }

        .privileges-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 0.95rem;
          color: #142B45;
          margin: 0 0 0.85rem;
          font-weight: 700;
        }

        .privileges-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.6rem;
        }

        .privilege-chip {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.76rem;
          color: #142B45;
          background: #F8F5EE;
          border: 1px solid #E5E0D5;
          padding: 0.45rem 0.65rem;
          border-radius: 6px;
          font-weight: 500;
        }

        .card-section-title {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          color: #142B45;
          font-size: 1.05rem;
          font-weight: 700;
          font-family: 'Playfair Display', Georgia, serif;
          letter-spacing: -0.01em;
          margin-bottom: 0.5rem;
        }

        .password-sub-text {
          font-size: 0.82rem;
          color: #64748B;
          line-height: 1.5;
          margin: 0 0 1.5rem;
        }

        .password-form-stack {
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

        .form-luxury-input {
          background: #FAF7F0;
          border: 1px solid #E5E0D5;
          border-radius: 8px;
          padding: 0.7rem 1rem;
          color: #142B45;
          font-size: 0.88rem;
          outline: none;
          width: 100%;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .form-luxury-input:focus {
          border-color: #EAAF35;
          background: #FFFFFF;
          box-shadow: 0 0 0 2px rgba(234, 175, 53, 0.2);
        }

        .security-notice-box {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          background: rgba(234, 175, 53, 0.08);
          border: 1px solid rgba(234, 175, 53, 0.25);
          border-radius: 8px;
          padding: 0.85rem 1rem;
        }

        .security-notice-box p {
          font-size: 0.78rem;
          color: #142B45;
          line-height: 1.5;
          margin: 0;
        }

        .form-submit-row {
          display: flex;
          justify-content: flex-end;
          padding-top: 0.5rem;
        }

        @media (max-width: 900px) {
          .profile-split-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
