import { Header } from "@/components/layout/Header";
import Footer from '@/components/layout/Footer';
import ContactHeroSection from '@/components/custom/ContactHeroSection';
import ContactFormSection from '@/components/custom/ContactFormSection';
import ContactInfoSection from '@/components/custom/ContactInfoSection';
import MapboxSection from '@/components/custom/MapboxSection';

export default function ContatoPage() {
  return (
    <main className="relative bg-gray-50">
      <Header variant="dark" />
      <ContactHeroSection />
      <ContactFormSection />
      <ContactInfoSection />
      <MapboxSection />
      <Footer />
    </main>
  );
}