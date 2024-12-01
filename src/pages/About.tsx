import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            About EarthlyCure
          </h1>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                At EarthlyCure, we're dedicated to bridging the gap between traditional herbal wisdom 
                and modern wellness needs. Our mission is to make reliable information about herbal 
                medicine accessible to everyone.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
              <p className="text-gray-600 mb-6">
                Founded by a group of herbal medicine enthusiasts and healthcare professionals, 
                EarthlyCure began as a small community project and has grown into a comprehensive 
                resource for herbal medicine information.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">What We Offer</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">Expert Knowledge</h3>
                  <p className="text-gray-600">
                    Access to verified information about herbal remedies and their traditional uses.
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-800 mb-2">AI Consultation</h3>
                  <p className="text-gray-600">
                    Interactive AI-powered assistant to answer your herbal medicine questions.
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Commitment to accurate, research-based information</li>
                  <li>Respect for traditional herbal knowledge</li>
                  <li>Promotion of sustainable herbal practices</li>
                  <li>Accessibility of herbal medicine education</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;