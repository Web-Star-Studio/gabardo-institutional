import { Header } from "@/components/layout/Header";
import HeroSection from "@/components/custom/HeroSection";
import PremiumInfoSection from "@/components/custom/PremiumInfoSection";
import JSLInspiredServicesSection from "@/components/custom/JSLInspiredServicesSection";
import MapboxSection from "@/components/custom/MapboxSection";
import CompaniesStatsSection from '@/components/custom/CompaniesStatsSection';
import StatsSection from '@/components/custom/StatsSection';
import Footer from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <main className="relative">
      <Header />
      <HeroSection />
      <JSLInspiredServicesSection />
      <PremiumInfoSection />
      <StatsSection />
      <CompaniesStatsSection />
      <MapboxSection />
      <Footer />
    </main>
  );
}
