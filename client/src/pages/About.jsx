import { Link } from 'react-router-dom';
import {
  Home,
  HardHat,
  Armchair,
  Award,
  Users,
  Building2,
  ArrowRight,
  Target,
  Eye,
  Search,
  PenTool,
  Hammer,
  KeyRound,
  Key,
} from 'lucide-react';
import SeoMeta from '../components/common/SeoMeta';

export default function About() {

  // 3 Premium Ethos Cards (Our Core Ethos)
  const ethosCards = [
    {
      num: '01',
      icon: <Target size={22} strokeWidth={1.8} />,
      title: 'Our Mission',
      desc: 'To create thoughtful spaces that improve everyday living through innovative design, reliable construction and meaningful interiors.',
      image: '/images/ethos-mission.jpg',
      alt: 'Contemporary luxury residential villa architecture by Sri Ananda Nilayam',
      link: '/services',
      linkLabel: 'Learn More',
    },
    {
      num: '02',
      icon: <Eye size={22} strokeWidth={1.8} />,
      title: 'Our Vision',
      desc: 'To deliver architecture and interiors that combine timeless design with practical functionality, setting new benchmarks in quality and customer experience.',
      image: '/images/ethos-vision.jpg',
      alt: 'Luxury modern living room interior design with refined finishes by Sri Ananda Nilayam',
      link: '/projects',
      linkLabel: 'Learn More',
    },
    {
      num: '03',
      icon: <Award size={22} strokeWidth={1.8} />,
      title: 'Our Values',
      desc: 'Quality, transparency, creativity and customer satisfaction guide everything we do, from initial consultation to final handover and beyond.',
      image: '/images/ethos-values.jpg',
      alt: 'Modern architectural entrance courtyard with natural materials by Sri Ananda Nilayam',
      link: '/contact',
      linkLabel: 'Learn More',
    },
  ];

  // 4-Step Architectural Process
  const processSteps = [
    {
      num: '01',
      title: 'DISCOVER',
      subtitle: 'Understanding Your Vision',
      desc: 'We listen to your ideas, understand your requirements, assess your site and establish your project goals.',
      image: '/images/process-step-1.jpg',
      alt: 'Architectural blueprints and house model on architect desk',
      icon: <Search size={18} strokeWidth={2.2} />,
    },
    {
      num: '02',
      title: 'DESIGN',
      subtitle: 'Planning With Purpose',
      desc: 'Our team develops thoughtful layouts, architectural concepts, interior plans and material selections tailored to your lifestyle.',
      image: '/images/process-step-2.jpg',
      alt: 'Modern house architectural concepts, wireframes and 3D plans',
      icon: <PenTool size={18} strokeWidth={2.2} />,
    },
    {
      num: '03',
      title: 'BUILD',
      subtitle: 'Crafted With Precision',
      desc: 'We bring your plans to life through quality workmanship, careful coordination and transparent project progress.',
      image: '/images/process-step-3.jpg',
      alt: 'Modern residential villa building actively under construction',
      icon: <Hammer size={18} strokeWidth={2.2} />,
    },
    {
      num: '04',
      title: 'DELIVER',
      subtitle: 'Ready to Welcome You',
      desc: 'We complete the final inspections, review every detail and hand over your finished space with confidence.',
      image: '/images/process-step-4.jpg',
      alt: 'Completed luxury modern residence illuminated at dusk',
      icon: <Key size={18} strokeWidth={2.2} />,
    },
  ];

  return (
    <div className="about-page">
      <SeoMeta
        title="About Us"
        description="About Shri Ananda Nilayam — Crafting spaces, building trust through thoughtful architecture, quality construction and bespoke interior design."
        canonicalUrl="/about"
      />

      {/* ============================================================
          2. CINEMATIC LUXURY DUSK VILLA HERO
          ============================================================ */}
      <section className="about-hero-cinematic">
        {/* Navy Gradient Overlay on the left */}
        <div className="about-hero-gradient-overlay" />

        <div className="container about-hero-container">
          <div className="about-hero-content">
            {/* Eyebrow */}
            <div className="about-hero-eyebrow-wrap">
              <span className="about-eyebrow-line" />
              <span className="about-hero-eyebrow-text">ABOUT US</span>
              <span className="about-eyebrow-line" />
            </div>

            {/* Main Heading */}
            <h1 className="about-hero-main-title">
              ABOUT SHRI<br />
              ANANDA NILAYAM
            </h1>

            {/* Description */}
            <p className="about-hero-description">
              Crafting spaces, building trust through thoughtful architecture, quality construction and bespoke interior design.
            </p>

            {/* Breadcrumb Pill */}
            <nav className="about-hero-pill-breadcrumb" aria-label="Breadcrumb Navigation">
              <Link to="/" className="breadcrumb-home">Home</Link>
              <span className="breadcrumb-slash">/</span>
              <span className="breadcrumb-current">About</span>
            </nav>
          </div>
        </div>

        {/* Subtle Gold Curved Divider along the bottom */}
        <div className="about-hero-curve-divider" aria-hidden="true">
          <svg
            viewBox="0 0 1440 96"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            {/* Gold Ribbon Path */}
            <path
              d="M0,35 C380,78 760,82 1440,16 L1440,21 C760,87 380,83 0,40 Z"
              fill="#EBAF35"
            />
            {/* Pure White Fill Transition into White Section */}
            <path
              d="M0,39 C380,82 760,86 1440,20 L1440,96 L0,96 Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      </section>

      {/* ============================================================
          3. MAIN ABOUT SECTION (Pure White Background #FFFFFF)
          ============================================================ */}
      {/* ============================================================
          3. MAIN ABOUT SECTION (Pure White Background #FFFFFF)
          ============================================================ */}
      <section className="about-main-section">
        <div className="container">
          {/* Centered Section Heading Matching Mockup */}
          <div className="about-better-tomorrow-header">
            <div className="about-better-eyebrow-wrap">
              <span className="about-eyebrow-line" />
              <span className="about-better-eyebrow-text">SRI ANANDA NILAYAM</span>
              <span className="about-eyebrow-line" />
            </div>

            <h2 className="about-better-title">
              BUILDING SPACES FOR A BETTER TOMORROW
            </h2>

            <p className="about-better-desc">
              We combine innovative architectural design, quality construction, and bespoke interior solutions to create spaces that inspire and elevate everyday living.
            </p>
          </div>

          <div className="about-main-grid">
            {/* Left Column: Narrative, Features & CTA */}
            <div className="about-text-col">
              <div className="about-story-eyebrow-wrap">
                <span className="about-story-eyebrow-text">OUR STORY</span>
                <span className="about-story-line" />
              </div>

              <h3 className="about-story-heading">
                CRAFTING SPACES.<br />
                BUILDING TRUST.
              </h3>

              <p className="about-lead-desc">
                Sri Ananda Nilayam brings architectural design, construction and interior design together to create spaces that balance beauty, functionality and lasting quality. Our approach focuses on understanding each client's vision and transforming it into thoughtfully planned environments.
              </p>

              {/* 3 Detailed Feature Rows with Gold Outline Icons */}
              <div className="about-feature-rows">
                <div className="about-feature-row">
                  <div className="about-feature-icon-box">
                    <Home size={20} />
                  </div>
                  <div className="about-feature-content">
                    <h4 className="about-feature-title">Thoughtful Architectural Planning</h4>
                    <p className="about-feature-desc">Designs that blend aesthetics, functionality and sustainability.</p>
                  </div>
                </div>

                <div className="about-feature-row">
                  <div className="about-feature-icon-box">
                    <HardHat size={20} />
                  </div>
                  <div className="about-feature-content">
                    <h4 className="about-feature-title">Quality-Focused Construction</h4>
                    <p className="about-feature-desc">Built with precision, premium materials and trusted processes.</p>
                  </div>
                </div>

                <div className="about-feature-row">
                  <div className="about-feature-icon-box">
                    <Armchair size={20} />
                  </div>
                  <div className="about-feature-content">
                    <h4 className="about-feature-title">Personalised Interior Design</h4>
                    <p className="about-feature-desc">Interiors that reflect your lifestyle and elevate everyday living.</p>
                  </div>
                </div>
              </div>

              {/* Gold Explore CTA */}
              <div className="about-cta-wrap">
                <Link to="/services" className="about-services-gold-btn">
                  <span>Explore Our Services</span>
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>

            {/* Right Column: Architectural Showcase & Overlay Statistics Card */}
            <div className="about-image-col">
              <div className="about-showcase-container">
                {/* Decorative Layer 1: Pale-Blue Rounded Shape on Left */}
                <div className="about-deco-pale-blue" aria-hidden="true" />

                {/* Decorative Layer 2: Gold Wireframe Outline Top-Right */}
                <div className="about-deco-gold-outline" aria-hidden="true" />

                {/* Decorative Layer 3: Warm Cream Shape Bottom-Right */}
                <div className="about-deco-cream-shape" aria-hidden="true" />

                {/* Main Photograph Frame */}
                <div className="about-photo-wrapper">
                  <img
                    src="/images/about-villa-showcase.jpg"
                    alt="Modern luxury villa with swimming pool by Sri Ananda Nilayam"
                    className="about-showcase-photo"
                    loading="eager"
                  />
                </div>

                {/* Overlay Statistics Card Along Lower-Left Edge */}
                <div className="about-stats-card">
                  <div className="about-stat-col">
                    <div className="about-stat-icon-wrap">
                      <Award size={22} />
                    </div>
                    <div className="about-stat-number">10+</div>
                    <div className="about-stat-label">Years of Experience</div>
                  </div>

                  <div className="about-stat-divider" aria-hidden="true" />

                  <div className="about-stat-col">
                    <div className="about-stat-icon-wrap">
                      <Users size={22} />
                    </div>
                    <div className="about-stat-number">200+</div>
                    <div className="about-stat-label">Happy Clients</div>
                  </div>

                  <div className="about-stat-divider" aria-hidden="true" />

                  <div className="about-stat-col">
                    <div className="about-stat-icon-wrap">
                      <Building2 size={22} />
                    </div>
                    <div className="about-stat-number">150+</div>
                    <div className="about-stat-label">Projects Completed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          4. OUR CORE ETHOS SECTION (Warm Ivory Background #FAF8F3)
          ============================================================ */}
      <section className="about-ethos-section">
        {/* Background Architectural Sketch & Gold Line Watermarks */}
        <div className="ethos-bg-decorations" aria-hidden="true">
          {/* Top-Left Gold Ribbon Wave */}
          <svg className="ethos-bg-ribbon-left" viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-100,80 C150,140 320,40 550,180" stroke="#DDA52F" strokeWidth="1.2" strokeOpacity="0.45" />
            <path d="M-60,110 C180,170 340,70 580,210" stroke="#DDA52F" strokeWidth="0.8" strokeOpacity="0.25" />
          </svg>

          {/* Top-Right Faint Villa Silhouette & Gold Ribbon */}
          <div className="ethos-bg-villa-ghost" />
          <svg className="ethos-bg-ribbon-right" viewBox="0 0 600 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50,220 C240,160 420,80 700,120" stroke="#DDA52F" strokeWidth="1.2" strokeOpacity="0.45" />
          </svg>
        </div>

        <div className="container ethos-container">
          {/* Section Header */}
          <div className="ethos-header text-center">
            <div className="ethos-eyebrow-wrap">
              <span className="ethos-eyebrow-line" />
              <span className="ethos-eyebrow-text">OUR CORE ETHOS</span>
              <span className="ethos-eyebrow-line" />
            </div>

            <h2 className="ethos-title">
              THE FOUNDATIONS OF OUR PRACTICE
            </h2>

            <p className="ethos-desc">
              We are driven by a simple yet powerful philosophy — to create spaces that are{' '}
              <br className="ethos-desc-br" />
              beautiful, functional and built to last.
            </p>
          </div>

          {/* 3 Premium Ethos Cards Grid */}
          <div className="ethos-cards-grid">
            {ethosCards.map((card, idx) => (
              <div key={idx} className="ethos-card">
                {/* Left Column: Narrative Content */}
                <div className="ethos-card-content">
                  {/* Top Row: Number & Gold Icon Badge */}
                  <div className="ethos-card-topbar">
                    <div className="ethos-num-wrap">
                      <span className="ethos-num">{card.num}</span>
                      <span className="ethos-num-dash" />
                    </div>
                    <div className="ethos-icon-badge">
                      {card.icon}
                    </div>
                  </div>

                  {/* Body: Title & Description */}
                  <div className="ethos-card-body">
                    <h3 className="ethos-card-title">{card.title}</h3>
                    <p className="ethos-card-desc">{card.desc}</p>
                  </div>

                  {/* Footer: Learn More Link with Gold Line & Arrow */}
                  <Link to={card.link} className="ethos-learn-link">
                    <span className="ethos-learn-text">{card.linkLabel}</span>
                    <span className="ethos-learn-line" />
                    <span className="ethos-learn-arrow-btn">
                      <ArrowRight size={14} strokeWidth={2.4} />
                    </span>
                  </Link>
                </div>

                {/* Right Column: Architectural Image with Curved Cut & Gold Ribbon */}
                <div className="ethos-card-media">
                  <svg className="ethos-card-svg" viewBox="0 0 200 380" preserveAspectRatio="none">
                    <defs>
                      <clipPath id={`ethos-clip-${idx}`}>
                        <path d="M 46,0 C 28,80 12,220 0,380 L 200,380 L 200,0 Z" />
                      </clipPath>
                      <linearGradient id={`ethos-gold-${idx}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#EFC668" />
                        <stop offset="50%" stopColor="#DDA52F" />
                        <stop offset="100%" stopColor="#B88218" />
                      </linearGradient>
                    </defs>

                    {/* Image with clipPath */}
                    <image
                      href={card.image}
                      width="200"
                      height="380"
                      preserveAspectRatio="xMidYMid slice"
                      clipPath={`url(#ethos-clip-${idx})`}
                      className="ethos-card-img"
                    />

                    {/* Soft Gold Glow behind contour */}
                    <path
                      d="M 46,0 C 28,80 12,220 0,380"
                      fill="none"
                      stroke="rgba(221, 165, 47, 0.28)"
                      strokeWidth="7"
                      className="ethos-gold-glow"
                    />

                    {/* Elegant Gold Contour Line along the cut */}
                    <path
                      d="M 46,0 C 28,80 12,220 0,380"
                      fill="none"
                      stroke={`url(#ethos-gold-${idx})`}
                      strokeWidth="3.5"
                      className="ethos-gold-contour"
                    />
                  </svg>
                  <img
                    src={card.image}
                    alt={card.alt}
                    className="ethos-card-mobile-img"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          5. OUR ARCHITECTURAL PROCESS SECTION (Deep Navy Background #071A30)
          ============================================================ */}
      <section className="about-process-section">
        {/* Background Decorative Watermarks & Faint Architecture */}
        <div className="process-bg-decorations" aria-hidden="true">
          {/* Faint Architectural Villa Blueprint / Wireframe Left */}
          <div className="process-bg-sketch-left" />
          {/* Faint Villa Dusk Rendering Right */}
          <div className="process-bg-villa-right" />
          {/* Subtle Bottom Gold Curved Ribbon */}
          <div className="process-bg-bottom-curve">
            <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none">
              <path
                d="M0,50 C400,20 850,75 1440,30 L1440,80 L0,80 Z"
                fill="none"
                stroke="url(#process-gold-divider)"
                strokeWidth="1.5"
                opacity="0.45"
              />
              <defs>
                <linearGradient id="process-gold-divider" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#DDA52F" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#ECC46A" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#DDA52F" stopOpacity="0.2" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <div className="container process-container">
          {/* Centered Heading Matching Reference */}
          <div className="process-header text-center">
            <div className="process-eyebrow-wrap">
              <span className="process-eyebrow-line" />
              <span className="process-eyebrow-text">OUR ARCHITECTURAL PROCESS</span>
              <span className="process-eyebrow-line" />
            </div>

            <h2 className="process-title">
              HOW WE BRING VISIONS TO LIFE
            </h2>

            <p className="process-desc">
              From the first conversation to the final handover, we turn your ideas into{' '}
              <br className="process-desc-br" />
              thoughtfully designed, beautifully built spaces.
            </p>
          </div>

          {/* 4 Connected Process Cards Grid */}
          <div className="process-cards-grid">
            {processSteps.map((step, idx) => (
              <div key={idx} className="process-card-col">
                <div className="process-card">
                  {/* Top Image */}
                  <div className="process-card-image-wrap">
                    <img
                      src={step.image}
                      alt={step.alt}
                      className="process-card-img"
                      loading="lazy"
                    />
                  </div>

                  {/* Circular Gold Number & Icon Badge Overlapping Boundary */}
                  <div className="process-step-badge">
                    <span className="process-badge-num">{step.num}</span>
                    <div className="process-badge-icon">{step.icon}</div>
                  </div>

                  {/* Card Bottom Content */}
                  <div className="process-card-content">
                    <h3 className="process-card-title">{step.title}</h3>
                    <div className="process-card-subtitle">{step.subtitle}</div>
                    <p className="process-card-desc">{step.desc}</p>
                  </div>
                </div>

                {/* Arrow Connector Circle Between Adjacent Cards (Desktop) */}
                {idx < processSteps.length - 1 && (
                  <div className="process-connector-arrow" aria-hidden="true">
                    <ArrowRight size={13} strokeWidth={2.4} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        /* ============================================================
           2. CINEMATIC LUXURY DUSK VILLA HERO
           ============================================================ */
        .about-hero-cinematic {
          position: relative;
          min-height: 590px;
          display: flex;
          align-items: center;
          padding-top: 175px;
          padding-bottom: 120px;
          background-image: url('/images/home-hero-villa.jpg');
          background-size: cover;
          background-position: center right;
          background-repeat: no-repeat;
          overflow: hidden;
        }

        .about-hero-gradient-overlay {
          position: absolute;
          inset: 0;
          background: 
            linear-gradient(
              90deg,
              rgba(7, 27, 50, 0.96) 0%,
              rgba(7, 27, 50, 0.90) 34%,
              rgba(7, 27, 50, 0.65) 54%,
              rgba(7, 27, 50, 0.22) 75%,
              rgba(7, 27, 50, 0.05) 100%
            ),
            linear-gradient(
              180deg,
              rgba(7, 27, 50, 0.75) 0%,
              rgba(7, 27, 50, 0.1) 40%,
              rgba(7, 27, 50, 0.35) 100%
            );
          z-index: 1;
        }

        .about-hero-container {
          position: relative;
          z-index: 3;
          width: 100%;
        }

        .about-hero-content {
          max-width: 580px;
          text-align: left;
        }

        .about-hero-eyebrow-wrap {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          margin-bottom: 1rem;
        }

        .about-eyebrow-line {
          width: 22px;
          height: 1.5px;
          background-color: #EBAF35;
          display: inline-block;
        }

        .about-hero-eyebrow-text {
          font-family: var(--font-sans);
          font-size: 0.82rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2.5px;
          color: #EBAF35;
        }

        .about-hero-main-title {
          font-family: var(--font-serif);
          font-size: clamp(2.4rem, 4.2vw, 3.75rem);
          font-weight: 800;
          line-height: 1.15;
          color: #FFFFFF;
          margin: 0 0 1.25rem 0;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.45);
        }

        .about-hero-description {
          font-family: var(--font-sans);
          font-size: clamp(1rem, 1.15vw, 1.12rem);
          line-height: 1.68;
          color: #E2E8F0;
          margin: 0 0 1.75rem 0;
          max-width: 520px;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        }

        .about-hero-pill-breadcrumb {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(7, 27, 50, 0.65);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.16);
          padding: 0.45rem 1.35rem;
          border-radius: 9999px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
        }

        .breadcrumb-home {
          font-family: var(--font-sans);
          font-size: 0.92rem;
          color: #FFFFFF;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .breadcrumb-home:hover {
          color: #EBAF35;
        }

        .breadcrumb-slash {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.4);
        }

        .breadcrumb-current {
          font-family: var(--font-sans);
          font-size: 0.92rem;
          font-weight: 700;
          color: #EBAF35;
        }

        /* ── Subtle Gold Curved Divider ── */
        .about-hero-curve-divider {
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 85px;
          pointer-events: none;
          z-index: 4;
        }

        .about-hero-curve-divider svg {
          display: block;
          width: 100%;
          height: 100%;
        }

        /* ============================================================
           3. MAIN ABOUT SECTION (Pure White Background #FFFFFF)
           ============================================================ */
        .about-main-section {
          background-color: #FFFFFF;
          padding: 4rem 0 5rem 0;
          position: relative;
        }
        /* ============================================================
           3. MAIN ABOUT SECTION (Pure White Background #FFFFFF)
           ============================================================ */
        .about-main-section {
          background-color: #FFFFFF;
          padding: 4.5rem 0 6rem 0;
          position: relative;
        }

        .about-better-tomorrow-header {
          text-align: center;
          max-width: 820px;
          margin: 0 auto 4.25rem auto;
        }

        .about-better-eyebrow-wrap {
          display: inline-flex;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: 0.85rem;
        }

        .about-eyebrow-line {
          width: 32px;
          height: 1.5px;
          background-color: #E5AA35;
          display: inline-block;
        }

        .about-better-eyebrow-text {
          font-family: var(--font-sans);
          font-size: 0.82rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2.5px;
          color: #E5AA35;
        }

        .about-better-title {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 3.2vw, 2.75rem);
          font-weight: 800;
          line-height: 1.25;
          color: #0B2340;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin: 0 0 1rem 0;
        }

        .about-better-desc {
          font-family: var(--font-sans);
          font-size: 1rem;
          line-height: 1.7;
          color: #64748B;
          margin: 0 auto;
          max-width: 720px;
        }

        .about-main-grid {
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          gap: 4.5rem;
          align-items: center;
        }

        /* Left Column: Story & Features */
        .about-text-col {
          display: flex;
          flex-direction: column;
        }

        .about-story-eyebrow-wrap {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          margin-bottom: 0.85rem;
        }

        .about-story-eyebrow-text {
          font-family: var(--font-sans);
          font-size: 0.82rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: #E5AA35;
        }

        .about-story-line {
          width: 28px;
          height: 1.5px;
          background-color: #E5AA35;
          display: inline-block;
        }

        .about-story-heading {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 2.7vw, 2.55rem);
          font-weight: 800;
          line-height: 1.15;
          color: #0B2340;
          margin: 0 0 1.25rem 0;
          letter-spacing: 0.3px;
          text-transform: uppercase;
        }

        .about-lead-desc {
          font-family: var(--font-sans);
          font-size: 0.98rem;
          line-height: 1.72;
          color: #64748B;
          margin-bottom: 2rem;
        }

        /* 3 Feature Rows */
        .about-feature-rows {
          display: flex;
          flex-direction: column;
          gap: 1.35rem;
          margin-bottom: 2.25rem;
        }

        .about-feature-row {
          display: flex;
          align-items: flex-start;
          gap: 1.15rem;
        }

        .about-feature-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #FFF9EE;
          border: 1.5px solid rgba(229, 170, 53, 0.4);
          color: #E5AA35;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.25s ease, background 0.25s ease;
        }

        .about-feature-row:hover .about-feature-icon-box {
          transform: scale(1.08);
          background: #FFF3DD;
          border-color: #E5AA35;
        }

        .about-feature-content {
          display: flex;
          flex-direction: column;
        }

        .about-feature-title {
          font-family: var(--font-sans);
          font-size: 0.98rem;
          font-weight: 700;
          color: #0B2340;
          margin-bottom: 0.25rem;
          line-height: 1.3;
        }

        .about-feature-desc {
          font-family: var(--font-sans);
          font-size: 0.88rem;
          color: #64748B;
          line-height: 1.55;
          margin: 0;
        }

        /* Gold CTA Button */
        .about-cta-wrap {
          margin-top: 0.5rem;
        }

        .about-services-gold-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          background: linear-gradient(135deg, #F3CA68 0%, #E5AA35 100%);
          color: #0B2340;
          font-family: var(--font-sans);
          font-size: 0.94rem;
          font-weight: 700;
          padding: 0.85rem 1.85rem;
          border-radius: 8px;
          border: 1px solid #D89E30;
          box-shadow: 0 4px 16px rgba(229, 170, 53, 0.35);
          text-decoration: none;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          white-space: nowrap;
          cursor: pointer;
        }

        .about-services-gold-btn:hover {
          background: linear-gradient(135deg, #FADBA0 0%, #F3CA68 50%, #D89E30 100%);
          color: #000000;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(229, 170, 53, 0.5);
        }

        /* Right Column: Architectural Showcase & Shapes */
        .about-image-col {
          position: relative;
          padding: 1.25rem 0.5rem 2.25rem 1.5rem;
        }

        .about-showcase-container {
          position: relative;
          width: 100%;
        }

        /* Pale Blue Rounded Shape */
        .about-deco-pale-blue {
          position: absolute;
          left: -24px;
          top: 25px;
          width: 130px;
          height: 88%;
          background: #EAF2FA;
          border-radius: 28px;
          z-index: 1;
          pointer-events: none;
        }

        /* Gold Outline Rectangle */
        .about-deco-gold-outline {
          position: absolute;
          right: -20px;
          top: -20px;
          width: 150px;
          height: 165px;
          border: 2px solid #E5AA35;
          border-radius: 22px;
          z-index: 1;
          pointer-events: none;
        }

        /* Warm Cream Shape */
        .about-deco-cream-shape {
          position: absolute;
          right: -24px;
          bottom: 24px;
          width: 85px;
          height: 180px;
          background: #FDE8C7;
          border-radius: 24px;
          z-index: 1;
          pointer-events: none;
        }

        /* Main Photo Wrapper */
        .about-photo-wrapper {
          position: relative;
          z-index: 2;
          border-radius: 24px;
          overflow: hidden;
          aspect-ratio: 4 / 3;
          background: #0B2340;
          box-shadow: 0 16px 45px -8px rgba(11, 35, 64, 0.16);
        }

        .about-showcase-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .about-photo-wrapper:hover .about-showcase-photo {
          transform: scale(1.025);
        }

        /* Overlay Statistics Card */
        .about-stats-card {
          position: absolute;
          bottom: -22px;
          left: -32px;
          z-index: 4;
          background: #FFFFFF;
          border: 1px solid rgba(229, 170, 53, 0.2);
          border-radius: 18px;
          box-shadow: 0 16px 42px -8px rgba(11, 35, 64, 0.16), 0 2px 10px rgba(11, 35, 64, 0.04);
          padding: 1.15rem 1.85rem;
          display: flex;
          align-items: center;
          gap: 1.6rem;
          backdrop-filter: blur(8px);
        }

        .about-stat-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          min-width: 105px;
        }

        .about-stat-icon-wrap {
          color: #E5AA35;
          margin-bottom: 0.35rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .about-stat-number {
          font-family: var(--font-sans);
          font-size: 1.45rem;
          font-weight: 800;
          color: #0B2340;
          line-height: 1.15;
          margin-bottom: 0.2rem;
        }

        .about-stat-label {
          font-family: var(--font-sans);
          font-size: 0.76rem;
          font-weight: 500;
          color: #64748B;
          white-space: nowrap;
        }

        .about-stat-divider {
          width: 1px;
          height: 38px;
          background: #EEF2F6;
        }

        /* ============================================================
           4. OUR CORE ETHOS SECTION (Warm Ivory #FAF8F3)
           ============================================================ */
        .about-ethos-section {
          background-color: #FAF8F3;
          padding: 5.5rem 0 6rem 0;
          position: relative;
          overflow: hidden;
          border-top: 1px solid rgba(221, 165, 47, 0.16);
          border-bottom: 1px solid rgba(221, 165, 47, 0.16);
        }

        /* Subtle Architectural Background Watermarks & Curves */
        .ethos-bg-decorations {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 1;
        }

        .ethos-bg-ribbon-left {
          position: absolute;
          top: 30px;
          left: -40px;
          width: 520px;
          height: 260px;
          opacity: 0.65;
        }

        .ethos-bg-villa-ghost {
          position: absolute;
          top: 0;
          right: 0;
          width: 420px;
          height: 300px;
          background-image: url('/images/ethos-mission.jpg');
          background-size: cover;
          background-position: center top;
          opacity: 0.08;
          mask-image: radial-gradient(circle at 100% 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 80%);
          -webkit-mask-image: radial-gradient(circle at 100% 0%, rgba(0,0,0,1) 25%, rgba(0,0,0,0) 80%);
        }

        .ethos-bg-ribbon-right {
          position: absolute;
          top: 50px;
          right: 0;
          width: 540px;
          height: 240px;
          opacity: 0.55;
        }

        .ethos-container {
          position: relative;
          z-index: 2;
        }

        /* Section Header */
        .ethos-header {
          text-align: center;
          max-width: 820px;
          margin: 0 auto 3.75rem auto;
        }

        .ethos-eyebrow-wrap {
          display: inline-flex;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: 0.85rem;
        }

        .ethos-eyebrow-line {
          width: 32px;
          height: 1.5px;
          background-color: #DDA52F;
          display: inline-block;
        }

        .ethos-eyebrow-text {
          font-family: var(--font-sans);
          font-size: 0.82rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2.5px;
          color: #DDA52F;
        }

        .ethos-title {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 3.2vw, 2.75rem);
          font-weight: 800;
          line-height: 1.25;
          color: #102B4E;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin: 0 0 1rem 0;
        }

        .ethos-desc {
          font-family: var(--font-sans);
          font-size: 1rem;
          line-height: 1.7;
          color: #62748C;
          margin: 0 auto;
          max-width: 680px;
        }

        /* 3 Premium Ethos Cards Grid */
        .ethos-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
          margin-bottom: 0;
        }

        .ethos-card {
          background: #FFFFFF;
          border: 1px solid rgba(221, 165, 47, 0.22);
          border-radius: 22px;
          box-shadow: 0 12px 36px -8px rgba(16, 43, 78, 0.07), 0 2px 10px rgba(16, 43, 78, 0.03);
          display: flex;
          overflow: hidden;
          min-height: 380px;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease;
          position: relative;
        }

        .ethos-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 48px -10px rgba(16, 43, 78, 0.12), 0 6px 18px rgba(221, 165, 47, 0.12);
          border-color: rgba(221, 165, 47, 0.45);
        }

        /* Left Column: Narrative Content */
        .ethos-card-content {
          flex: 1.15;
          padding: 1.75rem 1.15rem 1.65rem 1.65rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          z-index: 2;
        }

        .ethos-card-topbar {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }

        .ethos-num-wrap {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .ethos-num {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 700;
          color: #62748C;
          letter-spacing: 0.5px;
          line-height: 1;
        }

        .ethos-num-dash {
          width: 18px;
          height: 1.5px;
          background-color: #DDA52F;
          margin-top: 4px;
          display: block;
        }

        .ethos-icon-badge {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #FFFDF7;
          border: 1.5px solid rgba(221, 165, 47, 0.35);
          box-shadow: 0 4px 14px rgba(221, 165, 47, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #DDA52F;
          transition: transform 0.3s ease, background 0.3s ease;
        }

        .ethos-card:hover .ethos-icon-badge {
          transform: scale(1.08);
          background: #FFF9EE;
          border-color: #DDA52F;
        }

        .ethos-card-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin: 0.35rem 0 1.25rem 0;
        }

        .ethos-card-title {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          font-weight: 800;
          color: #102B4E;
          text-transform: uppercase;
          letter-spacing: 0.4px;
          margin: 0 0 0.75rem 0;
          line-height: 1.2;
        }

        .ethos-card-desc {
          font-family: var(--font-sans);
          font-size: 0.86rem;
          color: #62748C;
          line-height: 1.6;
          margin: 0;
        }

        /* Footer: Learn More Link */
        .ethos-learn-link {
          display: flex;
          align-items: center;
          text-decoration: none;
          margin-top: auto;
          padding-top: 0.5rem;
        }

        .ethos-learn-text {
          font-family: var(--font-sans);
          font-size: 0.88rem;
          font-weight: 700;
          color: #102B4E;
          white-space: nowrap;
          transition: color 0.25s ease;
        }

        .ethos-learn-line {
          flex: 1;
          height: 1.5px;
          background-color: rgba(221, 165, 47, 0.5);
          margin: 0 0.85rem;
          transition: background-color 0.25s ease;
        }

        .ethos-learn-arrow-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ECC46A 0%, #DDA52F 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          box-shadow: 0 3px 10px rgba(221, 165, 47, 0.35);
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease;
          flex-shrink: 0;
        }

        .ethos-card:hover .ethos-learn-arrow-btn {
          transform: translateX(4px);
          box-shadow: 0 4px 14px rgba(221, 165, 47, 0.5);
        }

        .ethos-card:hover .ethos-learn-line {
          background-color: #DDA52F;
        }

        .ethos-card:hover .ethos-learn-text {
          color: #DDA52F;
        }

        /* Right Column: Architectural Media & SVG Cut */
        .ethos-card-media {
          flex: 0.95;
          position: relative;
          height: 100%;
          min-height: 380px;
          overflow: hidden;
          background: #FFFFFF;
        }

        .ethos-card-svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        .ethos-card-img {
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          transform-origin: center;
        }

        .ethos-card:hover .ethos-card-img {
          transform: scale(1.05);
        }

        .ethos-card-mobile-img {
          display: none;
        }

        /* ============================================================
           5. PROCESS SECTION (Deep Navy #071A30)
           ============================================================ */
        .about-process-section {
          background: #071A30;
          padding: 5.5rem 0 5.5rem 0;
          color: #FFFFFF;
          position: relative;
          overflow: hidden;
        }

        .process-bg-decorations {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }

        .process-bg-sketch-left {
          position: absolute;
          top: 0;
          left: 0;
          width: 480px;
          height: 100%;
          background-image: url('/images/process-step-2.jpg');
          background-size: cover;
          background-position: left center;
          opacity: 0.08;
          mask-image: radial-gradient(circle at 0% 40%, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%);
          -webkit-mask-image: radial-gradient(circle at 0% 40%, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%);
        }

        .process-bg-villa-right {
          position: absolute;
          top: 0;
          right: 0;
          width: 480px;
          height: 100%;
          background-image: url('/images/process-step-4.jpg');
          background-size: cover;
          background-position: right center;
          opacity: 0.12;
          mask-image: radial-gradient(circle at 100% 30%, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%);
          -webkit-mask-image: radial-gradient(circle at 100% 30%, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%);
        }

        .process-bg-bottom-curve {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 80px;
          pointer-events: none;
        }

        .process-bg-bottom-curve svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        .process-container {
          position: relative;
          z-index: 2;
        }

        /* Section Header */
        .process-header {
          text-align: center;
          max-width: 820px;
          margin: 0 auto 3.75rem auto;
        }

        .process-eyebrow-wrap {
          display: inline-flex;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: 0.85rem;
        }

        .process-eyebrow-line {
          width: 32px;
          height: 1.5px;
          background-color: #DDA52F;
          display: inline-block;
        }

        .process-eyebrow-text {
          font-family: var(--font-sans);
          font-size: 0.82rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2.5px;
          color: #DDA52F;
        }

        .process-title {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 3.2vw, 2.75rem);
          font-weight: 800;
          line-height: 1.25;
          color: #FFFFFF;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin: 0 0 1rem 0;
        }

        .process-desc {
          font-family: var(--font-sans);
          font-size: 1rem;
          line-height: 1.7;
          color: #CBD5E1;
          margin: 0 auto;
          max-width: 680px;
        }

        /* 4 Connected Process Cards Grid */
        .process-cards-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.75rem;
          position: relative;
        }

        .process-card-col {
          position: relative;
          display: flex;
        }

        .process-card {
          background: #0B203B;
          border: 1px solid rgba(221, 165, 47, 0.35);
          border-radius: 20px;
          box-shadow: 0 16px 36px -8px rgba(0, 0, 0, 0.45), 0 0 16px rgba(221, 165, 47, 0.06);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          width: 100%;
          position: relative;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease, border-color 0.35s ease;
        }

        .process-card:hover {
          transform: translateY(-6px);
          border-color: #DDA52F;
          box-shadow: 0 22px 48px -8px rgba(0, 0, 0, 0.6), 0 0 24px rgba(221, 165, 47, 0.22);
        }

        /* Card Image */
        .process-card-image-wrap {
          width: 100%;
          height: 185px;
          position: relative;
          overflow: hidden;
          background: #071A30;
        }

        .process-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .process-card:hover .process-card-img {
          transform: scale(1.06);
        }

        /* Overlapping Gold Badge */
        .process-step-badge {
          position: absolute;
          top: 185px;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: #071A30;
          border: 2px solid #DDA52F;
          color: #DDA52F;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.6), 0 0 14px rgba(221, 165, 47, 0.25);
          z-index: 3;
          transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .process-card:hover .process-step-badge {
          transform: translate(-50%, -50%) scale(1.08);
          border-color: #ECC46A;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.7), 0 0 20px rgba(221, 165, 47, 0.45);
        }

        .process-badge-num {
          font-family: var(--font-sans);
          font-size: 0.72rem;
          font-weight: 800;
          color: #DDA52F;
          letter-spacing: 0.5px;
          line-height: 1;
          margin-bottom: 2px;
        }

        .process-badge-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #DDA52F;
        }

        /* Card Content Area */
        .process-card-content {
          padding: 2.6rem 1.4rem 1.75rem 1.4rem;
          text-align: center;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .process-card-title {
          font-family: var(--font-serif);
          font-size: 1.32rem;
          font-weight: 800;
          color: #FFFFFF;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin: 0 0 0.35rem 0;
          line-height: 1.25;
        }

        .process-card-subtitle {
          font-family: var(--font-sans);
          font-size: 0.86rem;
          font-weight: 700;
          color: #DDA52F;
          margin-bottom: 0.85rem;
          line-height: 1.3;
        }

        .process-card-desc {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: #CBD5E1;
          line-height: 1.6;
          margin: 0;
        }

        /* Connecting Arrow Badge Between Cards (Desktop) */
        .process-connector-arrow {
          position: absolute;
          right: -22px;
          top: 185px;
          transform: translateY(-50%);
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #071A30;
          border: 1.5px solid #DDA52F;
          color: #DDA52F;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 4;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4), 0 0 10px rgba(221, 165, 47, 0.2);
        }

        /* ============================================================
           8. RESPONSIVE BEHAVIOR
           ============================================================ */
        @media (max-width: 1024px) {
          .about-main-grid {
            grid-template-columns: 1fr;
            gap: 3.5rem;
          }

          .about-text-col {
            order: 1;
          }

          .about-image-col {
            order: 2;
            padding: 1.5rem 0.5rem 2.5rem 0.5rem;
            max-width: 720px;
            margin: 0 auto;
            width: 100%;
            box-sizing: border-box;
          }

          .about-photo-wrapper {
            max-width: 100%;
          }

          .about-stats-card {
            left: 20px;
            bottom: -22px;
          }

          /* Ethos Section Tablet (<= 1024px) */
          .ethos-cards-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }

          .ethos-card:last-child {
            grid-column: span 2;
            max-width: 620px;
            margin: 0 auto;
            width: 100%;
          }

          .process-timeline-line {
            display: none;
          }

          .process-steps-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .about-main-section {
            padding: 3.5rem 0 4.5rem 0;
            overflow-x: hidden;
          }

          .about-better-tomorrow-header {
            margin-bottom: 2.75rem;
          }

          .about-better-title {
            font-size: 2rem;
          }

          .about-better-desc {
            font-size: 0.94rem;
          }

          .about-story-heading {
            font-size: 1.85rem;
          }

          .about-deco-pale-blue,
          .about-deco-gold-outline,
          .about-deco-cream-shape {
            display: none;
          }

          .about-image-col {
            padding: 0;
            width: 100%;
          }

          .about-stats-card {
            position: static;
            transform: none;
            margin-top: 1.5rem;
            width: 100%;
            box-sizing: border-box;
            justify-content: space-around;
            padding: 1.15rem 0.75rem;
            gap: 0.5rem;
            box-shadow: 0 10px 28px -6px rgba(11, 35, 64, 0.1);
          }

          .about-stat-col {
            min-width: 0;
            flex: 1;
          }

          .about-stat-number {
            font-size: 1.35rem;
          }

          .about-stat-label {
            font-size: 0.72rem;
            white-space: normal;
            text-align: center;
          }

          /* Ethos Section Medium Screens (<= 768px) */
          .about-ethos-section {
            padding: 3.75rem 0 4.25rem 0;
          }

          .ethos-header {
            margin-bottom: 2.5rem;
          }

          .ethos-title {
            font-size: 1.95rem;
          }

          .ethos-desc {
            font-size: 0.94rem;
          }

          .ethos-desc-br {
            display: none;
          }

          .ethos-cards-grid {
            grid-template-columns: 1fr;
            gap: 1.75rem;
          }

          .ethos-card:last-child {
            grid-column: span 1;
            max-width: 100%;
          }

          .ethos-card {
            flex-direction: column;
            min-height: auto;
          }

          .ethos-card-media {
            min-height: 220px;
            height: 220px;
            order: 2;
          }

          .ethos-card-content {
            order: 1;
            padding: 1.6rem 1.35rem 1.35rem 1.35rem;
          }

          .ethos-card-svg {
            display: none;
          }

          .ethos-card-mobile-img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-top: 2px solid #DDA52F;
          }
        }

        @media (max-width: 640px) {
          .about-hero-compact {
            min-height: 290px;
            padding-top: 110px;
            padding-bottom: 30px;
          }

          .about-main-section {
            padding: 2.5rem 0 3.25rem 0;
          }

          .about-better-title {
            font-size: 1.65rem;
            line-height: 1.25;
          }

          .about-better-desc {
            font-size: 0.9rem;
            line-height: 1.6;
          }

          .about-story-heading {
            font-size: 1.6rem;
            line-height: 1.2;
          }

          .about-feature-rows {
            gap: 1.15rem;
            margin-bottom: 1.75rem;
          }

          .about-services-gold-btn {
            width: 100%;
            justify-content: center;
          }

          .about-stats-card {
            padding: 1rem 0.4rem;
            gap: 0.25rem;
          }

          .about-stat-number {
            font-size: 1.25rem;
          }

          .about-stat-label {
            font-size: 0.67rem;
            line-height: 1.2;
          }

          /* Ethos Section Small Mobile (<= 640px) */
          .ethos-title {
            font-size: 1.6rem;
          }

          .process-steps-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ethos-card,
          .ethos-card-img,
          .ethos-learn-arrow-btn,
          .ethos-icon-badge {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
}
