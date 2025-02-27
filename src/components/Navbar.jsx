import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  User,
  LogOut,
  ShoppingCart,
  Info,
  Store,
  LogIn,
  UserPlus,
  Home,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { mockProducts } from "../utils/mockData";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowResults(value.length > 0);
  };

  const filteredProducts = mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProductClick = (productId) => {
    setShowResults(false);
    setSearchTerm("");
    navigate(`/product/${productId}`);
  };

  return (
    <nav className='bg-white shadow-md relative'>
      <div className='container mx-auto px-4'>
        <div className='flex justify-between items-center h-16'>
          <Link to='/' className='flex items-center'>
            <ShoppingBag className='h-8 w-8 text-indigo-600' />
            <span className='ml-2 text-xl font-bold text-gray-800'>
              SecondChance
            </span>
          </Link>

          <div className='relative flex-1 max-w-xl mx-8'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <Search className='h-5 w-5 text-gray-400' />
            </div>
            <input
              type='text'
              value={searchTerm}
              onChange={handleSearch}
              className='block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              placeholder='Search for items...'
            />

            {/* Search Results Dropdown */}
            {showResults && (
              <div className='absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-96 overflow-y-auto'>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleProductClick(product.id)}
                      className='p-3 hover:bg-gray-100 cursor-pointer flex items-center space-x-3'
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className='w-12 h-12 object-cover rounded'
                      />
                      <div>
                        <div className='font-medium'>{product.name}</div>
                        <div className='text-sm text-gray-500'>
                          ${product.price}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='p-3 text-gray-500 text-center'>
                    No items found
                  </div>
                )}
              </div>
            )}
          </div>

          <div className='flex items-center space-x-6'>
            <Link
              to='/'
              className='flex items-center text-gray-700 hover:text-indigo-600'
            >
              <Home className='h-5 w-5 mr-1' />
              <span>Home</span>
            </Link>

            <Link
              to='/about'
              className='flex items-center text-gray-700 hover:text-indigo-600'
            >
              <Info className='h-5 w-5 mr-1' />
              <span>About</span>
            </Link>

            <Link
              to='/cart'
              className='flex items-center text-gray-700 hover:text-indigo-600'
            >
              <ShoppingCart className='h-5 w-5 mr-1' />
              <span>Cart</span>
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to='/add-product'
                  className='flex items-center text-gray-700 hover:text-indigo-600'
                >
                  <ShoppingBag className='h-5 w-5 mr-1' />
                  <span>Sell Item</span>
                </Link>
                <Link
                  to='/profile'
                  className='flex items-center text-gray-700 hover:text-indigo-600'
                >
                  <User className='h-5 w-5 mr-1' />
                  <span>{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className='flex items-center text-gray-700 hover:text-indigo-600'
                >
                  <LogOut className='h-5 w-5 mr-1' />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to='/login'
                  className='flex items-center text-gray-700 hover:text-indigo-600'
                >
                  <LogIn className='h-5 w-5 mr-1' />
                  <span>Login</span>
                </Link>
                <Link
                  to='/register'
                  className='flex items-center text-gray-700 hover:text-indigo-600'
                >
                  <UserPlus className='h-5 w-5 mr-1' />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
