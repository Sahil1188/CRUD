import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Profile = () => {
  const { id } = useParams(); 
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [showPassword, setShowPassword] = useState(false); 
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${id}`);
        setUser(response.data);
        setUsername(response.data.username);
        setEmail(response.data.email);
        setPassword(response.data.password); 
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await axios.put(`http://localhost:5000/api/users/${id}`, { username, email, password });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        alert('User deleted successfully!');
        navigate('/');
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex min-h-screen bg-cover  bg-center" style={{ backgroundImage: "url('/background.jpg')" }}>
      <div className="p-5 max-w-4xl mx-auto font-sans bg-opacity-90  rounded-lg shadow-lg mt-20">
        {user ? (
          <div className="border border-gray-300 rounded-lg p-5">
            <h1 className="text-4xl font-bold text-white text-center mb-3">Welcome, {username}!</h1>
            <p className="text-xl text-center mb-8 text-white">Here you can view, update, or delete your profile information.</p>

            <form className="flex flex-col" onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block font-semibold text-white mb-2">Username</label>
                <input 
                  type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  required 
                  className="w-full p-3 px-2 py-3 block border-2 border-white  bg-transparent text-white placeholder-gray-400 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold text-white mb-2">Email</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  className="w-full p-3 border-2 border-white  bg-transparent text-white placeholder-gray-400 rounded-md"
                />
              </div>
              <div className="mb-4 relative">
                <label className="block font-semibold text-white mb-2">Password</label>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  className="w-full p-3 border-2 border-white  bg-transparent text-white placeholder-gray-400 rounded-md"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute py-1.5 right-3 top-9 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <button 
                type="submit" 
                disabled={isUpdating}
                className={`w-40 p-3 border-solid border-2 border-white rounded-md bg-transparent text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-gray-800'} transition-colors duration-300`}
              >
                {isUpdating ? 'Updating...' : 'Update Profile'}
              </button>
            </form>
            <button 
              className="mt-5 p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
              onClick={handleDelete}
            >
              Delete Account
            </button>
          </div>
        ) : (
          <p>User not found.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
