import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, User, LogOut } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

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
          
          <div className="flex items-center">
            {isAuthenticated ? (
              <>
                <Link to="/add-product" className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700">
                  Sell Item
                </Link>
                <Link to="/profile" className="ml-4">
                  <User className="h-6 w-6 text-gray-600 hover:text-indigo-600" />
                </Link>
                <button onClick={logout} className="ml-4">
                  <LogOut className="h-6 w-6 text-gray-600 hover:text-indigo-600" />
                </button>
              </>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-indigo-600">Login</Link>
                <Link to="/register" className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;