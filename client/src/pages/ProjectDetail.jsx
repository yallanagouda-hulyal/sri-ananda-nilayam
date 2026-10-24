import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Layers,
  CheckCircle2,
  Maximize2,
  ArrowRight,
  ShieldCheck,
  Building,
  Sparkles,
  MapPin,
  Calendar,
} from 'lucide-react';
import PageBanner from '../components/common/PageBanner';
import SeoMeta from '../components/common/SeoMeta';
import LightboxModal from '../components/common/LightboxModal';
import { publicApi } from '../api/publicApi';

const staticProjectDetails = {
  'solarium-luxury-villa': {
    title: 'The Solarium Luxury Villa',
    category: 'residential',
    location: 'Whitefield, Bengaluru',
    builtUpArea: '5,400 Sq Ft',
    scope: 'Architecture + Civil Construction + Interiors',
    completionDate: '2024',
    projectStatus: 'completed',
    coverImage: '/images/project-villa.jpg',
    images: [
      { url: '/images/project-villa.jpg', caption: 'Cantilevered glass facade and illuminated entryway' },
      { url: '/images/interior-living-room.jpg', caption: 'Double-height formal living salon with travertine cladding' },
      { url: '/images/interior-kitchen.jpg', caption: 'Bespoke modular island kitchen with quartz waterfall edge' },
      { url: '/images/interior-bedroom.jpg', caption: 'Master suite with fluted acoustics and custom teak paneling' },
    ],
    clientBrief: 'The homeowner desired an open-concept tropical villa that maximizes natural southern daylight while maintaining supreme privacy from adjacent plots in a gated enclave.',
    architecturalConcept: `We formulated a bioclimatic courtyard concept centered around an internal reflection pool and vertical landscaped green wall. The structural envelope utilizes post-tensioned slabs that allow sweeping 32-foot pillarless expanses in the central living and dining pavilions. Double-glazed thermal low-E curtain walling deflects solar radiation, keeping internal ambient temperatures naturally cool.`,
    executionHighlights: [
      'Post-tensioned RCC slab architecture creating unobstructed column-free entertaining areas',
      'Perimeter louvers engineered for passive thermal ventilation and solar heat reduction',
      'Imported Statuario Italian marble bookmatched across all ground-level social spaces',
      'Fully automated centralized home automation governing lighting scenes, HVAC, and security',
      'Rainwater harvesting system with 25,000-liter subterranean filtration reservoir',
    ],
  },
  'aura-corporate-headquarters': {
    title: 'Aura Corporate Headquarters',
    category: 'commercial',
    location: 'Outer Ring Road, Bengaluru',
    builtUpArea: '24,000 Sq Ft',
    scope: 'Commercial Architecture + Turnkey Fitout',
    completionDate: '2023',
    projectStatus: 'completed',
    coverImage: '/images/project-commercial.jpg',
    images: [
      { url: '/images/project-commercial.jpg', caption: 'Main glass-curtain facade with dynamic brise-soleil' },
      { url: '/images/service-design.jpg', caption: 'Executive boardroom and collaborative presentation theatre' },
      { url: '/images/about-architecture.jpg', caption: 'Biophilic open atrium and reception lounge' },
    ],
    clientBrief: 'A high-growth tech enterprise required a future-proof, energy-efficient corporate campus balancing high-density engineering workstations with tranquil retreat breakout zones.',
    architecturalConcept: `The building adopts a modular grid layout facilitating future interior reconfiguration. Acoustic ceiling baffles, circadian dynamic LED illumination, and green air-purifying atrium corridors foster employee wellbeing and intellectual focus.`,
    executionHighlights: [
      'Gold-rated green building compliance with solar rooftop photovoltaic array',
      'High-performance acoustic double-glazed acoustic envelope reducing traffic noise by 38dB',
      'Advanced HVAC VAV (Variable Air Volume) fresh air filtration cycles',
      'Biometric access control and integrated fire sprinkler automation throughout',
    ],
  },
};

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await publicApi.getProjectBySlug(slug);
        if (res.data?.success && res.data.data) {
          setProject(res.data.data);
        } else if (staticProjectDetails[slug]) {
          setProject(staticProjectDetails[slug]);
        } else {
          // generic fallback
          setProject({
            title: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
            category: 'residential',
            location: 'Bengaluru, Karnataka',
            builtUpArea: '4,500 Sq Ft',
            scope: 'Complete Design & Execution',
            completionDate: '2024',
            projectStatus: 'completed',
            coverImage: '/images/project-villa.jpg',
            images: [
              { url: '/images/project-villa.jpg', caption: 'Exterior view of architectural landmark' },
              { url: '/images/interior-living-room.jpg', caption: 'Interior living room styling' },
              { url: '/images/interior-kitchen.jpg', caption: 'Bespoke modular kitchen execution' },
            ],
            clientBrief: 'The client commissioned Shri Ananda Nilayam to create an enduring, elegant living space reflecting timeless luxury and modern functionality.',
            architecturalConcept: 'Balancing solid stone masonry with light-filled glass expanses, the residence achieves a majestic balance between monumental grandeur and domestic warmth.',
            executionHighlights: [
              'Seismic-resistant structural frame engineered to highest IS standards',
              'Custom joinery utilizing certified teak and European fittings',
              'Energy-efficient lighting and sustainable water harvesting systems',
            ],
          });
        }
      } catch (err) {
        console.warn('API error fetching project, fallback:', err.message);
        setProject(staticProjectDetails[slug] || {
          title: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
          category: 'residential',
          location: 'Bengaluru',
          builtUpArea: '4,500 Sq Ft',
          scope: 'Architecture & Construction',
          completionDate: '2024',
          projectStatus: 'completed',
          coverImage: '/images/project-villa.jpg',
          images: [{ url: '/images/project-villa.jpg', caption: 'Architectural overview' }],
          clientBrief: 'Bespoke residential architectural execution.',
          architecturalConcept: 'Contemporary luxury architecture.',
          executionHighlights: ['Grade-A structural materials', 'Vastu-conscious layout', 'Turnkey delivery'],
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  if (loading) {
    return (
      <div className="section-padding text-center">
        <div className="admin-loading-spinner" style={{ margin: '0 auto 1.5rem auto' }} />
        <p>Loading Project Details...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="section-padding text-center">
        <h2>Project Not Found</h2>
        <Link to="/projects" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
          Back to Project Portfolio
        </Link>
      </div>
    );
  }

  const galleryImages =
    project.images && project.images.length > 0
      ? project.images
      : [{ url: project.coverImage || '/images/project-villa.jpg', caption: project.title }];

  return (
    <div className="project-detail-page">
      <SeoMeta
        title={project.title}
        description={project.shortDescription || project.architecturalConcept?.slice(0, 150)}
        canonicalUrl={`/projects/${slug}`}
        ogImage={project.coverImage}
      />

      <PageBanner
        eyebrow="PROJECT PORTFOLIO"
        title={project.title}
        subtitle={`${project.location || 'Bengaluru'} • ${project.category?.toUpperCase() || 'RESIDENTIAL'}`}
        bgImage={project.coverImage || '/images/project-villa.jpg'}
        breadcrumbs={[
          { name: 'Projects', link: '/projects' },
          { name: project.title },
        ]}
      />

      {/* Main Showcase Split Section matching Panel 5 */}
      <section className="section-padding project-showcase-section">
        <div className="container">
          <div className="project-detail-split-grid">
            {/* Left Column: Main Image + 4 Thumbnails */}
            <div className="project-detail-media-col">
              <div
                className="main-featured-image-box"
                onClick={() => openLightbox(activeImageIdx)}
                title="Click to view full resolution"
              >
                <img
                  src={galleryImages[activeImageIdx]?.url || project.coverImage || '/images/project-villa.jpg'}
                  alt={galleryImages[activeImageIdx]?.caption || project.title}
                  className="main-featured-image"
                />
                <div className="image-zoom-overlay">
                  <div className="zoom-btn-icon">
                    <Maximize2 size={20} />
                  </div>
                </div>
              </div>

              {/* 4 Thumbnails Row */}
              <div className="project-thumbs-row">
                {galleryImages.slice(0, 4).map((img, idx) => (
                  <div
                    key={idx}
                    className={`thumb-card ${activeImageIdx === idx ? 'active-thumb' : ''}`}
                    onClick={() => setActiveImageIdx(idx)}
                  >
                    <img src={img.url} alt={`Thumbnail ${idx + 1}`} className="thumb-img" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Project Info & Highlights */}
            <div className="project-detail-info-col">
              <h1 className="p-detail-title">{project.title}</h1>

              {/* Meta row */}
              <div className="p-detail-meta-row">
                <span className="p-meta-pill">
                  <Building size={14} className="text-gold" />
                  <span>{project.category ? project.category.charAt(0).toUpperCase() + project.category.slice(1) : 'Residential'}</span>
                </span>
                <span className="p-meta-pill">
                  <MapPin size={14} className="text-gold" />
                  <span>{project.location || 'Bengaluru, Karnataka'}</span>
                </span>
                <span className="p-meta-pill">
                  <CheckCircle2 size={14} className="text-gold" />
                  <span>{project.projectStatus === 'ongoing' ? 'Ongoing' : 'Completed'}</span>
                </span>
                <span className="p-meta-pill">
                  <Calendar size={14} className="text-gold" />
                  <span>{project.completionDate || '2024'}</span>
                </span>
              </div>

              {/* Project Description */}
              <p className="p-detail-description">
                {project.clientBrief || project.architecturalConcept || 'A stunning modern luxury villa designed with contemporary architecture, spacious interiors and premium finishes. This project reflects our commitment to creating elegant and functional living spaces.'}
              </p>

              {/* Project Highlights */}
              <div className="p-highlights-box">
                <h3 className="p-highlights-heading">Project Highlights</h3>
                <div className="p-highlights-list">
                  {(project.executionHighlights || [
                    'Modern architectural design',
                    'Spacious living and dining areas',
                    'Premium interior finishes',
                    'Landscaped garden and outdoor spaces',
                    'Smart home features'
                  ]).map((hl, i) => (
                    <div key={i} className="p-highlight-item">
                      <CheckCircle2 size={18} className="text-gold" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enquire CTA Button */}
              <div className="p-cta-wrap">
                <Link
                  to={`/contact?project=${encodeURIComponent(project.title)}`}
                  className="btn btn-primary btn-lg btn-shimmer p-enquire-btn"
                >
                  <span>Enquire About This Project</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <LightboxModal
        images={galleryImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={() =>
          setLightboxIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))
        }
        onNext={() =>
          setLightboxIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))
        }
      />

      <style>{`
        .project-showcase-section {
          background: #F7F8FA;
          padding: 3.5rem 0 5rem 0;
        }

        .project-detail-split-grid {
          display: grid;
          grid-template-columns: 1.25fr 1.15fr;
          gap: 3.5rem;
          align-items: start;
        }

        /* Left Column */
        .project-detail-media-col {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .main-featured-image-box {
          position: relative;
          width: 100%;
          height: 440px;
          border-radius: 18px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(214, 164, 59, 0.2);
        }

        .main-featured-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .main-featured-image-box:hover .main-featured-image {
          transform: scale(1.03);
        }

        .image-zoom-overlay {
          position: absolute;
          inset: 0;
          background: rgba(6, 17, 33, 0.25);
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .main-featured-image-box:hover .image-zoom-overlay {
          opacity: 1;
        }

        .zoom-btn-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.95);
          color: #0E233E;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          transform: scale(0.9);
          transition: transform 0.2s ease;
        }

        .main-featured-image-box:hover .zoom-btn-icon {
          transform: scale(1);
        }

        .project-thumbs-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }

        .thumb-card {
          height: 100px;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.25s ease;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.06);
        }

        .thumb-card:hover {
          transform: translateY(-2px);
          border-color: rgba(214, 164, 59, 0.5);
        }

        .thumb-card.active-thumb {
          border-color: #D6A43B;
          box-shadow: 0 0 0 2px rgba(214, 164, 59, 0.3);
        }

        .thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Right Column */
        .project-detail-info-col {
          display: flex;
          flex-direction: column;
        }

        .p-detail-title {
          font-family: var(--font-serif);
          font-size: 2.2rem;
          font-weight: 700;
          color: #0E233E;
          margin: 0 0 1rem 0;
          line-height: 1.2;
        }

        .p-detail-meta-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .p-meta-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: #FFFFFF;
          border: 1px solid rgba(214, 164, 59, 0.25);
          padding: 0.4rem 0.85rem;
          border-radius: 9999px;
          font-size: 0.82rem;
          color: #334155;
          font-weight: 500;
        }

        .p-detail-description {
          font-size: 0.95rem;
          line-height: 1.7;
          color: #475569;
          margin-bottom: 2rem;
        }

        .p-highlights-box {
          background: #FFFFFF;
          border-radius: 16px;
          padding: 1.8rem;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(214, 164, 59, 0.15);
          margin-bottom: 2rem;
        }

        .p-highlights-heading {
          font-family: var(--font-sans);
          font-size: 1.15rem;
          font-weight: 700;
          color: #0E233E;
          margin: 0 0 1rem 0;
        }

        .p-highlights-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .p-highlight-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-size: 0.92rem;
          color: #334155;
          line-height: 1.45;
        }

        .p-enquire-btn {
          border-radius: 9999px;
          padding: 0.85rem 2rem;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
        }

        @media (max-width: 1024px) {
          .project-detail-split-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .main-featured-image-box {
            height: 360px;
          }
        }

        @media (max-width: 640px) {
          .main-featured-image-box {
            height: 260px;
          }
          .project-thumbs-row {
            grid-template-columns: repeat(4, 1fr);
            gap: 0.5rem;
          }
          .thumb-card {
            height: 65px;
          }
        }
      `}</style>
    </div>
  );
}
