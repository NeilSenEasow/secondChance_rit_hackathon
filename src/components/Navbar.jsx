import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, User, LogOut, ShoppingCart, Info, Store, LogIn, UserPlus, Home } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <ShoppingBag className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-800">SecondChance</span>
          </Link>
          
          <div className="relative flex-1 max-w-xl mx-8">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search for items..."
            />
          </div>
          
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center text-gray-700 hover:text-indigo-600">
              <Home className="h-5 w-5 mr-1" />
              <span>Home</span>
            </Link>

            <Link to="/about" className="flex items-center text-gray-700 hover:text-indigo-600">
              <Info className="h-5 w-5 mr-1" />
              <span>About</span>
            </Link>
            
            <Link to="/become-seller" className="flex items-center text-gray-700 hover:text-indigo-600">
              <Store className="h-5 w-5 mr-1" />
              <span>Become a Seller</span>
            </Link>

            <Link to="/cart" className="flex items-center text-gray-700 hover:text-indigo-600">
              <ShoppingCart className="h-5 w-5 mr-1" />
              <span>Cart</span>
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/add-product" className="flex items-center text-gray-700 hover:text-indigo-600">
                  <ShoppingBag className="h-5 w-5 mr-1" />
                  <span>Sell Item</span>
                </Link>
                <Link to="/profile" className="flex items-center text-gray-700 hover:text-indigo-600">
                  <User className="h-5 w-5 mr-1" />
                  <span>Profile</span>
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="flex items-center text-gray-700 hover:text-indigo-600"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="flex items-center text-gray-700 hover:text-indigo-600">
                  <LogIn className="h-5 w-5 mr-1" />
                  <span>Login</span>
                </Link>
                <Link to="/register" className="flex items-center text-gray-700 hover:text-indigo-600">
                  <UserPlus className="h-5 w-5 mr-1" />
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