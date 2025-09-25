
import React from 'react';

const PranchaProcessSection: React.FC = () => {
  const steps = [
    { number: '01', title: 'Consultation', description: 'We start by understanding your specific transport requirements.' },
    { number: '02', title: 'Planning & Permitting', description: 'Our experts handle all the logistics, including necessary permits.' },
    { number: '03', title: 'Loading & Securing', description: 'Your cargo is professionally loaded and secured for safe transit.' },
    { number: '04', title: 'Transportation & Delivery', description: 'We transport your cargo to its destination safely and on time.' },
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">Our Process</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">{step.number}</div>
              <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
              <p className="mt-2 text-base text-gray-500">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PranchaProcessSection;
