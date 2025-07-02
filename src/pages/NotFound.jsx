import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 px-4">
      <h1 className="text-7xl font-bold text-blue-600 mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-lg text-gray-600 mb-6 text-center max-w-md">
        Oops! The page you're looking for doesn't exist. It might have been removed or the URL might be incorrect.
      </p>
      <Link
        to="/"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition"
      >
        🔙 Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
