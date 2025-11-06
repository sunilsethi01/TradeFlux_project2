import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from '../config';

const Summary = () => {
  const [portfolio, setPortfolio] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Fetch portfolio summary
        const portfolioRes = await axios.get(`${API_URL}/api/trades/portfolio`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPortfolio(portfolioRes.data);

        // Fetch user info
        const userRes = await axios.get(`${API_URL}/api/auth/check-auth`, {
          headers: { "x-auth-token": token },
        });
        setUser(userRes.data.user);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) {
    return <div className="loading">Loading summary...</div>;
  }

  if (!portfolio || !user) {
    return (
      <div className="summary-error">
        <p>Please login to view your portfolio summary</p>
      </div>
    );
  }

  const formatCurrency = (value) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(2)}k`;
    }
    return value.toFixed(2);
  };

  const plClass = portfolio.profitLoss >= 0 ? "profit" : "loss";

  return (
    <div className="dashboard-page summary-page">
      <div className="username">
        <h6>Hi, {user.username}!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>${formatCurrency(portfolio.balance)}</h3>
            <p>Available Balance</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Invested <span>${formatCurrency(portfolio.totalInvested)}</span>
            </p>
            <p>
              Total Portfolio <span>${formatCurrency(portfolio.totalPortfolioValue)}</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({portfolio.holdingsCount})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={plClass}>
              ${formatCurrency(Math.abs(portfolio.profitLoss))}{" "}
              <small>{portfolio.profitLossPercent}</small>
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>${formatCurrency(portfolio.currentValue)}</span>
            </p>
            <p>
              Investment <span>${formatCurrency(portfolio.totalInvested)}</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </div>
  );
};

export default Summary;
