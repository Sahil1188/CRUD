import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <h1>Welcome to Our Site!</h1>
      <p>We are glad to have you here. Click below to register and get started.</p>
      <Link to="/register" className="register-button">Register</Link>
    </div>
  );
}

export default Home;
