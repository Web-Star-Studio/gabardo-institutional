
import React from 'react';

const VehicleTransportContact: React.FC = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Have Questions?</h2>
        <p className="mt-4 text-lg text-gray-500">
          Our team is ready to assist you with any inquiries about our vehicle transport services.
        </p>
        <div className="mt-8">
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default VehicleTransportContact;
