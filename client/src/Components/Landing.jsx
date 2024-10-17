import React from 'react'
 import { Link as ScrollLink } from 'react-scroll';
 

const Landing = () => {
  return (
     <>
     <div className="bg-gray-600">
  {/* Header Section */}
  <header className="bg-red-200 text-black py-12 min-h-[300px] flex items-center">
    <div className="container mx-auto text-center">
      <h1 className="text-4xl font-bold">Welcome to Thrift Store</h1>
      <p className="mt-2 text-lg">Your one-stop shop for amazing deals!</p>
    </div>
  </header>

  {/* Hero Section */}
  <section className="py-20 bg-red-200 min-h-[300px] flex items-center">
    <div className="container mx-auto text-center">
      <h2 className="text-3xl font-semibold">Discover Unique Finds</h2>
      <p className="mt-4 text-black">
        Explore our curated collection of vintage and pre-loved items.
      </p>
      <div className="mt-8">  
              <ScrollLink 
                to='products' 
                className="mb-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 cursor-pointer">
                Shop Now
              </ScrollLink>
            </div>
    </div>
  </section>
</div>

     
     
     </>
  )
}

export default Landing
