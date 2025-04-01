import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const token = localStorage.getItem('token');

    // Function to check if the token has expired
    const checkTokenExpiration = (token) => {
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;  
            if (decodedToken.exp < currentTime) {
                return true; 
            }
            return false;  
        } catch (error) {
            return true;  
        }
    };

    useEffect(() => {
        if (token && !checkTokenExpiration(token)) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);  
            localStorage.removeItem('token'); 
        }
    }, [token]);  

    const setToken = (token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, setToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
