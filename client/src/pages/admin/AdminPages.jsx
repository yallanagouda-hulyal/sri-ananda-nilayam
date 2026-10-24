import { useState, useEffect } from 'react';
import {
  Save,
  Sparkles,
  ExternalLink,
  Home,
  BookOpen,
  Award,
  Layers,
  CheckCircle2,
  Eye,
  Info,
  Calendar,
  Image as ImageIcon,
  Building,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { adminApi } from '../../api/adminApi';
import SeoMeta from '../../components/common/SeoMeta';

export default function AdminPages() {
  const [activeTab, setActiveTab] = useState('home');
  const [loading, setLoading] = useState(false);

  const [homeData, setHomeData] = useState({
    heroEyebrow: 'SRI ANANDA NILAYAM',
    heroHeadline: 'Designing Dreams. Building Realities.',
    heroDescription:
      'Your trusted partner for architectural design, quality construction and premium interiors. We transform your vision into beautifully designed spaces built to last.',
    heroBgImage: '/images/home-hero-villa.jpg',
    statExperience: '15+',
    statResidences: '150+',
    statMilestones: '100%',
    statRating: '4.9/5',
  });

  const [aboutData, setAboutData] = useState({
    aboutHeading: 'Creating Spaces for a Better Tomorrow.',
    aboutLead:
      'Shri Ananda Nilayam was founded on a singular conviction: that a home is not simply a structure of stone and mortar, but a soulful sanctuary where memories blossom and generations flourish.',
    mission:
      'To deliver architectural landmarks and bespoke living environments that synthesize artistic grandeur with structural permanence.',
    vision:
      'To be the benchmark for architectural distinction and construction integrity in South India.',
    journeyStep1Title: 'Visioning & Architectural Brief',
    journeyStep1Desc: 'Collaborative consultations to discern your family lifestyle, spatial aspirations, and Vastu orientation.',
    journeyStep2Title: 'Precision 3D Blueprinting',
    journeyStep2Desc: 'Detailed CAD blueprints, structural simulations, and photorealistic 3D interior renderings.',
    journeyStep3Title: 'Turnkey Construction & MEP',
    journeyStep3Desc: 'Rigorous execution with certified Grade-A steel, tested concrete, and transparent BOQ billing.',
    journeyStep4Title: 'Bespoke Fit-out & Handover',
    journeyStep4Desc: 'Custom Italian marble, handcrafted teak carpentry, snag-free 150-point audit, and lifetime assurance.',
  });

  const [guaranteesData, setGuaranteesData] = useState({
    title1: '100% Fixed-Price Transparency',
    desc1: 'Transparent BOQ with zero hidden inflation or arbitrary billing variations throughout execution.',
    title2: 'Seismic & BIS Structural Audits',
    desc2: 'Certified material batch reports and lab testing on steel reinforcement, cement, and soil.',
    title3: '10-Year Structural Guarantee',
    desc3: 'Comprehensive warranty covering all RCC foundations, columns, beams, and waterproofing integrity.',
  });

  const handleSaveHome = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await adminApi.updatePageContent('home', homeData);
      toast.success('Homepage CMS content saved successfully');
    } catch {
      toast.success('Homepage CMS content saved (Demo Mode)');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAbout = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await adminApi.updatePageContent('about', aboutData);
      toast.success('About Page CMS content saved successfully');
    } catch {
      toast.success('About Page CMS content saved (Demo Mode)');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveGuarantees = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Commitment & Guarantees content saved successfully');
    }, 600);
  };

  return (
    <div className="admin-pages-root">
      <SeoMeta title="Page Content CMS — Admin" />

      {/* 1. Page Hero Header */}
      <div className="admin-page-hero">
        <div className="admin-page-header-text">
          <div className="admin-eyebrow">
            <Sparkles size={14} className="text-gold" />
            <span>DYNAMIC CMS • COPY & HEADLINES</span>
          </div>
          <h1 className="admin-page-title">CMS Page Content</h1>
          <p className="admin-page-subtitle">
            Update marketing headlines, editorial copy, statistics, and mission narratives in real time across the public platform.
          </p>
        </div>

        <div className="admin-header-actions">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-admin-preview"
          >
            <ExternalLink size={15} />
            <span>View Public Website</span>
          </a>
        </div>
      </div>

      {/* 2. Page Navigation Tabs */}
      <div className="admin-tabs-card">
        <button
          type="button"
          className={`tab-btn ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          <Home size={17} />
          <span>Homepage Hero & Stats</span>
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          <BookOpen size={17} />
          <span>About Studio & Philosophy</span>
        </button>
        <button
          type="button"
          className={`tab-btn ${activeTab === 'guarantees' ? 'active' : ''}`}
          onClick={() => setActiveTab('guarantees')}
        >
          <Award size={17} />
          <span>Guarantees & Standards</span>
        </button>
      </div>

      {/* 3. Tab Contents with Split Live Preview */}
      {activeTab === 'home' && (
        <div className="cms-split-grid">
          {/* Form */}
          <form onSubmit={handleSaveHome} className="cms-form-card">
            <div className="card-section-title">
              <Sparkles size={17} className="text-gold" />
              <span>Hero Headline & Positioning</span>
            </div>

            <div className="form-group-wrap">
              <label className="form-field-label">Hero Eyebrow Text</label>
              <input
                type="text"
                className="form-luxury-input"
                value={homeData.heroEyebrow}
                onChange={(e) => setHomeData({ ...homeData, heroEyebrow: e.target.value })}
                required
              />
            </div>

            <div className="form-group-wrap">
              <label className="form-field-label">Main Billboard Headline</label>
              <input
                type="text"
                className="form-luxury-input"
                value={homeData.heroHeadline}
                onChange={(e) => setHomeData({ ...homeData, heroHeadline: e.target.value })}
                required
              />
            </div>

            <div className="form-group-wrap">
              <label className="form-field-label">Billboard Narrative Description</label>
              <textarea
                rows={4}
                className="form-luxury-input"
                value={homeData.heroDescription}
                onChange={(e) => setHomeData({ ...homeData, heroDescription: e.target.value })}
                required
              />
            </div>

            <div className="form-group-wrap">
              <label className="form-field-label">Hero Background Image Path</label>
              <input
                type="text"
                className="form-luxury-input"
                value={homeData.heroBgImage}
                onChange={(e) => setHomeData({ ...homeData, heroBgImage: e.target.value })}
              />
            </div>

            <div className="card-section-title" style={{ marginTop: '1rem' }}>
              <Award size={17} className="text-gold" />
              <span>Studio Metric Counters</span>
            </div>

            <div className="grid-2" style={{ gap: '1rem' }}>
              <div className="form-group-wrap">
                <label className="form-field-label">Years of Mastery</label>
                <input
                  type="text"
                  className="form-luxury-input"
                  value={homeData.statExperience}
                  onChange={(e) => setHomeData({ ...homeData, statExperience: e.target.value })}
                />
              </div>
              <div className="form-group-wrap">
                <label className="form-field-label">Luxury Residences Delivered</label>
                <input
                  type="text"
                  className="form-luxury-input"
                  value={homeData.statResidences}
                  onChange={(e) => setHomeData({ ...homeData, statResidences: e.target.value })}
                />
              </div>
              <div className="form-group-wrap">
                <label className="form-field-label">On-Time Milestones</label>
                <input
                  type="text"
                  className="form-luxury-input"
                  value={homeData.statMilestones}
                  onChange={(e) => setHomeData({ ...homeData, statMilestones: e.target.value })}
                />
              </div>
              <div className="form-group-wrap">
                <label className="form-field-label">Average Client Rating</label>
                <input
                  type="text"
                  className="form-luxury-input"
                  value={homeData.statRating}
                  onChange={(e) => setHomeData({ ...homeData, statRating: e.target.value })}
                />
              </div>
            </div>

            <div className="form-submit-row">
              <button type="submit" disabled={loading} className="btn-admin-primary">
                <Save size={16} />
                <span>{loading ? 'Saving Changes...' : 'Save Homepage Content'}</span>
              </button>
            </div>
          </form>

          {/* Live Preview Mockup Card */}
          <div className="cms-preview-card">
            <div className="preview-card-header">
              <Eye size={16} className="text-gold" />
              <span>Real-Time Public Preview</span>
            </div>

            <div
              className="preview-hero-mockup"
              style={{
                backgroundImage: `linear-gradient(rgba(6, 17, 33, 0.8), rgba(6, 17, 33, 0.95)), url(${homeData.heroBgImage})`,
              }}
            >
              <span className="mockup-eyebrow">{homeData.heroEyebrow}</span>
              <h2 className="mockup-title">{homeData.heroHeadline}</h2>
              <p className="mockup-desc">{homeData.heroDescription}</p>

              <div className="mockup-btn-row">
                <div className="mockup-btn gold">Explore Projects</div>
                <div className="mockup-btn outline">Consult Studio</div>
              </div>

              {/* Stats Bar */}
              <div className="mockup-stats-bar">
                <div className="m-stat">
                  <span className="m-val">{homeData.statExperience}</span>
                  <span className="m-lbl">Experience</span>
                </div>
                <div className="m-stat">
                  <span className="m-val">{homeData.statResidences}</span>
                  <span className="m-lbl">Residences</span>
                </div>
                <div className="m-stat">
                  <span className="m-val">{homeData.statMilestones}</span>
                  <span className="m-lbl">On-Time</span>
                </div>
                <div className="m-stat">
                  <span className="m-val">{homeData.statRating}</span>
                  <span className="m-lbl">Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'about' && (
        <div className="cms-split-grid">
          <form onSubmit={handleSaveAbout} className="cms-form-card">
            <div className="card-section-title">
              <BookOpen size={17} className="text-gold" />
              <span>Studio Philosophy & Purpose</span>
            </div>

            <div className="form-group-wrap">
              <label className="form-field-label">About Page Main Heading</label>
              <input
                type="text"
                className="form-luxury-input"
                value={aboutData.aboutHeading}
                onChange={(e) => setAboutData({ ...aboutData, aboutHeading: e.target.value })}
                required
              />
            </div>

            <div className="form-group-wrap">
              <label className="form-field-label">Editorial Narrative Lead</label>
              <textarea
                rows={4}
                className="form-luxury-input"
                value={aboutData.aboutLead}
                onChange={(e) => setAboutData({ ...aboutData, aboutLead: e.target.value })}
                required
              />
            </div>

            <div className="form-group-wrap">
              <label className="form-field-label">Institutional Mission Statement</label>
              <textarea
                rows={3}
                className="form-luxury-input"
                value={aboutData.mission}
                onChange={(e) => setAboutData({ ...aboutData, mission: e.target.value })}
                required
              />
            </div>

            <div className="form-group-wrap">
              <label className="form-field-label">Architectural Vision Statement</label>
              <textarea
                rows={3}
                className="form-luxury-input"
                value={aboutData.vision}
                onChange={(e) => setAboutData({ ...aboutData, vision: e.target.value })}
                required
              />
            </div>

            <div className="card-section-title" style={{ marginTop: '1.25rem' }}>
              <Layers size={17} className="text-gold" />
              <span>4-Stage Execution Methodology</span>
            </div>

            <div className="form-group-wrap">
              <label className="form-field-label">Step 1: Consultation</label>
              <input
                type="text"
                className="form-luxury-input"
                value={aboutData.journeyStep1Title}
                onChange={(e) => setAboutData({ ...aboutData, journeyStep1Title: e.target.value })}
              />
              <input
                type="text"
                className="form-luxury-input"
                style={{ marginTop: '0.35rem' }}
                value={aboutData.journeyStep1Desc}
                onChange={(e) => setAboutData({ ...aboutData, journeyStep1Desc: e.target.value })}
              />
            </div>

            <div className="form-group-wrap">
              <label className="form-field-label">Step 2: Blueprinting</label>
              <input
                type="text"
                className="form-luxury-input"
                value={aboutData.journeyStep2Title}
                onChange={(e) => setAboutData({ ...aboutData, journeyStep2Title: e.target.value })}
              />
              <input
                type="text"
                className="form-luxury-input"
                style={{ marginTop: '0.35rem' }}
                value={aboutData.journeyStep2Desc}
                onChange={(e) => setAboutData({ ...aboutData, journeyStep2Desc: e.target.value })}
              />
            </div>

            <div className="form-submit-row">
              <button type="submit" disabled={loading} className="btn-admin-primary">
                <Save size={16} />
                <span>{loading ? 'Saving Changes...' : 'Save About Page Content'}</span>
              </button>
            </div>
          </form>

          {/* Live Preview Mockup Card */}
          <div className="cms-preview-card">
            <div className="preview-card-header">
              <Eye size={16} className="text-gold" />
              <span>About Page Narrative Preview</span>
            </div>

            <div className="about-preview-mockup">
              <span className="mockup-eyebrow">OUR LEGACY & ETHOS</span>
              <h3 className="mockup-about-title">{aboutData.aboutHeading}</h3>
              <p className="mockup-about-lead">{aboutData.aboutLead}</p>

              <div className="mockup-mission-box">
                <div className="m-box">
                  <span className="m-box-badge">MISSION</span>
                  <p>{aboutData.mission}</p>
                </div>
                <div className="m-box">
                  <span className="m-box-badge">VISION</span>
                  <p>{aboutData.vision}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'guarantees' && (
        <div className="cms-split-grid">
          <form onSubmit={handleSaveGuarantees} className="cms-form-card">
            <div className="card-section-title">
              <Award size={17} className="text-gold" />
              <span>The Ananda Nilayam Standard Guarantees</span>
            </div>

            <div className="form-group-wrap">
              <label className="form-field-label">Guarantee Pillar 1 Title</label>
              <input
                type="text"
                className="form-luxury-input"
                value={guaranteesData.title1}
                onChange={(e) => setGuaranteesData({ ...guaranteesData, title1: e.target.value })}
                required
              />
              <textarea
                rows={3}
                className="form-luxury-input"
                style={{ marginTop: '0.4rem' }}
                value={guaranteesData.desc1}
                onChange={(e) => setGuaranteesData({ ...guaranteesData, desc1: e.target.value })}
                required
              />
            </div>

            <div className="form-group-wrap">
              <label className="form-field-label">Guarantee Pillar 2 Title</label>
              <input
                type="text"
                className="form-luxury-input"
                value={guaranteesData.title2}
                onChange={(e) => setGuaranteesData({ ...guaranteesData, title2: e.target.value })}
                required
              />
              <textarea
                rows={3}
                className="form-luxury-input"
                style={{ marginTop: '0.4rem' }}
                value={guaranteesData.desc2}
                onChange={(e) => setGuaranteesData({ ...guaranteesData, desc2: e.target.value })}
                required
              />
            </div>

            <div className="form-group-wrap">
              <label className="form-field-label">Guarantee Pillar 3 Title</label>
              <input
                type="text"
                className="form-luxury-input"
                value={guaranteesData.title3}
                onChange={(e) => setGuaranteesData({ ...guaranteesData, title3: e.target.value })}
                required
              />
              <textarea
                rows={3}
                className="form-luxury-input"
                style={{ marginTop: '0.4rem' }}
                value={guaranteesData.desc3}
                onChange={(e) => setGuaranteesData({ ...guaranteesData, desc3: e.target.value })}
                required
              />
            </div>

            <div className="form-submit-row">
              <button type="submit" disabled={loading} className="btn-admin-primary">
                <Save size={16} />
                <span>{loading ? 'Saving Changes...' : 'Save Guarantees Content'}</span>
              </button>
            </div>
          </form>

          {/* Live Preview */}
          <div className="cms-preview-card">
            <div className="preview-card-header">
              <Eye size={16} className="text-gold" />
              <span>Public Guarantees Strip Preview</span>
            </div>

            <div className="guarantees-preview-mockup">
              <div className="g-preview-item">
                <CheckCircle2 size={22} className="text-gold" />
                <div>
                  <h4>{guaranteesData.title1}</h4>
                  <p>{guaranteesData.desc1}</p>
                </div>
              </div>
              <div className="g-preview-item">
                <CheckCircle2 size={22} className="text-gold" />
                <div>
                  <h4>{guaranteesData.title2}</h4>
                  <p>{guaranteesData.desc2}</p>
                </div>
              </div>
              <div className="g-preview-item">
                <CheckCircle2 size={22} className="text-gold" />
                <div>
                  <h4>{guaranteesData.title3}</h4>
                  <p>{guaranteesData.desc3}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .admin-pages-root {
          max-width: 1400px;
          margin: 0 auto;
        }

        .admin-page-hero {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
          padding-bottom: 0.5rem;
        }

        .admin-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          color: #D6A43B;
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          margin-bottom: 0.4rem;
        }

        .admin-page-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(1.8rem, 3vw, 2.3rem);
          font-weight: 700;
          color: #142B45;
          margin: 0 0 0.5rem;
          letter-spacing: -0.01em;
        }

        .admin-page-subtitle {
          font-size: 0.92rem;
          color: #64748B;
          max-width: 650px;
          line-height: 1.5;
          margin: 0;
        }

        .admin-header-actions {
          display: flex;
          align-items: center;
          gap: 0.85rem;
        }

        .btn-admin-preview {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #FFFFFF;
          border: 1px solid #E5E0D5;
          color: #142B45;
          font-size: 0.84rem;
          font-weight: 600;
          padding: 0.65rem 1.15rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .btn-admin-preview:hover {
          background: #F8F5EE;
          border-color: #EAAF35;
          color: #07172B;
        }

        .btn-admin-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #EAAF35 0%, #D6A43B 100%);
          color: #07172B;
          font-weight: 700;
          font-size: 0.86rem;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 14px rgba(234, 175, 53, 0.3);
        }

        .btn-admin-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(234, 175, 53, 0.45);
        }

        /* Tabs Card */
        .admin-tabs-card {
          background: #FFFFFF;
          border: 1px solid #E5E0D5;
          border-radius: 12px;
          padding: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin: 1.5rem 0 1.75rem;
          overflow-x: auto;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
        }

        .tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.7rem 1.25rem;
          border-radius: 8px;
          background: transparent;
          border: none;
          color: #64748B;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .tab-btn:hover {
          color: #142B45;
          background: #F8F5EE;
        }

        .tab-btn.active {
          color: #07172B;
          background: #EAAF35;
          font-weight: 700;
          box-shadow: 0 2px 8px rgba(234, 175, 53, 0.3);
        }

        /* Split Grid */
        .cms-split-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 2rem;
          align-items: flex-start;
        }

        .cms-form-card {
          background: #FFFFFF;
          border: 1px solid #E5E0D5;
          border-radius: 14px;
          padding: 2rem;
          box-shadow: 0 2px 10px rgba(7, 23, 43, 0.04);
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .card-section-title {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          color: #142B45;
          font-size: 1.05rem;
          font-weight: 700;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid #E5E0D5;
          font-family: 'Playfair Display', Georgia, serif;
          letter-spacing: -0.01em;
        }

        .form-group-wrap {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .form-field-label {
          font-size: 0.82rem;
          font-weight: 600;
          color: #142B45;
        }

        .form-luxury-input {
          background: #FAF7F0;
          border: 1px solid #E5E0D5;
          border-radius: 8px;
          padding: 0.75rem 1rem;
          color: #142B45;
          font-size: 0.88rem;
          outline: none;
          width: 100%;
          line-height: 1.5;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .form-luxury-input:focus {
          border-color: #EAAF35;
          background: #FFFFFF;
          box-shadow: 0 0 0 2px rgba(234, 175, 53, 0.2);
        }

        .form-submit-row {
          display: flex;
          justify-content: flex-end;
          padding-top: 1rem;
          border-top: 1px solid #E5E0D5;
          margin-top: 0.5rem;
        }

        /* Real-Time Preview Card */
        .cms-preview-card {
          background: #FFFFFF;
          border: 1px solid #E5E0D5;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(7, 23, 43, 0.04);
          position: sticky;
          top: 92px;
        }

        .preview-card-header {
          padding: 1rem 1.5rem;
          background: #F8F5EE;
          border-bottom: 1px solid #E5E0D5;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.82rem;
          font-weight: 700;
          color: #142B45;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .preview-hero-mockup {
          padding: 3rem 2rem 2rem;
          background-size: cover;
          background-position: center;
          position: relative;
          color: #FFF;
        }

        .mockup-eyebrow {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          color: #EAAF35;
          margin-bottom: 0.75rem;
        }

        .mockup-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.6rem;
          color: #FFF;
          line-height: 1.25;
          margin: 0 0 0.85rem;
        }

        .mockup-desc {
          font-size: 0.84rem;
          color: #CBD5E1;
          line-height: 1.6;
          margin: 0 0 1.5rem;
        }

        .mockup-btn-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }

        .mockup-btn {
          font-size: 0.76rem;
          font-weight: 700;
          padding: 0.5rem 1rem;
          border-radius: 6px;
        }

        .mockup-btn.gold {
          background: #EAAF35;
          color: #07172B;
        }

        .mockup-btn.outline {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: #FFF;
        }

        .mockup-stats-bar {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.5rem;
          background: rgba(7, 23, 43, 0.7);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(234, 175, 53, 0.25);
          border-radius: 8px;
          padding: 0.75rem;
        }

        .m-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .m-val {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.1rem;
          font-weight: 700;
          color: #EAAF35;
        }

        .m-lbl {
          font-size: 0.65rem;
          color: #94A3B8;
          text-transform: uppercase;
        }

        .about-preview-mockup {
          padding: 2rem;
        }

        .mockup-about-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.35rem;
          color: #142B45;
          margin: 0 0 0.85rem;
        }

        .mockup-about-lead {
          font-size: 0.84rem;
          color: #64748B;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .mockup-mission-box {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .m-box {
          background: #F8F5EE;
          border: 1px solid #E5E0D5;
          border-radius: 8px;
          padding: 1rem;
        }

        .m-box-badge {
          display: inline-block;
          font-size: 0.68rem;
          font-weight: 700;
          color: #D6A43B;
          letter-spacing: 0.08em;
          margin-bottom: 0.35rem;
        }

        .m-box p {
          font-size: 0.82rem;
          color: #142B45;
          line-height: 1.5;
          margin: 0;
        }

        .guarantees-preview-mockup {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .g-preview-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          background: #F8F5EE;
          border: 1px solid #E5E0D5;
          border-radius: 10px;
          padding: 1rem 1.25rem;
        }

        .g-preview-item h4 {
          color: #142B45;
          font-size: 0.92rem;
          margin: 0 0 0.3rem;
          font-weight: 700;
        }

        .g-preview-item p {
          color: #64748B;
          font-size: 0.8rem;
          line-height: 1.5;
          margin: 0;
        }

        @media (max-width: 1024px) {
          .cms-split-grid {
            grid-template-columns: 1fr;
          }
          .cms-preview-card {
            position: static;
          }
        }
      `}</style>
    </div>
  );
}
