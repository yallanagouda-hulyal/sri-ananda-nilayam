import { useState, useEffect } from 'react';
import { Star, Quote, Sparkles, Home, CheckCircle2, Award } from 'lucide-react';
import PageBanner from '../components/common/PageBanner';
import SeoMeta from '../components/common/SeoMeta';
import { publicApi } from '../api/publicApi';

const defaultTestimonials = [
  {
    _id: 't1',
    clientName: 'Rajesh Kumar',
    clientTitle: 'Homeowner',
    projectCategory: 'Turnkey Luxury Villa',
    rating: 5,
    text: 'Excellent work and professional team. Our dream home was completed exactly as we imagined.',
  },
  {
    _id: 't2',
    clientName: 'Priya Sharma',
    clientTitle: 'Interior Design Client',
    projectCategory: 'Bespoke Luxury Interiors',
    rating: 5,
    text: 'Very creative designs and great attention to detail. Highly recommended!',
  },
  {
    _id: 't3',
    clientName: 'Abhishek Reddy',
    clientTitle: 'Commercial Project',
    projectCategory: 'Corporate Campus & Architecture',
    rating: 5,
    text: 'Timely delivery, quality construction and highly professional team. Truly a reliable partner.',
  },
  {
    _id: 't4',
    clientName: 'Dr. Ramesh Kulkarni',
    clientTitle: 'Villa Owner, Whitefield',
    projectCategory: 'Residential Architecture',
    rating: 5,
    text: 'Sri Ananda Nilayam exceeded every expectation with our family villa. Their structural clarity, Vastu harmony, and weekly video progress updates made the construction journey truly peaceful.',
  },
  {
    _id: 't5',
    clientName: 'Sunita & Arvind Menon',
    clientTitle: 'Apartment Owners, Indiranagar',
    projectCategory: 'Turnkey Interior Fitout',
    rating: 5,
    text: 'From the initial 3D renderings to the final brass hardware installation, the team demonstrated master-level craftsmanship.',
  },
  {
    _id: 't6',
    clientName: 'Vikas Narayanan',
    clientTitle: 'Managing Director, Aura Ventures',
    projectCategory: 'Commercial Headquarters',
    rating: 5,
    text: 'Building a 20,000 sq ft office requires strict adherence to timelines and MEP compliance. Sri Ananda Nilayam delivered on budget and two weeks ahead of schedule.',
  },
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await publicApi.getTestimonials();
        if (res.data?.success && res.data.data?.length > 0) {
          setTestimonials(res.data.data);
        }
      } catch (err) {
        console.warn('API error fetching testimonials, fallback:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <div className="testimonials-page">
      <SeoMeta
        title="Client Testimonials"
        description="Read reviews and testimonials from homeowners and enterprise clients who partnered with Shri Ananda Nilayam for architecture, construction, and interiors."
        canonicalUrl="/testimonials"
      />

      <PageBanner
        eyebrow="TESTIMONIALS"
        title="Client Testimonials"
        subtitle="Reflections from patrons who entrusted their private sanctuaries and commercial spaces to our stewardship."
        bgImage="/images/service-interiors.jpg"
        breadcrumbs={[{ name: 'Testimonials' }]}
      />

      {/* Testimonials Grid Section */}
      <section className="section-padding">
        <div className="container">
          <div className="testimonials-full-grid">
            {loading ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem' }}>
                <div className="admin-loading-spinner" style={{ margin: '0 auto 1rem' }} />
                <p style={{ color: 'var(--color-slate-light)' }}>Loading client testimonials...</p>
              </div>
            ) : testimonials.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem' }}>
                <p style={{ color: 'var(--color-slate-light)' }}>No client testimonials found.</p>
              </div>
            ) : (
              testimonials.map((t, idx) => (
                <div key={t._id || idx} className="testimonial-card-v2 card-hover-lift">
                  <div className="t-card-header">
                    <div className="t-author-avatar">
                      {(t.clientName || 'C')[0]}
                    </div>
                    <div className="t-author-info">
                      <h4 className="t-author-name">{t.clientName}</h4>
                      <span className="t-author-title">{t.clientTitle || t.role}</span>
                      <div className="rating-stars" aria-label={`${t.rating || 5} out of 5 stars`}>
                        {[...Array(t.rating || 5)].map((_, s) => (
                          <Star key={s} size={15} className="star-filled" fill="#D6A43B" color="#D6A43B" />
                        ))}
                      </div>
                    </div>
                    <Quote size={28} className="t-quote-icon" />
                  </div>

                  <p className="t-body-quote">&ldquo;{t.text || t.content}&rdquo;</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Quality Guarantees Bar */}
      <section className="guarantee-strip section-padding bg-navy-alt">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">OUR COMMITMENT</span>
            <h2 className="section-title">The Ananda Nilayam Standard</h2>
          </div>

          <div className="grid-3">
            <div className="g-card glass-card text-center">
              <Award size={32} className="text-gold" style={{ margin: '0 auto 1rem auto' }} />
              <h4>100% Fixed-Price Transparency</h4>
              <p>Transparent BOQ with zero hidden inflation or arbitrary billing variations.</p>
            </div>
            <div className="g-card glass-card text-center">
              <CheckCircle2 size={32} className="text-gold" style={{ margin: '0 auto 1rem auto' }} />
              <h4>Seismic & BIS Structural Audits</h4>
              <p>Certified material batch reports and lab testing on steel, concrete, and soil.</p>
            </div>
            <div className="g-card glass-card text-center">
              <Home size={32} className="text-gold" style={{ margin: '0 auto 1rem auto' }} />
              <h4>Snag-Free Turnkey Handover</h4>
              <p>Thorough 150-point inspection check before final key handover and possession.</p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .testimonials-page {
          background: #F7F8FA;
        }

        .testimonials-full-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .testimonial-card-v2 {
          background: #FFFFFF;
          border-radius: 16px;
          padding: 2.2rem 2rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(214, 164, 59, 0.15);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
          position: relative;
        }

        .testimonial-card-v2:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 36px rgba(14, 35, 62, 0.1);
          border-color: rgba(214, 164, 59, 0.4);
        }

        .t-card-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.25rem;
          position: relative;
        }

        .t-author-avatar {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: linear-gradient(135deg, #102A4C 0%, #061121 100%);
          color: #D6A43B;
          border: 2px solid #D6A43B;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-serif);
          font-size: 1.35rem;
          font-weight: 700;
          flex-shrink: 0;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
        }

        .t-author-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .t-author-name {
          font-family: var(--font-sans);
          font-size: 1.1rem;
          font-weight: 700;
          color: #0E233E;
          margin: 0;
          line-height: 1.2;
        }

        .t-author-title {
          font-size: 0.82rem;
          color: #64748B;
          font-weight: 500;
        }

        .rating-stars {
          display: flex;
          gap: 3px;
          margin-top: 0.2rem;
        }

        .t-quote-icon {
          color: #E2E8F0;
          flex-shrink: 0;
          transition: color 0.3s;
        }

        .testimonial-card-v2:hover .t-quote-icon {
          color: rgba(214, 164, 59, 0.4);
        }

        .t-body-quote {
          font-size: 0.95rem;
          color: #334155;
          line-height: 1.7;
          font-style: italic;
          margin: 0;
          padding-top: 0.5rem;
        }

        .g-card {
          padding: 2.2rem 1.8rem;
        }

        .g-card h4 {
          font-size: 1.15rem;
          color: #FFF;
          margin-bottom: 0.6rem;
        }

        .g-card p {
          font-size: 0.88rem;
          color: var(--color-slate-light);
          line-height: 1.6;
          margin: 0;
        }

        @media (max-width: 1024px) {
          .testimonials-full-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .testimonials-full-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
