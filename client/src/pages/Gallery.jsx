import { useState, useEffect } from 'react';
import { Maximize2 } from 'lucide-react';
import PageBanner from '../components/common/PageBanner';
import SeoMeta from '../components/common/SeoMeta';
import LightboxModal from '../components/common/LightboxModal';
import { publicApi } from '../api/publicApi';

const defaultGalleryImages = [
  { url: '/images/hero-villa.jpg', caption: 'Luxury Villa Exterior at Twilight with Illuminated Entryway', category: 'exterior' },
  { url: '/images/interior-living-room.jpg', caption: 'Double-Height Living Salon with Bookmatched Travertine Marble', category: 'interior' },
  { url: '/images/project-villa.jpg', caption: 'Cantilevered Glass Villa Architecture in Whitefield', category: 'exterior' },
  { url: '/images/interior-kitchen.jpg', caption: 'Minimalist Waterfall Island Modular Kitchen with Blum Hardware', category: 'interior' },
  { url: '/images/project-commercial.jpg', caption: 'Contemporary Corporate Campus Facade with Solar Shading', category: 'construction' },
  { url: '/images/interior-bedroom.jpg', caption: 'Master Suite with Fluted Acoustic Teak Wood Paneling', category: 'interior' },
  { url: '/images/construction-site.jpg', caption: 'Seismic Grade-A Concrete Shuttering & Steel Reinforcement', category: 'construction' },
  { url: '/images/about-architecture.jpg', caption: 'Architectural Blueprint Deliberations & 3D Spatial Studies', category: 'renovation' },
  { url: '/images/service-design.jpg', caption: 'Photorealistic 3D Facade Rendering for Luxury Residence', category: 'exterior' },
  { url: '/images/service-interiors.jpg', caption: 'Bespoke Dining Suite with Handcrafted Chandelier', category: 'interior' },
  { url: '/images/service-construction.jpg', caption: 'Precision Masonry & Reinforced Structural Columns', category: 'construction' },
];

export default function Gallery() {
  const [images, setImages] = useState(defaultGalleryImages);
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [_loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await publicApi.getGallery();
        if (res.data?.success && res.data.data?.length > 0) {
          setImages(res.data.data);
        }
      } catch (err) {
        console.warn('API error fetching gallery, using fallback:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'exterior', label: 'Exterior' },
    { id: 'interior', label: 'Interior' },
    { id: 'construction', label: 'Construction' },
    { id: 'renovation', label: 'Renovation' },
  ];

  const filteredImages =
    activeCategory === 'all'
      ? images
      : images.filter((img) => (img.category || '').toLowerCase() === activeCategory);

  const openLightbox = (index) => {
    setSelectedIdx(index);
    setLightboxOpen(true);
  };

  // Wide card distribution: matching 3-card, 3-card, 2-card rows
  const isWideCard = (idx) => {
    const mod = idx % 8;
    return mod === 0 || mod === 5 || mod === 6 || mod === 7;
  };

  return (
    <div className="gallery-page">
      <SeoMeta
        title="Gallery — Sri Ananda Nilayam"
        description="Explore high-resolution architectural photography of our bespoke residences, luxury interiors, and ongoing executions in Bengaluru."
        canonicalUrl="/gallery"
      />

      <PageBanner
        eyebrow="GALLERY"
        title="Gallery"
        subtitle="Explore high-resolution architectural photography of our bespoke residences, luxury interiors, and ongoing executions."
        bgImage="/images/interior-living-room.jpg"
        breadcrumbs={[{ name: 'Gallery' }]}
      />

      {/* Main Gallery Section with Warm Cream Background (#F7F1E7) */}
      <section className="gallery-cream-section">
        {/* Subtle Beige Architectural Line-Art Decorations (Left Edge) */}
        <div className="gallery-lineart-edge gallery-lineart-left" aria-hidden="true">
          <svg
            viewBox="0 0 320 800"
            fill="none"
            stroke="#C8B39B"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="gallery-lineart-svg"
          >
            {/* Structural Grid & Level Markers */}
            <line x1="20" y1="40" x2="20" y2="760" strokeDasharray="3 3" opacity="0.4" />
            <line x1="70" y1="40" x2="70" y2="760" strokeDasharray="3 3" opacity="0.4" />
            <line x1="160" y1="40" x2="160" y2="760" opacity="0.5" />
            <line x1="10" y1="120" x2="300" y2="120" strokeDasharray="4 2" opacity="0.4" />
            <line x1="10" y1="360" x2="300" y2="360" strokeDasharray="4 2" opacity="0.4" />
            <line x1="10" y1="620" x2="300" y2="620" opacity="0.6" />

            {/* Villa Facade Elevation Lines */}
            <rect x="30" y="160" width="220" height="460" strokeWidth="1.5" opacity="0.75" />
            <rect x="50" y="190" width="80" height="150" opacity="0.65" />
            <line x1="90" y1="190" x2="90" y2="340" opacity="0.5" />
            <line x1="50" y1="265" x2="130" y2="265" opacity="0.5" />

            <rect x="150" y="190" width="85" height="150" opacity="0.65" />
            <line x1="192" y1="190" x2="192" y2="340" opacity="0.5" />

            {/* Cantilevered Balcony & Pergola */}
            <line x1="10" y1="350" x2="270" y2="350" strokeWidth="2" opacity="0.8" />
            <line x1="30" y1="380" x2="250" y2="380" opacity="0.5" />
            <rect x="40" y="380" width="100" height="240" opacity="0.7" />
            <rect x="160" y="380" width="90" height="240" opacity="0.7" />

            {/* Glass Panels / Louver details */}
            <line x1="160" y1="420" x2="250" y2="420" opacity="0.4" />
            <line x1="160" y1="460" x2="250" y2="460" opacity="0.4" />
            <line x1="160" y1="500" x2="250" y2="500" opacity="0.4" />
            <line x1="160" y1="540" x2="250" y2="540" opacity="0.4" />

            {/* Roof Canopy Overhang */}
            <polygon points="10,160 270,160 250,140 20,140" strokeWidth="1.4" opacity="0.7" />
            <line x1="30" y1="140" x2="30" y2="160" opacity="0.5" />
            <line x1="80" y1="140" x2="80" y2="160" opacity="0.5" />
            <line x1="130" y1="140" x2="130" y2="160" opacity="0.5" />
            <line x1="180" y1="140" x2="180" y2="160" opacity="0.5" />
            <line x1="230" y1="140" x2="230" y2="160" opacity="0.5" />

            {/* Organic Landscape Sketch Lines */}
            <path d="M 230,620 Q 250,560 270,620" opacity="0.5" />
            <path d="M 240,620 Q 260,520 280,620" opacity="0.45" />
            <path d="M 20,620 Q 35,540 50,620" opacity="0.5" />
          </svg>
        </div>

        {/* Subtle Beige Architectural Line-Art Decorations (Right Edge) */}
        <div className="gallery-lineart-edge gallery-lineart-right" aria-hidden="true">
          <svg
            viewBox="0 0 320 800"
            fill="none"
            stroke="#C8B39B"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="gallery-lineart-svg"
          >
            {/* Structural Elevation Axes */}
            <line x1="300" y1="40" x2="300" y2="760" strokeDasharray="3 3" opacity="0.4" />
            <line x1="250" y1="40" x2="250" y2="760" strokeDasharray="3 3" opacity="0.4" />
            <line x1="160" y1="40" x2="160" y2="760" opacity="0.5" />
            <line x1="20" y1="140" x2="310" y2="140" strokeDasharray="4 2" opacity="0.4" />
            <line x1="20" y1="380" x2="310" y2="380" strokeDasharray="4 2" opacity="0.4" />
            <line x1="20" y1="620" x2="310" y2="620" opacity="0.6" />

            {/* Contemporary Villa Elevation Blocks */}
            <rect x="70" y="180" width="220" height="440" strokeWidth="1.5" opacity="0.75" />
            <rect x="90" y="210" width="85" height="150" opacity="0.65" />
            <line x1="132" y1="210" x2="132" y2="360" opacity="0.5" />

            <rect x="195" y="210" width="80" height="150" opacity="0.65" />
            <line x1="235" y1="210" x2="235" y2="360" opacity="0.5" />

            {/* Overhanging Trellis / Louvers */}
            <line x1="50" y1="180" x2="310" y2="180" strokeWidth="2" opacity="0.8" />
            <line x1="50" y1="370" x2="310" y2="370" strokeWidth="2" opacity="0.8" />
            <rect x="80" y="390" width="100" height="230" opacity="0.7" />
            <rect x="200" y="390" width="80" height="230" opacity="0.7" />

            {/* Architectural Trees & Ground Plantings */}
            <path d="M 40,620 C 50,530 80,530 90,620" opacity="0.5" />
            <path d="M 60,620 C 70,500 110,500 120,620" opacity="0.4" />
            <path d="M 260,620 C 275,540 295,540 310,620" opacity="0.5" />
          </svg>
        </div>

        <div className="container gallery-content-container">
          {/* Category Filter Tabs */}
          <div className="gallery-filter-tabs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`gallery-filter-pill ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Image Masonry Grid */}
          <div className="gallery-masonry-grid">
            {filteredImages.map((img, idx) => {
              const isLarge = isWideCard(idx);
              return (
                <div
                  key={img._id || idx}
                  className={`gallery-card ${isLarge ? 'gallery-card-wide' : ''}`}
                  onClick={() => openLightbox(idx)}
                >
                  <img
                    src={img.url || img.imageUrl || '/images/hero-villa.jpg'}
                    alt={img.caption || img.alt || 'Architectural exhibit'}
                    className="gallery-card-img"
                    loading="lazy"
                  />
                  <div className="gallery-card-overlay">
                    <span className="gallery-cat-badge">
                      {(img.category || 'EXHIBIT').toUpperCase()}
                    </span>
                    <div className="gallery-bottom-info">
                      <p className="gallery-caption">{img.caption || 'Architectural Landmark'}</p>
                      <div className="gallery-zoom-circle" aria-label="Expand Image">
                        <Maximize2 size={16} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <LightboxModal
        images={filteredImages}
        currentIndex={selectedIdx}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={() =>
          setSelectedIdx((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1))
        }
        onNext={() =>
          setSelectedIdx((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1))
        }
      />

      <style>{`
        /* ============================================================
           GALLERY PAGE — WARM CREAM BACKGROUND (#F7F1E7)
           ============================================================ */

        .gallery-page {
          background-color: #07172B;
        }

        /* Cream Gallery Section Wrapper */
        .gallery-cream-section {
          background-color: #F7F1E7;
          border-radius: 40px 40px 0 0;
          margin-top: -32px;
          position: relative;
          z-index: 10;
          padding-top: 3.5rem;
          padding-bottom: 6rem;
          overflow: hidden;
          box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.18);
        }

        /* Subtle Beige Architectural Line-Art Edge Accents */
        .gallery-lineart-edge {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 320px;
          pointer-events: none;
          user-select: none;
          z-index: 1;
          opacity: 0.65;
        }

        .gallery-lineart-left {
          left: -40px;
        }

        .gallery-lineart-right {
          right: -40px;
        }

        .gallery-lineart-svg {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .gallery-content-container {
          position: relative;
          z-index: 5;
        }

        /* Filter Tabs on Cream Background */
        .gallery-filter-tabs {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 2.8rem;
          flex-wrap: wrap;
        }

        .gallery-filter-pill {
          background: #FFFFFF;
          color: #0B203B;
          border: 1px solid rgba(11, 32, 59, 0.16);
          border-radius: 9999px;
          padding: 0.52rem 1.45rem;
          font-family: var(--font-sans);
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.22s ease;
          box-shadow: 0 2px 8px rgba(11, 32, 59, 0.05);
        }

        .gallery-filter-pill:hover {
          background: #0B203B;
          color: #EAAF35;
          border-color: #0B203B;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(11, 32, 59, 0.12);
        }

        .gallery-filter-pill.active {
          background: #EAAF35;
          color: #07172B;
          border-color: #EAAF35;
          font-weight: 700;
          box-shadow: 0 4px 14px rgba(234, 175, 53, 0.38);
        }

        /* Masonry Grid */
        .gallery-masonry-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 240px;
          gap: 1.35rem;
        }

        /* Gallery Card */
        .gallery-card {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          border-radius: 18px;
          background-color: #0D2038;
          box-shadow: 0 8px 24px rgba(11, 32, 59, 0.12);
          border: 1px solid rgba(11, 32, 59, 0.08);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.35s ease,
                      border-color 0.35s ease;
        }

        .gallery-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 36px rgba(11, 32, 59, 0.22), 0 0 16px rgba(234, 175, 53, 0.22);
          border-color: rgba(234, 175, 53, 0.45);
        }

        .gallery-card-wide {
          grid-column: span 2;
        }

        .gallery-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .gallery-card:hover .gallery-card-img {
          transform: scale(1.07);
        }

        /* Overlay */
        .gallery-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(6, 17, 33, 0.25) 0%,
            rgba(6, 17, 33, 0.42) 50%,
            rgba(6, 17, 33, 0.92) 100%
          );
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1.4rem;
          opacity: 0.92;
          transition: opacity 0.3s ease;
        }

        .gallery-card:hover .gallery-card-overlay {
          opacity: 1;
        }

        /* Top-Left Badge */
        .gallery-cat-badge {
          align-self: flex-start;
          background: rgba(9, 23, 41, 0.85);
          backdrop-filter: blur(6px);
          border: 1.2px solid rgba(234, 175, 53, 0.55);
          border-radius: 9999px;
          padding: 0.28rem 0.85rem;
          color: #FFFFFF;
          font-family: var(--font-sans);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }

        .gallery-bottom-info {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 1rem;
        }

        .gallery-caption {
          font-family: 'Cinzel', 'Cormorant Garamond', Georgia, serif;
          font-size: 0.92rem;
          font-weight: 700;
          color: #FFFFFF;
          margin: 0;
          line-height: 1.35;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
        }

        /* Circular Expand Button */
        .gallery-zoom-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(16, 42, 76, 0.85);
          border: 1.2px solid #EAAF35;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.25s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .gallery-card:hover .gallery-zoom-circle {
          background: #EAAF35;
          color: #07172B;
          transform: scale(1.1);
          box-shadow: 0 0 12px rgba(234, 175, 53, 0.5);
        }

        /* ============================================================
           RESPONSIVE BREAKPOINTS
           ============================================================ */

        @media (max-width: 1024px) {
          .gallery-cream-section {
            border-radius: 28px 28px 0 0;
            padding-top: 2.8rem;
            padding-bottom: 4.5rem;
          }

          .gallery-masonry-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 240px;
          }

          .gallery-card-wide {
            grid-column: span 1;
          }

          .gallery-lineart-edge {
            width: 220px;
            opacity: 0.45;
          }
        }

        @media (max-width: 640px) {
          .gallery-cream-section {
            border-radius: 20px 20px 0 0;
            padding-top: 2.2rem;
            padding-bottom: 3.5rem;
          }

          .gallery-filter-tabs {
            gap: 0.5rem;
            margin-bottom: 2rem;
          }

          .gallery-filter-pill {
            padding: 0.45rem 1.15rem;
            font-size: 0.82rem;
          }

          .gallery-masonry-grid {
            grid-template-columns: 1fr;
            grid-auto-rows: 250px;
            gap: 1rem;
          }

          .gallery-lineart-edge {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
