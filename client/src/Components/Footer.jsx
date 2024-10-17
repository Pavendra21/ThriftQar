import React from 'react'
import { Link } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll';


const Footer = () => {
  return (
     <>
     <footer class="bg-gray-800 text-white py-8">
  <div class="container mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      {/* <!-- About Section --> */}
      <div>
        <h2 class="text-lg font-semibold mb-4">About Us</h2>
        <p class="text-gray-400">
          Welcome to our thrift store! We offer a wide variety of pre-loved items to help reduce waste and promote sustainability.
        </p>
      </div>

      {/* <!-- Quick Links Section --> */}
      <div>
        <h2 class="text-lg font-semibold mb-4">Quick Links</h2>
        <ul>
          <li class="mb-2">
            <Link to="/home" class="text-gray-400 hover:text-white">Home</Link>
          </li>
          <li class="mb-2">
            <ScrollLink to='products' smooth={true} class="text-gray-400 hover:text-white">Shop</ScrollLink>
          </li>
          <li class="mb-2">
            <a href="/" class="text-gray-400 hover:text-white">Contact</a>
          </li>
          <li class="mb-2">
            <a href="/" class="text-gray-400 hover:text-white">FAQs</a>
          </li>
        </ul>
      </div>

      {/* <!-- Contact Section --> */}
      <div>
        <h2 class="text-lg font-semibold mb-4">Contact Us</h2>
        <p class="text-gray-400">Email: info@thriftstore.com</p>
        <p class="text-gray-400">Phone: +123-456-7890</p>
        <div class="mt-4">
          <a href="/" class="text-gray-400 hover:text-white mr-4">
            <i class="fab fa-facebook"></i> Facebook
          </a>
          <a href="/" class="text-gray-400 hover:text-white mr-4">
            <i class="fab fa-twitter"></i> Twitter
          </a>
          <a href="/" class="text-gray-400 hover:text-white">
            <i class="fab fa-instagram"></i> Instagram
          </a>
        </div>
      </div>

    </div>

    <div class="mt-8 border-t border-gray-700 pt-4 text-center text-gray-500">
      © 2024 Thrift Store. All rights reserved.
    </div>
  </div>
</footer>

     
     
     </>
  )
}

export default Footer
