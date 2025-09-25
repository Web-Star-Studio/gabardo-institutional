
import React from 'react';

const FeaturedNewsSection: React.FC = () => {
  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">Featured News</h2>
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* Featured Article 1 */}
          <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-900">Major Expansion Announced</h3>
            <p className="mt-2 text-base text-gray-500">We are excited to announce a significant expansion of our services and fleet, coming in 2025.</p>
            <a href="#" className="mt-4 inline-block text-indigo-600 hover:text-indigo-500">Read more</a>
          </div>
          {/* Featured Article 2 */}
          <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-900">Sustainability Award</h3>
            <p className="mt-2 text-base text-gray-500">Our commitment to green logistics has been recognized with the prestigious Green Carrier Award.</p>
            <a href="#" className="mt-4 inline-block text-indigo-600 hover:text-indigo-500">Read more</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedNewsSection;
