import React, { createContext, useState, useEffect } from 'react';
import { decodeToken } from '../utils/jwtDecode'; // Import the decodeToken function


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = (userData, token) => {
    console.log(userData);
    setUser(userData); // Store user data including role and token
    setToken(token)
    // console.log(userData, token);
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token'); // Remove token on logout
  };
  
  useEffect(() => {
    if (!token) {
      // Example: fetch token from localStorage or a request and set it
      const savedToken = localStorage.getItem('token');
      if (savedToken) setToken(savedToken);
    }
    if (token) {
      try {
        const decoded = decodeToken(token);
        setUser(decoded);
      } catch (error) {
        console.error('Failed to decode token', error);
      }
    }
  }, []);
  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
