
import React from 'react';

const FleetStatsSection: React.FC = () => {
  return (
    <div className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Our Fleet by the Numbers</h2>
          <p className="mt-4 text-lg text-gray-300">A testament to our scale and reliability.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-5xl font-bold">500+</p>
            <p className="mt-2 text-lg">Vehicles</p>
          </div>
          <div>
            <p className="text-5xl font-bold">1M+</p>
            <p className="mt-2 text-lg">Miles Driven Annually</p>
          </div>
          <div>
            <p className="text-5xl font-bold">99%</p>
            <p className="mt-2 text-lg">On-time Delivery</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FleetStatsSection;
