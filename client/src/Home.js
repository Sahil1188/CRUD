import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div 
      className="flex flex-col items-center justify-center p-12 h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <div className="text-center text-gray-50 font-bold italic mb-8">
        <h1 className="text-5xl mb-5">Welcome to Our Site!</h1>
        <p className="text-xl">We are glad to have you here. Click below to register and get started.</p>
      </div>
      <Link 
        to="/register" 
        className="inline-block px-6 py-2 text-lg text-blue-500 border border-blue-500 rounded-md bg-transparent hover:bg-blue-500 hover:text-white"
      >
        Register
      </Link>
    </div>
  );
}

export default Home;
