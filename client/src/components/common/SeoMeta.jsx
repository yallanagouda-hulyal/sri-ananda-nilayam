import { Helmet } from 'react-helmet-async';
import { useSite } from '../../context/SiteContext';

export default function SeoMeta({
  title,
  description,
  keywords,
  ogImage = '/images/hero-villa.jpg',
  canonicalUrl,
}) {
  const { settings } = useSite();
  const siteTitle = settings.companyName || 'Shri Ananda Nilayam';
  const fullTitle = title ? `${title} | ${siteTitle}` : `${siteTitle} — Design | Construction | Interiors`;
  const defaultDesc =
    description ||
    'Premier architectural design, luxury residential and commercial construction, and bespoke turnkey interiors in Bengaluru.';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={defaultDesc} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={defaultDesc} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={defaultDesc} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
