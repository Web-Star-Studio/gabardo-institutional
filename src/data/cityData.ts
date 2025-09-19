export interface CategoryImage {
  categoryName: string;
  images: [string, string]; // Tuple for exactly two images
}

export interface City {
  cityName: string;
  categories: CategoryImage[];
}

export const cityData: City[] = [
  {
    cityName: "Porto Alegre",
    categories: [
      { categoryName: "TRANSPORTE", images: ["/gabardo-slide-1.jpg", "/gabardo-slide-2.jpg"] },
      { categoryName: "LOGÍSTICA", images: ["/gabardo-slide-2.jpg", "/gabardo-slide-1.jpg"] },
      { categoryName: "SEGURANÇA", images: ["/gabardo-slide-1.jpg", "/gabardo-slide-2.jpg"] }
    ]
  },
  {
    cityName: "São Paulo",
    categories: [
      { categoryName: "TRANSPORTE", images: ["/gabardo-slide-1.jpg", "/gabardo-slide-2.jpg"] },
      { categoryName: "LOGÍSTICA", images: ["/gabardo-slide-2.jpg", "/gabardo-slide-1.jpg"] },
      { categoryName: "SEGURANÇA", images: ["/gabardo-slide-1.jpg", "/gabardo-slide-2.jpg"] }
    ]
  },
  {
    cityName: "Rio de Janeiro",
    categories: [
      { categoryName: "TRANSPORTE", images: ["/gabardo-slide-1.jpg", "/gabardo-slide-2.jpg"] },
      { categoryName: "LOGÍSTICA", images: ["/gabardo-slide-2.jpg", "/gabardo-slide-1.jpg"] },
      { categoryName: "SEGURANÇA", images: ["/gabardo-slide-1.jpg", "/gabardo-slide-2.jpg"] }
    ]
  },
  {
    cityName: "Belo Horizonte",
    categories: [
      { categoryName: "TRANSPORTE", images: ["/gabardo-slide-1.jpg", "/gabardo-slide-2.jpg"] },
      { categoryName: "LOGÍSTICA", images: ["/gabardo-slide-2.jpg", "/gabardo-slide-1.jpg"] },
      { categoryName: "SEGURANÇA", images: ["/gabardo-slide-1.jpg", "/gabardo-slide-2.jpg"] }
    ]
  },
  {
    cityName: "Curitiba",
    categories: [
      { categoryName: "TRANSPORTE", images: ["/gabardo-slide-1.jpg", "/gabardo-slide-2.jpg"] },
      { categoryName: "LOGÍSTICA", images: ["/gabardo-slide-2.jpg", "/gabardo-slide-1.jpg"] },
      { categoryName: "SEGURANÇA", images: ["/gabardo-slide-1.jpg", "/gabardo-slide-2.jpg"] }
    ]
  },
  {
    cityName: "Goiânia",
    categories: [
      { categoryName: "TRANSPORTE", images: ["/gabardo-slide-1.jpg", "/gabardo-slide-2.jpg"] },
      { categoryName: "LOGÍSTICA", images: ["/gabardo-slide-2.jpg", "/gabardo-slide-1.jpg"] },
      { categoryName: "SEGURANÇA", images: ["/gabardo-slide-1.jpg", "/gabardo-slide-2.jpg"] }
    ]
  },
  {
    cityName: "Salvador",
    categories: [
      { categoryName: "TRANSPORTE", images: ["/gabardo-slide-1.jpg", "/gabardo-slide-2.jpg"] },
      { categoryName: "LOGÍSTICA", images: ["/gabardo-slide-2.jpg", "/gabardo-slide-1.jpg"] },
      { categoryName: "SEGURANÇA", images: ["/gabardo-slide-1.jpg", "/gabardo-slide-2.jpg"] }
    ]
  },
  {
    cityName: "Brasília",
    categories: [
      { categoryName: "TRANSPORTE", images: ["/gabardo-slide-1.jpg", "/gabardo-slide-2.jpg"] },
      { categoryName: "LOGÍSTICA", images: ["/gabardo-slide-2.jpg", "/gabardo-slide-1.jpg"] },
      { categoryName: "SEGURANÇA", images: ["/gabardo-slide-1.jpg", "/gabardo-slide-2.jpg"] }
    ]
  }
];