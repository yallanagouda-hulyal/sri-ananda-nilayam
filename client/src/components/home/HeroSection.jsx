import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, ShieldCheck, Award, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroSection() {
  const heroSlides = [
    {
      image: '/images/home-hero-villa.jpg',
      title: 'The Solarium Luxury Villa',
      category: 'Residential Architecture',
      location: 'Whitefield, Bengaluru',
    },
    {
      image: '/images/interior-living-room.jpg',
      title: 'Bespoke Double-Height Salon',
      category: 'Turnkey Luxury Interiors',
      location: 'Indiranagar, Bengaluru',
    },
    {
      image: '/images/project-villa.jpg',
      title: 'Contemporary Cantilevered Residence',
      category: 'Turnkey Construction',
      location: 'Sarjapur Road, Bengaluru',
    },
    {
      image: '/images/project-commercial.jpg',
      title: 'Aura Corporate Headquarters',
      category: 'Commercial Architecture',
      location: 'Outer Ring Road, Bengaluru',
    },
    {
      image: '/images/interior-kitchen.jpg',
      title: 'Culinary Master Quartz Kitchen',
      category: 'Modular Interior Design',
      location: 'Koramangala, Bengaluru',
    },
    {
      image: '/images/interior-bedroom.jpg',
      title: 'Palatial Master Suite & Dresser',
      category: 'Bespoke Interior Fitout',
      location: 'Lavelle Road, Bengaluru',
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance slideshow every 4.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, heroSlides.length]);

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  return (
    <section className="hero-split-root">
      {/* Subtle ambient lighting backdrop */}
      <div className="hero-ambient-glow" />

      <div className="container hero-split-container">
        {/* Left Column: Content */}
        <div className="hero-col-content animate-fade-in-up">
          {/* Refined Architectural Eyebrow */}
          <div className="hero-brand-badge">
            <span className="badge-sparkle-dot">✦</span>
            <span className="hero-eyebrow-text">ARCHITECTURE • INTERIORS • CONSTRUCTION</span>
          </div>

          {/* Headline: 2 clean editorial lines */}
          <h1 className="hero-headline">
            <span className="headline-line-ivory">Architectural Grandeur</span>
            <span className="headline-line-gold">Crafted for Generations</span>
          </h1>

          {/* Description */}
          <p className="hero-description">
            Bespoke architectural design, quality construction and premium interiors, thoughtfully crafted to transform your vision into timeless living spaces.
          </p>

          {/* Action Buttons */}
          <div className="hero-actions-row">
            <Link to="/contact" className="btn btn-primary btn-hero-primary btn-shimmer">
              <span>Get a Free Consultation</span>
              <ArrowRight size={17} className="btn-arrow-icon" />
            </Link>

            <Link to="/projects" className="btn btn-secondary btn-hero-secondary">
              <Compass size={17} className="text-gold" />
              <span>Explore Our Projects</span>
            </Link>
          </div>

          {/* Trust Hallmarks in a clean single row */}
          <div className="hero-hallmarks">
            <div className="hallmark-item">
              <ShieldCheck size={16} className="text-gold" />
              <span>10-Yr Structural Warranty</span>
            </div>
            <div className="hallmark-item">
              <Award size={16} className="text-gold" />
              <span>Vastu-Aligned Architecture</span>
            </div>
            <div className="hallmark-item">
              <Sparkles size={16} className="text-gold" />
              <span>Turnkey Execution</span>
            </div>
          </div>
        </div>

        {/* Right Column: Architectural Photography Slideshow */}
        <div className="hero-col-visual">
          <div
            className="hero-image-frame"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            aria-label="Architectural projects slideshow"
          >
            {/* Slides with smooth crossfade and Ken Burns slow zoom */}
            {heroSlides.map((slide, index) => {
              const isActive = index === currentSlide;
              return (
                <div
                  key={index}
                  className={`hero-slide-item ${isActive ? 'slide-active' : ''}`}
                  aria-hidden={!isActive}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="hero-slide-img"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    fetchpriority={index === 0 ? 'high' : 'auto'}
                  />
                </div>
              );
            })}

            {/* Bottom Dark Gradient Shadow for Contrast */}
            <div className="hero-slide-gradient-overlay" />

            {/* Bottom Left: Dynamic Project Details Glass Pill */}
            <div className="hero-floating-glass-card">
              <div className="glass-card-accent-dot" />
              <div className="glass-card-text">
                <span className="glass-card-title">{heroSlides[currentSlide].title}</span>
                <span className="glass-card-subtitle">
                  {heroSlides[currentSlide].category} • {heroSlides[currentSlide].location}
                </span>
              </div>
            </div>

            {/* Bottom Right: Slide Navigation Controls */}
            <div className="hero-carousel-controls">
              <button
                type="button"
                className="carousel-nav-btn prev-btn"
                onClick={handlePrev}
                aria-label="Previous Project Photo"
              >
                <ChevronLeft size={18} />
              </button>

              {/* Slide Counter / Indicators */}
              <div className="carousel-indicators">
                {heroSlides.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    className={`indicator-dot ${dotIdx === currentSlide ? 'dot-active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentSlide(dotIdx);
                    }}
                    aria-label={`Jump to slide ${dotIdx + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                className="carousel-nav-btn next-btn"
                onClick={handleNext}
                aria-label="Next Project Photo"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            {/* Frame Highlight Border */}
            <div className="image-frame-highlight" />
          </div>
        </div>
      </div>

      <style>{`
        .hero-split-root {
          position: relative;
          min-height: 90vh;
          padding-top: 135px;
          padding-bottom: 70px;
          display: flex;
          align-items: center;
          background: radial-gradient(circle at 10% 20%, rgba(16, 42, 76, 0.45) 0%, transparent 60%),
                      radial-gradient(circle at 90% 80%, rgba(229, 174, 63, 0.08) 0%, transparent 50%),
                      #061426;
          overflow: hidden;
        }

        .hero-ambient-glow {
          position: absolute;
          top: -150px;
          left: -150px;
          width: 550px;
          height: 550px;
          background: radial-gradient(circle, rgba(229, 174, 63, 0.12) 0%, transparent 70%);
          pointer-events: none;
          z-index: 1;
        }

        .hero-split-container {
          position: relative;
          z-index: 5;
          display: grid;
          grid-template-columns: 46% 54%;
          gap: 3.5rem;
          align-items: center;
        }

        /* Left Column Styles */
        .hero-col-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-right: 0.5rem;
        }

        .hero-brand-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          background: rgba(234, 175, 53, 0.08);
          border: 1px solid rgba(234, 175, 53, 0.32);
          padding: 0.45rem 1.15rem;
          border-radius: var(--radius-full);
          margin-bottom: 1.5rem;
          width: fit-content;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.25);
          transition: all 0.25s ease;
        }

        .badge-sparkle-dot {
          color: #EAAF35;
          font-size: 0.72rem;
          line-height: 1;
        }

        .hero-eyebrow-text {
          font-family: var(--font-sans);
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: #EAAF35;
          text-transform: uppercase;
        }

        .hero-headline {
          font-family: var(--font-serif);
          font-size: clamp(2.3rem, 3.8vw, 3.6rem);
          line-height: 1.18;
          font-weight: 700;
          letter-spacing: 0.2px;
          margin-bottom: 1.25rem;
          text-transform: none;
        }

        .headline-line-ivory {
          color: #F8F6F0;
          display: block;
        }

        .headline-line-gold {
          color: #E5AE3F;
          display: block;
          margin-top: 0.2rem;
        }

        .hero-description {
          font-family: var(--font-sans);
          font-size: 1.05rem;
          line-height: 1.7;
          color: #B7C4D6;
          margin-bottom: 2rem;
          max-width: 500px;
        }

        .hero-actions-row {
          display: flex;
          align-items: center;
          gap: 1.15rem;
          margin-bottom: 2.25rem;
          flex-wrap: wrap;
        }

        .btn-hero-primary {
          padding: 0.9rem 1.85rem;
          font-size: 0.95rem;
          border-radius: 50px;
        }

        .btn-hero-primary .btn-arrow-icon {
          transition: transform 0.25s ease;
        }

        .btn-hero-primary:hover .btn-arrow-icon {
          transform: translateX(4px);
        }

        .btn-hero-secondary {
          padding: 0.9rem 1.75rem;
          font-size: 0.95rem;
          border-radius: 50px;
        }

        .hero-hallmarks {
          display: flex;
          align-items: center;
          gap: 1.6rem;
          padding-top: 1.35rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          flex-wrap: nowrap;
        }

        .hallmark-item {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.82rem;
          font-weight: 500;
          color: #B7C4D6;
          letter-spacing: 0.2px;
          white-space: nowrap;
        }

        /* Right Column Slideshow Frame */
        .hero-col-visual {
          position: relative;
          display: flex;
          justify-content: center;
        }

        .hero-image-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 11;
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid rgba(229, 174, 63, 0.35);
          box-shadow: 0 25px 60px -10px rgba(0, 0, 0, 0.65), 0 0 30px rgba(229, 174, 63, 0.15);
          background: #0D2038;
          user-select: none;
        }

        .hero-slide-item {
          position: absolute;
          inset: 0;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.85s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.85s ease;
          z-index: 1;
        }

        .hero-slide-item.slide-active {
          opacity: 1;
          visibility: visible;
          z-index: 2;
        }

        .hero-slide-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 60%;
          display: block;
          transform: scale(1);
          transition: transform 6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-slide-item.slide-active .hero-slide-img {
          transform: scale(1.04);
        }

        /* Subtle bottom gradient to make details and indicators pop */
        .hero-slide-gradient-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(6, 20, 38, 0.85) 0%,
            rgba(6, 20, 38, 0.35) 28%,
            transparent 60%
          );
          pointer-events: none;
          z-index: 4;
        }

        .image-frame-highlight {
          position: absolute;
          inset: 0;
          border-radius: 18px;
          pointer-events: none;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.12);
          z-index: 6;
        }

        /* Floating Project Details Glass Pill (Bottom Left) */
        .hero-floating-glass-card {
          position: absolute;
          bottom: 1.25rem;
          left: 1.25rem;
          background: rgba(6, 20, 38, 0.85);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(229, 174, 63, 0.35);
          border-radius: 12px;
          padding: 0.75rem 1.15rem;
          display: flex;
          align-items: center;
          gap: 0.8rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.55);
          z-index: 5;
          max-width: 65%;
          transition: border-color 0.3s ease;
        }

        .hero-floating-glass-card:hover {
          border-color: #E5AE3F;
        }

        .glass-card-accent-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #E5AE3F;
          box-shadow: 0 0 8px #E5AE3F;
          flex-shrink: 0;
          animation: pulseGold 2.5s infinite;
        }

        .glass-card-text {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .glass-card-title {
          font-family: var(--font-serif);
          font-size: 0.92rem;
          font-weight: 700;
          color: #F8F6F0;
          letter-spacing: 0.3px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .glass-card-subtitle {
          font-family: var(--font-sans);
          font-size: 0.74rem;
          font-weight: 500;
          color: #E5AE3F;
          letter-spacing: 0.3px;
          margin-top: 0.1rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Carousel Navigation Controls (Bottom Right) */
        .hero-carousel-controls {
          position: absolute;
          bottom: 1.25rem;
          right: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          z-index: 5;
          background: rgba(6, 20, 38, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(229, 174, 63, 0.3);
          border-radius: 30px;
          padding: 0.35rem 0.6rem;
        }

        .carousel-nav-btn {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(229, 174, 63, 0.25);
          color: #F8F6F0;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .carousel-nav-btn:hover {
          background: #E5AE3F;
          color: #061426;
          border-color: #E5AE3F;
          transform: scale(1.05);
        }

        .carousel-indicators {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0 0.25rem;
        }

        .indicator-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .indicator-dot.dot-active {
          width: 18px;
          border-radius: 10px;
          background: #E5AE3F;
          box-shadow: 0 0 8px rgba(229, 174, 63, 0.6);
        }

        /* Responsive Breakpoints */
        @media (max-width: 1080px) {
          .hero-split-container {
            grid-template-columns: 50% 50%;
            gap: 2.5rem;
          }
          .hero-headline {
            font-size: 2.75rem;
          }
        }

        @media (max-width: 900px) {
          .hero-split-root {
            padding-top: 150px;
            padding-bottom: 50px;
          }
          .hero-split-container {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .hero-col-content {
            padding-right: 0;
            text-align: center;
            align-items: center;
          }
          .hero-actions-row {
            justify-content: center;
          }
          .hero-hallmarks {
            justify-content: center;
          }
          .hero-description {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-image-frame {
            aspect-ratio: 16 / 10;
          }
        }

        @media (max-width: 580px) {
          .hero-headline {
            font-size: 2.2rem;
          }
          .hero-description {
            font-size: 0.98rem;
          }
          .hero-brand-badge {
            padding: 0.35rem 0.95rem;
            margin-bottom: 1.25rem;
            gap: 0.45rem;
            border-radius: var(--radius-full);
          }
          .hero-eyebrow-text {
            font-size: 0.68rem;
            letter-spacing: 0.1em;
            white-space: nowrap;
          }
          .hero-actions-row {
            flex-direction: column;
            width: 100%;
          }
          .btn-hero-primary, .btn-hero-secondary {
            width: 100%;
            justify-content: center;
          }
          .hero-floating-glass-card {
            bottom: 0.75rem;
            left: 0.75rem;
            max-width: calc(100% - 1.5rem);
            padding: 0.6rem 0.85rem;
          }
          .hero-carousel-controls {
            display: none;
          }
          .hero-hallmarks {
            flex-direction: column;
            gap: 0.75rem;
            align-items: center;
          }
        }

        @media (max-width: 400px) {
          .hero-split-root {
            padding-top: 140px;
          }
          .hero-eyebrow-text {
            font-size: 0.6rem;
            letter-spacing: 0.08em;
          }
        }
      `}</style>
    </section>
  );
}
