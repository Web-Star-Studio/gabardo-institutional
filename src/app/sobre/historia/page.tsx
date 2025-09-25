import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SobreHistoriaHeroSection from '@/components/custom/SobreHistoriaHeroSection';
import SobreHistoriaTimelineSection from '@/components/custom/SobreHistoriaTimelineSection';
import SobreHistoriaCTASection from '@/components/custom/SobreHistoriaCTASection';

export default function SobreHistoriaPage() {
  return (
    <main className="relative bg-gray-50">
      <Header variant="dark" />
      <SobreHistoriaHeroSection />
      <SobreHistoriaTimelineSection />
      <SobreHistoriaCTASection />
      <Footer />
    </main>
  );
}
