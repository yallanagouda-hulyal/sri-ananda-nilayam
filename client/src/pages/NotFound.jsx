import { Link } from 'react-router-dom';
import { Home, Compass, Layers } from 'lucide-react';
import SeoMeta from '../components/common/SeoMeta';

export default function NotFound() {
  return (
    <div className="not-found-page">
      <SeoMeta
        title="404 — Page Not Found"
        description="The architectural blueprint or page you are seeking could not be found."
      />

      <div className="not-found-container container text-center">
        <div className="nf-card glass-card">
          <span className="nf-code text-gold-gradient">404</span>
          <span className="section-eyebrow" style={{ display: 'block', margin: '0.5rem auto 1rem auto' }}>
            SPATIAL PATHWAY NOT FOUND
          </span>
          <h1 className="nf-title">This Architectural Blueprint Does Not Exist</h1>
          <p className="lead" style={{ maxWidth: '580px', margin: '0 auto 2.5rem auto' }}>
            The page you are attempting to access may have been relocated, restructured, or is currently undergoing design revisions.
          </p>

          <div className="nf-actions">
            <Link to="/" className="btn btn-primary">
              <Home size={18} />
              <span>Return to Home</span>
            </Link>
            <Link to="/services" className="btn btn-secondary">
              <Compass size={18} />
              <span>Explore Services</span>
            </Link>
            <Link to="/projects" className="btn btn-secondary">
              <Layers size={18} />
              <span>View Portfolios</span>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .not-found-page {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6rem 1.5rem;
          background: radial-gradient(circle at center, rgba(16, 42, 76, 0.5) 0%, rgba(6, 17, 33, 0.95) 100%);
        }

        .not-found-container {
          max-width: 780px;
        }

        .nf-card {
          padding: 4rem 3rem;
          border: 1px solid rgba(214, 164, 59, 0.35);
        }

        .nf-code {
          font-family: var(--font-serif);
          font-size: clamp(5rem, 12vw, 8.5rem);
          font-weight: 700;
          line-height: 1;
          letter-spacing: 4px;
        }

        .nf-title {
          font-size: clamp(1.6rem, 3.5vw, 2.3rem);
          color: #FFF;
          margin-bottom: 1.25rem;
        }

        .nf-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        @media (max-width: 640px) {
          .nf-card {
            padding: 3rem 1.5rem;
          }
          .nf-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
