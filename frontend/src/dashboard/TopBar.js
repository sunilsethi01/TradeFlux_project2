import React from "react";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";

const TopBar = ({ onLogout }) => {
  const navigate = useNavigate();
  
  const handleBackClick = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="topbar-container">
      <div className="indices-container">
        <a href="/" onClick={handleBackClick} className="back-btn">
          ← Back
        </a>
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className="index-points">{100.2} </p>
          <p className="percent"> </p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points">{100.2}</p>
          <p className="percent"></p>
        </div>
      </div>

      <Menu onLogout={onLogout} />
    </div>
  );
};

export default TopBar;
