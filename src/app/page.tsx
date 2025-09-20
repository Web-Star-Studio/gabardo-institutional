import { Header } from "@/components/layout/Header"; // Assuming @ is configured for src path
import HeroSection from "@/components/custom/HeroSection";
import { cityData, City } from "@/data/cityData"; // CategoryImage type might not be needed here anymore
import CategoryImageViewer from "@/components/custom/CategoryImageViewer"; // Import the new component
import PremiumInfoSection from "@/components/custom/PremiumInfoSection";
// import InfiniteHorizontalGallery from "@/components/custom/InfiniteHorizontalGallery"; // Old import
import InfiniteMasonryGallery from "@/components/custom/InfiniteMasonryGallery"; // New import
import JSLInspiredServicesSection from "@/components/custom/JSLInspiredServicesSection";
import MapboxSection from "@/components/custom/MapboxSection"; // Added import
import CompaniesStatsSection from '@/components/custom/CompaniesStatsSection';
import BlogSection from '@/components/custom/BlogSection';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <main className="relative">
      <Header />
      <HeroSection />
      <JSLInspiredServicesSection />
      <PremiumInfoSection />
      <CompaniesStatsSection />
      <BlogSection />
      <MapboxSection />
      <Footer />
    </main>
  );
}
