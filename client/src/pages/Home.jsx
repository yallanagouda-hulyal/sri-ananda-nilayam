import SeoMeta from '../components/common/SeoMeta';
import HeroSection from '../components/home/HeroSection';
import StatsSection from '../components/home/StatsSection';
import FeaturedServices from '../components/home/FeaturedServices';
import AboutPreview from '../components/home/AboutPreview';
import FeaturedProjects from '../components/home/FeaturedProjects';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CtaConsultation from '../components/home/CtaConsultation';

export default function Home() {
  return (
    <div className="home-page">
      <SeoMeta
        title="Home"
        description="Shri Ananda Nilayam — Bespoke architectural design, quality construction and premium interiors in Bengaluru. Crafted for generations."
        canonicalUrl="/"
      />
      <HeroSection />
      <StatsSection />
      <FeaturedServices />
      <AboutPreview />
      <FeaturedProjects />
      <TestimonialsSection />
      <CtaConsultation />
    </div>
  );
}
