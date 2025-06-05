import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import api from '../api/api.jsx';
import { Helmet } from 'react-helmet';
import { jwtDecode } from 'jwt-decode';

export default function Login() {

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now(); // exp is in seconds

        if (isExpired) {
          localStorage.removeItem('token'); // optional
          navigate('/login'); // redirect to login or any other route
        } else {
          navigate('/dashboard'); // still valid
        }
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
        navigate('/login'); // fallback if token is malformed
      }
    }
  }, []);

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(api.login, {
        username,
        password
      });

      console.log("Login success:", res.data);
      // Save token or navigate to dashboard
      localStorage.setItem("token", res.data.token);
      navigate('/displayPortfolio');
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Login failed");
    }
  };

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mb-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 font-semibold">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Login
          </button>
        </form>
        <a href="/" className='text-center'>Go to home page</a>
      </div>
    </>
  );
};