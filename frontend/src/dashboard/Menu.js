import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_URL } from '../config';

const Menu = ({ onLogout }) => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUserData = async () => {
    if (!token) return;

    try {
      // Fetch user info
      const userRes = await axios.get(`${API_URL}/api/auth/check-auth`, {
        headers: { "x-auth-token": token },
      });
      setUser(userRes.data.user);

      // Fetch portfolio
      const portfolioRes = await axios.get(`${API_URL}/api/trades/portfolio`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPortfolio(portfolioRes.data);
    } catch (err) {
      console.error("Error fetching user data:", err);
    }
  };

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem('token');
      toast.success("Logged out successfully!", {
        position: "bottom-right",
        autoClose: 2000
      });
      if (onLogout) onLogout();
      setTimeout(() => {
        navigate('/');
      }, 500);
    }
  };

  const formatCurrency = (value) => {
    if (!value) return "0.00";
    return value.toFixed(2);
  };


  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  const userInitials = user?.username ? user.username.substring(0, 2).toUpperCase() : "U";

  return (
    <div className="menu-container">
      <Link to="/dashboard" className="dashboard-brand">
        <div className="custom-arrow">
          <div className="arrow-shape"></div>
        </div>
      </Link>
      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/dashboard"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/dashboard/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/dashboard/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/dashboard/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/dashboard/funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/dashboard/apps"
              onClick={() => handleMenuClick(6)}
            >
              <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>
        <hr />
        <div className="profile" onClick={handleProfileClick}>
          <div className="avatar">{userInitials}</div>
          <p className="username">{user?.username || "User"}</p>
        </div>
        
        {/* Profile Dropdown */}
        {isProfileDropdownOpen && (
          <>
            {/* Backdrop Overlay */}
            <div 
              onClick={handleProfileClick}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'rgba(0, 0, 0, 0.5)',
                zIndex: 1999
              }}
            />
            
            {/* Sidebar Panel */}
            <div className="profile-dropdown" style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '280px',
              height: '100vh',
              background: 'white',
              borderLeft: '1px solid #ddd',
              padding: '20px',
              boxShadow: '-2px 0 10px rgba(0,0,0,0.1)',
              zIndex: 2000,
              animation: 'slideInRight 0.3s ease-out',
              overflowY: 'auto'
            }}>
              <div style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                  <h4 style={{ margin: 0, fontSize: '18px', fontWeight: '500' }}>{user?.username || "User"}</h4>
                  {/* Close Button */}
                  <button
                    onClick={handleProfileClick}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '28px',
                      cursor: 'pointer',
                      color: '#666',
                      padding: 0,
                      lineHeight: 1,
                      marginTop: '-5px'
                    }}
                  >
                    ×
                  </button>
                </div>
                <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>{user?.email || ""}</p>
              </div>
            
            {portfolio && (
              <div style={{ fontSize: '13px', marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span>Balance:</span>
                  <strong>${formatCurrency(portfolio.balance)}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span>Invested:</span>
                  <strong>${formatCurrency(portfolio.totalInvested)}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span>Current Value:</span>
                  <strong>${formatCurrency(portfolio.currentValue)}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <span>P&L:</span>
                  <strong style={{ color: portfolio.profitLoss >= 0 ? 'green' : 'red' }}>
                    ${formatCurrency(Math.abs(portfolio.profitLoss))} ({portfolio.profitLossPercent})
                  </strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Holdings:</span>
                  <strong>{portfolio.holdingsCount}</strong>
                </div>
              </div>
            )}
            
            <div style={{ borderTop: '1px solid #eee', paddingTop: '10px' }}>
              <button 
                onClick={handleLogout}
                style={{
                  width: '100%',
                  padding: '8px',
                  background: '#ff5733',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                Logout
              </button>
            </div>
          </div>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Menu;


          


