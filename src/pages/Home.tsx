import React from 'react';
import { HerbCard } from '../components/HerbCard';
import logo from '../assets/images/logo.png';
import { herbs } from '../data/herbs';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-600 text-white py-12 sm:py-20 px-4">
        <div className="container mx-auto text-center">
          <img src={logo} alt="EarthlyCure Logo" className="mx-auto h-16 sm:h-24 mb-6 sm:mb-8" />
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Welcome to EarthlyCure</h1>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto">
            Discover the hidden healing powers of nature. Learn about unique herbs and how they can enhance your health and wellness.
          </p>
          <a 
            href="#herbs" 
            className="inline-block bg-yellow-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:bg-yellow-700 transition-colors"
          >
            Explore Herbs
          </a>
        </div>
      </div>

      <section id="herbs" className="container mx-auto py-12 sm:py-16 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Healing Herbs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {herbs.map((herb) => (
            <HerbCard key={herb.id} herb={herb} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;