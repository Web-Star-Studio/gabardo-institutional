
import React from 'react';

const FleetCapabilitiesSection: React.FC = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Capabilities</h2>
          <p className="mt-4 text-lg text-gray-500">We are equipped to handle any challenge.</p>
        </div>
        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 bg-white rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-bold text-gray-900">Heavy Haulage</h3>
            <p className="mt-2 text-base text-gray-500">Specialized in transporting oversized and heavy loads with precision and care.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-bold text-gray-900">Express Delivery</h3>
            <p className="mt-2 text-base text-gray-500">Fast and reliable delivery services for time-sensitive shipments.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-bold text-gray-900">Nationwide Coverage</h3>
            <p className="mt-2 text-base text-gray-500">Our network spans the entire country, ensuring your cargo reaches its destination.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FleetCapabilitiesSection;
