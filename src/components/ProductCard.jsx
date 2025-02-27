import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const ProductCard = ({ product }) => {
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
        
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>{product.location}</span>
          <span>{product.createdAt}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;