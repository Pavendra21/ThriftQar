import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';
import Landing from "./Landing";
import { Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Products = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation(); // Use this to get the current URL
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                // Get the category from the URL query parameters
                const queryParams = new URLSearchParams(location.search);
                const category = queryParams.get('category');
                
                // Make a request to fetch products based on the category
                const response = await axios.get(`https://thriftqar-production.up.railway.app/api/products?category=${category || ''}`);
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProductData();
    }, [location]); // Add location as a dependency

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
        <Navbar/>
            <Landing />
            <section id='products' className="text-gray-600 body-font bg-orange-50">
                <div className="container px-5 py-24 mx-auto">
                    <p className='text-center mb-12 text-2xl text-black font-semibold'>{category ? `${category} Category` : 'All Products'}</p>
                    <div className="flex flex-wrap -m-4">
                        {data.map(product => (
                            <div key={product._id} className="p-4 w-full md:w-1/2 lg:w-1/3">
                                <div className="max-w-xs bg-white mt-8 shadow-lg rounded-lg overflow-hidden mx-auto">
                                    <Link to={`/products/${product._id}`}>
                                        <div className="flex items-center justify-center h-64 bg-gray-200">
                                            <img src={`http://localhost:8000${product.image}`} alt={product.name} className="max-w-full max-h-full" />
                                        </div>
                                        <div className="p-4">
                                            <span className="text-gray-400 uppercase text-xs font-bold">{product.category}</span>
                                            <h4 className="text-gray-800 text-lg font-semibold mt-2 hover:text-yellow-400 transition duration-300">
                                                <a href="/">{product.name}</a>
                                            </h4>
                                            <div className="border-t border-gray-200 mt-4 pt-2 flex justify-between items-center">
                                                <div className="text-yellow-600 font-semibold text-lg">
                                                    Rs. {product.price}
                                                </div>
                                                <div className="flex space-x-2">
                                                    <Link to='/' className="text-black font-semibold hover:text-yellow-400 transition duration-300">
                                                        Add to Cart
                                                    </Link>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    );
};

export default Products;
