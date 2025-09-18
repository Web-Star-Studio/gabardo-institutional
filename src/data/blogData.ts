export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: BlogContent[];
  category: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  featured: boolean;
  tags: string[];
  seo: {
    description: string;
    keywords: string[];
  };
}

export interface BlogContent {
  type: 'paragraph' | 'heading' | 'quote' | 'image' | 'list' | 'divider' | 'highlight';
  content: string;
  level?: number; // for headings
  items?: string[]; // for lists
  author?: string; // for quotes
  alt?: string; // for images
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'futuro-trabalho-hibrido-2025',
    title: 'O Futuro do Trabalho Híbrido: Tendências para 2025',
    excerpt: 'Explore como o modelo híbrido está revolucionando o mercado de trabalho e transformando a cultura empresarial moderna.',
    content: [
      {
        type: 'paragraph',
        content: 'O mundo do trabalho passou por uma transformação sem precedentes nos últimos anos. O que começou como uma adaptação emergencial durante a pandemia evoluiu para uma revolução estrutural que está redefinindo como, onde e quando trabalhamos.'
      },
      {
        type: 'heading',
        content: 'A Nova Realidade Híbrida',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'O modelo híbrido não é mais uma tendência - é a nova realidade. Empresas de todos os tamanhos estão descobrindo que a flexibilidade não apenas aumenta a satisfação dos funcionários, mas também impulsiona a produtividade e a inovação.'
      },
      {
        type: 'quote',
        content: 'A flexibilidade tornou-se o novo salário. Os profissionais valorizam mais a autonomia para escolher onde e como trabalhar do que benefícios tradicionais.',
        author: 'Estudo Global de Tendências de Trabalho 2024'
      },
      {
        type: 'heading',
        content: 'Impactos na Cultura Empresarial',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'As organizações estão repensando fundamentalmente seus valores e práticas. A cultura empresarial agora precisa transcender barreiras físicas e criar conexões genuínas em ambientes distribuídos.'
      },
      {
        type: 'list',
        content: 'Principais mudanças observadas:',
        items: [
          'Comunicação mais intencional e estruturada',
          'Foco em resultados ao invés de horas trabalhadas',
          'Investimento em tecnologia colaborativa',
          'Redefinição dos espaços físicos de trabalho',
          'Programas de bem-estar mental e físico'
        ]
      },
      {
        type: 'heading',
        content: 'O Papel dos Espaços de Coworking',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Neste cenário, os espaços de coworking emergem como protagonistas. Eles oferecem a flexibilidade que os profissionais desejam com a infraestrutura e o senso de comunidade que o trabalho remoto não consegue proporcionar.'
      },
      {
        type: 'highlight',
        content: 'O Hub Plural entende essa nova dinâmica e oferece soluções que se adaptam às necessidades específicas de cada profissional e empresa, criando um ecossistema onde a inovação floresce naturalmente.'
      },
      {
        type: 'heading',
        content: 'Tendências para 2025',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Olhando para o futuro próximo, algumas tendências já se desenham no horizonte do trabalho híbrido:'
      },
      {
        type: 'paragraph',
        content: '**Personalização Extrema**: Cada profissional terá seu próprio "blueprint" de trabalho, com horários, locais e ferramentas completamente customizados às suas necessidades e preferências.'
      },
      {
        type: 'paragraph',
        content: '**Tecnologia Imersiva**: Realidade virtual e aumentada começarão a criar experiências de colaboração que simulam a presença física, eliminando as barreiras da distância.'
      },
      {
        type: 'paragraph',
        content: '**Sustentabilidade Integrada**: A redução de deslocamentos e o compartilhamento de espaços contribuirão significativamente para objetivos de sustentabilidade corporativa.'
      }
    ],
    category: 'Futuro do Trabalho',
    date: '15 Jan 2025',
    readTime: '8 min',
    author: 'Dr. Ana Silva',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: true,
    tags: ['trabalho híbrido', 'futuro', 'cultura empresarial', 'produtividade'],
    seo: {
      description: 'Descubra as principais tendências do trabalho híbrido para 2025 e como elas estão transformando a cultura empresarial moderna.',
      keywords: ['trabalho híbrido', 'futuro do trabalho', 'cultura empresarial', 'coworking', 'produtividade']
    }
  },
  {
    id: '2',
    slug: 'coworking-revolucao-espacos-trabalho',
    title: 'Coworking: Mais que um Espaço, uma Revolução',
    excerpt: 'Descubra como os espaços de coworking estão redefinindo produtividade, networking e inovação no ambiente corporativo.',
    content: [
      {
        type: 'paragraph',
        content: 'O conceito de coworking evoluiu muito além de simplesmente compartilhar um espaço físico. Hoje, representa uma filosofia de trabalho que prioriza colaboração, flexibilidade e comunidade.'
      },
      {
        type: 'heading',
        content: 'Além do Espaço Físico',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Os espaços de coworking modernos são ecossistemas cuidadosamente projetados para fomentar conexões significativas e potencializar o crescimento profissional e empresarial.'
      },
      {
        type: 'quote',
        content: 'Não vendemos apenas mesas e salas. Vendemos possibilidades, conexões e a oportunidade de fazer parte de uma comunidade que impulsiona o sucesso mútuo.',
        author: 'Filosofia Hub Plural'
      },
      {
        type: 'heading',
        content: 'O Poder do Networking Orgânico',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Uma das maiores vantagens do coworking é a serendipidade - aqueles encontros casuais que geram oportunidades inesperadas. No corredor, no café, na sala de reunião: cada interação pode ser o início de uma parceria transformadora.'
      },
      {
        type: 'list',
        content: 'Benefícios do networking em coworking:',
        items: [
          'Diversidade de profissionais e setores',
          'Oportunidades de colaboração multidisciplinar',
          'Troca de experiências e conhecimentos',
          'Parcerias estratégicas naturais',
          'Mentoria peer-to-peer'
        ]
      },
      {
        type: 'heading',
        content: 'Inovação Através da Diversidade',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'A inovação floresce na intersecção de diferentes perspectivas. Os espaços de coworking criam naturalmente essas intersecções, reunindo profissionais de tecnologia, design, consultoria, educação e diversos outros campos.'
      },
      {
        type: 'highlight',
        content: 'No Hub Plural, já testemunhamos o nascimento de startups, a formação de parcerias estratégicas e o desenvolvimento de soluções inovadoras que surgiram simplesmente da convivência diária entre profissionais diversos.'
      }
    ],
    category: 'Coworking',
    date: '12 Jan 2025',
    readTime: '6 min',
    author: 'João Santos',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: false,
    tags: ['coworking', 'networking', 'inovação', 'comunidade'],
    seo: {
      description: 'Entenda como os espaços de coworking estão revolucionando a forma de trabalhar, criando comunidades e fomentando inovação.',
      keywords: ['coworking', 'networking', 'inovação', 'comunidade', 'espaços compartilhados']
    }
  },
  {
    id: '3',
    slug: 'sustentabilidade-espacos-trabalho-conscientes',
    title: 'Sustentabilidade e Espaços de Trabalho Conscientes',
    excerpt: 'Como construir ambientes de trabalho que respeitam o meio ambiente e promovem bem-estar corporativo.',
    content: [
      {
        type: 'paragraph',
        content: 'A sustentabilidade deixou de ser um diferencial para se tornar uma necessidade urgente. No mundo corporativo, isso significa repensar não apenas processos, mas também os espaços onde trabalhamos.'
      },
      {
        type: 'heading',
        content: 'O Impacto dos Espaços Tradicionais',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Escritórios tradicionais consomem recursos de forma ineficiente: energia para espaços subutilizados, materiais para reformas constantes, e combustível para deslocamentos desnecessários.'
      },
      {
        type: 'quote',
        content: 'Cada metro quadrado de escritório tradicional gera uma pegada de carbono 40% maior que espaços compartilhados otimizados.',
        author: 'Relatório de Sustentabilidade Corporativa 2024'
      },
      {
        type: 'heading',
        content: 'A Revolução dos Espaços Conscientes',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Os espaços de coworking representam uma abordagem mais sustentável ao trabalho, otimizando recursos através do compartilhamento inteligente.'
      },
      {
        type: 'list',
        content: 'Benefícios ambientais do coworking:',
        items: [
          'Otimização do uso de energia e recursos',
          'Redução de deslocamentos urbanos',
          'Compartilhamento de equipamentos e infraestrutura',
          'Menor geração de resíduos por profissional',
          'Fomento ao transporte público e mobilidade sustentável'
        ]
      },
      {
        type: 'heading',
        content: 'Bem-estar e Sustentabilidade',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Espaços sustentáveis não beneficiam apenas o meio ambiente - eles criam ambientes mais saudáveis e produtivos para as pessoas que os utilizam.'
      },
      {
        type: 'highlight',
        content: 'No Hub Plural, integramos práticas sustentáveis que resultam em ambientes mais saudáveis: ventilação natural, plantas que purificam o ar, materiais não-tóxicos e sistemas de energia eficiente.'
      }
    ],
    category: 'Sustentabilidade',
    date: '10 Jan 2025',
    readTime: '5 min',
    author: 'Maria Costa',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: false,
    tags: ['sustentabilidade', 'meio ambiente', 'bem-estar', 'eficiência'],
    seo: {
      description: 'Explore como criar espaços de trabalho sustentáveis que beneficiam tanto o meio ambiente quanto o bem-estar dos profissionais.',
      keywords: ['sustentabilidade', 'espaços conscientes', 'bem-estar corporativo', 'meio ambiente']
    }
  },
  {
    id: '4',
    slug: 'tecnologia-produtividade-nova-era',
    title: 'Tecnologia e Produtividade: A Nova Era',
    excerpt: 'Ferramentas e tecnologias que estão transformando a forma como trabalhamos e nos conectamos.',
    content: [
      {
        type: 'paragraph',
        content: 'A tecnologia está redefinindo os limites da produtividade humana. Não se trata mais apenas de automatizar tarefas, mas de amplificar capacidades e criar novas possibilidades de colaboração.'
      },
      {
        type: 'heading',
        content: 'Inteligência Artificial como Parceira',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'A IA está se tornando uma extensão natural de nossas capacidades cognitivas, não para nos substituir, mas para nos liberar de tarefas repetitivas e nos permitir focar no que realmente importa: criatividade, estratégia e relacionamentos.'
      },
      {
        type: 'quote',
        content: 'A verdadeira revolução da IA não está em substituir humanos, mas em potencializar o que fazemos de melhor: pensar, criar e conectar.',
        author: 'Especialista em Transformação Digital'
      },
      {
        type: 'heading',
        content: 'Ferramentas de Colaboração Híbrida',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'As ferramentas modernas estão eliminando as barreiras entre trabalho presencial e remoto, criando experiências fluidas que mantêm equipes conectadas independentemente da localização.'
      },
      {
        type: 'list',
        content: 'Tecnologias que estão transformando o trabalho:',
        items: [
          'Plataformas de colaboração em tempo real',
          'Realidade virtual para reuniões imersivas',
          'IA para automação de processos',
          'Analytics preditivos para tomada de decisão',
          'IoT para otimização de espaços físicos'
        ]
      },
      {
        type: 'heading',
        content: 'O Futuro da Produtividade',
        level: 2
      },
      {
        type: 'paragraph',
        content: 'Estamos caminhando para uma era onde a tecnologia não apenas nos ajuda a trabalhar melhor, mas a redefinir completamente o que significa ser produtivo.'
      },
      {
        type: 'highlight',
        content: 'No Hub Plural, investimos constantemente em tecnologias que potencializam a produtividade de nossa comunidade, desde sistemas de reserva inteligentes até plataformas de networking digital.'
      }
    ],
    category: 'Tecnologia',
    date: '08 Jan 2025',
    readTime: '7 min',
    author: 'Carlos Ferreira',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    featured: false,
    tags: ['tecnologia', 'produtividade', 'inteligência artificial', 'inovação'],
    seo: {
      description: 'Descubra as tecnologias que estão revolucionando a produtividade e transformando a forma como trabalhamos.',
      keywords: ['tecnologia', 'produtividade', 'inteligência artificial', 'transformação digital']
    }
  }
];

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getFeaturedBlogPosts(): BlogPost[] {
  return blogPosts.filter(post => post.featured);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category);
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map(post => post.slug);
}

export const blogCategories = [
  'Futuro do Trabalho',
  'Coworking',
  'Sustentabilidade',
  'Tecnologia'
];

export function getRelatedPosts(currentSlug: string, category: string, limit: number = 3): BlogPost[] {
  return blogPosts
    .filter(post => post.slug !== currentSlug && post.category === category)
    .slice(0, limit);
} 