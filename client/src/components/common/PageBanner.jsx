import { Link } from 'react-router-dom';

export default function PageBanner({
  title,
  subtitle,
  eyebrow = 'SRI ANANDA NILAYAM',
  bgImage = '/images/hero-villa.jpg',
  breadcrumbs = [],
}) {
  return (
    <section className="page-banner-root" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="banner-overlay" />
      <div className="container banner-container">
        {eyebrow && <span className="section-eyebrow banner-eyebrow">{eyebrow}</span>}
        <h1 className="banner-title">{title}</h1>
        {subtitle && <p className="banner-subtitle">{subtitle}</p>}

        {breadcrumbs.length > 0 && (
          <nav className="banner-breadcrumbs" aria-label="Breadcrumb Navigation">
            <Link to="/">Home</Link>
            {breadcrumbs.map((crumb, idx) => (
              <span key={idx} className="crumb-item">
                <span className="crumb-sep">/</span>
                {crumb.link ? <Link to={crumb.link}>{crumb.name}</Link> : <span className="crumb-current">{crumb.name}</span>}
              </span>
            ))}
          </nav>
        )}
      </div>

      <style>{`
        .page-banner-root {
          position: relative;
          min-height: 290px;
          padding-top: 145px;
          padding-bottom: 60px;
          display: flex;
          align-items: center;
          background-size: cover;
          background-position: center 35%;
          background-repeat: no-repeat;
          border-bottom: 1px solid rgba(214, 164, 59, 0.35);
          overflow: hidden;
        }

        .banner-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(6, 17, 33, 0.9) 0%, rgba(10, 27, 51, 0.88) 60%, rgba(6, 17, 33, 0.96) 100%);
        }

        .banner-container {
          position: relative;
          z-index: 5;
          text-align: center;
          max-width: 860px;
        }

        .banner-eyebrow {
          margin-bottom: 0.75rem;
          font-size: 0.78rem;
          letter-spacing: 2.5px;
          color: var(--color-gold);
        }

        .banner-title {
          font-family: var(--font-serif);
          font-size: clamp(2.2rem, 4.5vw, 3.4rem);
          line-height: 1.2;
          margin-bottom: 0.75rem;
          color: #FFFFFF;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .banner-subtitle {
          font-family: var(--font-sans);
          font-size: 1.05rem;
          line-height: 1.7;
          color: #CBD5E1;
          margin-bottom: 1.5rem;
          max-width: 720px;
          margin-left: auto;
          margin-right: auto;
        }

        .banner-breadcrumbs {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--color-slate-light);
          background: rgba(6, 17, 33, 0.6);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0.4rem 1.15rem;
          border-radius: var(--radius-full);
        }

        .banner-breadcrumbs a {
          color: #E2E8F0;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .banner-breadcrumbs a:hover {
          color: var(--color-gold);
        }

        .crumb-item {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .crumb-sep {
          color: rgba(255, 255, 255, 0.25);
          font-size: 0.8rem;
        }

        .crumb-current {
          color: var(--color-gold);
          font-weight: 600;
        }

        @media (max-width: 768px) {
          .page-banner-root {
            min-height: 250px;
            padding-top: 115px;
            padding-bottom: 45px;
          }
        }
      `}</style>
    </section>
  );
}
