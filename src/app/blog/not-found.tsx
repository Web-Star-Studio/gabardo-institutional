import Link from 'next/link';
import { ArrowLeft, FileX } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function BlogNotFound() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Header />
      
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-white/2 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-white/2 to-transparent" />
      </div>

      <main className="relative z-10 pt-24 md:pt-32 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 md:px-8 lg:px-16 text-center">
          
          {/* Icon */}
          <div className="text-6xl md:text-8xl text-white/20 mb-8">
            <FileX className="w-24 h-24 mx-auto" />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white/40">ARTIGO</span>
            <br />
            <span>NÃO ENCONTRADO</span>
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-2xl mx-auto">
            O artigo que você está procurando não existe ou foi removido.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/blog"
              className="inline-flex items-center space-x-2 bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-white/90 transition-all duration-300"
            >
              <span>Ver todos os artigos</span>
            </Link>
            
            <Link 
              href="/"
              className="inline-flex items-center space-x-2 bg-white/10 text-white px-8 py-4 rounded-full font-medium hover:bg-white/20 transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar ao início</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 