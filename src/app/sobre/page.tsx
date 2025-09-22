import { Header } from "@/components/layout/Header";
import Footer from '@/components/layout/Footer';
import AboutHeroSection from '@/components/custom/AboutHeroSection';
import AboutStorySection from '@/components/custom/AboutStorySection';
import AboutValuesSection from '@/components/custom/AboutValuesSection';
import VideoSection from '@/components/custom/VideoSection';
import AboutMissionSection from '@/components/custom/AboutMissionSection';
import AboutStatsSection from '@/components/custom/AboutStatsSection';
import FourPillarsSection from '@/components/custom/FourPillarsSection';
import MapboxSection from '@/components/custom/MapboxSection';

export default function SobrePage() {
  return (
    <main className="relative bg-gray-50">
      <Header variant="dark" />
      <AboutHeroSection />
      <AboutStorySection />
      <AboutMissionSection />
      <FourPillarsSection />
      <AboutValuesSection />
      <AboutStatsSection />
      <VideoSection 
        vimeoId="376258884"
        title="Conheça o Hub Plural"
        description="Descubra como transformamos espaços em experiências únicas de trabalho colaborativo e inovação"
      />
      <MapboxSection />
      <Footer />
    </main>
  );
} 