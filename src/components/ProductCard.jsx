import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation when clicking the button
    addToCart(product);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <Link to={`/product/${product.id}`}>
        <div className="relative h-48 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          <button className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-100">
            <Heart className="h-5 w-5 text-gray-400 hover:text-red-500" />
          </button>
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-gray-900 mb-1 hover:text-indigo-600">{product.name}</h3>
        </Link>
        <p className="text-lg font-bold text-gray-900 mb-2">${product.price}</p>
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            <span>{product.location}</span>
            <span className="mx-2">•</span>
            <span>{product.createdAt}</span>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex items-center space-x-1 bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-700 transition-colors duration-200"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;