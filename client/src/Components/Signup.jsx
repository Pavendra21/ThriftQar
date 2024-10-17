import React from 'react';
import { useState, } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";


// Validation of form fields

const validationSchema = Yup.object().shape({

    name: Yup.string().required('name is required'),

    phone: Yup.string()
        .matches(/^\d{10}$/, 'Phone number must be 10 digits')
        .required('phone is required'),

    email: Yup.string()
        .email("Invalid email address")
        .matches(/^[A-Za-z0-9._%+-]+@gmail\.com$/, 'Email address must be a valid Gmail address'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 to 8 characters')
        .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one special character')
        .required('password is required'),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match') // Ensure passwords match
        .required('Confirm Password is required'),



})



const Signup = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    })
    const [errors, setErrors] = useState({});


    const navigate = useNavigate();

    //Validation

    const validateForm = async () => {
        try {
            await validationSchema.validate(formData, { abortEarly: false });
            setErrors({});
            return true;

        }
        catch (err) {
            const newErrors = {};
            err.inner.forEach((err) => {

                newErrors[err.path] = err.message;

            })
            setErrors(newErrors);
            return false;

        }

    }




    // Getting data in formData

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));

    }
    // submit form data to server

    const handleSubmit = async (event) => {
        event.preventDefault();
        const isValid = await validateForm();

        if (!isValid) {
            return console.log("the inputs are not valid");
        }


        try {

            const response = await axios.post('http://localhost:8000/api/signup', formData)

            if (response.status === 200) {

                toast.success("Sign-up successfully!")
                setTimeout(() => {

                    navigate('/login')

                }, 1000)
                // console.log('Signup successful:', response.data);
                // Handle success (e.g., redirect, show message)
            }

        }

        catch (error) {
            // Check if the error response status is 409 (User already exists)
            if (error.response && error.response.status === 409) {
                toast.error("User already Exists")

            } else {
                console.error('Signup failed:', error.response ? error.response.data : error.message);
                // Handle other errors (e.g., network issues, server errors)
            }
        }




    }




    return (
        <>
            <ToastContainer />

            <div className="min-h-screen flex items-center justify-center  bg-orange-50">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>

                    <form onSubmit={handleSubmit}>
                        {/* Name */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                            <input
                                name="name"
                                type="text"
                                placeholder="Your Name"
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                required
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                            <input
                                name="email"
                                type="email"
                                onChange={handleChange}
                                placeholder="Your Email"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                required
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                        </div>

                        {/* Phone */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Phone</label>
                            <input
                                name="phone"
                                type="text"
                                onChange={handleChange}
                                placeholder="Your Phone Number"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                required
                            />
                            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                            <input
                                name="password"
                                type="password"
                                onChange={handleChange}
                                placeholder="Password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                required
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm_password">Confirm Password</label>
                            <input
                                name="confirmPassword"
                                onChange={handleChange}
                                type="password"
                                placeholder="Confirm Password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                required
                            />
                            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

                        </div>

                        {/* Signup Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
                        >
                            Sign Up
                        </button>
                    </form>

                    {/* Login Redirect */}
                    <p className="text-center text-gray-600 mt-4">
                        Already have an account?
                        <Link to='/login' className="text-blue-500 hover:underline">Login</Link>
                    </p>
                </div>
            </div>



        </>
    )
}

export default Signup

