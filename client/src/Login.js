import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, email, password });
      if (response.data && response.data.id) {
        alert('Login successful!');
        navigate(`/profile/${response.data.id}`);  // Redirect to profile page
      } else {
        alert('Invalid username, email, or password.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/background.jpg')" }}>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-2xl px-6 py-8 bg-opacity-90 rounded-lg shadow-lg">
          <h2 className="text-3xl font-extrabold text-white mb-6">Secure Login for Your Account</h2>
          <p className="text-white mb-8">Access your account with ease and start exploring. Enter your credentials below.</p>
          <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
            <input 
              type="text" 
              placeholder="Username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
              className="w-full p-3 border-2 border-white rounded-md bg-transparent text-white placeholder-gray-400"
            />
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="w-full p-3 border-2 border-white rounded-md bg-transparent text-white placeholder-gray-400"
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="w-full p-3 border-2 border-white rounded-md bg-transparent text-white placeholder-gray-400"
            />
            <button 
              type="submit" 
              disabled={loading}
              className={`w-40 p-3 border-solid border-2 border-white rounded-md bg-transparent text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-gray-800'} transition-colors duration-300`}            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-lg text-center">
          <h1 className="text-6xl font-extrabold font-serif text-white mb-6">Secure Access to Your Account</h1>
          <p className="text-3g text-white">Log in to access your personal dashboard and manage your account details.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
