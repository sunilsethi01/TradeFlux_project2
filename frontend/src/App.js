import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { API_URL } from './config';
import './dashboard.css'; // Import dashboard styles
import './index.css';
import HomePage from "./landing_page/home/HomePage";
import Signup from "./landing_page/user/Signup";
import Login from "./landing_page/user/Login";
import AboutPage from "./landing_page/about/AboutPage";
import ProductPage from "./landing_page/products/ProductPage";
import PricingPage from "./landing_page/pricing/PricingPage";
import SupportPage from "./landing_page/support/SupportPage";

import Navbar from './landing_page/Navbar';
import Footer from './landing_page/Footer';
import NotFound from './landing_page/Notfound';

// Dashboard components - we'll import these from dashboard folder
import Dashboard from './dashboard/Dashboard';
import { GeneralContextProvider } from './dashboard/GeneralContext';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/check-auth`, {
        method: 'GET',
        headers: {
          'x-auth-token': token
        }
      });

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '20px'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <GeneralContextProvider>
      <Routes>
        {/* Landing Page Routes */}
        <Route path="/" element={
          <>
            <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            <HomePage />
            <Footer />
          </>
        } />
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/dashboard" /> : 
          <>
            <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            <Login onLoginSuccess={handleLoginSuccess} />
            <Footer />
          </>
        } />
        <Route path="/signup" element={
          isAuthenticated ? <Navigate to="/dashboard" /> : 
          <>
            <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            <Signup onSignupSuccess={handleLoginSuccess} />
            <Footer />
          </>
        } />
        <Route path="/about" element={
          <>
            <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            <AboutPage />
            <Footer />
          </>
        } />
        <Route path="/products" element={
          <>
            <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            <ProductPage />
            <Footer />
          </>
        } />
        <Route path="/pricing" element={
          <>
            <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            <PricingPage />
            <Footer />
          </>
        } />
        <Route path="/support" element={
          <>
            <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            <SupportPage />
            <Footer />
          </>
        } />
        
        {/* Dashboard Routes - Protected */}
        <Route path="/dashboard/*" element={
          isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" />
        } />
        
        {/* Legacy routes redirect */}
        <Route path="/user/Login" element={<Navigate to="/login" />} />
        <Route path="/user/Signup" element={<Navigate to="/signup" />} />
        
        <Route path="*" element={
          <>
            <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            <NotFound />
            <Footer />
          </>
        } />
      </Routes>
    </GeneralContextProvider>
  );
}

export default App;