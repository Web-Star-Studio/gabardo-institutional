
import React from 'react';

const PranchaQuoteSection: React.FC = () => {
  return (
    <div className="bg-indigo-800">
      <div className="max-w-4xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          Need to Transport Heavy Equipment?
        </h2>
        <p className="mt-4 text-lg text-indigo-100">
          Let our experts provide you with a competitive quote for our flatbed transport services.
        </p>
        <a
          href="/contact"
          className="mt-8 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-800 bg-white hover:bg-indigo-50 sm:w-auto"
        >
          Get a Quote
        </a>
      </div>
    </div>
  );
};

export default PranchaQuoteSection;
