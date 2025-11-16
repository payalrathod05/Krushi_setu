import React, { createContext, useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Login from "./components/Login";
import AllSchemes from "./pages/Schemes";
import ApplyScheme from './components/ApplyScheme';
import { Contact } from "./pages/Contact";
import { AboutUs } from "./pages/AboutUs";
import EligibleSchemes from "./pages/EligibleSchemes";
import { Profile } from "./pages/Profile";
import { ApplicationPage } from "./admin/ApplicationPage";
import { AdminLogin } from "./components/AdminLogin";
import { Notifications } from "./pages/Notifications";

// Create Auth Context
export const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const authData = localStorage.getItem("km-auth");
    if (authData) {
      try {
        const parsedAuth = JSON.parse(authData);
        setIsLoggedIn(true);
        setUser(parsedAuth);
        
        // Dispatch custom event for other components
        window.dispatchEvent(
          new CustomEvent("km-profile-change", { 
            detail: { profile: parsedAuth } 
          })
        );
      } catch (error) {
        console.error("Error parsing auth data:", error);
        localStorage.removeItem("km-auth");
      }
    }
  }, []);

  // Login function
  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem("km-auth", JSON.stringify(userData));
    
    // Dispatch custom event
    window.dispatchEvent(
      new CustomEvent("km-profile-change", { 
        detail: { profile: userData } 
      })
    );
  };

  // Logout function
  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("km-auth");
    
    // Dispatch custom event
    window.dispatchEvent(
      new CustomEvent("km-profile-change", { 
        detail: { profile: null } 
      })
    );
  };

  const authValue = {
    isLoggedIn,
    user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={authValue}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/apply/:schemeName" element={<ApplyScheme />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/eligible-scheme" element={<EligibleSchemes />} />
        <Route path="/allschemes" element={<AllSchemes />} />
        <Route path="/profile" element={<Profile/>}  />
        <Route path="/admin/application" element={<ApplicationPage/>} />
        <Route path="/admin/login" element={<AdminLogin/>} />
        <Route path="/notifications" element={<Notifications/>}/>
      </Routes>
      <Footer />
    </AuthContext.Provider>
  );
}

export default App;