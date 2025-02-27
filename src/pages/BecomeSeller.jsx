import React, { useState } from 'react';
import { Store, CheckCircle, AlertCircle, Package, MessageSquare, DollarSign, Star, Shield, Book, Laptop } from 'lucide-react';

const BecomeSeller = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    email: '',
    phone: '',
    agreement: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-indigo-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Start Your Selling Journey at RIT</h1>
            <p className="text-xl mb-8">Turn your pre-loved items into opportunities - Join the sustainable marketplace revolution</p>
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">0%</div>
                <div className="text-sm">Commission Fee</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-sm">Support</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">1000+</div>
                <div className="text-sm">Active Students</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* What You Can Sell Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">What You Can Sell</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Book className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Textbooks</h3>
              <p className="text-gray-600">Course materials, study guides, and academic resources</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Laptop className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Electronics</h3>
              <p className="text-gray-600">Laptops, calculators, and other tech gadgets</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Package className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">College Essentials</h3>
              <p className="text-gray-600">Dorm items, supplies, and equipment</p>
            </div>
          </div>
        </div>

        {/* Why Sell With Us Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Sell With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <DollarSign className="h-8 w-8 text-indigo-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Zero Commission</h3>
                <p className="text-gray-600">Keep 100% of your earnings - we don't charge any commission fees</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Star className="h-8 w-8 text-indigo-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Campus Reach</h3>
                <p className="text-gray-600">Direct access to thousands of students at RIT</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Shield className="h-8 w-8 text-indigo-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Secure Platform</h3>
                <p className="text-gray-600">Verified student accounts and secure transaction system</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <MessageSquare className="h-8 w-8 text-indigo-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Direct Communication</h3>
                <p className="text-gray-600">Chat directly with potential buyers on campus</p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-indigo-600 font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Register</h3>
              <p className="text-gray-600">Sign up with your student ID</p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-indigo-600 font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">List Items</h3>
              <p className="text-gray-600">Add photos and details</p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-indigo-600 font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Connect</h3>
              <p className="text-gray-600">Chat with interested buyers</p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-indigo-600 font-bold">4</span>
              </div>
              <h3 className="font-semibold mb-2">Sell</h3>
              <p className="text-gray-600">Complete the transaction</p>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Start Selling Today</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">Student ID</label>
                <input
                  type="text"
                  id="studentId"
                  name="studentId"
                  value={formData.studentId}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="agreement"
                  name="agreement"
                  checked={formData.agreement}
                  onChange={handleChange}
                  required
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="agreement" className="ml-2 block text-sm text-gray-700">
                  I agree to the seller terms and conditions
                </label>
              </div>

              {submitStatus === 'success' && (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>Application submitted successfully!</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="flex items-center text-red-600">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  <span>There was an error submitting your application. Please try again.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || !formData.agreement}
                className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  (isSubmitting || !formData.agreement) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeSeller; 