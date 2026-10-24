import { Link } from 'react-router-dom';
import { Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';

const GAP = 24;
const INTERVAL = 2800;

export default function TestimonialsSection({ testimonials = [] }) {
  const defaultTestimonials = [
    {
      clientName: 'Dr. Ramesh Kulkarni',
      clientTitle: 'Villa Owner, Whitefield',
      projectCategory: 'Residential Architecture & Turnkey Construction',
      rating: 5,
      text: 'Sri Ananda Nilayam exceeded every expectation with our family villa. Their structural clarity, adherence to Vastu principles without compromising modern minimalist aesthetics, and weekly video progress updates made the construction journey truly peaceful.',
    },
    {
      clientName: 'Sunita & Arvind Menon',
      clientTitle: 'Apartment Owners, Indiranagar',
      projectCategory: 'Turnkey Luxury Interior Fitout',
      rating: 5,
      text: 'From the initial 3D renderings to the final brass hardware installation, the team demonstrated master-level craftsmanship. The modular kitchen and fluted teak woodwork look straight out of an architectural digest publication.',
    },
    {
      clientName: 'Vikas Narayanan',
      clientTitle: 'Managing Director, Aura Ventures',
      projectCategory: 'Commercial Office Architecture',
      rating: 5,
      text: 'Building a 20,000 sq ft office requires strict adherence to timelines and MEP compliance. Sri Ananda Nilayam delivered on budget and two weeks ahead of schedule. Truly a premier tier-one partner.',
    },
    {
      clientName: 'Priya Shankar',
      clientTitle: 'Homeowner, Koramangala',
      projectCategory: 'Interior Design & Fitout',
      rating: 5,
      text: 'The attention to detail and the quality of materials used were exceptional. Every corner of our home reflects the passion and expertise of the Sri Ananda Nilayam team. We could not be happier.',
    },
    {
      clientName: 'Rajan & Leela Iyer',
      clientTitle: 'Bungalow Owners, Jayanagar',
      projectCategory: 'Luxury Bungalow Construction',
      rating: 5,
      text: "From foundation to finishing, the process was seamless. The team's transparency, craftsmanship, and commitment to timelines were truly commendable. Our dream home is now a reality.",
    },
  ];

  const list = testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials;
  // Triple-clone for infinite loop
  const extended = [...list, ...list, ...list];

  const viewportRef = useRef(null);
  const autoRef    = useRef(null);
  const pausedRef  = useRef(false);
  const idxRef     = useRef(list.length); // current index (ref for interval closure)

  const [cardWidth, setCardWidth]   = useState(0);       // px
  const [offset, setOffset]         = useState(0);        // px translateX
  const [animated, setAnimated]     = useState(false);

  /* ── Compute card width dynamically for mobile, tablet, and desktop ── */
  const computeCardWidth = useCallback(() => {
    if (!viewportRef.current) return 0;
    const vpWidth = viewportRef.current.offsetWidth;
    const visibleCount = vpWidth < 640 ? 1 : vpWidth < 1024 ? 2 : 3;
    return (vpWidth - GAP * (visibleCount - 1)) / visibleCount;
  }, []);

  const pxFor = useCallback((idx, cw) => -(idx * (cw + GAP)), []);

  /* ── Initial setup & resize ── */
  useEffect(() => {
    const init = () => {
      const cw = computeCardWidth();
      setCardWidth(cw);
      setAnimated(false);
      setOffset(pxFor(list.length, cw));
      idxRef.current = list.length;
      // Re-enable animation after a frame
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimated(true)));
    };
    init();
    window.addEventListener('resize', init);
    return () => window.removeEventListener('resize', init);
  }, [computeCardWidth, pxFor, list.length]);

  /* ── Slide ── */
  const slideTo = useCallback((next, cw) => {
    idxRef.current = next;
    setAnimated(true);
    setOffset(pxFor(next, cw ?? computeCardWidth()));
  }, [pxFor, computeCardWidth]);

  /* ── After transition: silently jump to middle copy ── */
  const handleTransitionEnd = useCallback(() => {
    const cur = idxRef.current;
    let next = cur;
    if (cur >= list.length * 2) next = cur - list.length;
    else if (cur < list.length) next = cur + list.length;
    if (next !== cur) {
      idxRef.current = next;
      setAnimated(false);
      setOffset(pxFor(next, computeCardWidth()));
    }
  }, [list.length, pxFor, computeCardWidth]);

  /* ── Auto-play ── */
  useEffect(() => {
    const tick = () => {
      if (!pausedRef.current) slideTo(idxRef.current + 1);
    };
    autoRef.current = setInterval(tick, INTERVAL);
    return () => clearInterval(autoRef.current);
  }, [slideTo]);

  /* ── Manual nav ── */
  const handleNav = (delta) => {
    pausedRef.current = true;
    slideTo(idxRef.current + delta);
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      if (!pausedRef.current) slideTo(idxRef.current + 1);
    }, INTERVAL);
    setTimeout(() => { pausedRef.current = false; }, 4000);
  };

  return (
    <section className="testimonials-root section-padding">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">CLIENT ENDORSEMENTS</span>
          <h2 className="section-title">Words of Trust &amp; Appreciation</h2>
          <p className="section-subtitle">
            Demonstration reflections from patrons who entrusted their residential landmarks and
            corporate spaces to Sri Ananda Nilayam.
          </p>
        </div>

        {/* ── Carousel ── */}
        <div className="tcs-outer">
          <button className="tcs-nav-btn" onClick={() => handleNav(-1)} aria-label="Previous">
            <ChevronLeft size={20} />
          </button>

          {/* Clipping viewport */}
          <div className="tcs-viewport" ref={viewportRef}>
            <div
              className="tcs-track"
              style={{
                transform: `translateX(${offset}px)`,
                transition: animated ? 'transform 0.55s cubic-bezier(0.4,0,0.2,1)' : 'none',
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {cardWidth > 0 && extended.map((item, idx) => (
                <div
                  key={idx}
                  className="tcs-card"
                  style={{ width: cardWidth, minWidth: cardWidth, maxWidth: cardWidth }}
                >
                  {/* Gold left accent bar */}
                  <div className="tcs-bar" />

                  <div className="tcs-body">
                    {/* Opening quote + stars */}
                    <div className="tcs-top-row">
                      <span className="tcs-qq">&#x275D;</span>
                      <div className="tcs-stars">
                        {[...Array(item.rating || 5)].map((_, s) => (
                          <Star key={s} size={14} fill="#F5A623" color="#F5A623" />
                        ))}
                      </div>
                    </div>

                    {/* Quote */}
                    <p className="tcs-text">"{item.text}"</p>

                    {/* Divider */}
                    <div className="tcs-hr" />

                    {/* Author */}
                    <div className="tcs-author">
                      <div className="tcs-avatar">
                        {item.photo
                          ? <img src={item.photo} alt={item.clientName} />
                          : <span>{item.clientName?.charAt(0) || 'C'}</span>
                        }
                      </div>
                      <div className="tcs-meta">
                        <strong className="tcs-name">{item.clientName}</strong>
                        <span className="tcs-role">{item.clientTitle}</span>
                        <span className="tcs-cat">{item.projectCategory}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="tcs-nav-btn" onClick={() => handleNav(1)} aria-label="Next">
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="testimonials-bottom-cta">
          <Link to="/testimonials" className="btn btn-secondary">
            <span>Read All Client Experiences</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <style>{`
        .testimonials-root {
          background: linear-gradient(160deg, #061426 0%, #0b1f36 100%);
        }

        /* Row: [nav] [viewport] [nav] */
        .tcs-outer {
          display: flex;
          align-items: stretch;
          gap: 1rem;
          margin-bottom: 3rem;
        }

        /* Hides overflowing cards */
        .tcs-viewport {
          flex: 1;
          overflow: hidden;
          min-width: 0;
        }

        /* Horizontal strip — widths are set in JS */
        .tcs-track {
          display: flex;
          gap: ${GAP}px;
          will-change: transform;
        }

        /* ── White card ── */
        .tcs-card {
          flex-shrink: 0;
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          flex-direction: row;
          box-shadow: 0 6px 24px rgba(0,0,0,0.14);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .tcs-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 18px 44px rgba(0,0,0,0.22);
        }

        /* Gold left border */
        .tcs-bar {
          width: 5px;
          flex-shrink: 0;
          background: linear-gradient(180deg, #B8761E 0%, #E8C060 50%, #B8761E 100%);
        }

        /* Card inner content */
        .tcs-body {
          padding: 1.4rem 1.35rem 1.2rem;
          display: flex;
          flex-direction: column;
          flex: 1;
          min-width: 0;
        }

        /* Quote mark + stars row */
        .tcs-top-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 0.7rem;
        }

        /* Large decorative opening quote */
        .tcs-qq {
          font-size: 2rem;
          line-height: 1;
          color: #D4920A;
          font-family: Georgia, serif;
          user-select: none;
        }

        .tcs-stars {
          display: flex;
          gap: 0.15rem;
          padding-top: 0.2rem;
        }

        /* Italic quote text — clamped to 5 lines */
        .tcs-text {
          font-size: 0.855rem;
          line-height: 1.78;
          color: #374151;
          font-style: italic;
          flex: 1;
          margin-bottom: 1rem;
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Thin horizontal rule */
        .tcs-hr {
          height: 1px;
          background: #EBEBEB;
          margin-bottom: 0.9rem;
        }

        /* Author */
        .tcs-author {
          display: flex;
          align-items: center;
          gap: 0.7rem;
        }

        /* Gold avatar circle */
        .tcs-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #C9933A 0%, #E8C060 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          overflow: hidden;
          font-weight: 700;
          font-size: 1rem;
          color: #fff;
          box-shadow: 0 2px 8px rgba(201,147,58,0.4);
        }
        .tcs-avatar img { width: 100%; height: 100%; object-fit: cover; }

        .tcs-meta {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }
        .tcs-name {
          font-size: 0.88rem;
          font-weight: 700;
          color: #111827;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .tcs-role {
          font-size: 0.72rem;
          font-weight: 600;
          color: #C9933A;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .tcs-cat {
          font-size: 0.67rem;
          color: #6B7280;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* ── Nav buttons ── */
        .tcs-nav-btn {
          width: 42px;
          height: 42px;
          align-self: center;
          border-radius: 50%;
          border: 2px solid rgba(229,174,63,0.5);
          background: rgba(6,20,38,0.75);
          color: #E5AE3F;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: all 0.25s ease;
          backdrop-filter: blur(4px);
        }
        .tcs-nav-btn:hover {
          background: #C9933A;
          border-color: #C9933A;
          color: #fff;
          transform: scale(1.1);
        }

        @media (max-width: 640px) {
          .tcs-outer {
            gap: 0.4rem;
            margin-bottom: 2rem;
          }
          .tcs-nav-btn {
            width: 32px;
            height: 32px;
          }
          .tcs-card-body {
            padding: 1rem 0.85rem !important;
          }
          .tcs-quote {
            font-size: 0.82rem !important;
            line-height: 1.5 !important;
          }
        }

        .testimonials-bottom-cta { text-align: center; }
      `}</style>
    </section>
  );
}
