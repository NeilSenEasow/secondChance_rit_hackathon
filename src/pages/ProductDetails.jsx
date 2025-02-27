import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Share2, MapPin, Calendar, User, MessageCircle, ShoppingCart } from 'lucide-react';
import { mockProducts } from '../utils/mockData';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useContext(AuthContext);
  const { addToCart } = useCart();
  
  useEffect(() => {
    // In a real app, you would fetch the product from your API
    const foundProduct = mockProducts.find(p => p.id === id);
    setProduct(foundProduct);
    setLoading(false);
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
  };

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
    <div className="max-w-6xl mx-auto px-4 py-8">
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

            <div className="mt-8 space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors duration-200"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Cart</span>
              </button>

              {isAuthenticated ? (
                <button className="w-full flex items-center justify-center space-x-2 border border-gray-300 bg-white text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50">
                  <MessageCircle className="h-5 w-5" />
                  <span>Contact Seller</span>
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