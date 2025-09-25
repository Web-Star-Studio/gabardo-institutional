
import React from 'react';

const VehicleTransportSustainability: React.FC = () => {
  return (
    <div className="bg-green-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-green-900">Committed to Sustainability</h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-green-700">
          We are dedicated to reducing our environmental impact through optimized routing, modern fuel-efficient carriers, and sustainable practices.
        </p>
        <div className="mt-8">
          <a href="/sustainability" className="text-lg font-medium text-green-800 hover:text-green-600">
            Learn more about our green initiatives &rarr;
          </a>
        </div>
      </div>
    </div>
  );
};

export default VehicleTransportSustainability;
