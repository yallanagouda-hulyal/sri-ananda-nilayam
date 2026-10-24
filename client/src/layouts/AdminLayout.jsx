import { useState, useEffect } from 'react';
import { NavLink, Link, Outlet, useNavigate, Navigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquareText,
  Briefcase,
  Layers,
  Image as ImageIcon,
  Star,
  Mail,
  FileText,
  Settings,
  Users,
  UserCheck,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Search,
  Bell,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Calendar,
  ChevronRight as ChevronRightIcon,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import BrandLogo from '../components/common/BrandLogo';
import toast from 'react-hot-toast';
import { adminApi } from '../api/adminApi';

export default function AdminLayout() {
  const { user, isAuthenticated, loading, logout, isSuperAdmin } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [newEnquiriesCount, setNewEnquiriesCount] = useState(6);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Fetch quick stats for notification badge
    adminApi.getDashboardStats()
      .then((res) => {
        if (res.data?.success && res.data.data?.enquiries?.new !== undefined) {
          setNewEnquiriesCount(res.data.data.enquiries.new);
        }
      })
      .catch(() => {});
  }, [location.pathname]);

  if (loading) {
    return (
      <div className="admin-loading-screen">
        <div className="admin-loading-spinner" />
        <p>Loading Studio Dashboard...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/admin/login');
    } catch {
      navigate('/admin/login');
    }
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  const managementNav = [
    { name: 'Enquiries', subtitle: 'Leads & Clients', path: '/admin/enquiries', icon: <MessageSquareText size={18} />, badge: newEnquiriesCount },
    { name: 'Projects', subtitle: 'Portfolio Management', path: '/admin/projects', icon: <Layers size={18} /> },
    { name: 'Services', subtitle: 'Service Offerings', path: '/admin/services', icon: <Briefcase size={18} /> },
    { name: 'Appointments', subtitle: 'Studio Consultations', path: '/admin/appointments', icon: <Calendar size={18} /> },
    { name: 'Gallery', subtitle: 'Images & Media', path: '/admin/gallery', icon: <ImageIcon size={18} /> },
    { name: 'Testimonials', subtitle: 'Client Reviews', path: '/admin/testimonials', icon: <Star size={18} /> },
    { name: 'Pages / CMS', subtitle: 'Manage Website', path: '/admin/pages', icon: <FileText size={18} /> },
    { name: 'Newsletter', subtitle: 'Subscribers', path: '/admin/newsletter', icon: <Mail size={18} /> },
  ];

  const systemNav = [
    { name: 'Site Settings', subtitle: 'General Configuration', path: '/admin/settings', icon: <Settings size={18} /> },
    { name: 'Users', subtitle: 'Team Management', path: '/admin/users', icon: <Users size={18} /> },
    { name: 'Profile', subtitle: 'My Account', path: '/admin/profile', icon: <UserCheck size={18} /> },
  ];

  return (
    <div className={`admin-workspace-root ${collapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div
          className="admin-mobile-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Sidebar Navigation ── */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'sidebar-mobile-open' : ''} ${collapsed ? 'is-collapsed' : ''}`}>
        <div className="admin-sidebar-header">
          <Link to="/admin/dashboard" className="admin-logo-link" style={{ textDecoration: 'none' }}>
            {!collapsed ? (
              <BrandLogo variant="light" height={40} />
            ) : (
              <div className="admin-collapsed-logo">SAN</div>
            )}
          </Link>
          <button
            type="button"
            className="sidebar-close-btn"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close Sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="admin-nav-menu">
          {/* Main Dashboard item */}
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) => `admin-nav-item dash-main-item ${isActive ? 'active' : ''}`}
            onClick={() => setSidebarOpen(false)}
            title={collapsed ? 'Dashboard Overview' : undefined}
          >
            <div className="nav-item-left">
              <span className="nav-item-icon">
                <LayoutDashboard size={19} />
              </span>
              {!collapsed && (
                <div className="nav-item-text-group">
                  <span className="nav-item-title">Dashboard</span>
                  <span className="nav-item-sub">Overview &amp; Insights</span>
                </div>
              )}
            </div>
            {!collapsed && <ChevronRightIcon size={16} className="active-arrow" />}
          </NavLink>

          {/* Section: MANAGEMENT */}
          {!collapsed && (
            <div className="nav-section-title">MANAGEMENT</div>
          )}

          {managementNav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              title={collapsed ? item.name : undefined}
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <div className="nav-item-left">
                <span className="nav-item-icon">{item.icon}</span>
                {!collapsed && (
                  <div className="nav-item-text-group">
                    <span className="nav-item-title">{item.name}</span>
                    <span className="nav-item-sub">{item.subtitle}</span>
                  </div>
                )}
              </div>
              {!collapsed && item.badge > 0 && (
                <span className="nav-badge-pill">{item.badge}</span>
              )}
            </NavLink>
          ))}

          {/* Section: SYSTEM */}
          {!collapsed && (
            <div className="nav-section-title">SYSTEM</div>
          )}

          {systemNav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              title={collapsed ? item.name : undefined}
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <div className="nav-item-left">
                <span className="nav-item-icon">{item.icon}</span>
                {!collapsed && (
                  <div className="nav-item-text-group">
                    <span className="nav-item-title">{item.name}</span>
                    <span className="nav-item-sub">{item.subtitle}</span>
                  </div>
                )}
              </div>
            </NavLink>
          ))}
        </nav>

        {/* Desktop Collapse Toggle */}
        <div className="admin-collapse-toggle-wrap">
          <button
            type="button"
            className="admin-collapse-toggle-btn"
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight size={17} /> : <ChevronLeft size={17} />}
            {!collapsed && <span>Collapse Sidebar</span>}
          </button>
        </div>

        {/* Sidebar Footer */}
        <div className="admin-sidebar-footer">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="admin-preview-btn"
            title="View Live Site"
          >
            <ExternalLink size={15} />
            {!collapsed && <span>View Live Site</span>}
          </a>

          <button
            type="button"
            onClick={handleLogout}
            className="admin-logout-btn"
            title="Sign Out"
          >
            <LogOut size={15} />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* ── Main Content Stage ── */}
      <div className="admin-main-stage">
        {/* Top Navbar */}
        <header className="admin-layout-navbar">
          <div className="admin-topbar-left">
            <button
              type="button"
              className="admin-menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle mobile menu"
            >
              <Menu size={22} />
            </button>
            <div className="admin-search-wrapper">
              <Search size={16} className="admin-search-icon" />
              <input
                type="text"
                placeholder="Search projects, enquiries, clients, services..."
                className="admin-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    navigate(`/admin/enquiries?search=${encodeURIComponent(searchQuery)}`);
                  }
                }}
              />
            </div>
          </div>

          <div className="admin-topbar-right">
            <button
              type="button"
              className="admin-bell-btn"
              title="Notifications"
              onClick={() => navigate('/admin/enquiries')}
            >
              <Bell size={18} />
              {newEnquiriesCount > 0 && <span className="bell-badge-count">{newEnquiriesCount}</span>}
            </button>

            <button
              type="button"
              className="admin-screen-btn"
              onClick={toggleFullScreen}
              title="Toggle Fullscreen"
            >
              <Maximize2 size={16} />
            </button>

            <Link to="/admin/profile" className="admin-user-profile-widget" style={{ textDecoration: 'none' }}>
              <div className="admin-user-avatar">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
              </div>
              <div className="admin-user-info">
                <span className="admin-user-name">{user?.name || 'Super Admin'}</span>
                <span className="admin-user-email">{user?.email || 'admin@srianandanilayam.example'}</span>
              </div>
            </Link>
          </div>
        </header>

        {/* Content View */}
        <main className="admin-content-view">
          <Outlet />
        </main>
      </div>

      <style>{`
        .admin-workspace-root {
          display: flex;
          min-height: 100vh;
          background: #F8F3E9;
          color: #142B45;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        .admin-mobile-backdrop {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(7, 23, 43, 0.65);
          backdrop-filter: blur(4px);
          z-index: 98;
        }

        /* ── Sidebar ── */
        .admin-sidebar {
          width: 270px;
          background: #07172B;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          position: sticky;
          top: 0;
          height: 100vh;
          overflow-y: auto;
          z-index: 100;
          transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s ease;
        }

        .admin-sidebar.is-collapsed {
          width: 82px;
        }

        .admin-sidebar-header {
          padding: 1.25rem 1.35rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          min-height: 72px;
        }

        .admin-collapsed-logo {
          font-family: 'Cinzel', Georgia, serif;
          font-size: 1.15rem;
          font-weight: 800;
          color: #EAAF35;
          letter-spacing: 1px;
        }

        .sidebar-close-btn {
          display: none;
          background: transparent;
          border: none;
          color: #FFF;
          cursor: pointer;
        }

        .admin-nav-menu {
          padding: 1rem 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          flex: 1;
        }

        .nav-section-title {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #64748B;
          text-transform: uppercase;
          padding: 1.15rem 0.75rem 0.4rem;
        }

        .admin-nav-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          padding: 0.65rem 0.85rem;
          color: #94A3B8;
          border-radius: 10px;
          font-size: 0.88rem;
          font-weight: 500;
          transition: all 0.2s ease;
          position: relative;
          text-decoration: none;
        }

        .admin-sidebar.is-collapsed .admin-nav-item {
          justify-content: center;
          padding: 0.75rem 0;
        }

        .nav-item-left {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          min-width: 0;
        }

        .nav-item-icon {
          color: #94A3B8;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: color 0.2s ease;
        }

        .nav-item-text-group {
          display: flex;
          flex-direction: column;
          line-height: 1.25;
        }

        .nav-item-title {
          font-size: 0.88rem;
          font-weight: 600;
          color: #E2E8F0;
          white-space: nowrap;
        }

        .nav-item-sub {
          font-size: 0.7rem;
          color: #64748B;
          white-space: nowrap;
        }

        .admin-nav-item:hover {
          color: #FFFFFF;
          background: rgba(255, 255, 255, 0.05);
        }

        .admin-nav-item:hover .nav-item-icon {
          color: #EAAF35;
        }

        .admin-nav-item:hover .nav-item-title {
          color: #FFFFFF;
        }

        .admin-nav-item.active {
          color: #07172B;
          background: #EAAF35;
          font-weight: 700;
          box-shadow: 0 4px 14px rgba(234, 175, 53, 0.35);
        }

        .admin-nav-item.active .nav-item-icon,
        .admin-nav-item.active .nav-item-title {
          color: #07172B;
        }

        .admin-nav-item.active .nav-item-sub {
          color: #4B3304;
        }

        .admin-nav-item.active .active-arrow {
          color: #07172B;
        }

        .nav-badge-pill {
          background: #EF4444;
          color: #FFFFFF;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.15rem 0.5rem;
          border-radius: 9999px;
          min-width: 20px;
          text-align: center;
          box-shadow: 0 2px 6px rgba(239, 68, 68, 0.4);
        }

        .admin-collapse-toggle-wrap {
          padding: 0.5rem 0.85rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .admin-collapse-toggle-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.55rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          color: #94A3B8;
          font-size: 0.78rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .admin-collapse-toggle-btn:hover {
          background: rgba(234, 175, 53, 0.1);
          color: #EAAF35;
          border-color: rgba(234, 175, 53, 0.25);
        }

        .admin-sidebar-footer {
          padding: 1rem 0.85rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .admin-preview-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #E2E8F0;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 600;
          padding: 0.6rem;
          text-decoration: none;
          transition: all 0.2s;
        }

        .admin-preview-btn:hover {
          background: rgba(234, 175, 53, 0.15);
          color: #EAAF35;
          border-color: #EAAF35;
        }

        .admin-logout-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          padding: 0.6rem;
          background: transparent;
          border: 1px solid rgba(239, 68, 68, 0.35);
          color: #F87171;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .admin-logout-btn:hover {
          background: rgba(239, 68, 68, 0.15);
        }

        /* ── Main Stage ── */
        .admin-main-stage {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
          overflow-x: hidden;
          background: #F8F3E9;
        }

        /* ── Top Navbar ── */
        .admin-layout-navbar {
          height: 72px;
          background: #FFFFFF;
          border-bottom: 1px solid #E5E0D5;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          position: sticky;
          top: 0;
          z-index: 90;
          box-shadow: 0 2px 10px rgba(7, 23, 43, 0.03);
        }

        .admin-topbar-left {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          flex: 1;
        }

        .admin-search-wrapper {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          background: #FAF7F0;
          border: 1px solid #E5E0D5;
          border-radius: 9999px;
          padding: 0.55rem 1.2rem;
          width: 380px;
          max-width: 100%;
          transition: all 0.2s ease;
        }

        .admin-search-wrapper:focus-within {
          border-color: #EAAF35;
          box-shadow: 0 0 0 3px rgba(234, 175, 53, 0.2);
          background: #FFFFFF;
        }

        .admin-search-icon {
          color: #94A3B8;
        }

        .admin-search-input {
          background: transparent;
          border: none;
          color: #07172B;
          font-size: 0.85rem;
          width: 100%;
          outline: none;
        }

        .admin-search-input::placeholder {
          color: #94A3B8;
        }

        .admin-topbar-right {
          display: flex;
          align-items: center;
          gap: 1.15rem;
        }

        .admin-bell-btn {
          position: relative;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          color: #475569;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .admin-bell-btn:hover {
          color: #07172B;
          border-color: #CBD5E1;
          background: #F1F5F9;
        }

        .bell-badge-count {
          position: absolute;
          top: -3px;
          right: -3px;
          background: #EF4444;
          color: #FFFFFF;
          font-size: 0.65rem;
          font-weight: 700;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #FFFFFF;
        }

        .admin-screen-btn {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          color: #475569;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .admin-screen-btn:hover {
          color: #07172B;
          border-color: #CBD5E1;
          background: #F1F5F9;
        }

        .admin-menu-toggle {
          display: none;
          background: transparent;
          border: none;
          color: #07172B;
          cursor: pointer;
        }

        .admin-user-profile-widget {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.35rem 0.5rem;
          border-radius: 8px;
          transition: all 0.2s;
        }

        .admin-user-profile-widget:hover {
          background: #F1F5F9;
        }

        .admin-user-avatar {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #EAAF35;
          color: #07172B;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          box-shadow: 0 2px 6px rgba(234, 175, 53, 0.3);
        }

        .admin-user-info {
          display: flex;
          flex-direction: column;
        }

        .admin-user-name {
          font-size: 0.86rem;
          font-weight: 700;
          color: #07172B;
          line-height: 1.2;
        }

        .admin-user-email {
          font-size: 0.72rem;
          color: #64748B;
        }

        /* ── Content View ── */
        .admin-content-view {
          flex: 1;
          padding: 2.25rem 2.5rem;
          background: #F8F3E9;
          min-height: calc(100vh - 72px);
          color: #142B45;
        }

        /* Luxury Scrollbar */
        .admin-sidebar::-webkit-scrollbar,
        .admin-content-view::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .admin-sidebar::-webkit-scrollbar-track {
          background: #07172B;
        }
        .admin-content-view::-webkit-scrollbar-track {
          background: #F8F3E9;
        }
        .admin-sidebar::-webkit-scrollbar-thumb {
          background: rgba(234, 175, 53, 0.3);
          border-radius: 9999px;
        }
        .admin-sidebar::-webkit-scrollbar-thumb:hover {
          background: rgba(234, 175, 53, 0.6);
        }
        .admin-content-view::-webkit-scrollbar-thumb {
          background: #D8D2C5;
          border-radius: 9999px;
        }

        .admin-loading-screen {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          background: #07172B;
          color: #FFF;
        }

        .admin-loading-spinner {
          width: 44px;
          height: 44px;
          border: 3px solid rgba(234, 175, 53, 0.2);
          border-top-color: #EAAF35;
          border-radius: 50%;
          animation: adminSpin 0.8s linear infinite;
        }

        @keyframes adminSpin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 1024px) {
          .admin-sidebar {
            position: fixed;
            left: 0;
            top: 0;
            bottom: 0;
            transform: translateX(-100%);
            box-shadow: 10px 0 30px rgba(0, 0, 0, 0.5);
          }
          .sidebar-mobile-open {
            transform: translateX(0);
          }
          .admin-mobile-backdrop {
            display: block;
          }
          .sidebar-close-btn {
            display: block;
          }
          .admin-menu-toggle {
            display: block;
          }
          .admin-collapse-toggle-wrap {
            display: none;
          }
          .admin-content-view {
            padding: 1.5rem 1rem;
          }
          .admin-search-wrapper {
            width: 220px;
          }
          .admin-user-info {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .admin-layout-navbar {
            padding: 0 0.85rem;
            height: 64px;
          }
          .admin-topbar-left {
            gap: 0.65rem;
          }
          .admin-search-wrapper {
            width: 130px;
            padding: 0.4rem 0.75rem;
          }
          .admin-search-input {
            font-size: 0.78rem;
          }
          .admin-topbar-right {
            gap: 0.5rem;
          }
          .admin-screen-btn {
            display: none;
          }
          .admin-bell-btn {
            width: 35px;
            height: 35px;
          }
          .admin-user-avatar {
            width: 35px;
            height: 35px;
            font-size: 0.9rem;
          }
          .admin-content-view {
            padding: 1rem 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}
