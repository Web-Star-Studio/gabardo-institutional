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
    cityName: "São Paulo",
    categories: [
      { categoryName: "MIM", images: ["https://source.unsplash.com/random/800x600?sao_paulo&mim&1", "https://source.unsplash.com/random/800x600?sao_paulo&mim&2"] },
      { categoryName: "2 OU 6", images: ["https://source.unsplash.com/random/800x600?sao_paulo&street&1", "https://source.unsplash.com/random/800x600?sao_paulo&street&2"] },
      { categoryName: "GENTE QUE SÓ", images: ["https://source.unsplash.com/random/800x600?sao_paulo&people&1", "https://source.unsplash.com/random/800x600?sao_paulo&people&2"] }
    ]
  },
  {
    cityName: "Rio de Janeiro",
    categories: [
      { categoryName: "MIM", images: ["https://source.unsplash.com/random/800x600?rio&mim&1", "https://source.unsplash.com/random/800x600?rio&mim&2"] },
      { categoryName: "2 OU 6", images: ["https://source.unsplash.com/random/800x600?rio&beach&1", "https://source.unsplash.com/random/800x600?rio&beach&2"] },
      { categoryName: "GENTE QUE SÓ", images: ["https://source.unsplash.com/random/800x600?rio&people&1", "https://source.unsplash.com/random/800x600?rio&people&2"] }
    ]
  },
  {
    cityName: "Belo Horizonte",
    categories: [
      { categoryName: "MIM", images: ["https://source.unsplash.com/random/800x600?belo_horizonte&mim&1", "https://source.unsplash.com/random/800x600?belo_horizonte&mim&2"] },
      { categoryName: "2 OU 6", images: ["https://source.unsplash.com/random/800x600?belo_horizonte&cityscape&1", "https://source.unsplash.com/random/800x600?belo_horizonte&cityscape&2"] },
      { categoryName: "GENTE QUE SÓ", images: ["https://source.unsplash.com/random/800x600?belo_horizonte&people&1", "https://source.unsplash.com/random/800x600?belo_horizonte&people&2"] }
    ]
  }
]; 