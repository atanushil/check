import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
      <div className="max-w-2xl p-8 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl text-center">
        <h1 className="text-5xl font-bold mb-4">TodoMaster</h1>
        <p className="text-lg mb-6">Organize your day, one task at a time. Simple, powerful, and reliable.</p>
        <div className="flex justify-center gap-6">
          <Link to="/login">
            <button className="bg-white text-indigo-600 font-semibold px-6 py-2 rounded-full hover:bg-gray-100 transition duration-300">
              Log In
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-indigo-700 text-white font-semibold px-6 py-2 rounded-full hover:bg-indigo-800 transition duration-300">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
