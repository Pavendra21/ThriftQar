import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';

// Validation Schema using Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Must be a valid Gmail address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
    .required('Phone number is required')
});

const EditProfile = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch current profile data to prefill the form
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('https://thriftqar-production.up.railway.app/api/userprofile', { withCredentials: true });
        setFormData({
          name: response.data.user.name,
          email: response.data.user.email,
          phone: response.data.user.phone,
        });
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Error fetching profile data');
      }
    };
    fetchProfile();
  }, []);

  // Form Validation
  const validateForm = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach(error => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
      return false;
    }
  };

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validateForm();
    if (!isValid) return;

    try {
      await axios.put('https://thriftqar-production.up.railway.app/api/editprofile', formData, { withCredentials: true });
      toast.success('Updated Successfully');
      navigate('/userprofile');
    } catch (error) {
      toast.error('Problem in Updating');
      setError('Failed to update profile');
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="flex justify-center items-center h-screen bg-orange-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h1 className="text-2xl font-bold text-center mb-6">Edit Profile</h1>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="block w-full p-2 border mb-4 rounded"
              required
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="block w-full p-2 border mb-4 rounded"
              required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="block w-full p-2 border mb-4 rounded"
              required
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

            <button type="submit" className="block w-full py-2 bg-indigo-600 text-white rounded">Update Profile</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
