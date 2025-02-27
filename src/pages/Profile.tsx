import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, MapPin, Calendar, Package, Star, Settings, PlusCircle } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { mockProducts } from '../utils/mockData';
import ProductCard from '../components/ProductCard';

const Profile: React.FC = () => {
  const { isAuthenticated, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('listings');
  const [userProfile, setUserProfile] = useState<any>(null);
  const [userListings, setUserListings] = useState<any[]>([]);
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // In a real app, you would fetch the user profile from your API
    setUserProfile(mockUser);
    
    // Filter products to get user's listings
    const listings = mockProducts.filter(p => p.seller.id === mockUser.id);
    setUserListings(listings);
  }, [isAuthenticated, navigate]);

  if (!userProfile) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Profile Header */}
        <div className="p-6 sm:p-8 bg-indigo-50">
          <div className="flex flex-col sm:flex-row items-center">
            <div className="h-24 w-24 rounded-full bg-indigo-100 flex items-center justify-center">
              <User className="h-12 w-12 text-indigo-500" />
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900">{userProfile.name}</h1>
              <div className="flex flex-col sm:flex-row sm:items-center mt-2 text-gray-600">
                <div className="flex items-center justify-center sm:justify-start">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{userProfile.location}</span>
                </div>
                <span className="hidden sm:block mx-2">•</span>
                <div className="flex items-center justify-center sm:justify-start mt-1 sm:mt-0">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Member since {userProfile.joinedDate}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 sm:mt-0 sm:ml-auto">
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <Settings className="h-4 w-4 mr-2" />
                Edit Profile
              </button>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">{userProfile.listings}</div>
              <div className="text-sm text-gray-500">Listings</div>
            </div>
            <div>
              <div className="flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-900">{userProfile.rating}</span>
                <Star className="h-5 w-5 ml-1 text-yellow-400" />
              </div>
              <div className="text-sm text-gray-500">Rating</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {Math.floor(Math.random() * 50) + 10}
              </div>
              <div className="text-sm text-gray-500">Sales</div>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('listings')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'listings'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Package className="h-5 w-5 mx-auto mb-1" />
              My Listings
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'favorites'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Star className="h-5 w-5 mx-auto mb-1" />
              Favorites
            </button>
            <button
              onClick={() => setActiveTab('purchases')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'purchases'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Package className="h-5 w-5 mx-auto mb-1" />
              Purchases
            </button>
          </nav>
        </div>
        
        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'listings' && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">My Listings</h2>
                <Link
                  to="/add-product"
                  className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
                >
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Add New Listing
                </Link>
              </div>
              
              {userListings.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 mx-auto text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No listings yet</h3>
                  <p className="mt-1 text-gray-500">Get started by creating your first listing.</p>
                  <div className="mt-6">
                    <Link
                      to="/add-product"
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add New Listing
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userListings.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </>
          )}
          
          {activeTab === 'favorites' && (
            <div className="text-center py-12">
              <Star className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No favorites yet</h3>
              <p className="mt-1 text-gray-500">Items you favorite will appear here.</p>
              <div className="mt-6">
                <Link
                  to="/"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Browse Items
                </Link>
              </div>
            </div>
          )}
          
          {activeTab === 'purchases' && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 mx-auto text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No purchases yet</h3>
              <p className="mt-1 text-gray-500">Items you've purchased will appear here.</p>
              <div className="mt-6">
                <Link
                  to="/"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Browse Items
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;