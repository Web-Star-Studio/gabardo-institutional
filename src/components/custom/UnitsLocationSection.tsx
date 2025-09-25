
import React from 'react';

const UnitsLocationSection: React.FC = () => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Locations</h2>
          <p className="mt-4 text-lg text-gray-500">Strategically located to serve you better.</p>
        </div>
        <div className="mt-10">
          {/* Placeholder for a map component */}
          <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Map Placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnitsLocationSection;
