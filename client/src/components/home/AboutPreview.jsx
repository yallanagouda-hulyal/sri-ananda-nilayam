import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Compass } from 'lucide-react';

export default function AboutPreview() {
  const pillars = [
    { title: 'Vastu-Aligned Masterplans', desc: 'Harmonizing sacred orientation with contemporary open-plan spatial design.' },
    { title: 'Certified Grade-A Materials', desc: 'Rigorous laboratory testing for steel, cement, and structural integrity.' },
    { title: 'Transparent BOQ Billing', desc: 'Itemized material schedules and milestone tracking with zero hidden costs.' },
    { title: '10-Year Structural Warranty', desc: 'Enduring peace of mind backed by certified structural engineering.' },
  ];

  return (
    <section className="about-preview-root section-padding">
      <div className="container">
        <div className="about-preview-grid">
          {/* Left Column: Architectural Visual Asset */}
          <div className="about-visual-col">
            <div className="about-image-frame">
              <img
                src="/images/about-architecture.jpg"
                alt="Architectural Blueprint Design Deliberations at Shri Ananda Nilayam"
                className="about-primary-img"
                loading="lazy"
              />

              {/* Floating Experience Badge */}
              <div className="about-experience-badge">
                <Compass size={22} className="text-gold" />
                <div className="badge-text">
                  <span className="badge-strong">Architectural Studio</span>
                  <span className="badge-sub">Bengaluru, Karnataka</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Content */}
          <div className="about-content-col">
            <span className="section-eyebrow">— ABOUT OUR STUDIO —</span>
            <h2 className="about-heading">
              Shaping Bespoke Living Spaces <br />
              <span className="about-heading-accent">Crafted with Purpose &amp; Integrity</span>
            </h2>

            <p className="about-lead">
              Sri Ananda Nilayam is a multi-disciplinary architecture, civil construction, and interior design practice. We bridge the gap between visionary aesthetics and rigorous on-site engineering.
            </p>

            <p className="about-desc">
              From contemporary private villas to bespoke commercial landmarks, our team oversees every phase — from soil testing and zoning approvals to interior woodwork and final key handover.
            </p>

            {/* 4 Pillars Grid */}
            <div className="about-pillars-grid">
              {pillars.map((pil, idx) => (
                <div key={idx} className="pillar-item">
                  <div className="pillar-check">
                    <CheckCircle2 size={18} className="text-gold" />
                  </div>
                  <div className="pillar-text">
                    <h4 className="pillar-title">{pil.title}</h4>
                    <p className="pillar-desc">{pil.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Actions */}
            <div className="about-actions">
              <Link to="/about" className="btn btn-primary btn-about-primary">
                <span>Explore Our Full Philosophy</span>
                <ArrowRight size={16} />
              </Link>

              <Link to="/contact" className="btn btn-secondary btn-about-secondary">
                <span>Book Plot Consultation</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-preview-root {
          background: #0D2038;
          position: relative;
          padding: 6.5rem 0;
          border-top: 1px solid rgba(229, 174, 63, 0.15);
          border-bottom: 1px solid rgba(229, 174, 63, 0.15);
        }

        .about-preview-grid {
          display: grid;
          grid-template-columns: 46% 54%;
          gap: 4.5rem;
          align-items: center;
        }

        /* Left Visual Column */
        .about-visual-col {
          position: relative;
        }

        .about-image-frame {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(229, 174, 63, 0.3);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.55);
          aspect-ratio: 4 / 3.5;
          background: #061426;
        }

        .about-primary-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .about-image-frame:hover .about-primary-img {
          transform: scale(1.03);
        }

        .about-experience-badge {
          position: absolute;
          bottom: 1.5rem;
          left: 1.5rem;
          background: rgba(6, 20, 38, 0.9);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(229, 174, 63, 0.4);
          border-radius: 12px;
          padding: 0.85rem 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.85rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
        }

        .badge-text {
          display: flex;
          flex-direction: column;
        }

        .badge-strong {
          font-family: var(--font-serif);
          font-size: 0.92rem;
          font-weight: 700;
          color: #F8F6F0;
        }

        .badge-sub {
          font-size: 0.74rem;
          color: #E5AE3F;
          letter-spacing: 0.4px;
        }

        /* Right Content Column */
        .about-content-col {
          display: flex;
          flex-direction: column;
        }

        .about-heading {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 3.2vw, 2.75rem);
          line-height: 1.22;
          color: #F8F6F0;
          margin-bottom: 1.25rem;
          font-weight: 700;
          text-transform: none;
        }

        .about-heading-accent {
          color: #E5AE3F;
        }

        .about-lead {
          font-size: 1.05rem;
          line-height: 1.75;
          color: #F8F6F0;
          margin-bottom: 0.85rem;
          max-width: 580px;
        }

        .about-desc {
          font-size: 0.92rem;
          line-height: 1.7;
          color: #B7C4D6;
          margin-bottom: 2rem;
          max-width: 580px;
        }

        .about-pillars-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.35rem 1.5rem;
          margin-bottom: 2.5rem;
        }

        .pillar-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .pillar-check {
          margin-top: 0.2rem;
          flex-shrink: 0;
        }

        .pillar-title {
          font-family: var(--font-sans);
          font-size: 0.92rem;
          font-weight: 700;
          color: #F8F6F0;
          margin-bottom: 0.3rem;
          line-height: 1.3;
        }

        .pillar-desc {
          font-size: 0.82rem;
          color: #B7C4D6;
          line-height: 1.55;
          margin: 0;
        }

        .about-actions {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          flex-wrap: wrap;
        }

        .btn-about-primary {
          border-radius: 50px;
          padding: 0.85rem 1.85rem;
          font-size: 0.92rem;
        }

        .btn-about-secondary {
          border-radius: 50px;
          padding: 0.85rem 1.85rem;
          font-size: 0.92rem;
        }

        .text-gold {
          color: #E5AE3F;
        }

        @media (max-width: 1024px) {
          .about-preview-grid {
            grid-template-columns: 1fr;
            gap: 3.5rem;
          }
          .about-pillars-grid {
            grid-template-columns: 1fr;
            gap: 1.15rem;
          }
        }

        @media (max-width: 640px) {
          .about-preview-root {
            padding: 4.5rem 0;
          }
          .about-actions {
            flex-direction: column;
            align-items: stretch;
          }
        }
      `}</style>
    </section>
  );
}
