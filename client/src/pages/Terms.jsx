import PageBanner from '../components/common/PageBanner';
import SeoMeta from '../components/common/SeoMeta';
import { useSite } from '../context/SiteContext';

export default function Terms() {
  const { settings } = useSite();

  return (
    <div className="legal-page">
      <SeoMeta
        title="Terms & Conditions"
        description="Terms and conditions governing architectural, civil construction, and interior design contracts with Shri Ananda Nilayam."
        canonicalUrl="/terms"
      />

      <PageBanner
        eyebrow="LEGAL & DISCLOSURES"
        title="Terms & Conditions"
        subtitle="Operational terms, architectural intellectual property rights, and engagement protocols."
        bgImage="/images/hero-villa.jpg"
        breadcrumbs={[{ name: 'Terms & Conditions' }]}
      />

      <section className="section-padding">
        <div className="container container-narrow">
          <div className="legal-card glass-card">
            <span className="last-updated">Last Updated: October 2026</span>

            <h3>1. Scope of Engagement</h3>
            <p>
              Welcome to the digital portal of <strong>{settings.companyName || 'Shri Ananda Nilayam'}</strong>. By browsing this website or scheduling an architectural, construction, or interior consultation, you agree to adhere to these terms and conditions.
            </p>

            <h3>2. Architectural Proposals & Bill of Quantities (BOQ)</h3>
            <p>
              Preliminary designs, conceptual renders, and rough cost estimates shared during initial discovery meetings are exploratory. A legally binding commitment arises only upon mutual execution of a formal Construction Agreement or Architectural Contract detailing fixed milestone schedules, technical specifications, and escrow payment terms.
            </p>

            <h3>3. Intellectual Property of Designs & Blueprints</h3>
            <p>
              All 2D drawings, 3D renderings, structural layouts, BIM files, and bespoke joinery details created by Shri Ananda Nilayam remain the intellectual property of the firm until final project settlement as stipulated in the client contract. Unauthorized replication or submission of our proprietary drawings to unauthorized third-party contractors is strictly prohibited.
            </p>

            <h3>4. Site Access & Regulatory Sanctions</h3>
            <p>
              Clients must provide unobstructed legal possession and verified title documentation of the plot before civil excavation or structural modification commences. Shri Ananda Nilayam assists in preparing sanction plans in strict compliance with municipal bylaws and IS codes.
            </p>

            <h3>5. Structural Warranties & Handover</h3>
            <p>
              Our 10-year structural guarantee applies to load-bearing RCC elements executed directly under our turnkey stewardship using approved Grade-A materials. Wear-and-tear items, paint weathering, and client-directed post-possession structural alterations are governed by standard maintenance guidelines provided in the handover dossier.
            </p>

            <h3>6. Governing Law & Jurisdiction</h3>
            <p>
              Any disputes or legal proceedings arising in connection with services rendered shall be governed exclusively by the laws of India and subject to the jurisdiction of the competent courts in Bengaluru, Karnataka.
            </p>

            <p className="legal-contact-box">
              For contract clarifications, please contact:<br />
              <strong>{settings.companyName || 'Shri Ananda Nilayam'}</strong><br />
              Email: {settings.email || 'info@srianandaniyam.example'}<br />
              Studio Phone: {settings.phone || '+91 98765 43210'}
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

        .legal-card p {
          color: var(--color-slate-light);
          line-height: 1.8;
          margin-bottom: 1.25rem;
          font-size: 0.95rem;
        }

        .legal-contact-box {
          background: rgba(10, 27, 51, 0.6);
          border: 1px solid rgba(214, 164, 59, 0.25);
          padding: 1.5rem;
          border-radius: var(--radius-sm);
          color: #FFF !important;
          margin-top: 2rem;
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
