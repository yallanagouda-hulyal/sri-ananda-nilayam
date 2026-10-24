import { useSite } from '../../context/SiteContext';
import { Award, Users, CheckCircle2, Briefcase } from 'lucide-react';

export default function StatsSection() {
  const { settings } = useSite();

  const stats = [
    {
      id: 1,
      value: settings.yearsExperience || '10+',
      label: 'Years of Experience',
      icon: <Award size={20} className="stat-icon" />,
    },
    {
      id: 2,
      value: settings.happyClients || '150+',
      label: 'Happy Clients',
      icon: <Users size={20} className="stat-icon" />,
    },
    {
      id: 3,
      value: settings.projectsCompleted || '200+',
      label: 'Projects Completed',
      icon: <CheckCircle2 size={20} className="stat-icon" />,
    },
    {
      id: 4,
      value: settings.expertTeam || '50+',
      label: 'Expert Team Members',
      icon: <Briefcase size={20} className="stat-icon" />,
    },
  ];

  return (
    <section className="stats-strip-root" aria-label="Company Statistics">
      <div className="container">
        <div className="stats-strip-card">
          <div className="stats-grid">
            {stats.map((st, idx) => (
              <div key={st.id} className="stat-item">
                <div className="stat-icon-wrap">{st.icon}</div>
                <div className="stat-content">
                  <div className="stat-value">{st.value}</div>
                  <div className="stat-label">{st.label}</div>
                </div>
                {idx < stats.length - 1 && <div className="stat-divider" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .stats-strip-root {
          position: relative;
          z-index: 10;
          margin-top: 0;
          margin-bottom: 50px;
        }

        .stats-strip-card {
          background: #0D2038;
          border: 1px solid rgba(229, 174, 63, 0.25);
          border-radius: 16px;
          padding: 2rem 2.5rem;
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.45);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          align-items: center;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 1.15rem;
          position: relative;
        }

        .stat-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: rgba(229, 174, 63, 0.12);
          border: 1px solid rgba(229, 174, 63, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .stat-icon {
          color: #E5AE3F;
        }

        .stat-content {
          display: flex;
          flex-direction: column;
        }

        .stat-value {
          font-family: var(--font-serif);
          font-size: 2.1rem;
          font-weight: 700;
          color: #F8F6F0;
          line-height: 1.1;
          letter-spacing: 0.5px;
        }

        .stat-label {
          font-family: var(--font-sans);
          font-size: 0.88rem;
          font-weight: 500;
          color: #B7C4D6;
          letter-spacing: 0.2px;
          margin-top: 0.25rem;
        }

        .stat-divider {
          position: absolute;
          right: -0.75rem;
          top: 15%;
          height: 70%;
          width: 1px;
          background: rgba(255, 255, 255, 0.1);
        }

        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
          }
          .stat-divider {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .stats-strip-root {
            margin-top: 0;
            padding-top: 1.5rem;
            margin-bottom: 35px;
          }
          .stats-strip-card {
            padding: 1.5rem 1.25rem;
          }
          .stats-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
          .stat-value {
            font-size: 1.85rem;
          }
        }
      `}</style>
    </section>
  );
}
