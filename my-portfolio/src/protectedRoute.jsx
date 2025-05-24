import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import api from './api/api.jsx';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null means "loading"

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return setIsAuthenticated(false);

        const res = await axios.get(api.protected, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200) setIsAuthenticated(true);
        else setIsAuthenticated(false);
      } catch (err) {
        console.error("Token check failed", err.message);
        setIsAuthenticated(false);
      }
    };

    verifyToken();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Or a spinner
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
