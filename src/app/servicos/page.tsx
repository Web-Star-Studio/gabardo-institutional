import { Header } from "@/components/layout/Header";
import Footer from '@/components/layout/Footer';
import ServicesHeroSection from '@/components/custom/ServicesHeroSection';
import ServicesOverviewSection from '@/components/custom/ServicesOverviewSection';
import ServicesFeaturesSection from '@/components/custom/ServicesFeaturesSection';
import ServicesAdvantagesSection from '@/components/custom/ServicesAdvantagesSection';
import ServicesQuoteSection from '@/components/custom/ServicesQuoteSection';
import ServicesFleetSection from '@/components/custom/ServicesFleetSection';

export default function ServicosPage() {
  return (
    <main className="relative bg-gray-50">
      <Header variant="dark" />
      <ServicesHeroSection />
      <ServicesOverviewSection />
      <ServicesFleetSection />
      <ServicesFeaturesSection />
      <ServicesAdvantagesSection />
      <ServicesQuoteSection />
      <Footer />
    </main>
  );
}
