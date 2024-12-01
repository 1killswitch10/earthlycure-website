import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { herbs } from '../data/herbs';

const HerbDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const herb = herbs.find(h => h.id === id);
  const [activeTab, setActiveTab] = useState<'overview' | 'uses' | 'preparation'>('overview');

  if (!herb) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-600">Herb not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/" 
            className="inline-flex items-center text-green-600 hover:text-green-700 mb-6"
          >
            ← Back to Home
          </Link>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Hero Section */}
            <div className="relative h-96">
              <img 
                src={herb.image} 
                alt={herb.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-8 text-white">
                  <h1 className="text-4xl font-bold mb-2">{herb.name}</h1>
                  <p className="text-lg italic">{herb.scientificName}</p>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b">
              <nav className="flex">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-6 py-4 text-sm font-medium border-b-2 ${
                    activeTab === 'overview'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('uses')}
                  className={`px-6 py-4 text-sm font-medium border-b-2 ${
                    activeTab === 'uses'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Uses & Properties
                </button>
                <button
                  onClick={() => setActiveTab('preparation')}
                  className={`px-6 py-4 text-sm font-medium border-b-2 ${
                    activeTab === 'preparation'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Preparation & Safety
                </button>
              </nav>
            </div>

            {/* Content Sections */}
            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">About {herb.name}</h2>
                    <p className="text-gray-700 leading-relaxed">{herb.description}</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-green-800 mb-3">Key Benefits</h3>
                      <ul className="space-y-2">
                        {herb.uses.slice(0, 3).map((use, index) => (
                          <li key={index} className="flex items-center text-green-700">
                            <span className="mr-2">•</span>
                            {use}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-blue-800 mb-3">Properties</h3>
                      <ul className="space-y-2">
                        {herb.properties.slice(0, 3).map((property, index) => (
                          <li key={index} className="flex items-center text-blue-700">
                            <span className="mr-2">•</span>
                            {property}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'uses' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Traditional Uses</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                      {herb.uses.map((use, index) => (
                        <li key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                          <span className="text-green-500 mr-3">✓</span>
                          <span className="text-gray-700">{use}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Medicinal Properties</h2>
                    <ul className="grid md:grid-cols-2 gap-4">
                      {herb.properties.map((property, index) => (
                        <li key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                          <span className="text-blue-500 mr-3">•</span>
                          <span className="text-gray-700">{property}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'preparation' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Preparation Method</h2>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <p className="text-gray-700 leading-relaxed">{herb.preparation}</p>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommended Dosage</h2>
                    <div className="bg-blue-50 rounded-lg p-6">
                      <p className="text-blue-800">{herb.dosage}</p>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Safety Precautions</h2>
                    <div className="bg-red-50 border-l-4 border-red-400 rounded-lg">
                      <ul className="p-6 space-y-3">
                        {herb.precautions.map((precaution, index) => (
                          <li key={index} className="flex items-start text-red-700">
                            <span className="mr-3">⚠️</span>
                            <span>{precaution}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HerbDetails;