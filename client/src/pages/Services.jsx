import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Compass,
  HardHat,
  Armchair,
  Building2,
  Sparkles,
  RefreshCw,
  Key,
  PenTool,
  Building,
  Users,
  Award,
  ShieldCheck,
  FileCheck2,
  Clock,
  MapPin,
  MessageSquare
} from 'lucide-react';
import SeoMeta from '../components/common/SeoMeta';
import { publicApi } from '../api/publicApi';
import { useSite } from '../context/SiteContext';

const defaultServices = [
  {
    _id: 's1',
    title: 'Architectural Design',
    slug: 'architectural-design',
    shortDescription: 'Innovative architectural solutions that blend aesthetics with functionality for every project.',
    coverImage: '/images/hero-villa.jpg',
    category: 'Architecture',
    iconType: 'compass',
  },
  {
    _id: 's2',
    title: 'Residential Construction',
    slug: 'residential-construction',
    shortDescription: 'High-quality residential construction delivering your dream home on time and within budget.',
    coverImage: '/images/construction-site.jpg',
    category: 'Construction',
    iconType: 'hardhat',
  },
  {
    _id: 's3',
    title: 'Interior Design',
    slug: 'interior-design',
    shortDescription: 'Creative interiors that transform your space into a beautiful, functional environment.',
    coverImage: '/images/service-interiors.jpg',
    category: 'Interiors',
    iconType: 'armchair',
  },
  {
    _id: 's4',
    title: 'Commercial Construction',
    slug: 'commercial-construction',
    shortDescription: 'Efficient and modern commercial spaces designed for productivity and brand identity.',
    coverImage: '/images/service-commercial.jpg',
    category: 'Construction',
    iconType: 'building',
  },
  {
    _id: 's5',
    title: 'Modular Kitchen Design',
    slug: 'modular-kitchen',
    shortDescription: 'Stylish and functional modular kitchens tailored to your lifestyle and space.',
    coverImage: '/images/service-modular-kitchen.jpg',
    category: 'Interiors',
    iconType: 'kitchen',
  },
  {
    _id: 's6',
    title: 'Renovation & Remodeling',
    slug: 'renovation-remodeling',
    shortDescription: 'Turnkey architectural restoration, structural retrofitting, and bespoke modern space re-engineering.',
    coverImage: '/images/service-renovation.jpg',
    category: 'Construction',
    iconType: 'renovation',
  },
  {
    _id: 's7',
    title: 'Turnkey Projects',
    slug: 'turnkey-projects',
    shortDescription: 'End-to-end project execution from concept to completion with single-point accountability.',
    coverImage: '/images/project-villa.jpg',
    category: 'Turnkey',
    iconType: 'key',
  },
  {
    _id: 's8',
    title: 'Space Planning & Consultation',
    slug: 'space-planning',
    shortDescription: 'Optimized space planning and expert consultation for residential and commercial projects.',
    coverImage: '/images/service-planning.jpg',
    category: 'Architecture',
    iconType: 'planning',
  },
];

const WhatsAppIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.031 2C6.516 2 2.029 6.488 2.029 12.004c0 1.954.566 3.778 1.545 5.323L2 22l4.821-1.536a9.943 9.943 0 0 0 5.21 1.455c5.516 0 10.003-4.488 10.003-10.004S17.547 2 12.031 2zm0 18.232a8.21 8.21 0 0 1-4.32-1.22l-.31-.184-2.86.912.923-2.787-.202-.32a8.196 8.196 0 0 1-1.263-4.364c0-4.542 3.697-8.239 8.239-8.239 4.542 0 8.239 3.697 8.239 8.239 0 4.542-3.697 8.239-8.239 8.239zm4.516-6.173c-.247-.124-1.464-.722-1.691-.805-.227-.082-.392-.124-.557.124-.165.247-.64 1.052-.784 1.217-.144.165-.288.186-.535.062-.247-.124-1.043-.385-1.986-1.226-.734-.655-1.23-1.464-1.374-1.711-.144-.247-.015-.38.109-.503.111-.111.247-.288.371-.433.124-.144.165-.247.247-.412.082-.165.041-.309-.021-.433-.062-.124-.557-1.34-.763-1.835-.2-.482-.404-.417-.557-.425l-.474-.008c-.165 0-.433.062-.66.309-.227.247-.866.845-.866 2.062s.887 2.392 1.01 2.557c.124.165 1.745 2.664 4.227 3.736.59.255 1.052.408 1.411.522.593.189 1.133.162 1.56.098.477-.071 1.464-.598 1.67-.175.206-.577.206-1.072.144-1.175-.062-.103-.227-.165-.474-.288z" />
  </svg>
);

export default function Services() {
  const { settings } = useSite();
  const [services, setServices] = useState(defaultServices);
  const [selectedCategory, setSelectedCategory] = useState('All Services');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await publicApi.getServices();
        if (res.data?.success && res.data.data?.length > 0) {
          // Merge API data preserving curated coverImage and iconType
          const merged = defaultServices.map((def) => {
            const apiMatch = res.data.data.find(
              (item) => item.slug === def.slug || item.title.toLowerCase() === def.title.toLowerCase()
            );
            return apiMatch ? { ...apiMatch, ...def, _id: apiMatch._id || def._id } : def;
          });
          setServices(merged);
        }
      } catch (err) {
        console.warn('Using default services fallback:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const categories = ['All Services', 'Architecture', 'Construction', 'Interiors', 'Turnkey'];

  const filtered = selectedCategory === 'All Services'
    ? services
    : services.filter((s) => {
        const cat = (s.category || '').toLowerCase();
        const sel = selectedCategory.toLowerCase();
        if (sel === 'architecture') {
          return cat === 'architecture' || s.slug === 'architectural-design' || s.slug === 'space-planning';
        }
        if (sel === 'construction') {
          return cat === 'construction' || s.slug === 'residential-construction' || s.slug === 'commercial-construction' || s.slug === 'renovation-remodeling';
        }
        if (sel === 'interiors') {
          return cat === 'interiors' || s.slug === 'interior-design' || s.slug === 'modular-kitchen';
        }
        if (sel === 'turnkey') {
          return cat === 'turnkey' || s.slug === 'turnkey-projects';
        }
        return cat === sel;
      });

  const renderServiceIcon = (type, title) => {
    switch (type) {
      case 'compass':
        return <Compass size={22} />;
      case 'hardhat':
        return <HardHat size={22} />;
      case 'armchair':
        return <Armchair size={22} />;
      case 'building':
        return <Building2 size={22} />;
      case 'kitchen':
        return <Sparkles size={22} />;
      case 'renovation':
        return <RefreshCw size={22} />;
      case 'key':
        return <Key size={22} />;
      case 'planning':
        return <PenTool size={22} />;
      default:
        return <Compass size={22} />;
    }
  };

  return (
    <div className="services-page-root">
      <SeoMeta
        title="Architectural & Construction Services | Sri Ananda Nilayam"
        description="Comprehensive architectural, residential and commercial construction, and bespoke turnkey interior solutions in Bengaluru."
        canonicalUrl="/services"
      />

      {/* 3. Architectural Hero Banner */}
      <section className="srv-hero-section">
        <div className="srv-hero-bg-wrap">
          <img
            src="/images/hero-villa.jpg"
            alt="Luxury architectural villa with ambient evening illumination"
            className="srv-hero-bg-img"
          />
          <div className="srv-hero-gradient-overlay" />
        </div>

        <div className="container srv-hero-container">
          <div className="srv-hero-content">
            <span className="srv-eyebrow">— OUR SERVICES —</span>
            <h1 className="srv-hero-title">
              Architectural &amp; <br />
              <span className="srv-title-accent">Construction Services</span>
            </h1>
            <p className="srv-hero-subtitle">
              Comprehensive architectural, construction and interior solutions for modern living and working spaces.
            </p>
            <nav className="srv-breadcrumb-nav" aria-label="Breadcrumb">
              <Link to="/" className="breadcrumb-link">Home</Link>
              <span className="breadcrumb-divider">&gt;</span>
              <span className="breadcrumb-active">Services</span>
            </nav>
          </div>
        </div>
      </section>

      {/* 4. Statistics Strip */}
      <section className="srv-stats-strip">
        <div className="container srv-stats-container">
          <div className="srv-stat-box">
            <div className="stat-icon-wrap">
              <Building2 size={32} className="stat-icon" />
            </div>
            <div className="stat-text-wrap">
              <span className="stat-number">200+</span>
              <span className="stat-label">Projects Completed</span>
            </div>
          </div>

          <div className="srv-stat-box">
            <div className="stat-icon-wrap">
              <Users size={32} className="stat-icon" />
            </div>
            <div className="stat-text-wrap">
              <span className="stat-number">150+</span>
              <span className="stat-label">Happy Clients</span>
            </div>
          </div>

          <div className="srv-stat-box">
            <div className="stat-icon-wrap">
              <HardHat size={32} className="stat-icon" />
            </div>
            <div className="stat-text-wrap">
              <span className="stat-number">10+</span>
              <span className="stat-label">Years of Experience</span>
            </div>
          </div>

          <div className="srv-stat-box">
            <div className="stat-icon-wrap">
              <Award size={32} className="stat-icon" />
            </div>
            <div className="stat-text-wrap">
              <span className="stat-number">50+</span>
              <span className="stat-label">Expert Team Members</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5 & 6. Services Section on Warm Ivory */}
      <section className="srv-main-section">
        <div className="container">
          {/* 5. Service Category Filters */}
          <div className="srv-filter-tabs-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`srv-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* 6. Eight Service Cards Grid */}
          <div className="srv-cards-grid">
            {loading ? (
              <div className="srv-loading-state">
                <div className="admin-loading-spinner" />
                <p>Loading architectural services...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="srv-empty-state">
                <p>No services found in this category.</p>
              </div>
            ) : (
              filtered.map((srv) => (
                <div key={srv._id || srv.slug} className="srv-premium-card">
                  {/* Card Image Area with SPECIALIZED badge and overlapping emblem */}
                  <div className="srv-card-media">
                    <div className="srv-card-img-overflow">
                      <img
                        src={srv.coverImage || '/images/hero-villa.jpg'}
                        alt={srv.title}
                        className="srv-card-img"
                        loading="lazy"
                      />
                      <div className="srv-card-img-gradient" />
                    </div>
                    <span className="srv-specialized-badge">SPECIALIZED</span>

                    {/* Overlapping Gold Emblem Icon */}
                    <div className="srv-emblem-badge" aria-hidden="true">
                      {renderServiceIcon(srv.iconType, srv.title)}
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="srv-card-body">
                    <h3 className="srv-card-title">{srv.title}</h3>
                    <p className="srv-card-description">{srv.shortDescription}</p>

                    {/* Card Action Footer */}
                    <div className="srv-card-footer">
                      <Link to={`/services/${srv.slug}`} className="srv-explore-text-link">
                        <span>Explore Service</span>
                        <ArrowRight size={14} className="explore-inline-arrow" />
                      </Link>

                      <Link
                        to={`/services/${srv.slug}`}
                        className="srv-arrow-circle-btn"
                        aria-label={`Explore ${srv.title}`}
                      >
                        <ArrowRight size={15} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 7. The Turnkey Advantage */}
      <section className="srv-turnkey-section">
        <div className="container srv-turnkey-container">
          <div className="srv-turnkey-lead">
            <span className="turnkey-eyebrow">— THE TURNKEY ADVANTAGE —</span>
            <h2 className="turnkey-main-title">
              Zero Friction.<br />
              <span className="turnkey-title-highlight">Single Accountability.</span>
            </h2>
            <p className="turnkey-lead-text">
              From design to delivery, we unify architecture, construction and interiors under one accountable team for a seamless experience.
            </p>
            <Link to="/contact" className="btn btn-primary turnkey-cta-btn">
              <span>Discuss Your Project</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="srv-turnkey-cards-grid">
            <div className="turnkey-feature-card">
              <div className="turnkey-card-icon-wrap">
                <HardHat size={26} className="turnkey-card-icon" />
              </div>
              <h3 className="turnkey-card-title">Architect-Led Execution</h3>
              <p className="turnkey-card-desc">
                Design and site teams work together for better outcomes.
              </p>
            </div>

            <div className="turnkey-feature-card">
              <div className="turnkey-card-icon-wrap">
                <FileCheck2 size={26} className="turnkey-card-icon" />
              </div>
              <h3 className="turnkey-card-title">Grade-A Materials Only</h3>
              <p className="turnkey-card-desc">
                Certified and tested materials for long-lasting quality.
              </p>
            </div>

            <div className="turnkey-feature-card">
              <div className="turnkey-card-icon-wrap">
                <Compass size={26} className="turnkey-card-icon" />
              </div>
              <h3 className="turnkey-card-title">100% Vastu Compliance</h3>
              <p className="turnkey-card-desc">
                Calculated solar alignment, wind currents, and room orientations for harmony.
              </p>
            </div>

            <div className="turnkey-feature-card">
              <div className="turnkey-card-icon-wrap">
                <ShieldCheck size={26} className="turnkey-card-icon" />
              </div>
              <h3 className="turnkey-card-title">5-Year Structural Warranty</h3>
              <p className="turnkey-card-desc">
                Complete peace of mind with stamped warranty certificates and dedicated post-handover support.
              </p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        /* ========================================================
           SERVICES PAGE LUXURY DESIGN SYSTEM
           Midnight Navy: #102A4C | Royal Gold: #D6A43B | Warm Ivory: #F7F5F0
           ======================================================== */
        .services-page-root {
          background-color: #F7F5F0;
          color: #102A4C;
          overflow-x: hidden;
        }

        /* 3. Architectural Hero Banner */
        .srv-hero-section {
          position: relative;
          min-height: 520px;
          display: flex;
          align-items: center;
          background-color: #071527;
          overflow: hidden;
          padding: 8rem 0 4.5rem;
        }

        .srv-hero-bg-wrap {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .srv-hero-bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 35%;
        }

        .srv-hero-gradient-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            #071527 0%,
            rgba(7, 21, 39, 0.95) 42%,
            rgba(7, 21, 39, 0.65) 70%,
            rgba(7, 21, 39, 0.35) 100%
          );
        }

        .srv-hero-container {
          position: relative;
          z-index: 3;
        }

        .srv-hero-content {
          max-width: 620px;
        }

        .srv-eyebrow {
          display: inline-block;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 2.5px;
          color: #D6A43B;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        .srv-hero-title {
          font-family: var(--font-serif);
          font-size: clamp(2.4rem, 4.2vw, 3.4rem);
          line-height: 1.15;
          color: #FFFFFF;
          margin-bottom: 1.25rem;
          font-weight: 700;
        }

        .srv-title-accent {
          color: #FFFFFF;
        }

        .srv-hero-subtitle {
          font-size: 1.05rem;
          color: #E2E8F0;
          line-height: 1.7;
          margin-bottom: 1.75rem;
          max-width: 520px;
        }

        .srv-breadcrumb-nav {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .breadcrumb-link {
          color: #CBD5E1;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .breadcrumb-link:hover {
          color: #D6A43B;
        }

        .breadcrumb-divider {
          color: #D6A43B;
          font-size: 0.85rem;
        }

        .breadcrumb-active {
          color: #D6A43B;
          font-weight: 600;
        }

        /* 4. Statistics Strip */
        .srv-stats-strip {
          background: #091A32;
          border-top: 1px solid rgba(214, 164, 59, 0.25);
          border-bottom: 1px solid rgba(214, 164, 59, 0.25);
          padding: 2.5rem 0;
          position: relative;
          z-index: 4;
        }

        .srv-stats-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          align-items: center;
        }

        .srv-stat-box {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 0 0.5rem;
        }

        .stat-icon-wrap {
          flex-shrink: 0;
          width: 54px;
          height: 54px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background: rgba(214, 164, 59, 0.1);
          border: 1px solid rgba(214, 164, 59, 0.3);
        }

        .stat-icon {
          color: #D6A43B;
        }

        .stat-text-wrap {
          display: flex;
          flex-direction: column;
        }

        .stat-number {
          font-family: var(--font-serif);
          font-size: 1.85rem;
          font-weight: 700;
          color: #FFFFFF;
          line-height: 1.1;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-size: 0.85rem;
          color: #94A3B8;
          font-weight: 500;
          white-space: nowrap;
        }

        /* 5 & 6. Services Main Section (Warm Ivory) */
        .srv-main-section {
          background-color: #F7F5F0;
          padding: 4.5rem 0 6rem;
        }

        /* 5. Category Filters */
        .srv-filter-tabs-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.85rem;
          margin-bottom: 3.5rem;
          flex-wrap: wrap;
        }

        .srv-filter-btn {
          background: #FFFFFF;
          color: #4A5568;
          border: 1px solid rgba(16, 42, 76, 0.12);
          padding: 0.65rem 1.6rem;
          border-radius: 50px;
          font-size: 0.92rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .srv-filter-btn:hover {
          color: #102A4C;
          border-color: #D6A43B;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(214, 164, 59, 0.2);
        }

        .srv-filter-btn.active {
          background: #D6A43B;
          color: #0E233E;
          border-color: #D6A43B;
          font-weight: 700;
          box-shadow: 0 4px 15px rgba(214, 164, 59, 0.38);
        }

        /* 6. Eight Service Cards Grid */
        .srv-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.75rem;
        }

        .srv-premium-card {
          background: #FFFFFF;
          border-radius: 14px;
          border: 1px solid rgba(214, 164, 59, 0.22);
          box-shadow: 0 8px 24px rgba(16, 42, 76, 0.06);
          overflow: visible;
          position: relative;
          display: flex;
          flex-direction: column;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.35s ease;
        }

        .srv-premium-card:hover {
          transform: translateY(-8px);
          border-color: rgba(214, 164, 59, 0.65);
          box-shadow: 0 18px 36px rgba(16, 42, 76, 0.12), 0 0 20px rgba(214, 164, 59, 0.15);
        }

        .srv-card-media {
          position: relative;
          height: 195px;
          border-top-left-radius: 14px;
          border-top-right-radius: 14px;
        }

        .srv-card-img-overflow {
          position: absolute;
          inset: 0;
          overflow: hidden;
          border-top-left-radius: 13px;
          border-top-right-radius: 13px;
        }

        .srv-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .srv-premium-card:hover .srv-card-img {
          transform: scale(1.08);
        }

        .srv-card-img-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(16, 42, 76, 0.1) 0%, rgba(16, 42, 76, 0.5) 100%);
        }

        .srv-specialized-badge {
          position: absolute;
          top: 0.85rem;
          left: 0.85rem;
          background: rgba(11, 28, 51, 0.88);
          color: #D6A43B;
          border: 1px solid rgba(214, 164, 59, 0.45);
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 1.2px;
          padding: 0.25rem 0.65rem;
          border-radius: 4px;
          z-index: 2;
          backdrop-filter: blur(4px);
        }

        /* Overlapping Gold Circular Emblem */
        .srv-emblem-badge {
          position: absolute;
          bottom: -22px;
          left: 1.25rem;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #0E223D;
          border: 2px solid #D6A43B;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #D6A43B;
          z-index: 5;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
          transition: transform 0.3s ease, background-color 0.3s ease;
        }

        .srv-premium-card:hover .srv-emblem-badge {
          transform: scale(1.08);
          background-color: #102A4C;
        }

        /* Card Body */
        .srv-card-body {
          padding: 1.85rem 1.25rem 1.25rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .srv-card-title {
          font-family: var(--font-sans);
          font-size: 1.15rem;
          font-weight: 700;
          color: #102A4C;
          line-height: 1.3;
          margin-bottom: 0.5rem;
        }

        .srv-card-description {
          font-size: 0.84rem;
          color: #64748B;
          line-height: 1.55;
          margin-bottom: 1.25rem;
          flex-grow: 1;
        }

        /* Card Footer */
        .srv-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.85rem;
          border-top: 1px solid rgba(16, 42, 76, 0.08);
          margin-top: auto;
        }

        .srv-explore-text-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          font-weight: 700;
          color: #D6A43B;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .srv-explore-text-link:hover {
          color: #B68326;
        }

        .explore-inline-arrow {
          transition: transform 0.25s ease;
        }

        .srv-premium-card:hover .explore-inline-arrow {
          transform: translateX(4px);
        }

        .srv-arrow-circle-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(214, 164, 59, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #102A4C;
          background: #FFFFFF;
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .srv-premium-card:hover .srv-arrow-circle-btn {
          background: #D6A43B;
          color: #0E233E;
          border-color: #D6A43B;
          transform: translateX(2px);
        }

        .srv-loading-state,
        .srv-empty-state {
          grid-column: 1 / -1;
          text-align: center;
          padding: 4rem 1rem;
          color: #64748B;
        }

        /* 7. Turnkey Advantage Section (Midnight Navy) */
        .srv-turnkey-section {
          background-color: #0B1E36;
          padding: 6.5rem 0;
          color: #FFFFFF;
          position: relative;
          border-top: 1px solid rgba(214, 164, 59, 0.2);
          border-bottom: 1px solid rgba(214, 164, 59, 0.2);
        }

        .srv-turnkey-container {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 4.5rem;
          align-items: center;
        }

        .turnkey-eyebrow {
          display: inline-block;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 2.5px;
          color: #D6A43B;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        .turnkey-main-title {
          font-family: var(--font-serif);
          font-size: clamp(2.3rem, 3.8vw, 3.2rem);
          line-height: 1.18;
          color: #FFFFFF;
          margin-bottom: 1.25rem;
          font-weight: 700;
        }

        .turnkey-title-highlight {
          color: #FFFFFF;
        }

        .turnkey-lead-text {
          font-size: 1.05rem;
          color: #CBD5E1;
          line-height: 1.7;
          margin-bottom: 2.25rem;
          max-width: 480px;
        }

        .turnkey-cta-btn {
          border-radius: 50px;
          padding: 0.85rem 2.2rem;
          font-size: 0.95rem;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
        }

        .srv-turnkey-cards-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .turnkey-feature-card {
          background: #0E233E;
          border: 1px solid rgba(214, 164, 59, 0.25);
          border-radius: 14px;
          padding: 1.85rem 1.6rem;
          transition: all 0.3s ease;
        }

        .turnkey-feature-card:hover {
          transform: translateY(-5px);
          border-color: rgba(214, 164, 59, 0.6);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
        }

        .turnkey-card-icon-wrap {
          margin-bottom: 1rem;
        }

        .turnkey-card-icon {
          color: #D6A43B;
        }

        .turnkey-card-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 0.45rem;
        }

        .turnkey-card-desc {
          font-size: 0.86rem;
          color: #94A3B8;
          line-height: 1.55;
          margin: 0;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1200px) {
          .srv-cards-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
          .srv-turnkey-container {
            grid-template-columns: 1fr;
            gap: 3.5rem;
          }
          .srv-stats-container {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .srv-hero-section {
            padding: 7rem 0 3.5rem;
            min-height: 440px;
          }
          .srv-stats-container {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .srv-cards-grid {
            grid-template-columns: 1fr;
          }
          .srv-turnkey-cards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
