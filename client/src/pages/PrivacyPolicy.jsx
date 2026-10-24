import PageBanner from '../components/common/PageBanner';
import SeoMeta from '../components/common/SeoMeta';
import { useSite } from '../context/SiteContext';

export default function PrivacyPolicy() {
  const { settings } = useSite();

  return (
    <div className="legal-page">
      <SeoMeta
        title="Privacy Policy"
        description="Privacy policy and data protection disclosures for Shri Ananda Nilayam."
        canonicalUrl="/privacy-policy"
      />

      <PageBanner
        eyebrow="LEGAL & DISCLOSURES"
        title="Privacy Policy"
        subtitle="Our commitment to safeguarding your private consultations and architectural blueprints."
        bgImage="/images/service-design.jpg"
        breadcrumbs={[{ name: 'Privacy Policy' }]}
      />

      <section className="section-padding">
        <div className="container container-narrow">
          <div className="legal-card glass-card">
            <span className="last-updated">Last Updated: October 2026</span>

            <h3>1. Introduction & Overview</h3>
            <p>
              At <strong>{settings.companyName || 'Shri Ananda Nilayam'}</strong> ("we", "our", or "us"), we respect your privacy and are committed to protecting personal identifiable information and architectural project specifications that you share with us.
            </p>

            <h3>2. Information We Collect</h3>
            <p>
              We collect information that you directly provide when inquiring about our architectural, construction, or interior design services through our website contact forms, WhatsApp messaging, phone calls, or studio consultations:
            </p>
            <ul>
              <li>Contact details: Full Name, Email Address, Phone Number, and Mailing Address.</li>
              <li>Project details: Plot dimensions, site location, proposed budget, and spatial preferences.</li>
              <li>Communication history and notes logged during design consultations.</li>
            </ul>

            <h3>3. Use of Information</h3>
            <p>
              The information we gather is used strictly for:
            </p>
            <ul>
              <li>Evaluating site viability, preparing preliminary architectural feasibility, and responding to your enquiries.</li>
              <li>Formulating accurate, itemized Bill of Quantities (BOQ) and architectural concept proposals.</li>
              <li>Transmitting milestone updates, material certificates, and project progress documentation.</li>
              <li>Internal administration, customer support, and continuous service refinement.</li>
            </ul>

            <h3>4. Confidentiality of Blueprints & Data Protection</h3>
            <p>
              All proprietary architectural floor plans, 3D renderings, and structural engineering calculations prepared for your property are treated with rigorous professional confidentiality. We never monetize, sell, or disclose your personal contact information to third-party marketing entities.
            </p>

            <h3>5. Cookies & Analytics</h3>
            <p>
              Our website uses minimal, non-intrusive cookies to preserve session continuity, track page performance, and enhance navigational responsiveness. You may adjust your browser preferences to disable non-essential cookies at any time.
            </p>

            <h3>6. Contacting Our Data Desk</h3>
            <p>
              If you have any questions regarding this Privacy Policy or wish to modify any previously submitted details, please reach our administrative team at:
            </p>
            <p className="legal-contact-box">
              <strong>{settings.companyName || 'Shri Ananda Nilayam'}</strong><br />
              Email: {settings.email || 'info@srianandaniyam.example'}<br />
              Phone: {settings.phone || '+91 98765 43210'}<br />
              Address: {settings.address || '123 Main Road, Bengaluru, Karnataka 560001'}
            </p>
          </div>
        </div>
      </section>

      <style>{`
        .legal-card {
          padding: 3rem;
        }

        .last-updated {
          display: inline-block;
          font-size: 0.85rem;
          color: var(--color-gold);
          margin-bottom: 2rem;
          font-weight: 600;
        }

        .legal-card h3 {
          color: #FFF;
          margin: 2rem 0 1rem 0;
          font-size: 1.35rem;
        }

        .legal-card p, .legal-card ul {
          color: var(--color-slate-light);
          line-height: 1.8;
          margin-bottom: 1.25rem;
          font-size: 0.95rem;
        }

        .legal-card ul {
          padding-left: 1.5rem;
        }

        .legal-card li {
          margin-bottom: 0.5rem;
        }

        .legal-contact-box {
          background: rgba(10, 27, 51, 0.6);
          border: 1px solid rgba(214, 164, 59, 0.25);
          padding: 1.5rem;
          border-radius: var(--radius-sm);
          color: #FFF !important;
        }

        @media (max-width: 768px) {
          .legal-card {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
