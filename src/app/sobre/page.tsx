import { Header } from "@/components/layout/Header";
import Footer from '@/components/layout/Footer';
import AboutHeroSection from '@/components/custom/AboutHeroSection';
import AboutStorySection from '@/components/custom/AboutStorySection';
import AboutValuesSection from '@/components/custom/AboutValuesSection';
import AboutClientsSection from '@/components/custom/AboutClientsSection';
import AboutCulturaSection from '@/components/custom/AboutCulturaSection';
import AboutMissionSection from '@/components/custom/AboutMissionSection';
import AboutStatsSection from '@/components/custom/AboutStatsSection';
import MapboxSection from '@/components/custom/MapboxSection';

export default function SobrePage() {
  return (
    <main className="relative bg-gray-50">
      <Header variant="dark" />
      <AboutHeroSection />
      <AboutStorySection />
      <AboutMissionSection />
      <AboutValuesSection />
      <AboutCulturaSection />
      <AboutClientsSection />
      <AboutStatsSection />
      <MapboxSection />
      <Footer />
    </main>
  );
}