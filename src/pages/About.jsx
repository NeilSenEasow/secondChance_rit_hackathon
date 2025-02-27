import React from "react";
import {
  ShoppingBag,
  Recycle,
  Heart,
  DollarSign,
  Leaf,
  GraduationCap,
  Globe,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const About = () => {
  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <div className='bg-indigo-600 text-white py-20'>
        <div className='container mx-auto px-4'>
          <h1 className='text-5xl font-bold text-center mb-6'>
            Welcome to SecondChance
          </h1>
          <p className='text-xl text-center max-w-3xl mx-auto text-indigo-100'>
            A sustainable marketplace created by students, for students. Giving
            pre-loved items a new home while making education more affordable.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className='container mx-auto px-4 py-16'>
        <div className='grid md:grid-cols-2 gap-12 items-center'>
          <div>
            <h2 className='text-3xl font-bold mb-6 text-gray-800'>
              Our Mission
            </h2>
            <p className='text-gray-600 text-lg leading-relaxed mb-6'>
              We're on a mission to create a sustainable and affordable
              marketplace for students. By connecting buyers and sellers within
              our campus community, we're reducing waste and making education
              more accessible.
            </p>
            <div className='bg-white p-6 rounded-lg shadow-sm border border-gray-100'>
              <h3 className='font-semibold text-xl mb-4 text-indigo-600'>
                Impact Goals
              </h3>
              <ul className='space-y-3'>
                {[
                  "Reduce campus waste by 30%",
                  "Help students save up to 50% on materials",
                  "Build an eco-conscious community",
                  "Promote sustainable habits",
                ].map((goal, index) => (
                  <li key={index} className='flex items-center text-gray-700'>
                    <span className='h-2 w-2 bg-indigo-500 rounded-full mr-3'></span>
                    {goal}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-6'>
            {[
              {
                icon: ShoppingBag,
                title: "Easy Trading",
                count: "1000+",
                label: "Items Listed",
              },
              {
                icon: Recycle,
                title: "Sustainability",
                count: "500kg",
                label: "Waste Reduced",
              },
              {
                icon: GraduationCap,
                title: "Student Focus",
                count: "2000+",
                label: "Active Users",
              },
              {
                icon: Heart,
                title: "Community",
                count: "800+",
                label: "Happy Users",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className='bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center'
              >
                <stat.icon className='h-8 w-8 text-indigo-600 mx-auto mb-3' />
                <h3 className='font-semibold text-gray-800 mb-1'>
                  {stat.title}
                </h3>
                <div className='text-2xl font-bold text-indigo-600 mb-1'>
                  {stat.count}
                </div>
                <div className='text-sm text-gray-500'>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SDG Section */}
      <div className='bg-white py-16'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-12 text-gray-800'>
            Supporting UN Sustainable Development Goals
          </h2>
          <div className='grid md:grid-cols-2 gap-8 max-w-4xl mx-auto'>
            <div className='bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl shadow-sm'>
              <Globe className='h-12 w-12 text-indigo-600 mb-4' />
              <h3 className='text-xl font-semibold mb-3 text-gray-800'>
                SDG 12: Responsible Consumption
              </h3>
              <p className='text-gray-600'>
                Promoting sustainable consumption patterns through reuse and
                recycling of pre-loved items within our campus community.
              </p>
            </div>
            <div className='bg-gradient-to-br from-indigo-50 to-white p-6 rounded-xl shadow-sm'>
              <Leaf className='h-12 w-12 text-indigo-600 mb-4' />
              <h3 className='text-xl font-semibold mb-3 text-gray-800'>
                SDG 13: Climate Action
              </h3>
              <p className='text-gray-600'>
                Taking action against climate change by extending product
                lifecycles and reducing the carbon footprint of our community.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className='container mx-auto px-4 py-16'>
        <div className='max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden'>
          <div className='md:flex'>
            <div className='md:w-1/2 bg-indigo-600 p-8 text-white'>
              <h3 className='text-2xl font-bold mb-6'>Get in Touch</h3>
              <div className='space-y-4'>
                <div className='flex items-center'>
                  <Mail className='h-5 w-5 mr-3' />
                  <span>support@secondchance.com</span>
                </div>
                <div className='flex items-center'>
                  <Phone className='h-5 w-5 mr-3' />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className='flex items-center'>
                  <MapPin className='h-5 w-5 mr-3' />
                  <span>University Campus, Building 4</span>
                </div>
              </div>
            </div>
            <div className='md:w-1/2 p-8'>
              <h3 className='text-2xl font-bold mb-6 text-gray-800'>
                Send us a Message
              </h3>
              <form className='space-y-4'>
                <input
                  type='text'
                  placeholder='Your Name'
                  className='w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500'
                />
                <input
                  type='email'
                  placeholder='Your Email'
                  className='w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500'
                />
                <textarea
                  placeholder='Your Message'
                  rows='4'
                  className='w-full px-4 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500'
                ></textarea>
                <button
                  type='submit'
                  className='w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors'
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
