import { Header } from "@/components/layout/Header";
import Footer from '@/components/layout/Footer';
import AboutHeroSection from '@/components/custom/AboutHeroSection';
import AboutStorySection from '@/components/custom/AboutStorySection';
import AboutValuesSection from '@/components/custom/AboutValuesSection';
import AboutStatsSection from '@/components/custom/AboutStatsSection';
import FourPillarsSection from '@/components/custom/FourPillarsSection';
import MapboxSection from '@/components/custom/MapboxSection';

export default function SobrePage() {
  return (
    <main className="relative bg-gray-50">
      <Header variant="dark" />
      <AboutHeroSection />
      <AboutStorySection />
      <FourPillarsSection />
      <AboutValuesSection />
      <AboutStatsSection />
      <MapboxSection />
      <Footer />
    </main>
  );
} 