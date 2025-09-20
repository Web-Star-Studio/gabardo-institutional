'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import mapboxgl, { Map } from 'mapbox-gl';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoid2Vic3RhcnN0dWRpbyIsImEiOiJjbWJqaXUyZG8wZ3BtMmpxNm5pcGw0Y2ptIn0.UnohoPp9qrhIFOEoQ9FNfg';

interface LocationData {
  name: string;
  coordinates: [number, number];
  address: string;
  type: string;
}

const locations: LocationData[] = [
  { name: 'Porto Alegre', coordinates: [-51.2177, -30.0346], address: 'Matriz - Porto Alegre, RS', type: 'matriz' },
  { name: 'São Paulo', coordinates: [-46.6333, -23.5505], address: 'Terminal Rodoviário - São Paulo, SP', type: 'filial' },
  { name: 'Rio de Janeiro', coordinates: [-43.1729, -22.9068], address: 'Base Operacional - Rio de Janeiro, RJ', type: 'filial' },
  { name: 'Belo Horizonte', coordinates: [-43.9378, -19.9208], address: 'Centro de Distribuição - Belo Horizonte, MG', type: 'filial' },
  { name: 'Curitiba', coordinates: [-49.2731, -25.4244], address: 'Base Sul - Curitiba, PR', type: 'filial' },
  { name: 'Goiânia', coordinates: [-49.2532, -16.6869], address: 'Hub Centro-Oeste - Goiânia, GO', type: 'filial' },
  { name: 'Salvador', coordinates: [-38.5108, -12.9714], address: 'Base Nordeste - Salvador, BA', type: 'filial' },
  { name: 'Brasília', coordinates: [-47.8825, -15.7942], address: 'Operação Federal - Brasília, DF', type: 'filial' },
];

// Função para mapear nomes das localizações para IDs das páginas
const getLocationId = (locationName: string): string => {
  const nameToIdMap: { [key: string]: string } = {
    'Porto Alegre': 'porto-alegre',
    'São Paulo': 'sao-paulo',
    'Rio de Janeiro': 'rio-de-janeiro',
    'Belo Horizonte': 'belo-horizonte',
    'Curitiba': 'curitiba',
    'Goiânia': 'goiania',
    'Salvador': 'salvador',
    'Brasília': 'brasilia',
  };
  
  return nameToIdMap[locationName] || locationName.toLowerCase().replace(/\s+/g, '-');
};

const MapboxSection: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const router = useRouter();

  const handleExploreLocation = () => {
    if (selectedLocation) {
      const locationId = getLocationId(selectedLocation.name);
      router.push(`/localizacao/${locationId}`);
    }
  };

  const handleSelectLocationFromList = (location: LocationData) => {
    setSelectedLocation(location);
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: location.coordinates,
        zoom: 12,
        duration: 1000,
      });
    }
  };

  useEffect(() => {
    if (!MAPBOX_ACCESS_TOKEN) {
      console.error('Mapbox Access Token is not configured');
      return;
    }

    mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

    if (mapRef.current || !mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-47.8825, -15.7942], // Center on Brazil
      zoom: 4,
      attributionControl: false,
    });

    mapRef.current = map;

    map.on('load', () => {
      setMapLoaded(true);
      
      // Add custom navigation control
      map.addControl(new mapboxgl.NavigationControl({
        showCompass: false,
        showZoom: true,
      }), 'top-right');

      // Add markers for each location
      locations.forEach((location) => {
        const markerElement = document.createElement('div');
        markerElement.className = 'custom-marker';
        markerElement.innerHTML = `
          <div class="marker-pulse ${location.type === 'matriz' ? 'marker-matriz' : location.type === 'sede' ? 'marker-sede' : 'marker-filial'}">
            <div class="marker-dot"></div>
          </div>
        `;

        const marker = new mapboxgl.Marker(markerElement)
          .setLngLat(location.coordinates)
          .addTo(map);

        // Add click event to marker
        markerElement.addEventListener('click', () => {
          setSelectedLocation(location);
          map.flyTo({
            center: location.coordinates,
            zoom: 12,
            duration: 1000,
          });
        });
      });

      // Add custom styles for markers
      const style = document.createElement('style');
      style.textContent = `
        .custom-marker {
          cursor: pointer;
        }
        .marker-pulse {
          position: relative;
          width: 20px;
          height: 20px;
        }
        .marker-pulse::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          animation: pulse 2s infinite;
          opacity: 0.3;
        }
        .marker-dot {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          border: 2px solid white;
          box-shadow: 0 0 10px rgba(0,0,0,0.3);
        }
        .marker-matriz .marker-dot,
        .marker-matriz::before {
          background-color: #ef4444;
        }
        .marker-sede .marker-dot,
        .marker-sede::before {
          background-color: #3b82f6;
        }
        .marker-filial .marker-dot,
        .marker-filial::before {
          background-color: #10b981;
        }
        @keyframes pulse {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-neutral-800 mb-4"
          >
            Nossas Unidades
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-neutral-600 max-w-2xl mx-auto"
          >
            A Gabardo está presente nas principais cidades do Brasil para oferecer o melhor serviço de transporte de veículos
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Map Container */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-8"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-neutral-900">
              <div
                ref={mapContainerRef}
                className="map-container h-[500px] w-full"
              >
                {!mapLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-neutral-900">
                    <div className="text-center">
                      <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-white/60">Carregando mapa...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Location Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-4"
          >
            <div className="sticky top-8">
              {selectedLocation ? (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-neutral-200">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-neutral-800">
                      {selectedLocation.name}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedLocation.type === 'matriz' 
                        ? 'bg-red-100 text-red-800' 
                        : selectedLocation.type === 'sede'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {selectedLocation.type}
                    </span>
                  </div>
                  <p className="text-neutral-600 mb-6">{selectedLocation.address}</p>
                  <button
                    onClick={handleExploreLocation}
                    className="w-full bg-neutral-900 text-white py-3 px-6 rounded-xl font-medium hover:bg-neutral-800 transition-colors"
                  >
                    Explorar Unidade
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-neutral-200">
                  <h3 className="text-xl font-bold text-neutral-800 mb-4">
                    Nossas Unidades
                  </h3>
                  <p className="text-neutral-600 mb-6">
                    Selecione uma unidade para ver no mapa ou explore clicando nos pontos.
                  </p>
                  <ul className="space-y-2 max-h-[300px] overflow-y-auto">
                    {locations.map((location) => (
                      <li key={location.name}>
                        <button
                          onClick={() => handleSelectLocationFromList(location)}
                          className="w-full text-left p-3 rounded-xl hover:bg-neutral-100 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-300 flex items-center gap-4"
                        >
                          <span className={`w-3 h-3 rounded-full ${
                            location.type === 'matriz' 
                              ? 'bg-red-500' 
                              : location.type === 'sede'
                              ? 'bg-blue-500'
                              : 'bg-green-500'
                          }`}></span>
                          <span className="font-medium text-neutral-700">{location.name}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MapboxSection; 