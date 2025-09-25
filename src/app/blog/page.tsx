import { Header } from "@/components/layout/Header";
import Footer from '@/components/layout/Footer';
import BlogHeroSection from '@/components/custom/BlogHeroSection';
import BlogSection from '@/components/custom/BlogSection';
import NewsletterSection from '@/components/custom/NewsletterSection';

export default function BlogPage() {
  return (
    <main className="relative bg-neutral-50">
      <Header variant="dark" />
      <BlogHeroSection />
      <BlogSection />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
