import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, ArrowUpRight } from 'lucide-react';

export default function FeaturedProjects() {
  const [activeCategory, setActiveCategory] = useState('all');

  const projects = [
    {
      title: 'Modern Villa',
      location: 'Whitefield, Bengaluru',
      category: 'residential',
      slug: 'solarium-luxury-villa',
      image: '/images/project-villa.jpg',
      scope: 'Residential',
      tag: 'Completed',
    },
    {
      title: 'Luxury Villa',
      location: 'Jayalakshmipuram, Mysuru',
      category: 'residential',
      slug: 'heritage-villa-restoration',
      image: '/images/hero-villa.jpg',
      scope: 'Residential',
      tag: 'Completed',
    },
    {
      title: 'Office Space',
      location: 'Outer Ring Road, Bengaluru',
      category: 'commercial',
      slug: 'aura-corporate-headquarters',
      image: '/images/project-commercial.jpg',
      scope: 'Commercial',
      tag: 'Completed',
    },
    {
      title: 'Luxury Interior',
      location: 'Indiranagar, Bengaluru',
      category: 'interiors',
      slug: 'bespoke-penthouse-living',
      image: '/images/interior-living-room.jpg',
      scope: 'Interior Design',
      tag: 'Completed',
    },
    {
      title: 'Home Renovation',
      location: 'Koramangala, Bengaluru',
      category: 'renovation',
      slug: 'culinary-master-modular-kitchen',
      image: '/images/interior-kitchen.jpg',
      scope: 'Renovation',
      tag: 'Completed',
    },
    {
      title: 'Commercial Building',
      location: 'Bellary Road, Hosapete',
      category: 'commercial',
      slug: 'aura-corporate-headquarters',
      image: '/images/construction-site.jpg',
      scope: 'Commercial',
      tag: 'Ongoing',
    },
  ];

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'residential', label: 'Residential' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'interiors', label: 'Interior Design' },
    { id: 'renovation', label: 'Renovation' },
  ];

  const filtered =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="fp-root">
      <div className="container">

        {/* ── Header Row ── */}
        <div className="fp-header-row">
          <div className="fp-header-left">
            <span className="fp-eyebrow">FEATURED PROJECTS</span>
            <h2 className="fp-title">Our Latest Projects</h2>
          </div>

          {/* Filter tabs + View All on the right */}
          <div className="fp-header-right">
            <div className="fp-filter-tabs">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`fp-tab ${activeCategory === cat.id ? 'fp-tab-active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <Link to="/projects" className="fp-viewall-btn">
              View All Projects <ArrowRight size={14} style={{ display: 'inline', marginLeft: 4 }} />
            </Link>
          </div>
        </div>

        {/* ── Projects Grid ── */}
        <div className="fp-grid">
          {filtered.slice(0, 4).map((item, idx) => (
            <Link
              key={idx}
              to={`/projects/${item.slug}`}
              className="fp-card"
              aria-label={item.title}
            >
              {/* Image */}
              <div className="fp-card-img-wrap">
                <img
                  src={item.image}
                  alt={item.title}
                  className="fp-card-img"
                  loading="lazy"
                />
                {/* Gradient overlay */}
                <div className="fp-card-gradient" />

                {/* Status badge */}
                <span className={`fp-badge ${item.tag === 'Ongoing' ? 'fp-badge-ongoing' : 'fp-badge-done'}`}>
                  {item.tag}
                </span>

                {/* Arrow icon top-right */}
                <div className="fp-card-arrow">
                  <ArrowUpRight size={18} />
                </div>

                {/* Bottom info overlay */}
                <div className="fp-card-bottom">
                  <div className="fp-card-meta">
                    <span className="fp-card-scope">{item.scope}</span>
                  </div>
                  <h3 className="fp-card-title">{item.title}</h3>
                  <div className="fp-card-location">
                    <MapPin size={13} />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="fp-mobile-viewall">
          <Link to="/projects" className="fp-mobile-viewall-btn">
            <span>View All Projects</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <style>{`
        /* ── Root ── */
        .fp-root {
          background: #FFFFFF;
          padding: 5rem 0 5.5rem;
        }

        /* ── Header Row ── */
        .fp-header-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }

        .fp-header-left {
          flex-shrink: 0;
        }

        .fp-eyebrow {
          display: block;
          font-family: var(--font-sans);
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 2.5px;
          color: #D6A43B;
          text-transform: uppercase;
          margin-bottom: 0.55rem;
        }

        .fp-title {
          font-family: var(--font-serif);
          font-size: clamp(1.75rem, 2.6vw, 2.4rem);
          font-weight: 700;
          color: #102A4C;
          line-height: 1.2;
          text-transform: none;
          letter-spacing: 0.2px;
          margin: 0;
        }

        .fp-header-right {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          flex-wrap: wrap;
        }

        /* ── Filter Tabs ── */
        .fp-filter-tabs {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          flex-wrap: wrap;
        }

        .fp-tab {
          font-family: var(--font-sans);
          font-size: 0.84rem;
          font-weight: 600;
          padding: 0.48rem 1.1rem;
          border-radius: 50px;
          border: 1.5px solid rgba(16, 42, 76, 0.15);
          background: transparent;
          color: #102A4C;
          cursor: pointer;
          letter-spacing: 0.2px;
          white-space: nowrap;
          transition: all 0.22s ease;
        }

        .fp-tab:hover {
          border-color: #D6A43B;
          color: #D6A43B;
        }

        .fp-tab-active {
          background: #D6A43B !important;
          border-color: #D6A43B !important;
          color: #fff !important;
          font-weight: 700;
          box-shadow: 0 4px 14px rgba(214, 164, 59, 0.35);
        }

        /* ── View All Desktop Button ── */
        .fp-viewall-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-sans);
          font-size: 0.88rem;
          font-weight: 600;
          color: #102A4C;
          background: #fff;
          border: 1.5px solid #D6A43B;
          padding: 0.55rem 1.25rem;
          border-radius: 50px;
          text-decoration: none;
          white-space: nowrap;
          transition: all 0.22s ease;
          flex-shrink: 0;
        }

        .fp-viewall-btn:hover {
          background: #D6A43B;
          color: #fff;
        }

        /* ── Grid ── */
        .fp-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
        }

        /* ── Card ── */
        .fp-card {
          display: block;
          text-decoration: none;
          border-radius: 14px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 4px 20px rgba(16, 42, 76, 0.1);
          transition: transform 0.32s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.32s ease;
        }

        .fp-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(16, 42, 76, 0.2);
        }

        .fp-card-img-wrap {
          position: relative;
          aspect-ratio: 3 / 4;
          overflow: hidden;
          background: #e8e5dd;
        }

        .fp-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.65s cubic-bezier(0.16,1,0.3,1);
        }

        .fp-card:hover .fp-card-img {
          transform: scale(1.07);
        }

        /* Gradient from transparent to dark at bottom */
        .fp-card-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(16, 42, 76, 0.0) 30%,
            rgba(16, 42, 76, 0.5) 60%,
            rgba(16, 42, 76, 0.92) 100%
          );
          pointer-events: none;
        }

        /* Status badge top-left */
        .fp-badge {
          position: absolute;
          top: 0.85rem;
          left: 0.85rem;
          font-family: var(--font-sans);
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 0.3rem 0.7rem;
          border-radius: 4px;
          z-index: 3;
        }

        .fp-badge-done {
          background: rgba(16, 42, 76, 0.82);
          color: #D6A43B;
          border: 1px solid rgba(214, 164, 59, 0.5);
          backdrop-filter: blur(6px);
        }

        .fp-badge-ongoing {
          background: rgba(16, 42, 76, 0.82);
          color: #60A5FA;
          border: 1px solid rgba(96, 165, 250, 0.5);
          backdrop-filter: blur(6px);
        }

        /* Arrow top-right */
        .fp-card-arrow {
          position: absolute;
          top: 0.85rem;
          right: 0.85rem;
          width: 34px;
          height: 34px;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          z-index: 3;
          transition: background 0.25s ease, border-color 0.25s ease;
        }

        .fp-card:hover .fp-card-arrow {
          background: #D6A43B;
          border-color: #D6A43B;
        }

        /* Bottom Info */
        .fp-card-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1.1rem 1.15rem 1.15rem;
          z-index: 3;
        }

        .fp-card-meta {
          margin-bottom: 0.3rem;
        }

        .fp-card-scope {
          font-family: var(--font-sans);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #D6A43B;
        }

        .fp-card-title {
          font-family: var(--font-serif);
          font-size: 1.1rem;
          font-weight: 700;
          color: #FFFFFF;
          margin: 0 0 0.4rem 0;
          line-height: 1.3;
          text-transform: none;
        }

        .fp-card-location {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-family: var(--font-sans);
          font-size: 0.78rem;
          color: rgba(255,255,255,0.75);
        }

        /* ── Mobile View All ── */
        .fp-mobile-viewall {
          display: none;
          justify-content: center;
          margin-top: 2rem;
        }

        .fp-mobile-viewall-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-sans);
          font-size: 0.9rem;
          font-weight: 600;
          color: #102A4C;
          background: #fff;
          border: 1.5px solid #D6A43B;
          padding: 0.7rem 1.5rem;
          border-radius: 50px;
          text-decoration: none;
          transition: all 0.22s ease;
        }

        .fp-mobile-viewall-btn:hover {
          background: #D6A43B;
          color: #fff;
        }

        /* ── Responsive ── */
        @media (max-width: 1200px) {
          .fp-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 900px) {
          .fp-header-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.25rem;
          }
          .fp-header-right {
            width: 100%;
            flex-direction: column;
            align-items: flex-start;
            gap: 0.85rem;
          }
          .fp-viewall-btn {
            display: none;
          }
          .fp-mobile-viewall {
            display: flex;
          }
        }

        @media (max-width: 640px) {
          .fp-root {
            padding: 3.5rem 0 4rem;
          }
          .fp-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.9rem;
          }
          .fp-card-img-wrap {
            aspect-ratio: 2 / 3;
          }
          .fp-card-title {
            font-size: 0.95rem;
          }
          .fp-filter-tabs {
            gap: 0.35rem;
          }
          .fp-tab {
            font-size: 0.78rem;
            padding: 0.4rem 0.85rem;
          }
        }

        @media (max-width: 380px) {
          .fp-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
