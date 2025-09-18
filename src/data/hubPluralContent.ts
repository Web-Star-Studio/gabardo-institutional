export interface ScrapedImage {
  src: string;
  alt: string;
}

export interface ScrapedService {
  title: string;
  description: string;
  icon: string | null;
}

export interface ScrapedLocation {
  name: string;
  address: string;
  description: string;
}

export interface ScrapedTestimonial {
  text: string;
  author: string;
  rating: number;
}

export interface ScrapedContent {
  hero: {
    title: string;
    description: string;
    images: ScrapedImage[];
  };
  services: ScrapedService[];
  locations: ScrapedLocation[];
  testimonials: ScrapedTestimonial[];
  about: {
    title: string;
    description: string;
    values: string[];
  };
  contact: {
    phone: string;
    email: string;
    address: string;
    socialMedia: {
      [key: string]: string;
    };
  };
  meta: {
    title: string;
    description: string;
  };
}

// Dados extraídos do site Hub Plural
export const hubPluralContent: ScrapedContent = {
  "hero": {
    "title": "Hub Plural - Coworking e Escritórios Compartilhados",
    "description": "Esqueça aquele antigo modelo de escritório e tenha uma nova experiência de viver e trabalhar. Transforme sua forma de trabalhar em um ambiente colaborativo, inspirador e produtivo.",
    "images": []
  },
  "services": [
    {
      "title": "Coworking Plural",
      "description": "Espaço colaborativo com estações de trabalho flexíveis e ambiente inspirador para profissionais e empresas.",
      "icon": null
    },
    {
      "title": "Escritório Flexível",
      "description": "Salas privadas com toda infraestrutura necessária para sua empresa crescer sem se preocupar com manutenção.",
      "icon": null
    },
    {
      "title": "Salas de Reunião",
      "description": "Salas equipadas para reuniões, apresentações e eventos corporativos com toda tecnologia necessária.",
      "icon": null
    },
    {
      "title": "Estação Fixa",
      "description": "Sua própria estação de trabalho em ambiente colaborativo, garantindo seu espaço sempre disponível.",
      "icon": null
    },
    {
      "title": "Caixa Postal",
      "description": "Endereço comercial e serviços de correspondência para sua empresa ter presença profissional.",
      "icon": null
    },
    {
      "title": "Eventos Corporativos",
      "description": "Espaços para eventos, workshops e networking em ambiente profissional e moderno.",
      "icon": null
    }
  ],
  "locations": [
    { "name": "Aflitos", "address": "Recife - PE", "description": "Unidade no bairro dos Aflitos, região central de fácil acesso" },
    { "name": "Boa Viagem", "address": "Recife - PE", "description": "Unidade em Boa Viagem, próximo à praia e ao centro empresarial" },
    { "name": "Ilha do Leite", "address": "Recife - PE", "description": "Unidade na Ilha do Leite, coração do Recife Antigo" },
    { "name": "Várzea", "address": "Recife - PE", "description": "Unidade na Várzea, próximo à UFPE e centros acadêmicos" },
    { "name": "Caruaru", "address": "Caruaru - PE", "description": "Expansão para o agreste pernambucano" },
    { "name": "Fortaleza", "address": "Fortaleza - CE", "description": "Presença no Ceará, expandindo no Nordeste" },
    { "name": "Petrolina", "address": "Petrolina - PE", "description": "Unidade no Vale do São Francisco" }
  ],
  "testimonials": [
    {
      "text": "O Hub se tornou uma família. A energia de toda a equipe somada com os ambientes aconchegantes fazem a gente se sentir em casa. Trazer a empresa para esse lugar nos fez trabalhar com mais entusiasmo e leveza!",
      "author": "Equipe GF.Capital",
      "rating": 5
    },
    {
      "text": "A experiência de conviver no Hub Plural tem sido diferenciada, pois além de proporcionar novas interações e trocas profissionais, nos oferece uma ótima estrutura.",
      "author": "Gestor Empresarial",
      "rating": 5
    },
    {
      "text": "Estar em um ambiente que favorece a aproximação com outras empresas e empreendedores com visão de futuro tem sido fantástico. São muitas as excelentes pontes que se formaram através do Hub.",
      "author": "Empreendedor Local",
      "rating": 5
    }
  ],
  "about": {
    "title": "Sobre o Hub Plural",
    "description": "O Hub Plural é mais que um coworking, é um ecossistema de inovação e colaboração que conecta pessoas, ideias e oportunidades. Nossa missão é transformar a experiência de trabalho, oferecendo espaços inspiradores e uma comunidade vibrante.",
    "values": [
      "Colaboração",
      "Inovação", 
      "Sustentabilidade",
      "Comunidade",
      "Excelência"
    ]
  },
  "contact": {
    "phone": "(81) 98135-2010",
    "email": "contato@hubplural.com",
    "address": "Múltiplas unidades em Recife, Caruaru, Fortaleza e Petrolina",
    "socialMedia": {
      "whatsapp": "https://tintim.link/whatsapp/1aea14c7-c4ee-4de0-88d5-79f52f1ce4d8/69b4518f-9cad-4d40-b285-cde548172d5a",
      "facebook": "https://www.facebook.com/hubplural/",
      "instagram": "https://www.instagram.com/hubplural_oficial/",
      "linkedin": "https://br.linkedin.com/company/hubplural"
    }
  },
  "meta": {
    "title": "Coworking e escritórios por assinaturas em Recife - Hub Plural",
    "description": "Esqueça aquele antigo modelo de escritório e tenha uma nova experiência de viver e trabalhar. Conheça o Hub Plural."
  }
};

// Exportações específicas para facilitar o uso
export const { hero, services, locations, testimonials, about, contact, meta } = hubPluralContent; 