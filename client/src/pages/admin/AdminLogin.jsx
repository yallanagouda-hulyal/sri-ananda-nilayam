import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Sparkles, Lock, Mail, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import SeoMeta from '../../components/common/SeoMeta';
import BrandLogo from '../../components/common/BrandLogo';

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back, Administrator!');
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@srianandanilayam.example');
    setPassword('Admin@123456');
    toast('Pre-filled sample administrator credentials', { icon: '🔑' });
  };

  return (
    <div className="admin-login-page">
      <SeoMeta title="Admin Login" />

      {/* Villa Background with Dark Overlay */}
      <div className="login-villa-bg" />
      <div className="login-bg-overlay" />

      <div className="login-card-container">
        <div className="login-executive-card">
          {/* Official Logo at Top */}
          <div className="login-logo-wrap text-center" style={{ marginBottom: '1.5rem' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <BrandLogo variant="light" height={52} />
            </Link>
          </div>

          <h2 className="login-main-title">Executive CMS Sign In</h2>
          <p className="login-sub-text">
            Enter authorized studio administrator credentials to manage portfolio projects, client enquiries, and dynamic content.
          </p>

          {/* Quick Demo Pre-fill Button */}
          <div className="demo-fill-container">
            <button
              type="button"
              className="btn-demo-credentials"
              onClick={handleFillDemo}
            >
              <Sparkles size={14} className="text-gold" />
              <span>Click to fill sample credentials</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="login-form-inner">
            <div className="login-field-wrap">
              <label className="login-lbl">Work Email Address</label>
              <div className="input-with-icon-wrap">
                <Mail size={16} className="login-field-icon" />
                <input
                  type="email"
                  className="login-txt-input with-icon"
                  placeholder="admin@srianandanilayam.example"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="login-field-wrap">
              <label className="login-lbl">Access Password</label>
              <div className="login-pwd-wrapper">
                <Lock size={16} className="login-field-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="login-txt-input with-icon"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="pwd-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="login-options-row">
              <label className="remember-checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="custom-chk"
                />
                <span>Remember me</span>
              </label>
              <Link to="/admin/forgot-password" className="forgot-pwd-link">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-login-submit"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="login-card-footer text-center">
            <Link to="/" className="return-home-link">
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .admin-login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 2.5rem 1.5rem;
          background: #061121;
        }

        .login-villa-bg {
          position: absolute;
          inset: 0;
          background-image: url('/images/hero-villa.jpg');
          background-size: cover;
          background-position: center;
          z-index: 1;
        }

        .login-bg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(6, 17, 33, 0.88) 0%, rgba(10, 27, 51, 0.94) 100%);
          backdrop-filter: blur(8px);
          z-index: 2;
        }

        .login-card-container {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 460px;
        }

        .login-executive-card {
          background: rgba(10, 27, 51, 0.92);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 18px;
          padding: 3rem 2.5rem;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(214, 164, 59, 0.15);
          border: 1px solid rgba(214, 164, 59, 0.35);
        }

        .login-logo-wrap {
          margin-bottom: 1.5rem;
          display: flex;
          justify-content: center;
        }

        .login-official-logo {
          height: 44px;
          width: auto;
          display: block;
        }

        .login-main-title {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-weight: 700;
          color: #FFFFFF;
          text-align: center;
          margin-bottom: 0.5rem;
          letter-spacing: 0.5px;
        }

        .login-sub-text {
          font-family: var(--font-sans);
          font-size: 0.86rem;
          line-height: 1.55;
          color: var(--color-slate-light);
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .demo-fill-container {
          margin-bottom: 1.75rem;
          display: flex;
          justify-content: center;
        }

        .btn-demo-credentials {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(214, 164, 59, 0.12);
          border: 1px dashed rgba(214, 164, 59, 0.5);
          border-radius: var(--radius-full);
          color: var(--color-gold-light);
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-demo-credentials:hover {
          background: rgba(214, 164, 59, 0.22);
          border-color: var(--color-gold);
          transform: translateY(-1px);
        }

        .login-form-inner {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .login-field-wrap {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }

        .login-lbl {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--color-ivory);
          letter-spacing: 0.2px;
        }

        .input-with-icon-wrap, .login-pwd-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .login-field-icon {
          position: absolute;
          left: 1rem;
          color: var(--color-gold);
          pointer-events: none;
        }

        .login-txt-input {
          width: 100%;
          padding: 0.85rem 1rem;
          font-family: var(--font-sans);
          font-size: 0.95rem;
          color: #FFFFFF;
          background: rgba(6, 17, 33, 0.7);
          border: 1px solid rgba(214, 164, 59, 0.3);
          border-radius: var(--radius-sm);
          outline: none;
          transition: all 0.2s ease;
        }

        .login-txt-input.with-icon {
          padding-left: 2.75rem;
        }

        .login-pwd-wrapper .login-txt-input {
          padding-right: 2.75rem;
        }

        .login-txt-input:focus {
          border-color: var(--color-gold);
          background: rgba(6, 17, 33, 0.95);
          box-shadow: 0 0 0 3px rgba(214, 164, 59, 0.2);
        }

        .pwd-toggle-btn {
          position: absolute;
          right: 0.85rem;
          background: transparent;
          border: none;
          color: var(--color-slate-light);
          cursor: pointer;
          padding: 0.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pwd-toggle-btn:hover {
          color: var(--color-gold);
        }

        .login-options-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.82rem;
        }

        .remember-checkbox-label {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--color-slate-light);
          cursor: pointer;
        }

        .custom-chk {
          accent-color: var(--color-gold);
        }

        .forgot-pwd-link {
          color: var(--color-gold);
          text-decoration: none;
          font-weight: 500;
        }

        .forgot-pwd-link:hover {
          text-decoration: underline;
        }

        .btn-login-submit {
          width: 100%;
          padding: 0.9rem;
          font-size: 0.96rem;
          margin-top: 0.5rem;
        }

        .login-card-footer {
          margin-top: 2rem;
          padding-top: 1.25rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .return-home-link {
          font-size: 0.84rem;
          color: var(--color-slate-light);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .return-home-link:hover {
          color: var(--color-gold);
        }

        @media (max-width: 480px) {
          .login-card-container {
            padding: 1rem 0.75rem;
          }
          .login-executive-card {
            padding: 2rem 1.25rem;
            border-radius: 14px;
          }
          .login-main-title {
            font-size: 1.3rem;
          }
          .login-sub-text {
            font-size: 0.8rem;
            margin-bottom: 1.2rem;
          }
          .login-options-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}
