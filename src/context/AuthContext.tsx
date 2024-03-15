import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(localStorage.getItem("access_token"));
  const [role, setRole] = useState(null); 
  const [userId, setUserId] = useState(null); 

  const login = (accessToken,userId, role) => {
    console.log("role obtained",role)

    localStorage.setItem("access_token", accessToken);
    setAccessToken(accessToken);
    setIsAuthenticated(true);
    setRole(role); 
    setUserId(userId);
  };


  const logout = () => {
    localStorage.removeItem("access_token");
    setIsAuthenticated(false);
    setRole(null); 
    setUserId(null);
  };

  const checkTokenExpiration = () => {
    const token = localStorage.getItem("access_token");
    if (!token) return;
    const tokenPayload = JSON.parse(atob(token.split(".")[1]));
    const tokenExp = tokenPayload.exp * 1000; 
    const currentTime = new Date().getTime();
    if (currentTime > tokenExp) {
      logout();
    }
  };

  useEffect(() => {
    // Check token expiration every minute
    const interval = setInterval(checkTokenExpiration, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, role }}>
      {children}
    </AuthContext.Provider>
  );
};
