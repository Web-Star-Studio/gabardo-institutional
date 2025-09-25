
import { Header } from "@/components/layout/Header";
import Footer from '@/components/layout/Footer';
import SustainabilityHeroSection from '@/components/custom/SustainabilityHeroSection';
import SustainabilityCommitmentSection from '@/components/custom/SustainabilityCommitmentSection';
import SustainabilityPillarsSection from '@/components/custom/SustainabilityPillarsSection';
import SustainabilityReportSection from '@/components/custom/SustainabilityReportSection';
import SustainabilityGallerySection from '@/components/custom/SustainabilityGallerySection';
import MapboxSection from "@/components/custom/MapboxSection";

export default function SustentabilidadePage() {
  return (
    <main className="relative bg-gray-50">
      <Header variant="dark" />
      <SustainabilityHeroSection />
      <SustainabilityCommitmentSection />
      <SustainabilityPillarsSection />
      <SustainabilityReportSection />
      <SustainabilityGallerySection />
      <MapboxSection />
      <Footer />
    </main>
  );
}
