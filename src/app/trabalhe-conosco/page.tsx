import { Header } from "@/components/layout/Header";
import Footer from '@/components/layout/Footer';
import TrabalheConoscoHeroSection from '@/components/custom/TrabalheConoscoHeroSection';
import TrabalheConoscoIntroSection from '@/components/custom/TrabalheConoscoIntroSection';
import TrabalheConoscoBenefitsSection from '@/components/custom/TrabalheConoscoBenefitsSection';
import TrabalheConoscoTestimonialsSection from '@/components/custom/TrabalheConoscoTestimonialsSection';
import TrabalheConoscoCTASection from '@/components/custom/TrabalheConoscoCTASection';

export default function TrabalheConoscoPage() {
  return (
    <main className="relative bg-gray-50">
      <Header variant="dark" />
      <TrabalheConoscoHeroSection />
      <TrabalheConoscoIntroSection />
      <TrabalheConoscoBenefitsSection />
      <TrabalheConoscoTestimonialsSection />
      <TrabalheConoscoCTASection />
      <Footer />
    </main>
  );
}
