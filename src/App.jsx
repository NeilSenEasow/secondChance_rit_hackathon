import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import AddProduct from './pages/AddProduct';
import Profile from './pages/Profile';
import About from './pages/About';
import BecomeSeller from './pages/BecomeSeller';
import Cart from './pages/Cart';
import axios from 'axios';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  const fetchAPI = async() => {
    try {
      const response = await axios.get("http://localhost:5000/");
      console.log(response.data.fruits);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/about" element={<About />} />
                <Route path="/become-seller" element={<BecomeSeller />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </main>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App; 