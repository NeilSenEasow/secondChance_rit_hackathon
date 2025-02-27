import React from 'react';
import { ShoppingBag, Recycle, Heart, DollarSign, Leaf, GraduationCap, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-indigo-600">
        About SecondChance
      </h1>
      
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <p className="text-lg text-gray-700 mb-6">
            SecondChance is a sustainable marketplace platform created by Computer Science and Engineering students to give pre-loved items a new home
            while promoting environmental consciousness and affordability in our community.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <ShoppingBag className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Buy & Sell</h3>
              <p className="text-gray-600">Easy and secure platform to buy and sell pre-loved items</p>
            </div>

            <div className="text-center">
              <Recycle className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
              <p className="text-gray-600">Reduce waste and promote environmental consciousness</p>
            </div>

            <div className="text-center">
              <Heart className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-600">Connect with fellow students and build a sustainable community</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">
            Supporting UN Sustainable Development Goals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <Globe className="h-8 w-8 text-indigo-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">SDG 12: Responsible Consumption</h3>
                <p className="text-gray-600">Promoting sustainable consumption patterns through reuse and recycling of pre-loved items.</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Leaf className="h-8 w-8 text-indigo-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">SDG 13: Climate Action</h3>
                <p className="text-gray-600">Reducing carbon footprint by extending the lifecycle of products.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 mb-6">
            We aim to create a sustainable and affordable marketplace for students to buy and sell pre-loved items,
            reducing waste and promoting circular economy within our campus community.
          </p>
          
          <div className="bg-indigo-50 p-6 rounded-lg mb-8">
            <h3 className="font-semibold text-lg mb-3">Impact Goals</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Reduce campus waste by 30% through reuse and recycling</li>
              <li>Help students save up to 50% on educational materials</li>
              <li>Build a community of environmentally conscious students</li>
              <li>Promote sustainable consumption habits</li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-700">
              Have questions or suggestions? Reach out to us at{' '}
              <a href="mailto:support@secondchance.com" className="text-indigo-600 hover:text-indigo-800">
                support@secondchance.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 