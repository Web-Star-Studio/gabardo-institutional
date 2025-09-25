
import React from 'react';

const NewsGridSection: React.FC = () => {
  // Dummy data for news articles
  const newsItems = [
    { id: 1, title: 'New Logistics Hub in the Northeast', excerpt: 'Expanding our reach to better serve our clients in the northeastern region.', date: 'Oct 15, 2025' },
    { id: 2, title: 'Technological Advancements in Our Fleet', excerpt: 'Integrating the latest technology for enhanced efficiency and safety.', date: 'Oct 10, 2025' },
    { id: 3, title: 'Community Outreach Program Launch', excerpt: 'Giving back to the communities that support us.', date: 'Oct 5, 2025' },
    { id: 4, title: 'Employee of the Year Awarded', excerpt: 'Celebrating the hard work and dedication of our team.', date: 'Oct 1, 2025' },
  ];

  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-10">Latest Updates</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {newsItems.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-base text-gray-500">{item.excerpt}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-400">{item.date}</span>
                <a href="#" className="text-indigo-600 hover:text-indigo-500 font-semibold">Read More</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsGridSection;
