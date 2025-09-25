
import React from 'react';

const PranchaBenefitsSection: React.FC = () => {
  const benefits = [
    { name: 'Versatility', description: 'Capable of transporting a wide variety of heavy and oversized equipment.' },
    { name: 'Safety', description: 'Our experienced team ensures your cargo is transported securely.' },
    { name: 'Efficiency', description: 'We provide timely and cost-effective transport solutions.' },
    { name: 'Nationwide Reach', description: 'Serving all regions of the country with our extensive network.' },
  ];

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900">Advantages of Our Flatbed Services</h2>
          <p className="mt-4 text-lg text-gray-500">Discover the benefits of choosing us for your heavy transport needs.</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div key={benefit.name} className="p-6 bg-gray-100 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900">{benefit.name}</h3>
              <p className="mt-2 text-base text-gray-500">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PranchaBenefitsSection;
