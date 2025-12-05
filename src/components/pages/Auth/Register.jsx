import React from 'react';
import { Link } from 'react-router';

const Register = () => {
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Create an Account</h2>
        <p className="text-gray-500 text-center mt-2">Fill in the form to get started</p>

        <form className="mt-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700">Name</label>
            <input 
              type="text" 
              placeholder="Enter your name"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700">Email</label>
            <input 
              type="email" 
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-gray-700">Photo URL</label>
            <input 
              type="text" 
              placeholder="Enter your photo URL"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-gray-700">Role</label>
            <select 
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="borrower">Borrower</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700">Password</label>
            <input 
              type="password" 
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <p className="text-xs text-gray-400 mt-1">
              Password must contain uppercase, lowercase, and at least 6 characters.
            </p>
          </div>

          {/* Register Button */}
          <button 
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors mt-4"
          >
            Register
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-500 text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-green-500 font-medium hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
