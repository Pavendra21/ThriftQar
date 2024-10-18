import React from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { TailSpin } from 'react-loader-spinner';

const ItemDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchDetails = async () => {

      const response = await axios.get(`https://thriftqar-production.up.railway.app/api/products/${id}`)
      setProduct(response.data)
      setLoading(false)


    }

    fetchDetails()

  }, [id])


  // Loading

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <TailSpin height="80" width="80" color="#3498db" ariaLabel="loading" />
      </div>
    );

  }



  return (
    <>
      <Navbar />
       
      <div className="container mx-auto p-4 mt-32 ">
        {/* Product Section */}
        <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0">
          {/* Product Image */}
          <div className="lg:w-1/2 ml-32">

            <img src={`https://thriftqar-production.up.railway.app${product.image}`} alt={product.name} className="w-full max-w-sm h-5/6 object-cover rounded-lg shadow-lg" />

          </div>

          {/* Product Details */}
          <div className="lg:w-1/2 mr-32 space-y-4">
            {/* Product Name */}
            <h1 className="text-3xl font-bold text-black">{product.name}</h1>
            <h1 className="text-xl font-semibold text-gray-00">Category: {product.category}</h1>

            {/* Product Rating */}
            <div className="flex items-center space-x-2">
              <span className="text-yellow-400">★★★★☆</span>
              <p className="text-gray-600">(25 reviews)</p>
            </div>

            {/* Product Price */}
            <div className="text-2xl font-semibold text-green-600">RS. {product.price}</div>

            {/* Product Description */}
            <p className="text-gray-700">
              {product.description}
            </p>

            {/* Product Size/Color Options */}
            <div className="space-y-2">
              <label className="block text-gray-700">Size: Currently not available</label>


              <label className="block text-gray-700">Color:</label>
              <div className="flex space-x-2">
                <div className="w-8 h-8 bg-red-500 rounded-full cursor-pointer"></div>
                <div className="w-8 h-8 bg-blue-500 rounded-full cursor-pointer"></div>
                <div className="w-8 h-8 bg-yellow-500 rounded-full cursor-pointer"></div>
                <div className="  h-8   rounded-full cursor-pointer">Currently not available</div>

              </div>
            </div>

            {/* Add to Cart Button */}
            <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>
       
    </>
  )
}

export default ItemDetail;
