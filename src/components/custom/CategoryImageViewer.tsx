'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { CategoryImage } from '@/data/cityData'; // Import the type

interface CategoryImageViewerProps {
  category: CategoryImage;
  cityName: string; // Added for alt text clarity
}

export default function CategoryImageViewer({ category, cityName }: CategoryImageViewerProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));
  };

  return (
    <div className="border rounded-lg p-4 shadow-lg flex flex-col items-center">
      <h3 className="text-xl font-semibold mb-3 text-center">{category.categoryName}</h3>
      <div 
        className="relative w-full h-80 cursor-pointer group overflow-hidden rounded-md" 
        onClick={handleImageClick}
        title="Clique para ver a próxima imagem"
      >
        {category.images.map((src, index) => (
          <Image
            key={src} // Use image src as key if they are unique, or index
            src={src}
            alt={`${cityName} - ${category.categoryName} - Imagem ${index + 1}`}
            layout="fill"
            objectFit="cover"
            className={`transition-opacity duration-500 ease-in-out absolute inset-0 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        {/* Optional: Add an icon or text overlay to indicate clickability on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
          <p className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">
            Ver outra imagem
          </p>
        </div>
      </div>
      {/* Dot indicators */}
      <div className="flex justify-center space-x-2 mt-3">
        <button
          onClick={() => setCurrentImageIndex(0)}
          className={`w-3 h-3 rounded-full ${currentImageIndex === 0 ? 'bg-blue-500' : 'bg-gray-300 hover:bg-gray-400'} transition-colors`}
          aria-label="Ver imagem 1"
        />
        <button
          onClick={() => setCurrentImageIndex(1)}
          className={`w-3 h-3 rounded-full ${currentImageIndex === 1 ? 'bg-blue-500' : 'bg-gray-300 hover:bg-gray-400'} transition-colors`}
          aria-label="Ver imagem 2"
        />
      </div>
    </div>
  );
} 