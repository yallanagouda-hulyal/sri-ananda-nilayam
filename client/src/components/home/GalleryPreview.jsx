import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Maximize2 } from 'lucide-react';
import LightboxModal from '../common/LightboxModal';

export default function GalleryPreview() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);

  const galleryItems = [
    { url: '/images/hero-villa.jpg', caption: 'Luxury Villa Twilight Facade', category: 'exterior', location: 'Bengaluru' },
    { url: '/images/interior-living-room.jpg', caption: 'Contemporary Double-Height Living Room', category: 'interior', location: 'Bengaluru' },
    { url: '/images/project-villa.jpg', caption: 'Cantilevered Glass Villa Architecture', category: 'exterior', location: 'Bengaluru' },
    { url: '/images/interior-kitchen.jpg', caption: 'Minimalist Modular Kitchen with Quartz Island', category: 'interior', location: 'Bengaluru' },
    { url: '/images/project-commercial.jpg', caption: 'Sustainable Commercial Campus Glazing', category: 'construction', location: 'Hosapete' },
    { url: '/images/interior-bedroom.jpg', caption: 'Master Suite with Fluted Acoustic Wood Paneling', category: 'interior', location: 'Bengaluru' },
  ];

  const categories = [
    { id: 'all', label: 'All Exhibits' },
    { id: 'exterior', label: 'Exterior Architecture' },
    { id: 'interior', label: 'Interiors' },
    { id: 'construction', label: 'Civil Construction' },
  ];

  const filtered =
    activeCategory === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const openLightbox = (idx) => {
    setSelectedIdx(idx);
    setLightboxOpen(true);
  };

  return (
    <section className="gallery-preview-root section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">VISUAL ARCHIVE</span>
          <h2 className="section-title">Architectural Photography Gallery</h2>
          <p className="section-subtitle">
            A visual documentation of materiality, natural daylight illumination, and spatial geometry crafted across our projects.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="luxury-filter-pills">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`filter-pill-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="gallery-luxury-grid">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className="luxury-gallery-card"
              onClick={() => openLightbox(idx)}
              role="button"
              tabIndex={0}
              aria-label={`Open photo: ${item.caption}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openLightbox(idx);
                }
              }}
            >
              <div className="lgc-image-wrap">
                <img
                  src={item.url}
                  alt={item.caption}
                  className="lgc-img"
                  loading="lazy"
                />
                <div className="lgc-overlay">
                  <div className="lgc-zoom-icon">
                    <Maximize2 size={20} />
                  </div>
                  <div className="lgc-meta">
                    <span className="lgc-location">{item.location}</span>
                    <h4 className="lgc-caption">{item.caption}</h4>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="gallery-bottom-cta">
          <Link to="/gallery" className="btn btn-secondary">
            <span>View Full 16-Exhibit Archive</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <LightboxModal
          images={filtered}
          initialIndex={selectedIdx}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      <style>{`
        .gallery-preview-root {
          background: #0D2038;
          position: relative;
          padding: 6.5rem 0;
          border-top: 1px solid rgba(229, 174, 63, 0.15);
          border-bottom: 1px solid rgba(229, 174, 63, 0.15);
        }

        .section-header {
          text-align: center;
          max-width: 680px;
          margin: 0 auto 3rem;
        }

        .section-eyebrow {
          display: inline-block;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 2px;
          color: #E5AE3F;
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }

        .section-title {
          font-family: var(--font-serif);
          font-size: clamp(2.1rem, 3.4vw, 2.9rem);
          color: #F8F6F0;
          line-height: 1.2;
          font-weight: 700;
          margin-bottom: 1rem;
          text-transform: none;
        }

        .section-subtitle {
          font-size: 1rem;
          color: #B7C4D6;
          line-height: 1.65;
          margin: 0;
        }

        .luxury-filter-pills {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 3.5rem;
          flex-wrap: wrap;
        }

        .filter-pill-btn {
          font-family: var(--font-sans);
          font-size: 0.88rem;
          font-weight: 600;
          padding: 0.55rem 1.45rem;
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: #061426;
          color: #B7C4D6;
          cursor: pointer;
          letter-spacing: 0.3px;
          transition: all 0.25s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .filter-pill-btn:hover {
          border-color: rgba(229, 174, 63, 0.5);
          color: #E5AE3F;
          background: rgba(6, 20, 38, 0.95);
        }

        .filter-pill-btn.active {
          background: #E5AE3F;
          color: #061426;
          border-color: #E5AE3F;
          font-weight: 700;
          box-shadow: 0 4px 15px rgba(229, 174, 63, 0.35);
        }

        .gallery-luxury-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
          margin-bottom: 3.5rem;
        }

        .luxury-gallery-card {
          border-radius: 14px;
          overflow: hidden;
          cursor: pointer;
          background: #061426;
          border: 1px solid rgba(229, 174, 63, 0.22);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.35s ease,
                      box-shadow 0.35s ease;
        }

        .luxury-gallery-card:hover {
          transform: translateY(-6px);
          border-color: #E5AE3F;
          box-shadow: 0 16px 35px rgba(0, 0, 0, 0.6), 0 0 20px rgba(229, 174, 63, 0.18);
        }

        .lgc-image-wrap {
          position: relative;
          aspect-ratio: 4 / 3;
          overflow: hidden;
        }

        .lgc-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .luxury-gallery-card:hover .lgc-img {
          transform: scale(1.06);
        }

        .lgc-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(6, 20, 38, 0.2) 0%, rgba(6, 20, 38, 0.88) 100%);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1.35rem;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .luxury-gallery-card:hover .lgc-overlay {
          opacity: 1;
        }

        .lgc-zoom-icon {
          align-self: flex-end;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #E5AE3F;
          color: #061426;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        }

        .lgc-meta {
          display: flex;
          flex-direction: column;
        }

        .lgc-location {
          font-size: 0.72rem;
          font-weight: 700;
          color: #E5AE3F;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          margin-bottom: 0.25rem;
        }

        .lgc-caption {
          font-family: var(--font-serif);
          font-size: 1.05rem;
          color: #F8F6F0;
          line-height: 1.3;
          margin: 0;
        }

        .gallery-bottom-cta {
          text-align: center;
        }

        .gallery-bottom-cta .btn {
          border-radius: 50px;
          padding: 0.85rem 2rem;
        }

        @media (max-width: 1024px) {
          .gallery-luxury-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }

        @media (max-width: 640px) {
          .gallery-luxury-grid {
            grid-template-columns: 1fr;
          }
          .gallery-preview-root {
            padding: 4.5rem 0;
          }
        }
      `}</style>
    </section>
  );
}
