import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Share2, MapPin, Calendar, User, MessageCircle } from 'lucide-react';
import { mockProducts } from '../utils/mockData';
import { AuthContext } from '../context/AuthContext';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useContext(AuthContext);
  
  useEffect(() => {
    // In a real app, you would fetch the product from your API
    const foundProduct = mockProducts.find(p => p.id === id);
    setProduct(foundProduct);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-gray-700">Product not found</h2>
        <p className="mt-2 text-gray-500">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="mt-4 inline-block text-indigo-600 hover:text-indigo-800">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="md:w-1/2">
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        
        {/* Product Info */}
        <div className="md:w-1/2">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
              <div className="flex space-x-2">
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Heart className="h-6 w-6 text-gray-400 hover:text-red-500" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Share2 className="h-6 w-6 text-gray-400 hover:text-indigo-500" />
                </button>
              </div>
            </div>
            
            <p className="text-3xl font-bold text-gray-900 mt-4">${product.price}</p>
            
            <div className="flex items-center mt-4 text-gray-500">
              <MapPin className="h-5 w-5 mr-1" />
              <span>{product.location}</span>
              <span className="mx-2">•</span>
              <Calendar className="h-5 w-5 mr-1" />
              <span>Posted {product.createdAt}</span>
            </div>
            
            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-900">Description</h2>
              <p className="mt-2 text-gray-600">{product.description}</p>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-500" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{product.seller.name}</h3>
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`h-4 w-4 ${i < Math.floor(product.seller.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-1 text-sm text-gray-500">{product.seller.rating} ({Math.floor(Math.random() * 50) + 10} reviews)</span>
                  </div>
                </div>
              </div>
              
              {isAuthenticated ? (
                <button className="mt-4 w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Contact Seller
                </button>
              ) : (
                <div className="mt-4 text-center">
                  <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-medium">
                    Log in to contact the seller
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Similar Items */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-6">Similar Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockProducts
            .filter(p => p.category === product.category && p.id !== product.id)
            .slice(0, 4)
            .map(p => (
              <div key={p.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <Link to={`/product/${p.id}`}>
                  <img src={p.image} alt={p.name} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 truncate">{p.name}</h3>
                    <p className="text-lg font-bold text-gray-900 mt-1">${p.price}</p>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;