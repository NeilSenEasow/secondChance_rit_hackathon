import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Filter } from "lucide-react";
import ProductCard from "../components/ProductCard";

const categories = [
  "All Categories",
  "Electronics",
  "Furniture",
  "Books",
  "Sports",
  "Others",
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://secondchance-rit-hackathon-1.onrender.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on category and price range
  useEffect(() => {
    const filteredProducts = products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All Categories" ||
        product.category === selectedCategory;
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesCategory && matchesPrice;
    });

    setProducts(filteredProducts);
  }, [selectedCategory, priceRange]);

  return (
    <div className='flex flex-col md:flex-row'>
      {/* Mobile filter button */}
      <button
        className='md:hidden flex items-center mb-4 text-gray-600'
        onClick={() => setShowFilters(!showFilters)}
      >
        <Filter className='h-5 w-5 mr-2' />
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

      {/* Sidebar filters */}
      <div
        className={`${
          showFilters ? "block" : "hidden"
        } md:block w-full md:w-64 mr-8`}
      >
        <div className='bg-white p-4 rounded-lg shadow-sm'>
          <h2 className='font-bold text-lg mb-4'>Filters</h2>

          <div className='mb-6'>
            <h3 className='font-medium mb-2'>Categories</h3>
            <div className='space-y-2'>
              {categories.map((category) => (
                <div key={category} className='flex items-center'>
                  <input
                    type='radio'
                    id={category}
                    name='category'
                    checked={selectedCategory === category}
                    onChange={() => setSelectedCategory(category)}
                    className='h-4 w-4 text-indigo-600 focus:ring-indigo-500'
                  />
                  <label
                    htmlFor={category}
                    className='ml-2 text-sm text-gray-700'
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className='font-medium mb-2'>Price Range</h3>
            <div className='flex items-center justify-between mb-2'>
              <span className='text-sm text-gray-600'>${priceRange[0]}</span>
              <span className='text-sm text-gray-600'>${priceRange[1]}</span>
            </div>
            <input
              type='range'
              min='0'
              max='1000'
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], parseInt(e.target.value)])
              }
              className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer'
            />
          </div>
        </div>
      </div>

      {/* Product grid */}
      <div className='flex-1'>
        <h1 className='text-2xl font-bold mb-6'>Browse Items</h1>

        {products.length === 0 ? (
          <div className='text-center py-10'>
            <p className='text-gray-500'>
              No products found matching your criteria.
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {products.map((product) => (
              <Link key={product.id} to={`/product/${product.id}`}>
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
