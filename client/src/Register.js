import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Check if email already exists
      const existingUser = await axios.get(`http://localhost:5000/api/users/email/${email}`);
      
      if (existingUser.data) {
        // Email already exists, suggest login
        alert('Email is already registered. Redirecting to login page.');
        navigate('/login');
        return;
      }

      // Register new user
      const response = await axios.post('http://localhost:5000/api/users', { username, email, password });
      alert('User registered successfully!');
      const userId = response.data.id;
      navigate(`/profile/${userId}`);
    } catch (error) {
      console.error('Error registering user:', error);
    } finally {
      setLoading(false);
      // Clear form fields after submission
      setUsername('');
      setEmail('');
      setPassword('');

      // Clear local and session storage
      localStorage.removeItem('formData');
      sessionStorage.removeItem('formData');
    }
  };

  return (
    <div className="flex min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/background.jpg')" }}>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-2xl px-6 py-8 bg-opacity-90 rounded-lg shadow-lg">
          <h2 className="text-3xl font-extrabold text-white mb-6">Seamless Registration for Future Access</h2>
          <p className="text-white mb-8">Experience a smooth registration process with our intuitive form. Get started now!</p>
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
              className={`w-40 p-3 border-solid border-2 border-white rounded-md bg-transparent text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-gray-800'} transition-colors duration-300`} 
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-lg text-center">
          <h1 className="text-6xl font-extrabold font-serif text-white mb-6">Seamless Registration for Future Access</h1>
          <p className="text-4x font-serif text-white">Experience the future of user registration with ease and efficiency. Join us now!</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
