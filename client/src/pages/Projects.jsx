import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  ArrowRight,
  Search,
  Building2,
  Award,
  Home,
  Users,
  Trophy,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import SeoMeta from '../components/common/SeoMeta';
import { publicApi } from '../api/publicApi';
import { useSite } from '../context/SiteContext';

const WhatsAppIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.031 2C6.516 2 2.029 6.488 2.029 12.004c0 1.954.566 3.778 1.545 5.323L2 22l4.821-1.536a9.943 9.943 0 0 0 5.21 1.455c5.516 0 10.003-4.488 10.003-10.004S17.547 2 12.031 2zm0 18.232a8.21 8.21 0 0 1-4.32-1.22l-.31-.184-2.86.912.923-2.787-.202-.32a8.196 8.196 0 0 1-1.263-4.364c0-4.542 3.697-8.239 8.239-8.239 4.542 0 8.239 3.697 8.239 8.239 0 4.542-3.697 8.239-8.239 8.239zm4.516-6.173c-.247-.124-1.464-.722-1.691-.805-.227-.082-.392-.124-.557.124-.165.247-.64 1.052-.784 1.217-.144.165-.288.186-.535.062-.247-.124-1.043-.385-1.986-1.226-.734-.655-1.23-1.464-1.374-1.711-.144-.247-.015-.38.109-.503.111-.111.247-.288.371-.433.124-.144.165-.247.247-.412.082-.165.041-.309-.021-.433-.062-.124-.557-1.34-.763-1.835-.2-.482-.404-.417-.557-.425l-.474-.008c-.165 0-.433.062-.66.309-.227.247-.866.845-.866 2.062s.887 2.392 1.01 2.557c.124.165 1.745 2.664 4.227 3.736.59.255 1.052.408 1.411.522.593.189 1.133.162 1.56.098.477-.071 1.464-.598 1.67-.175.206-.577.206-1.072.144-1.175-.062-.103-.227-.165-.474-.288z" />
  </svg>
);

// 8 Curated Baseline Projects matching the reference design specifications
const baselineProjects = [
  {
    _id: 'p1',
    title: 'Premium Apartment Interiors',
    slug: 'premium-apartment-interiors',
    category: 'interior',
    location: 'Koramangala, Bengaluru',
    shortDescription:
      'Full interior design and fit-out for a 3 BHK luxury apartment with custom furniture and premium finishes.',
    coverImage: '/images/interior-living-room.jpg',
    projectStatus: 'completed',
  },
  {
    _id: 'p2',
    title: 'Contemporary Family Residence',
    slug: 'contemporary-family-residence',
    category: 'residential',
    location: 'Sarjapur Road, Bengaluru',
    shortDescription:
      'A warm and functional family home designed for modern living with Vastu compliance.',
    coverImage: '/images/project-villa.jpg',
    projectStatus: 'completed',
  },
  {
    _id: 'p3',
    title: 'Modern Luxury Villa',
    slug: 'modern-luxury-villa',
    category: 'residential',
    location: 'Whitefield, Bengaluru',
    shortDescription:
      'A stunning contemporary villa with a 4 BHK layout, infinity pool and premium interiors.',
    coverImage: '/images/about-villa-showcase.jpg',
    projectStatus: 'completed',
  },
  {
    _id: 'p4',
    title: 'Boutique Hotel Interior',
    slug: 'boutique-hotel-interior',
    category: 'commercial',
    location: 'Coorg, Karnataka',
    shortDescription:
      'Boutique eco-lodge interior design celebrating local heritage and natural materials.',
    coverImage: '/images/service-commercial.jpg',
    projectStatus: 'completed',
  },
  {
    _id: 'p5',
    title: 'Commercial Building Design',
    slug: 'commercial-building-design',
    category: 'commercial',
    location: 'Electronic City, Bengaluru',
    shortDescription:
      'A modern commercial complex designed for retail and office spaces with a contemporary facade.',
    coverImage: '/images/project-commercial.jpg',
    projectStatus: 'completed',
  },
  {
    _id: 'p6',
    title: 'Modern Office Interior',
    slug: 'modern-office-interior',
    category: 'commercial',
    location: 'MG Road, Bengaluru',
    shortDescription:
      'Contemporary corporate office design that enhances productivity and brand identity.',
    coverImage: '/images/about-architecture.jpg',
    projectStatus: 'completed',
  },
  {
    _id: 'p7',
    title: 'Heritage Villa Renovation',
    slug: 'heritage-villa-renovation',
    category: 'renovation',
    location: 'Sadashivanagar, Bengaluru',
    shortDescription:
      'Restoration and modern upgrades for a heritage villa while preserving its traditional charm.',
    coverImage: '/images/renovation-hero.jpg',
    projectStatus: 'completed',
  },
  {
    _id: 'p8',
    title: 'Skyline Twin Towers',
    slug: 'skyline-twin-towers',
    category: 'ongoing',
    location: 'Hebbal, Bengaluru',
    shortDescription:
      'Ongoing high-rise residential towers with modern amenities and sustainable construction.',
    coverImage: '/images/construction-site.jpg',
    projectStatus: 'ongoing',
  },
];

const categoryTabs = [
  { id: 'all', label: 'All Projects', hasIcon: true },
  { id: 'residential', label: 'Residential' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'interior', label: 'Interior Design' },
  { id: 'renovation', label: 'Renovation' },
  { id: 'ongoing', label: 'Ongoing' },
  { id: 'completed', label: 'Completed' },
];

export default function Projects() {
  const { settings } = useSite();
  const [projects, setProjects] = useState(baselineProjects);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 8;

  // Fetch real projects from MongoDB API
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const res = await publicApi.getProjects();
        if (res.data?.success && Array.isArray(res.data.data) && res.data.data.length > 0) {
          // Normalize API database records
          const normalized = res.data.data.map((p, idx) => ({
            _id: p._id || `p_${idx}`,
            title: p.title || 'Architectural Landmark',
            slug: p.slug || `project-${p._id}`,
            category: (p.category || 'residential').toLowerCase(),
            location: p.location || 'Bengaluru, Karnataka',
            shortDescription:
              p.shortDescription ||
              (typeof p.description === 'string'
                ? p.description.replace(/\*\*/g, '').slice(0, 130) + '...'
                : 'Bespoke design and precision turnkey execution.'),
            coverImage: p.coverImage || baselineProjects[idx % baselineProjects.length].coverImage,
            projectStatus: (p.projectStatus || 'completed').toLowerCase(),
          }));
          setProjects(normalized);
        } else {
          setProjects(baselineProjects);
        }
      } catch (err) {
        console.warn('API fetch warning, using baseline projects:', err.message);
        setProjects(baselineProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Filter & Search
  const filteredProjects = useMemo(() => {
    return projects.filter((proj) => {
      const cat = (proj.category || '').toLowerCase();
      const status = (proj.projectStatus || '').toLowerCase();

      let matchesCat = false;
      if (activeCategory === 'all') {
        matchesCat = true;
      } else if (activeCategory === 'residential') {
        matchesCat = cat === 'residential' || cat.includes('residen');
      } else if (activeCategory === 'commercial') {
        matchesCat = cat === 'commercial' || cat.includes('commer');
      } else if (activeCategory === 'interior') {
        matchesCat = cat === 'interior' || cat.includes('interior');
      } else if (activeCategory === 'renovation') {
        matchesCat = cat === 'renovation' || cat.includes('renov');
      } else if (activeCategory === 'ongoing') {
        matchesCat = status === 'ongoing' || cat === 'ongoing';
      } else if (activeCategory === 'completed') {
        matchesCat = status === 'completed';
      }

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        proj.title.toLowerCase().includes(q) ||
        (proj.location && proj.location.toLowerCase().includes(q)) ||
        (proj.category && proj.category.toLowerCase().includes(q)) ||
        (proj.shortDescription && proj.shortDescription.toLowerCase().includes(q));

      return matchesCat && matchesSearch;
    });
  }, [projects, activeCategory, searchQuery]);

  // Reset to page 1 when filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  // Pagination calculations
  const totalItems = filteredProjects.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProjects.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProjects, currentPage, itemsPerPage]);

  const getBadgeCategoryLabel = (category, status) => {
    const cat = (category || '').toLowerCase();
    const st = (status || '').toLowerCase();
    if (st === 'ongoing') return 'ONGOING';
    if (cat.includes('residen')) return 'RESIDENTIAL';
    if (cat.includes('commer')) return 'COMMERCIAL';
    if (cat.includes('inter')) return 'INTERIOR';
    if (cat.includes('renov')) return 'RENOVATION';
    return (category || 'ARCHITECTURE').toUpperCase();
  };

  // WhatsApp click action helper
  const handleWhatsAppClick = () => {
    const raw = settings.phoneRaw || '919876543210';
    const cleanNumber = raw.replace(/\D/g, '');
    window.open(
      `https://wa.me/${cleanNumber}?text=Hello%20Sri%20Ananda%20Nilayam,%20I%20would%20like%20to%20discuss%20a%20new%20project.`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="portfolio-showcase-page">
      <SeoMeta
        title="Our Projects — Portfolio of Architectural & Interior Excellence"
        description="A curated collection of our finest architectural, residential construction, commercial landmarks, and interior design projects across Bengaluru and beyond."
        canonicalUrl="/projects"
      />

      {/* ============================================================
          1. HERO SECTION (Full-Width Luxury Villa Image with Dark Navy Gradient)
          ============================================================ */}
      <section className="portfolio-hero-section">
        <div
          className="portfolio-hero-bg"
          style={{ backgroundImage: "url('/images/home-hero-villa.jpg')" }}
        />
        <div className="portfolio-hero-overlay" />

        <div className="container portfolio-hero-container">
          {/* Left Column: Heading, Subtitle & 3 Feature Badges */}
          <div className="portfolio-hero-content">
            <div className="hero-eyebrow-badge">
              <span className="eyebrow-gold-dash" />
              <span className="eyebrow-label">PORTFOLIO SHOWCASE</span>
              <span className="eyebrow-gold-dash" />
            </div>

            <h1 className="portfolio-hero-title">OUR PROJECTS</h1>

            <p className="portfolio-hero-desc">
              A curated collection of our finest architectural, construction and interior projects across Bengaluru and beyond.
            </p>

            {/* Three Compact Stats Highlights */}
            <div className="hero-stats-row">
              <div className="hero-stat-card">
                <div className="stat-circle-icon">
                  <Home size={20} />
                </div>
                <div className="stat-text-block">
                  <span className="stat-main-number">50+</span>
                  <span className="stat-sub-label">Projects Delivered</span>
                </div>
              </div>

              <div className="hero-stat-card">
                <div className="stat-circle-icon">
                  <Users size={20} />
                </div>
                <div className="stat-text-block">
                  <span className="stat-main-number">100+</span>
                  <span className="stat-sub-label">Happy Clients</span>
                </div>
              </div>

              <div className="hero-stat-card">
                <div className="stat-circle-icon">
                  <Trophy size={20} />
                </div>
                <div className="stat-text-block">
                  <span className="stat-main-number">15+</span>
                  <span className="stat-sub-label">Years of Excellence</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Decorative Gold Script Tagline */}
          <div className="portfolio-hero-right">
            <div className="hero-tagline-script">
              <span className="tagline-word word-1">Spaces</span>
              <span className="tagline-word word-2">Built for a</span>
              <span className="tagline-word word-3">Better Tomorrow</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          2. PROJECT FILTER AND SEARCH BAR (Directly Below Hero)
          ============================================================ */}
      <section className="portfolio-filter-bar-section">
        <div className="container">
          <div className="portfolio-controls-pill">
            {/* Filter Category Pills */}
            <div className="filter-pill-list" role="tablist" aria-label="Project Categories">
              {categoryTabs.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`category-pill-btn ${isActive ? 'is-active' : ''}`}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    {cat.hasIcon && <LayoutGrid size={14} className="pill-grid-ico" />}
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Search Input on Right */}
            <div className="search-field-wrapper">
              <Search size={15} className="search-inline-icon" />
              <input
                type="text"
                className="search-field-input"
                placeholder="Search projects, location or service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="button"
                className="search-gold-arrow-btn"
                aria-label="Submit search"
              >
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          3. PROJECTS GRID SECTION (Solid Warm Cream #FFF9ED Background)
          ============================================================ */}
      <section className="portfolio-grid-section">
        <div className="container">
          {loading ? (
            <div className="portfolio-loading-state">
              <div className="portfolio-spinner" />
              <p>Loading curated projects from studio archives...</p>
            </div>
          ) : paginatedProjects.length === 0 ? (
            <div className="portfolio-no-results">
              <Sparkles size={36} className="text-gold" style={{ margin: '0 auto 1rem' }} />
              <h3>No matching projects found</h3>
              <p>Try modifying your search terms or selecting a different category filter.</p>
              <button
                type="button"
                className="btn-reset-filters"
                onClick={() => {
                  setActiveCategory('all');
                  setSearchQuery('');
                }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="portfolio-4col-grid">
              {paginatedProjects.map((proj) => {
                const badgeLabel = getBadgeCategoryLabel(proj.category, proj.projectStatus);
                const targetSlug = proj.slug || 'solarium-luxury-villa';

                return (
                  <article key={proj._id || targetSlug} className="project-portfolio-card">
                    {/* Card Image with Navy & Gold Badge */}
                    <Link to={`/projects/${targetSlug}`} className="card-image-anchor" tabIndex={-1} aria-hidden="true">
                      <div className="card-image-container">
                        <img
                          src={proj.coverImage || '/images/project-villa.jpg'}
                          alt={proj.title}
                          className="card-project-photo"
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = '/images/project-villa.jpg';
                          }}
                        />
                        <span className="card-navy-badge">{badgeLabel}</span>
                      </div>
                    </Link>

                    {/* Card Body */}
                    <div className="card-info-body">
                      <h2 className="card-project-title">
                        <Link to={`/projects/${targetSlug}`}>
                          {proj.title}
                        </Link>
                      </h2>

                      {/* Location with Gold Pin */}
                      <div className="card-location-row">
                        <MapPin size={13} className="pin-icon" />
                        <span>{proj.location || 'Bengaluru, Karnataka'}</span>
                      </div>

                      {/* Short Description */}
                      <p className="card-project-desc">{proj.shortDescription}</p>

                      {/* Divider & Footer Action Row */}
                      <div className="card-action-footer">
                        <Link to={`/projects/${targetSlug}`} className="card-view-text-link">
                          <span>View Project</span>
                          <ArrowRight size={13} className="view-arrow" />
                        </Link>

                        <Link
                          to={`/projects/${targetSlug}`}
                          className="card-circle-arrow-btn"
                          aria-label={`View case study for ${proj.title}`}
                        >
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Centered Pagination Control */}
          {totalPages > 1 && (
            <div className="portfolio-pagination-bar">
              <button
                type="button"
                className="pagination-circle-btn"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                aria-label="Previous page"
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => {
                const isActive = currentPage === pg;
                return (
                  <button
                    key={pg}
                    type="button"
                    className={`pagination-num-btn ${isActive ? 'is-active' : ''}`}
                    onClick={() => setCurrentPage(pg)}
                  >
                    {pg}
                  </button>
                );
              })}

              <button
                type="button"
                className="pagination-circle-btn"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                aria-label="Next page"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ============================================================
          4. CONSULTATION CALL-TO-ACTION SECTION (Wide Navy Card with Architectural Line Art)
          ============================================================ */}
      <section className="portfolio-cta-section">
        <div className="container">
          <div className="portfolio-cta-card">
            {/* Background Architectural Blueprint Line Art */}
            <div className="cta-blueprint-art" aria-hidden="true">
              <svg width="340" height="240" viewBox="0 0 340 240" fill="none" stroke="rgba(234, 175, 53, 0.18)" strokeWidth="1.2">
                <rect x="20" y="40" width="300" height="180" rx="4" />
                <line x1="20" y1="90" x2="320" y2="90" />
                <line x1="20" y1="140" x2="320" y2="140" />
                <line x1="80" y1="40" x2="80" y2="220" />
                <line x1="160" y1="40" x2="160" y2="220" />
                <line x1="240" y1="40" x2="240" y2="220" />
                <circle cx="160" cy="115" r="18" />
                <line x1="40" y1="20" x2="300" y2="20" strokeDasharray="4 4" />
                <polygon points="170,10 150,40 190,40" stroke="rgba(234, 175, 53, 0.25)" />
              </svg>
            </div>

            <div className="cta-text-left">
              <div className="cta-eyebrow">
                <span className="cta-dash" />
                <span>LET&apos;S BUILD YOUR VISION</span>
                <span className="cta-dash" />
              </div>
              <h2 className="cta-heading">HAVE A PROJECT IN MIND?</h2>
              <p className="cta-description">
                Discuss your ideas with our expert team and turn them into a beautifully designed reality.
              </p>
            </div>

            <div className="cta-actions-right">
              <Link to="/contact" className="cta-btn-gold">
                <span>Get a Free Consultation</span>
                <ArrowRight size={15} />
              </Link>
              <button
                type="button"
                className="cta-btn-whatsapp"
                onClick={handleWhatsAppClick}
              >
                <WhatsAppIcon size={17} />
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          EXECUTIVE PROJECTS PAGE STYLING
          ============================================================ */}
      <style>{`
        .portfolio-showcase-page {
          background-color: #07172B;
          color: #102844;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }

        /* ── 1. Hero Section ── */
        .portfolio-hero-section {
          position: relative;
          min-height: 480px;
          padding-top: 145px;
          padding-bottom: 50px;
          display: flex;
          align-items: center;
          overflow: hidden;
          background-color: #07172B;
        }

        .portfolio-hero-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center right;
          background-repeat: no-repeat;
          z-index: 1;
        }

        .portfolio-hero-overlay {
          position: absolute;
          inset: 0;
          z-index: 2;
          background: linear-gradient(
            90deg,
            #07172B 0%,
            rgba(7, 23, 43, 0.95) 45%,
            rgba(7, 23, 43, 0.65) 75%,
            rgba(7, 23, 43, 0.2) 100%
          );
        }

        .portfolio-hero-container {
          position: relative;
          z-index: 5;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          gap: 2rem;
        }

        .portfolio-hero-content {
          max-width: 660px;
          flex: 1;
        }

        .hero-eyebrow-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          margin-bottom: 0.65rem;
        }

        .eyebrow-gold-dash {
          width: 22px;
          height: 1.5px;
          background: #EAAF35;
        }

        .eyebrow-label {
          color: #EAAF35;
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }

        .portfolio-hero-title {
          font-family: 'Cinzel', 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2.5rem, 4.4vw, 3.8rem);
          font-weight: 700;
          color: #FFFFFF;
          letter-spacing: 0.03em;
          line-height: 1.1;
          margin: 0 0 1rem 0;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
        }

        .portfolio-hero-desc {
          font-size: 1.02rem;
          line-height: 1.6;
          color: rgba(241, 245, 249, 0.9);
          max-width: 540px;
          margin: 0 0 2.2rem 0;
        }

        .hero-stats-row {
          display: flex;
          align-items: center;
          gap: 1.8rem;
          flex-wrap: wrap;
        }

        .hero-stat-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .stat-circle-icon {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1.5px solid #EAAF35;
          background: rgba(7, 23, 43, 0.45);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #EAAF35;
          flex-shrink: 0;
          transition: transform 0.25s ease, border-color 0.25s ease;
        }

        .hero-stat-card:hover .stat-circle-icon {
          transform: scale(1.06);
          border-color: #F5BE47;
          box-shadow: 0 0 12px rgba(234, 175, 53, 0.35);
        }

        .stat-text-block {
          display: flex;
          flex-direction: column;
        }

        .stat-main-number {
          font-size: 1.15rem;
          font-weight: 700;
          color: #FFFFFF;
          line-height: 1.2;
        }

        .stat-sub-label {
          font-size: 0.74rem;
          font-weight: 500;
          color: rgba(226, 232, 240, 0.78);
          line-height: 1.25;
        }

        .portfolio-hero-right {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          flex-shrink: 0;
          padding-right: 1.5rem;
        }

        .hero-tagline-script {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          font-family: 'Caveat', cursive;
          font-size: clamp(2.2rem, 3.2vw, 3.2rem);
          font-weight: 700;
          color: #EAAF35;
          line-height: 1.1;
          transform: rotate(-8deg);
          text-shadow: 0 4px 18px rgba(0, 0, 0, 0.65), 0 0 30px rgba(234, 175, 53, 0.45);
          user-select: none;
        }

        .tagline-word.word-1 {
          margin-right: 1.4rem;
        }

        .tagline-word.word-2 {
          margin-right: 0.6rem;
        }

        /* ── 2. Filter & Search Bar ── */
        .portfolio-filter-bar-section {
          position: relative;
          z-index: 20;
          margin-top: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .portfolio-controls-pill {
          background: #0B203B;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 9999px;
          padding: 0.45rem 0.65rem 0.45rem 0.75rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
        }

        .filter-pill-list {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          flex-wrap: wrap;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .filter-pill-list::-webkit-scrollbar {
          display: none;
        }

        .category-pill-btn {
          border-radius: 9999px;
          padding: 0.55rem 1.15rem;
          font-size: 0.83rem;
          font-weight: 600;
          cursor: pointer;
          background: #0E2746;
          color: #E2E8F0;
          border: 1px solid rgba(255, 255, 255, 0.12);
          transition: all 0.22s ease;
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
        }

        .category-pill-btn:hover {
          background: #143760;
          color: #EAAF35;
          border-color: rgba(234, 175, 53, 0.4);
        }

        .category-pill-btn.is-active {
          background: #EAAF35;
          color: #07172B;
          border-color: #EAAF35;
          font-weight: 700;
          box-shadow: 0 2px 10px rgba(234, 175, 53, 0.4);
        }

        .pill-grid-ico {
          color: inherit;
        }

        .search-field-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          min-width: 290px;
          max-width: 340px;
          flex: 1;
        }

        .search-inline-icon {
          position: absolute;
          left: 0.95rem;
          color: #94A3B8;
          pointer-events: none;
        }

        .search-field-input {
          width: 100%;
          padding: 0.58rem 2.85rem 0.58rem 2.45rem;
          background: #07182E;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 9999px;
          color: #FFFFFF;
          font-size: 0.84rem;
          outline: none;
          transition: all 0.2s ease;
        }

        .search-field-input::placeholder {
          color: #8C9CAE;
          font-size: 0.82rem;
        }

        .search-field-input:focus {
          border-color: #EAAF35;
          box-shadow: 0 0 12px rgba(234, 175, 53, 0.28);
          background: #091D38;
        }

        .search-gold-arrow-btn {
          position: absolute;
          right: 4px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #EAAF35;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #07172B;
          cursor: pointer;
          transition: transform 0.2s ease, background 0.2s ease;
          flex-shrink: 0;
        }

        .search-gold-arrow-btn:hover {
          background: #F5BE47;
          transform: scale(1.08);
        }

        /* ── 3. Projects Grid Section (Solid Warm Cream #FFF9ED) ── */
        .portfolio-grid-section {
          background-color: #FFF9ED;
          padding: 4.5rem 0 5rem 0;
          color: #102844;
          border-top: 1px solid rgba(234, 175, 53, 0.2);
        }

        .portfolio-4col-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .project-portfolio-card {
          background: #FFFFFF;
          border-radius: 16px;
          border: 1px solid #E2E8F0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 18px rgba(7, 23, 43, 0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
        }

        .project-portfolio-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 14px 32px rgba(7, 23, 43, 0.12), 0 0 16px rgba(234, 175, 53, 0.18);
          border-color: #EAAF35;
        }

        .card-image-anchor {
          display: block;
          text-decoration: none;
        }

        .card-image-container {
          position: relative;
          height: 205px;
          overflow: hidden;
          background-color: #0F1E33;
        }

        .card-project-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }

        .project-portfolio-card:hover .card-project-photo {
          transform: scale(1.06);
        }

        .card-navy-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          z-index: 2;
          background: rgba(7, 23, 43, 0.88);
          backdrop-filter: blur(4px);
          border: 1px solid #EAAF35;
          border-radius: 9999px;
          padding: 0.26rem 0.75rem;
          color: #EAAF35;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.25);
        }

        .card-info-body {
          padding: 1.35rem 1.3rem 1.25rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          background: #FFFFFF;
        }

        .card-project-title {
          font-family: 'Cinzel', 'Cormorant Garamond', Georgia, serif;
          font-size: 1.15rem;
          font-weight: 700;
          line-height: 1.32;
          margin: 0 0 0.35rem 0;
          min-height: 3rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-project-title a {
          color: #102844;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .card-project-title a:hover {
          color: #B45309;
        }

        .card-location-row {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          color: #B45309;
          font-size: 0.82rem;
          font-weight: 600;
          margin-bottom: 0.65rem;
        }

        .pin-icon {
          color: #EAAF35;
          flex-shrink: 0;
        }

        .card-project-desc {
          font-size: 0.82rem;
          line-height: 1.5;
          color: #64748B;
          margin: 0 0 1.25rem 0;
          min-height: 3.6rem;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-action-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
          padding-top: 0.85rem;
          border-top: 1px solid #F1F5F9;
        }

        .card-view-text-link {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          color: #B45309;
          font-size: 0.84rem;
          font-weight: 700;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .card-view-text-link:hover {
          color: #EAAF35;
        }

        .view-arrow {
          transition: transform 0.2s ease;
        }

        .card-view-text-link:hover .view-arrow {
          transform: translateX(4px);
        }

        .card-circle-arrow-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1.2px solid rgba(234, 175, 53, 0.45);
          background: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #B45309;
          text-decoration: none;
          transition: all 0.25s ease;
          flex-shrink: 0;
        }

        .project-portfolio-card:hover .card-circle-arrow-btn,
        .card-circle-arrow-btn:hover {
          background: #EAAF35;
          border-color: #EAAF35;
          color: #07172B;
          transform: scale(1.08);
          box-shadow: 0 2px 8px rgba(234, 175, 53, 0.35);
        }

        /* Loading & No Results */
        .portfolio-loading-state,
        .portfolio-no-results {
          text-align: center;
          padding: 4rem 2rem;
          background: #FFFFFF;
          border-radius: 16px;
          border: 1px solid #E2E8F0;
          box-shadow: 0 4px 18px rgba(7, 23, 43, 0.04);
        }

        .portfolio-spinner {
          width: 32px;
          height: 32px;
          border: 3px solid #E2E8F0;
          border-top-color: #EAAF35;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          margin: 0 auto 1rem;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .portfolio-no-results h3 {
          font-family: 'Cinzel', serif;
          font-size: 1.5rem;
          color: #102844;
          margin: 0 0 0.5rem 0;
        }

        .portfolio-no-results p {
          color: #64748B;
          font-size: 0.92rem;
          margin: 0 0 1.5rem 0;
        }

        .btn-reset-filters {
          background: #EAAF35;
          color: #07172B;
          border: none;
          padding: 0.6rem 1.4rem;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 0.88rem;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .btn-reset-filters:hover {
          background: #D69E2E;
        }

        /* ── Pagination Bar ── */
        .portfolio-pagination-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 3.5rem;
        }

        .pagination-circle-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid #CBD5E1;
          background: #FFFFFF;
          color: #475569;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .pagination-circle-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .pagination-circle-btn:hover:not(:disabled) {
          border-color: #EAAF35;
          color: #07172B;
          background: #FFF9ED;
        }

        .pagination-num-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid #CBD5E1;
          background: #FFFFFF;
          color: #475569;
          font-size: 0.86rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pagination-num-btn:hover {
          border-color: #EAAF35;
          color: #07172B;
        }

        .pagination-num-btn.is-active {
          background: #07172B;
          border-color: #07172B;
          color: #FFFFFF;
          font-weight: 700;
          box-shadow: 0 4px 12px rgba(7, 23, 43, 0.25);
        }

        /* ── 4. Consultation CTA Section ── */
        .portfolio-cta-section {
          background-color: #FFF9ED;
          padding: 0 0 5rem 0;
        }

        .portfolio-cta-card {
          position: relative;
          background: #07172B;
          border: 1.5px solid rgba(234, 175, 53, 0.35);
          border-radius: 18px;
          padding: 3.5rem 3.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2.5rem;
          overflow: hidden;
          box-shadow: 0 16px 48px rgba(7, 23, 43, 0.35);
        }

        .cta-blueprint-art {
          position: absolute;
          right: -20px;
          bottom: -20px;
          pointer-events: none;
          opacity: 0.65;
        }

        .cta-text-left {
          position: relative;
          z-index: 2;
          max-width: 580px;
        }

        .cta-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          color: #EAAF35;
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 0.65rem;
        }

        .cta-dash {
          width: 20px;
          height: 1.5px;
          background: #EAAF35;
        }

        .cta-heading {
          font-family: 'Cinzel', 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(1.85rem, 2.8vw, 2.5rem);
          font-weight: 700;
          color: #FFFFFF;
          margin: 0 0 0.65rem 0;
          letter-spacing: 0.02em;
          line-height: 1.2;
        }

        .cta-description {
          font-size: 0.95rem;
          color: rgba(241, 245, 249, 0.85);
          line-height: 1.6;
          margin: 0;
        }

        .cta-actions-right {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-shrink: 0;
          flex-wrap: wrap;
        }

        .cta-btn-gold {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: #EAAF35;
          color: #07172B;
          font-size: 0.9rem;
          font-weight: 700;
          padding: 0.85rem 1.65rem;
          border-radius: 9999px;
          text-decoration: none;
          border: none;
          transition: all 0.25s ease;
          box-shadow: 0 4px 16px rgba(234, 175, 53, 0.35);
          white-space: nowrap;
        }

        .cta-btn-gold:hover {
          background: #F5BE47;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(234, 175, 53, 0.45);
        }

        .cta-btn-whatsapp {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: #0B203B;
          color: #FFFFFF;
          font-size: 0.9rem;
          font-weight: 600;
          padding: 0.85rem 1.65rem;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          cursor: pointer;
          transition: all 0.25s ease;
          white-space: nowrap;
        }

        .cta-btn-whatsapp:hover {
          background: #102844;
          border-color: #22C55E;
          color: #22C55E;
          transform: translateY(-2px);
        }

        /* ── Responsive Rules ── */
        @media (max-width: 1200px) {
          .portfolio-4col-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
          .hero-tagline-script {
            font-size: 2.4rem;
          }
        }

        @media (max-width: 992px) {
          .portfolio-hero-container {
            flex-direction: column;
            align-items: flex-start;
          }
          .portfolio-hero-right {
            padding-right: 0;
            margin-top: 1rem;
            align-self: flex-start;
          }
          .hero-tagline-script {
            align-items: flex-start;
            transform: rotate(-4deg);
          }
          .portfolio-controls-pill {
            border-radius: 20px;
            flex-direction: column;
            align-items: stretch;
            padding: 1rem;
          }
          .search-field-wrapper {
            max-width: 100%;
          }
          .portfolio-cta-card {
            flex-direction: column;
            align-items: flex-start;
            padding: 2.5rem 2rem;
          }
          .cta-actions-right {
            width: 100%;
          }
        }

        @media (max-width: 768px) {
          .portfolio-hero-section {
            padding-top: 125px;
            min-height: auto;
          }
          .hero-stats-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .filter-pill-list {
            overflow-x: auto;
            flex-wrap: nowrap;
            padding-bottom: 0.4rem;
            -webkit-overflow-scrolling: touch;
          }
          .portfolio-4col-grid {
            grid-template-columns: 1fr;
          }
          .cta-btn-gold,
          .cta-btn-whatsapp {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
