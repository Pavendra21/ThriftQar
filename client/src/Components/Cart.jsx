import React from 'react'
import Navbar from './Navbar'

const Cart = () => {
  return (
    <>
    <Navbar/>
    <div class="min-h-screen bg-orange-50 py-12">
  <div class="container mx-auto">
    {/* <!-- Cart Heading --> */}
    <h1 class="text-3xl font-bold mb-8 text-center text-gray-700">Shopping Cart</h1>

    <div class="flex flex-col lg:flex-row lg:space-x-12 ml-8 mr-8">
      {/* <!-- Cart Items Section --> */}
      <div class="flex-grow bg-white shadow-md rounded-lg p-6">
        {/* <!-- Cart Item --> */}
        <div class="flex items-center justify-between border-b py-6">
          {/* <!-- Product Image --> */}
          <img src="https://via.placeholder.com/100" alt="Product" class="w-24 h-24 object-cover rounded"/>
          
          {/* <!-- Product Details -->/ */}
          <div class="flex-grow px-6">
            <h2 class="text-lg font-semibold">Product Name</h2>
            <p class="text-gray-500">₹1000</p>
            <p class="text-gray-500">Quantity: 1</p>
          </div>
          
          {/* <!-- Remove Button --> */}
          <button class="text-red-500 hover:text-red-700">
            Remove
          </button>
        </div>
        
        {/* <!-- Repeat similar block for each item in the cart --> */}
        <div class="flex items-center justify-between border-b py-6">
          <img src="https://via.placeholder.com/100" alt="Product" class="w-24 h-24 object-cover rounded"/>
          <div class="flex-grow px-6">
            <h2 class="text-lg font-semibold">Another Product</h2>
            <p class="text-gray-500">₹1500</p>
            <p class="text-gray-500">Quantity: 2</p>
          </div>
          <button class="text-red-500 hover:text-red-700">
            Remove
          </button>
        </div>
      </div>

      {/* <!-- Cart Summary Section --> */}
      <div class="bg-white shadow-md rounded-lg p-6 lg:w-1/3 mt-6 lg:mt-0">
        <h2 class="text-xl font-bold mb-4 text-gray-700">Order Summary</h2>
        <div class="border-t py-4">
          <p class="flex justify-between text-gray-700">
            <span>Subtotal</span>
            <span>₹2500</span>
          </p>
          <p class="flex justify-between text-gray-700">
            <span>Shipping</span>
            <span>₹100</span>
          </p>
          <p class="flex justify-between text-gray-700 font-semibold border-t pt-4">
            <span>Total</span>
            <span>₹2600</span>
          </p>
          <button class="w-full bg-blue-600 text-white py-3 mt-6 rounded-lg hover:bg-blue-700">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

    
    </>
  )
}

export default Cart
