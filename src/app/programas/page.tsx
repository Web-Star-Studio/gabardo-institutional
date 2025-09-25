import { Header } from "@/components/layout/Header";
import Footer from '@/components/layout/Footer';

export default function ProgramasPage() {
  return (
    <main className="relative bg-gray-50">
      <Header variant="dark" />
      <div className="container mx-auto px-4 md:px-8 lg:px-16 py-32 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-tight text-gray-800">Programas</h1>
        <p className="mt-4 text-lg text-gray-600">Esta página está em construção. Por favor, forneça o conteúdo para esta página.</p>
      </div>
      <Footer />
    </main>
  );
}
