import { Header } from "@/components/layout/Header"; // Assuming @ is configured for src path
import HeroSection from "@/components/custom/HeroSection";
import { cityData, City } from "@/data/cityData"; // CategoryImage type might not be needed here anymore
import CategoryImageViewer from "@/components/custom/CategoryImageViewer"; // Import the new component
import ImageCarouselSection from "@/components/custom/ImageCarouselSection";
// import InfiniteHorizontalGallery from "@/components/custom/InfiniteHorizontalGallery"; // Old import
import InfiniteMasonryGallery from "@/components/custom/InfiniteMasonryGallery"; // New import
import ProjectGallery from "@/components/custom/ProjectGallery"; // Added import
import TestimonialsSection from "@/components/custom/TestimonialsSection";
import ServicesSection from "@/components/custom/ServicesSection"; // Added import
import MapboxSection from "@/components/custom/MapboxSection"; // Added import
import FiscalAddressSection from '@/components/custom/FiscalAddressSection';
import CompaniesStatsSection from '@/components/custom/CompaniesStatsSection';
import BlogSection from '@/components/custom/BlogSection';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <main className="relative">
      <Header />
      <HeroSection />
      <ServicesSection />
      <ProjectGallery />
      <TestimonialsSection />
      <FiscalAddressSection />
      <CompaniesStatsSection />
      <BlogSection />
      <MapboxSection />
      <Footer />
    </main>
  );
}
