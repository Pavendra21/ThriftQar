import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Login = () => {

    const [loginData, setLoginData] = useState({

        email: '',
        password: '',

    })

    // Declareing Use Navigate 

    const navigate = useNavigate()


    // on handleChange function to get form data

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLoginData(prevData => ({

            ...prevData,
            [name]: value,

        }));

    }

     

    //  On submit function to send data to server

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

            const response = await axios.post('http://localhost:8000/api/login', loginData, { withCredentials: true })
            if (response.status === 200) {
                  toast.success('Login sucessfull')
                setTimeout(()=>{
                 navigate('/home')

                },1000)
            }

        }

        catch (error) {
            return toast.error('Invalid crediantials')
        }


    }



    return (
        <>
            <ToastContainer />
            <div className="flex items-center justify-center h-screen bg-orange-50">
                <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-center">Login</h2>
                    <form className="space-y-4" onSubmit={handleSubmit} >
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                onChange={handleChange}
                                className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                onChange={handleChange}
                                className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        {/* Login Button */}
                        <div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                            >
                                Login
                            </button>
                        </div>

                    </form>
                    {/* Signup Button */}
                    <div className="text-center">
                        <Link to='/'
                            type="button"
                            className="text-blue-500 hover:underline"
                        >
                            Sign up for an account
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
