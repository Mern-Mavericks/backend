import React, { createContext, useState, useContext } from "react";

// Create an instance of context for managing authentication state
const AuthContext = createContext();

// Custom hook to utilize AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component providing state to its children
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to login the user
  const login = () => {
    setIsAuthenticated(true);
  };

  // Function to logout the user
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
