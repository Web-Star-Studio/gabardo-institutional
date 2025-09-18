import { Header } from "@/components/layout/Header";
import Footer from '@/components/layout/Footer';
import ContactHeroSection from '@/components/custom/ContactHeroSection';
import ContactFormSection from '@/components/custom/ContactFormSection';
import ContactInfoSection from '@/components/custom/ContactInfoSection';
import ContactMapSection from '@/components/custom/ContactMapSection';

export default function ContatoPage() {
  return (
    <main className="relative">
      <Header />
      <ContactHeroSection />
      <ContactFormSection />
      <ContactInfoSection />
      <ContactMapSection />
      <Footer />
    </main>
  );
} 