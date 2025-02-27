import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const categories = [
  'Electronics',
  'Furniture',
  'Clothing',
  'Books',
  'Sports',
  'Toys',
  'Vehicles',
  'Other'
];

const AddProduct = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleImageChange = (e) => {
    const url = e.target.value;
    if (url) {
      setImage(url);
      setImagePreview(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!image) {
      setError('Please provide a link to an image of your item');
      return;
    }
    
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('image', image); // Append the image URL first
      formData.append('name', name);
      formData.append('category', category);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('location', location);

      const token = localStorage.getItem('token');

      const response = await fetch("http://localhost:5000/add-product", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          // Do not set Content-Type for FormData; the browser will set it automatically
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setLoading(false);
        navigate('/'); // Redirect to home or another page after successful submission
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('An error occurred while adding your product');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Sell an Item</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Item Photos (Image URL)
            </label>
            <input
              type="text"
              placeholder="Enter image URL"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            {imagePreview && (
              <div className="mt-2 text-center">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="mx-auto h-64 object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImage('');
                    setImagePreview(null);
                  }}
                  className="mt-2 text-sm text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
          
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Item Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 font-medium mb-2">
              Price ($)
            </label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Posting Item...' : 'Post Item'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;