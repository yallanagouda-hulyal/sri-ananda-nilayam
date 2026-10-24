import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Building2, Armchair, Sparkles } from 'lucide-react';

export default function FeaturedServices() {
  const services = [
    {
      id: 1,
      title: 'Architecture & Planning',
      slug: 'architectural-design',
      desc: 'Functional, aesthetic and sustainable designs tailored to your needs.',
      fullDesc: 'Innovative floor plans, 3D photorealistic visualizations, and Vastu-compliant blueprints engineered with precision.',
      image: '/images/service-design.jpg',
      icon: <Compass size={24} />,
      tag: 'Design & Planning',
      color: '#102A4C',
    },
    {
      id: 2,
      title: 'Construction',
      slug: 'residential-construction',
      desc: 'Quality construction with transparent process and on-time delivery.',
      fullDesc: 'Turnkey residential and commercial construction with certified Grade-A materials and strict milestone discipline.',
      image: '/images/service-construction.jpg',
      icon: <Building2 size={24} />,
      tag: 'Civil & Structural',
      color: '#1a3a5c',
    },
    {
      id: 3,
      title: 'Interior Design',
      slug: 'interior-design',
      desc: 'Elegant and personalized interiors for homes, offices and commercial spaces.',
      fullDesc: 'Bespoke interior architecture, custom woodwork, ambient illumination, and curated furnishings reflecting your individuality.',
      image: '/images/service-interiors.jpg',
      icon: <Armchair size={24} />,
      tag: 'Bespoke Interiors',
      color: '#102A4C',
    },
    {
      id: 4,
      title: 'Renovation & Remodeling',
      slug: 'turnkey-projects',
      desc: 'Transform existing spaces with modern design and expertise execution.',
      fullDesc: 'End-to-end transformation from initial structural evaluation to furnished, turnkey delivery with single-point accountability.',
      image: '/images/interior-living-room.jpg',
      icon: <Sparkles size={24} />,
      tag: 'Turnkey Excellence',
      color: '#1a3a5c',
    },
  ];

  return (
    <section className="fs-root">
      <div className="container">
        {/* Section Header */}
        <div className="fs-header">
          <span className="fs-eyebrow">OUR SERVICES</span>
          <h2 className="fs-title">Complete Design &amp; Build Solutions</h2>
          <p className="fs-subtitle">
            From architectural planning to construction and elegant interiors, we provide end-to-end solutions
            for residential, commercial and renovation projects.
          </p>
          <Link to="/services" className="fs-viewall-desktop">
            View All Services <ArrowRight size={15} style={{ display: 'inline', marginLeft: '4px' }} />
          </Link>
        </div>

        {/* 4 Service Cards Grid */}
        <div className="fs-grid">
          {services.map((item) => (
            <div key={item.id} className="fs-card">
              {/* Image Section */}
              <div className="fs-card-img-wrap">
                <img
                  src={item.image}
                  alt={item.title}
                  className="fs-card-img"
                  loading="lazy"
                />
                <div className="fs-card-img-overlay" />
              </div>

              {/* Bottom content bar */}
              <div className="fs-card-content">
                <div className="fs-card-icon-row">
                  <div className="fs-card-icon-badge">
                    {item.icon}
                  </div>
                  <Link to={`/services/${item.slug}`} className="fs-card-arrow-btn" aria-label={`Explore ${item.title}`}>
                    <ArrowRight size={18} />
                  </Link>
                </div>
                <h3 className="fs-card-title">{item.title}</h3>
                <p className="fs-card-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile view all */}
        <div className="fs-viewall-mobile-wrap">
          <Link to="/services" className="fs-viewall-mobile">
            <span>View All Services</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <style>{`
        /* ===== Section Root ===== */
        .fs-root {
          background: #F7F5F0;
          padding: 5rem 0 5.5rem;
          position: relative;
        }

        /* ===== Section Header ===== */
        .fs-header {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-bottom: 2.5rem;
          position: relative;
        }

        .fs-eyebrow {
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 2.5px;
          color: #D6A43B;
          text-transform: uppercase;
          margin-bottom: 0.6rem;
        }

        .fs-title {
          font-family: var(--font-serif);
          font-size: clamp(1.8rem, 2.8vw, 2.5rem);
          font-weight: 700;
          color: #102A4C;
          line-height: 1.2;
          margin-bottom: 0.75rem;
          text-transform: none;
          letter-spacing: 0.2px;
          max-width: 520px;
        }

        .fs-subtitle {
          font-family: var(--font-sans);
          font-size: 0.97rem;
          color: #5a6a7a;
          line-height: 1.7;
          max-width: 560px;
          margin-bottom: 1.25rem;
        }

        .fs-viewall-desktop {
          position: absolute;
          right: 0;
          bottom: 0;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-sans);
          font-size: 0.9rem;
          font-weight: 600;
          color: #102A4C;
          background: #FFFFFF;
          border: 1.5px solid #D6A43B;
          padding: 0.6rem 1.25rem;
          border-radius: 50px;
          text-decoration: none;
          transition: all 0.25s ease;
          white-space: nowrap;
        }

        .fs-viewall-desktop:hover {
          background: #D6A43B;
          color: #fff;
          border-color: #D6A43B;
        }

        /* ===== Cards Grid ===== */
        .fs-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        /* ===== Single Card ===== */
        .fs-card {
          background: #FFFFFF;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(16, 42, 76, 0.10);
          border: 1px solid rgba(16, 42, 76, 0.08);
          display: flex;
          flex-direction: column;
          transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.32s ease;
        }

        .fs-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(16, 42, 76, 0.18);
        }

        /* Image */
        .fs-card-img-wrap {
          position: relative;
          height: 200px;
          overflow: hidden;
          background: #e8e5dd;
        }

        .fs-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .fs-card:hover .fs-card-img {
          transform: scale(1.06);
        }

        .fs-card-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            transparent 40%,
            rgba(16, 42, 76, 0.45) 100%
          );
          pointer-events: none;
        }

        /* Content Area */
        .fs-card-content {
          padding: 1.4rem 1.5rem 1.5rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          background: #FFFFFF;
          border-top: 3px solid #D6A43B;
        }

        .fs-card-icon-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.9rem;
        }

        .fs-card-icon-badge {
          width: 48px;
          height: 48px;
          border-radius: 10px;
          background: #102A4C;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #D6A43B;
          flex-shrink: 0;
          transition: background 0.25s ease;
        }

        .fs-card:hover .fs-card-icon-badge {
          background: #D6A43B;
          color: #102A4C;
        }

        .fs-card-arrow-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #F7F5F0;
          border: 1.5px solid rgba(16, 42, 76, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #102A4C;
          text-decoration: none;
          transition: all 0.25s ease;
          flex-shrink: 0;
        }

        .fs-card:hover .fs-card-arrow-btn {
          background: #D6A43B;
          border-color: #D6A43B;
          color: #fff;
        }

        .fs-card-title {
          font-family: var(--font-serif);
          font-size: 1.15rem;
          font-weight: 700;
          color: #102A4C;
          margin-bottom: 0.5rem;
          line-height: 1.3;
          text-transform: none;
        }

        .fs-card-desc {
          font-family: var(--font-sans);
          font-size: 0.875rem;
          color: #5a6a7a;
          line-height: 1.65;
          flex: 1;
        }

        /* Mobile View All */
        .fs-viewall-mobile-wrap {
          display: none;
          justify-content: center;
          margin-top: 2rem;
        }

        .fs-viewall-mobile {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-sans);
          font-size: 0.92rem;
          font-weight: 600;
          color: #102A4C;
          background: #FFFFFF;
          border: 1.5px solid #D6A43B;
          padding: 0.7rem 1.5rem;
          border-radius: 50px;
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .fs-viewall-mobile:hover {
          background: #D6A43B;
          color: #fff;
          border-color: #D6A43B;
        }

        /* ===== Responsive ===== */
        @media (max-width: 1200px) {
          .fs-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .fs-viewall-desktop {
            position: static;
            margin-top: 0;
          }
          .fs-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0;
          }
        }

        @media (max-width: 768px) {
          .fs-root {
            padding: 3.5rem 0 4rem;
          }
          .fs-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
          .fs-viewall-desktop {
            display: none;
          }
          .fs-viewall-mobile-wrap {
            display: flex;
          }
          .fs-card-img-wrap {
            height: 170px;
          }
        }

        @media (max-width: 520px) {
          .fs-grid {
            grid-template-columns: 1fr;
          }
          .fs-card-img-wrap {
            height: 200px;
          }
        }
      `}</style>
    </section>
  );
}
