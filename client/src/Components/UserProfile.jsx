import axios from 'axios'
import { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'; 
import { TailSpin } from 'react-loader-spinner';


const UserProfile = () => {

  // navigation

  const navigate = useNavigate()

  // UseState

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/userprofile', { withCredentials: true });
        setUser(response.data.user);
        setLoading(false); // Stop loading after data is fetched
      } catch (err) {
        console.error('Error fetching profile:', err);
        setLoading(false);
      }
    }

    fetchUserProfile();
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <TailSpin height="80" width="80" color="#3498db" ariaLabel="loading" />
      </div>
    );
  } 
  
  if (!user) 
    return <div>{navigate('/login')}</div>

  

// Log Out Functions

const handleLogOut = async () => {
  try {
    await axios.post('http://localhost:8000/api/logout', {}, { withCredentials: true });
    
    // Clear client-side token if necessary (although backend should handle this)
    Cookies.remove('token', { path: '/' });

    // Redirect the user after logout
    navigate('/login');
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-orange-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h1 className="text-2xl font-bold text-center mb-6">Profile</h1>
          <div className="text-center mb-6">
            <img
              className="w-24 h-24 rounded-full mx-auto border-4 border-indigo-500"
              src="https://www.freeiconspng.com/thumbs/profile-icon-png/am-a-19-year-old-multimedia-artist-student-from-manila--21.png"
              alt="Profile"
            />
            <h1 className="text-2xl font-semibold text-gray-800 mt-4">Name: {user.name}</h1>
            <p className="text-gray-800"><span className='font-semibold'>Email:</span> {user.email}</p>
            <p className="text-gray-800"><span className='font-semibold'>Phone:</span> {user.phone}</p>
          </div>

          {/* Column Layout for Buttons */}
          <div className="flex flex-col items-center space-y-4 mt-6">
            <Link to='/editprofile' className="w-full py-2 px-4 border border-gray-300 rounded-lg text-center hover:bg-gray-100 transition duration-200">
              Edit Profile
            </Link>
            <Link to='/additem' className="w-full py-2 px-4 border border-gray-300 rounded-lg text-center hover:bg-gray-100 transition duration-200">
              Add Item
            </Link>
            <Link to='/additem' className="w-full py-2 px-4 border border-gray-300 rounded-lg text-center hover:bg-gray-100 transition duration-200">
              Your Products
            </Link>
            <button className="w-full py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-200" onClick={handleLogOut}>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserProfile;
