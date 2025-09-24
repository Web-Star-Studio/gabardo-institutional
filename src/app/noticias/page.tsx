import { Header } from "@/components/layout/Header";
import Footer from '@/components/layout/Footer';
import NewsHeroSection from '@/components/custom/NewsHeroSection';
import FeaturedNewsSection from '@/components/custom/FeaturedNewsSection';
import NewsGridSection from '@/components/custom/NewsGridSection';
import NewsletterSection from '@/components/custom/NewsletterSection';

export default function NoticiasPage() {
  return (
    <main className="relative bg-neutral-50">
      <Header variant="dark" />
      <NewsHeroSection />
      <FeaturedNewsSection />
      <NewsGridSection />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
