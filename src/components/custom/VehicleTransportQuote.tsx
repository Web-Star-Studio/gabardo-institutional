
import React from 'react';

const VehicleTransportQuote: React.FC = () => {
  return (
    <div className="bg-gray-800">
      <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          Get a Quote for Your Vehicle Transport
        </h2>
        <p className="mt-4 text-lg text-gray-300">
          Fast, reliable, and secure vehicle transportation services. Let us provide you with a competitive quote.
        </p>
        <a
          href="/contact"
          className="mt-8 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 sm:w-auto"
        >
          Request a Free Quote
        </a>
      </div>
    </div>
  );
};

export default VehicleTransportQuote;
