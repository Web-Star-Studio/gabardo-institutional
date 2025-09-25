
import React from 'react';

const VehicleTransportIndustries: React.FC = () => {
  const industries = [
    { name: 'Automotive Manufacturers', description: 'Reliable transport for new vehicles from factory to dealership.' },
    { name: 'Rental Car Companies', description: 'Efficient relocation of rental fleets between branches.' },
    { name: 'Auction Houses', description: 'Secure and timely delivery of auction vehicles to buyers.' },
    { name: 'Private Owners', description: 'Personalized vehicle transport services for individuals.' },
  ];

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Serving Various Industries</h2>
          <p className="mt-4 text-lg text-gray-500">We provide specialized vehicle transport solutions for a wide range of clients.</p>
        </div>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry) => (
            <div key={industry.name} className="p-6 bg-gray-50 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900">{industry.name}</h3>
              <p className="mt-2 text-base text-gray-500">{industry.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VehicleTransportIndustries;
