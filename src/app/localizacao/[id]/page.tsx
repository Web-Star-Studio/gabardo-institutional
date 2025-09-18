import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import LocationDetailHero from '@/components/custom/LocationDetailHero';
import LocationDetailAbout from '@/components/custom/LocationDetailAbout';
import LocationDetailFloorplan from '@/components/custom/LocationDetailFloorplan';
import LocationDetailGallery from '@/components/custom/LocationDetailGallery';
import LocationDetailServices from '@/components/custom/LocationDetailServices';
import LocationDetailAdvantages from '@/components/custom/LocationDetailAdvantages';
import LocationDetailTestimonial from '@/components/custom/LocationDetailTestimonial';
import LocationDetailTransform from '@/components/custom/LocationDetailTransform';
import LocationDetailContact from '@/components/custom/LocationDetailContact';
import LocationDetailMap from '@/components/custom/LocationDetailMap';

// Dados detalhados das localizações
const locationDetails = {
  'recife-antigo': {
    id: 'recife-antigo',
    name: 'Recife Antigo',
    city: 'Recife',
    state: 'PE',
    fullName: 'Hub Plural Recife Antigo',
    tagline: 'onde tudo começou',
    subtitle: 'Nossa matriz histórica no coração cultural da cidade',
    type: 'matriz',
    hero: {
      image: '/images/locations/recife-antigo-hero.jpg',
      description: 'Localizada no histórico bairro do Recife Antigo, nossa matriz combina tradição e inovação em um espaço único que respira história e cultura.',
      highlights: ['Matriz Principal', 'Centro Histórico', 'Tradição & Inovação']
    },
    about: {
      title: 'Porto Digital entende',
      description: 'Descubra o novo jeito de trabalhar. Perto do que importa, o Hub Plural Recife Antigo oferece uma experiência única no coração do Porto Digital.',
      features: [
        'Localização privilegiada no Porto Digital',
        'Ambiente histórico revitalizado',
        'Proximidade com startups e empresas de tecnologia',
        'Acesso fácil ao transporte público'
      ],
      image: '/images/locations/recife-antigo-about.jpg'
    },
    floorplan: {
      title: 'Hub Plural Recife Antigo',
      areas: [
        { name: 'Recepção', size: '25m²' },
        { name: 'Coworking', size: '120m²' },
        { name: 'Salas privadas', size: '80m²' },
        { name: 'Sala de reunião', size: '35m²' },
        { name: 'Copa/Cozinha', size: '20m²' },
        { name: 'Terraço', size: '40m²' }
      ],
      totalArea: '320m²',
      capacity: '45 pessoas'
    },
    gallery: [
      '/images/gallery/recife-antigo-1.jpg',
      '/images/gallery/recife-antigo-2.jpg',
      '/images/gallery/recife-antigo-3.jpg',
      '/images/gallery/recife-antigo-4.jpg',
      '/images/gallery/recife-antigo-5.jpg'
    ],
    services: [
      { icon: '🏢', title: 'Direção Geral', description: 'Sede administrativa principal' },
      { icon: '💻', title: 'Coworking', description: 'Espaços compartilhados modernos' },
      { icon: '🤝', title: 'Salas de Reunião', description: 'Ambientes para encontros corporativos' },
      { icon: '☕', title: 'Coffee Break', description: 'Área de descanso e networking' },
      { icon: '📶', title: 'Internet Fibra', description: 'Conexão de alta velocidade' },
      { icon: '🅿️', title: 'Estacionamento', description: 'Vagas disponíveis próximas' }
    ],
    advantages: [
      {
        title: 'Localização Estratégica',
        description: 'No coração do Porto Digital, próximo a empresas de tecnologia e startups.',
        icon: '📍'
      },
      {
        title: 'Patrimônio Histórico',
        description: 'Edifício histórico revitalizado que combina charme e funcionalidade.',
        icon: '🏛️'
      },
      {
        title: 'Networking Premium',
        description: 'Ambiente propício para conexões e parcerias estratégicas.',
        icon: '🤝'
      }
    ],
    testimonial: {
      text: 'O Hub Plural Recife Antigo oferece uma experiência única de trabalho. A localização no Porto Digital e a atmosfera histórica criam um ambiente inspirador para nossos projetos.',
      author: 'Carlos Gonzales',
      role: 'CEO, TechStart',
      avatar: '/images/avatars/carlos.jpg'
    },
    transform: {
      title: 'Transforme sua experiência de trabalho',
      description: 'Descubra um novo jeito de trabalhar no coração histórico do Recife. Nossa matriz oferece toda a infraestrutura que você precisa em um ambiente único e inspirador.',
      benefits: [
        'Ambiente histórico revitalizado',
        'Infraestrutura completa',
        'Proximidade com o ecossistema de inovação',
        'Flexibilidade de planos'
      ],
      image: '/images/locations/recife-antigo-transform.jpg'
    },
    contact: {
      address: 'Rua do Bom Jesus, 159 - Recife Antigo, Recife - PE',
      phone: '(81) 3333-7777',
      email: 'matriz@plural.com',
      hours: 'Seg - Sex: 8h às 18h',
      coordinates: [-34.8711, -8.0631]
    }
  },
  'aflitos': {
    id: 'aflitos',
    name: 'Aflitos',
    city: 'Recife',
    state: 'PE',
    fullName: 'Hub Plural Aflitos',
    tagline: 'nossa sede completa',
    subtitle: 'Estrutura moderna e completa para seu crescimento',
    type: 'sede',
    hero: {
      image: '/images/locations/aflitos-hero.jpg',
      description: 'Nossa unidade sede com estrutura completa e equipe especializada para atender todas as suas necessidades.',
      highlights: ['Sede Principal', 'Estrutura Completa', 'Equipe Especializada']
    },
    about: {
      title: 'Aflitos conecta',
      description: 'Localizada no coração dos Aflitos, nossa sede oferece toda a infraestrutura necessária para o seu negócio prosperar.',
      features: [
        'Localização central e acessível',
        'Infraestrutura completa',
        'Equipe especializada',
        'Ambiente moderno e funcional'
      ],
      image: '/images/locations/aflitos-about.jpg'
    },
    floorplan: {
      title: 'Hub Plural Aflitos',
      areas: [
        { name: 'Recepção', size: '30m²' },
        { name: 'Coworking', size: '150m²' },
        { name: 'Salas privadas', size: '100m²' },
        { name: 'Salas de reunião', size: '50m²' },
        { name: 'Copa/Cozinha', size: '25m²' },
        { name: 'Área de descanso', size: '35m²' }
      ],
      totalArea: '390m²',
      capacity: '55 pessoas'
    },
    gallery: [
      '/images/gallery/aflitos-1.jpg',
      '/images/gallery/aflitos-2.jpg',
      '/images/gallery/aflitos-3.jpg',
      '/images/gallery/aflitos-4.jpg',
      '/images/gallery/aflitos-5.jpg'
    ],
    services: [
      { icon: '💼', title: 'Consultoria', description: 'Serviços especializados de consultoria' },
      { icon: '💻', title: 'Desenvolvimento', description: 'Equipe de desenvolvimento dedicada' },
      { icon: '🛠️', title: 'Suporte', description: 'Suporte técnico especializado' },
      { icon: '☕', title: 'Coffee Break', description: 'Área de descanso e networking' },
      { icon: '📶', title: 'Internet Fibra', description: 'Conexão de alta velocidade' },
      { icon: '🅿️', title: 'Estacionamento', description: 'Vagas disponíveis' }
    ],
    advantages: [
      {
        title: 'Localização Central',
        description: 'Fácil acesso e proximidade com o centro da cidade.',
        icon: '📍'
      },
      {
        title: 'Infraestrutura Completa',
        description: 'Todos os recursos necessários para o seu negócio.',
        icon: '🏢'
      },
      {
        title: 'Equipe Especializada',
        description: 'Profissionais qualificados para atender suas demandas.',
        icon: '👥'
      }
    ],
    testimonial: {
      text: 'A estrutura do Hub Plural Aflitos é impressionante. Temos tudo que precisamos para desenvolver nossos projetos com excelência.',
      author: 'Maria Silva',
      role: 'Diretora, InnovaTech',
      avatar: '/images/avatars/maria.jpg'
    },
    transform: {
      title: 'Eleve seu negócio ao próximo nível',
      description: 'Nossa sede oferece toda a infraestrutura e suporte necessários para transformar suas ideias em realidade.',
      benefits: [
        'Infraestrutura moderna',
        'Equipe especializada',
        'Localização estratégica',
        'Ambiente colaborativo'
      ],
      image: '/images/locations/aflitos-transform.jpg'
    },
    contact: {
      address: 'Rua dos Aflitos, 123 - Aflitos, Recife - PE',
      phone: '(81) 3333-1111',
      email: 'aflitos@plural.com',
      hours: 'Seg - Sex: 8h às 18h',
      coordinates: [-34.8825, -8.0476]
    }
  },
  'boa-viagem': {
    id: 'boa-viagem',
    name: 'Boa Viagem',
    city: 'Recife',
    state: 'PE',
    fullName: 'Hub Plural Boa Viagem',
    tagline: 'vista para o mar',
    subtitle: 'Trabalhe com vista para uma das praias mais famosas do Brasil',
    type: 'filial',
    hero: {
      image: '/images/locations/boa-viagem-hero.jpg',
      description: 'Localizada na principal avenida da cidade, oferecendo fácil acesso e atendimento premium.',
      highlights: ['Vista para o Mar', 'Localização Premium', 'Atendimento Diferenciado']
    },
    about: {
      title: 'Boa Viagem inspira',
      description: 'Trabalhe com vista para o mar em uma das localizações mais privilegiadas do Recife. Nossa unidade Boa Viagem oferece um ambiente inspirador.',
      features: [
        'Vista para a praia de Boa Viagem',
        'Localização privilegiada',
        'Ambiente inspirador',
        'Fácil acesso ao transporte'
      ],
      image: '/images/locations/boa-viagem-about.jpg'
    },
    floorplan: {
      title: 'Hub Plural Boa Viagem',
      areas: [
        { name: 'Recepção', size: '20m²' },
        { name: 'Coworking', size: '100m²' },
        { name: 'Salas privadas', size: '60m²' },
        { name: 'Sala de reunião', size: '30m²' },
        { name: 'Copa/Cozinha', size: '15m²' },
        { name: 'Terraço vista mar', size: '45m²' }
      ],
      totalArea: '270m²',
      capacity: '35 pessoas'
    },
    gallery: [
      '/images/gallery/boa-viagem-1.jpg',
      '/images/gallery/boa-viagem-2.jpg',
      '/images/gallery/boa-viagem-3.jpg',
      '/images/gallery/boa-viagem-4.jpg',
      '/images/gallery/boa-viagem-5.jpg'
    ],
    services: [
      { icon: '💼', title: 'Consultoria', description: 'Serviços de consultoria especializada' },
      { icon: '🎯', title: 'Atendimento', description: 'Atendimento personalizado' },
      { icon: '💰', title: 'Vendas', description: 'Suporte comercial' },
      { icon: '🌊', title: 'Vista Mar', description: 'Ambiente com vista para o mar' },
      { icon: '📶', title: 'Internet Fibra', description: 'Conexão de alta velocidade' },
      { icon: '🅿️', title: 'Estacionamento', description: 'Vagas próximas' }
    ],
    advantages: [
      {
        title: 'Vista para o Mar',
        description: 'Ambiente inspirador com vista para a praia de Boa Viagem.',
        icon: '🌊'
      },
      {
        title: 'Localização Premium',
        description: 'Na principal avenida da cidade, próximo a hotéis e restaurantes.',
        icon: '🏖️'
      },
      {
        title: 'Ambiente Inspirador',
        description: 'Espaço moderno que estimula a criatividade e produtividade.',
        icon: '✨'
      }
    ],
    testimonial: {
      text: 'Trabalhar com vista para o mar é uma experiência única. O Hub Plural Boa Viagem oferece um ambiente que inspira e motiva nossa equipe.',
      author: 'João Santos',
      role: 'Fundador, MareTech',
      avatar: '/images/avatars/joao.jpg'
    },
    transform: {
      title: 'Inspire-se com a vista do mar',
      description: 'Transforme sua rotina de trabalho em uma experiência única com vista para uma das praias mais famosas do Brasil.',
      benefits: [
        'Vista inspiradora para o mar',
        'Localização privilegiada',
        'Ambiente moderno',
        'Networking qualificado'
      ],
      image: '/images/locations/boa-viagem-transform.jpg'
    },
    contact: {
      address: 'Av. Boa Viagem, 456 - Boa Viagem, Recife - PE',
      phone: '(81) 3333-2222',
      email: 'boaviagem@plural.com',
      hours: 'Seg - Sex: 8h às 18h, Sáb: 8h às 12h',
      coordinates: [-34.8942, -8.1194]
    }
  }
};

interface LocationPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: LocationPageProps): Promise<Metadata> {
  const { id } = await params;
  const location = locationDetails[id as keyof typeof locationDetails];
  
  if (!location) {
    return {
      title: 'Localização não encontrada | Plural'
    };
  }

  return {
    title: `${location.fullName} | Plural`,
    description: `Conheça nossa unidade ${location.name} em ${location.city}. ${location.about.description}`,
    keywords: `plural, ${location.name}, ${location.city}, coworking, escritório`,
    openGraph: {
      title: `${location.fullName} | Plural`,
      description: `Conheça nossa unidade ${location.name} em ${location.city}. ${location.about.description}`,
      type: 'website',
      locale: 'pt_BR',
    },
  };
}

export default async function LocationDetailPage({ params }: LocationPageProps) {
  const { id } = await params;
  const location = locationDetails[id as keyof typeof locationDetails];

  if (!location) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <LocationDetailHero location={location} />
      
      {/* About Section */}
      <LocationDetailAbout location={location} />
      
      {/* Floorplan Section */}
      <LocationDetailFloorplan location={location} />
      
      {/* Gallery Section */}
      <LocationDetailGallery location={location} />
      
      {/* Services Section */}
      <LocationDetailServices location={location} />
      
      {/* Advantages Section */}
      <LocationDetailAdvantages location={location} />
      
      {/* Testimonial Section */}
      <LocationDetailTestimonial location={location} />
      
      {/* Transform Section */}
      <LocationDetailTransform location={location} />
      
      {/* Contact Form Section */}
      <LocationDetailContact location={location} />
      
      {/* Map Section */}
      <LocationDetailMap location={location} />
    </main>
  );
} 