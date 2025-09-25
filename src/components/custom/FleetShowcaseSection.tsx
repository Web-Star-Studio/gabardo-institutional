
import React from 'react';

const FleetShowcaseSection: React.FC = () => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Fleet Showcase</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Explore Our Modern Fleet
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            We pride ourselves on a diverse and modern fleet, equipped to handle a wide range of transportation needs.
          </p>
        </div>

        <div className="mt-10">
          {/* Placeholder for an image gallery or carousel */}
          <div className="flex justify-center items-center bg-gray-200 h-96 rounded-lg">
            <p className="text-gray-500">Fleet Image Gallery Placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FleetShowcaseSection;
