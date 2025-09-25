
import React from 'react';

const PranchaCapacitySection: React.FC = () => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Heavy-Duty Capacity</h2>
            <p className="mt-4 text-lg text-gray-500">
              Our flatbed fleet is built to handle substantial weight and oversized dimensions, making us the ideal partner for your most demanding transport needs. From construction machinery to industrial components, we have the capacity to deliver.
            </p>
          </div>
          <div className="mt-8 lg:mt-0">
            {/* Placeholder for an image of a heavy-duty truck */}
            <div className="bg-gray-200 h-80 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Image of Heavy-Duty Truck</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PranchaCapacitySection;
