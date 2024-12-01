import React from 'react';
import { Link } from 'react-router-dom';
import { Herb } from '../types/herb';

interface HerbCardProps {
  herb: Herb;
}

export const HerbCard: React.FC<HerbCardProps> = ({ herb }) => {
  return (
    <Link to={`/herbs/${herb.id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
        <div className="relative h-48 sm:h-56 md:h-64">
          <img 
            src={herb.image} 
            alt={herb.name} 
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>
        <div className="p-4">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{herb.name}</h3>
          <p className="text-sm sm:text-base text-gray-600">{herb.description}</p>
        </div>
      </div>
    </Link>
  );
};