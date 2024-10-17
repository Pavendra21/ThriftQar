import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaUserAlt, FaShoppingCart } from "react-icons/fa";
import { Link as ScrollLink } from 'react-scroll';

const Navbar = () => {
  const navigate = useNavigate();

  // State to manage menu toggle and selected category
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category

  // Toggle function
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle category change
  const handleCategoryChange = (category) => {
    setSelectedCategory(category); // Update the state with selected category
    if (category) {
      navigate(`/products?category=${category}`); // Navigate to filtered products
    } else {
      navigate('/products'); // Show all products if no category is selected
    }
  };

  return (
    <>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Company Name */}
            <Link to='/home' className="flex-shrink-0 text-white text-xl font-bold">
              ThriftQar
            </Link>

            {/* Middle: Links for larger screens */}
            <div className="hidden md:flex space-x-8">
              <Link to="/home" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <ScrollLink to="products" smooth={true} className="text-gray-300 hover:text-white cursor-pointer px-3 py-2 rounded-md text-sm font-medium">
                Buy Items
              </ScrollLink>

              <div>
                <select
                  value={selectedCategory} // Set value from state
                  onChange={(e) => handleCategoryChange(e.target.value)} // Handle change
                  className="text-gray-300 bg-gray-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  <option value="" disabled>Select Category</option>
                  <option value="">All Products</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Home_Decor">Home Décor</option>
                  <option value="Electronics">Electronics</option>
                </select>
              </div>
              <Link to="/about" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                About
              </Link>
            </div>

            {/* Right: Profile and Logout buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to='/UserProfile' className="text-white px-4 py-2 rounded-md hover:bg-gray-600">
                <FaUserAlt size={20} />
              </Link>
              <Link to='/cart' className="text-white px-4 py-2 rounded-md hover:bg-gray-600">
                <FaShoppingCart size={20} />
              </Link>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                type="button"
                className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/home" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              Home
            </Link>
            <ScrollLink to="products" smooth={true} className="text-gray-300 hover:text-white cursor-pointer px-3 py-2 rounded-md text-sm font-medium">
              Buy Items
            </ScrollLink>
            <div>
              <select
                value={selectedCategory} // Set value from state for mobile
                onChange={(e) => handleCategoryChange(e.target.value)} // Handle change
                className="text-gray-300 bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                <option value="" disabled>Select Category</option>
                <option value="">All Products</option>
                <option value="Clothing">Clothing</option>
                <option value="Accessories">Accessories</option>
                <option value="Home_Decor">Home Décor</option>
                <option value="Electronics">Electronics</option>
              </select>
            </div>
            <Link to="/about" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
              About
            </Link>
            <Link to='/UserProfile' className="text-white px-4 py-2 rounded-md hover:bg-gray-600">
              <FaUserAlt size={20} margin={10} />
            </Link>
            <Link to='/cart' className="text-white px-4 py-2 rounded-md hover:bg-gray-600">
              <FaShoppingCart  size={20} margin={10}  />
            </Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
