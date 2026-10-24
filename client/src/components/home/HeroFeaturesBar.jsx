import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Hammer, Armchair, Home, ArrowRight } from 'lucide-react';

export default function HeroFeaturesBar() {
  const features = [
    {
      id: 1,
      title: 'Architectural Design',
      desc: 'Innovative and functional designs for modern living',
      icon: <Compass size={24} className="text-gold" />,
      link: '/services/architectural-design',
    },
    {
      id: 2,
      title: 'Construction Services',
      desc: 'Quality construction with timely delivery',
      icon: <Hammer size={24} className="text-gold" />,
      link: '/services/residential-construction',
    },
    {
      id: 3,
      title: 'Interior Design',
      desc: 'Elegant and personalized interior solutions',
      icon: <Armchair size={24} className="text-gold" />,
      link: '/services/interior-design',
    },
    {
      id: 4,
      title: 'Renovation & Turnkey',
      desc: 'Complete renovation and turnkey project solutions',
      icon: <Home size={24} className="text-gold" />,
      link: '/services/turnkey-projects',
    },
  ];

  return (
    <div className="hero-features-root">
      <div className="container">
        <div className="features-card-grid">
          {features.map((feat) => (
            <Link
              key={feat.id}
              to={feat.link}
              className="feature-pill-card card-hover-lift"
            >
              <div className="feature-icon-box">{feat.icon}</div>
              <div className="feature-text">
                <h4 className="feature-title">{feat.title}</h4>
                <p className="feature-desc">{feat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .hero-features-root {
          position: relative;
          z-index: 20;
          margin-top: -45px;
          margin-bottom: 25px;
        }

        .features-card-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
        }

        .feature-pill-card {
          background: #FFFFFF;
          border: 1px solid rgba(214, 164, 59, 0.25);
          border-radius: 14px;
          padding: 1.35rem 1.25rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          text-decoration: none;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25), 0 0 15px rgba(214, 164, 59, 0.08);
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .feature-pill-card:hover {
          transform: translateY(-6px);
          border-color: rgba(214, 164, 59, 0.6);
          box-shadow: 0 18px 36px rgba(0, 0, 0, 0.35), 0 0 25px rgba(214, 164, 59, 0.2);
        }

        .feature-icon-box {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          background: rgba(214, 164, 59, 0.12);
          border: 1px solid rgba(214, 164, 59, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.3s ease, background 0.3s ease;
        }

        .feature-pill-card:hover .feature-icon-box {
          transform: scale(1.08);
          background: rgba(214, 164, 59, 0.2);
        }

        .feature-text {
          display: flex;
          flex-direction: column;
        }

        .feature-title {
          font-family: var(--font-sans);
          font-size: 0.98rem;
          font-weight: 700;
          color: #0E233E;
          margin-bottom: 0.25rem;
          line-height: 1.2;
          transition: color 0.25s ease;
        }

        .feature-pill-card:hover .feature-title {
          color: #B68326;
        }

        .feature-desc {
          font-size: 0.78rem;
          color: #64748B;
          line-height: 1.4;
          margin: 0;
        }

        @media (max-width: 1100px) {
          .features-card-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
          .hero-features-root {
            margin-top: 20px;
          }
        }

        @media (max-width: 600px) {
          .features-card-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
