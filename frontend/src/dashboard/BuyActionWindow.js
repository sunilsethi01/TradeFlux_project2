import React, { useState, useEffect } from "react";
import { API_URL } from '../config';
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [currentPrice, setCurrentPrice] = useState(0.0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const token = localStorage.getItem("token");

  // Fetch current stock price on mount
  useEffect(() => {
    const fetchStockPrice = async () => {
      if (!token) {
        setError("Please login to use buy features.");
        setLoading(false);
        return;
      }
      
      try {
        const response = await fetch(`${API_URL}/api/stocks/quote/${uid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setCurrentPrice(data.currentPrice);
          setStockPrice(data.currentPrice);
        } else {
          setError("Failed to fetch stock price");
        }
      } catch (err) {
        setError("Error fetching stock data");
      } finally {
        setLoading(false);
      }
    };

    fetchStockPrice();
  }, [uid, token]);

  const handleBuyClick = async () => {
    if (!token) {
      setError("Please login to use buy features.");
      return;
    }
    
    setError(null);
    setSuccess(null);
    
    try {
      const response = await fetch(`${API_URL}/api/trades/buy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          symbol: uid,
          qty: parseInt(stockQuantity),
          orderType: "MARKET"
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        const message = `✅ Successfully bought ${stockQuantity} shares of ${uid} at $${data.order.price}!\nTotal Cost: $${data.order.total}\nRemaining Balance: $${data.balance}`;
        setSuccess(message);
        alert(message);
        setTimeout(() => {
          window.location.reload(); // Refresh to show updated holdings
        }, 1000);
      } else {
        const errorMsg = data.msg || "Failed to place order";
        setError(errorMsg);
        alert(`❌ Error: ${errorMsg}`);
      }
    } catch (err) {
      setError("Failed to place order. Please try again.");
    }
  };

  const handleCancelClick = () => {
    // Close the window by reloading or using context
    window.history.back();
  };

  const totalCost = (stockPrice * stockQuantity).toFixed(2);

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <h4>Buy {uid}</h4>
        {loading && <div className="info">Loading stock price...</div>}
        {error && <div className="error" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
        {success && <div className="success" style={{color: 'green', marginBottom: '10px'}}>{success}</div>}
        {!loading && currentPrice > 0 && (
          <div className="info" style={{marginBottom: '10px'}}>
            Current Price: ${currentPrice.toFixed(2)}
          </div>
        )}
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
              min="1"
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
              min="0"
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>Total Cost: ${totalCost}</span>
        <div>
          <button
            className="btn btn-blue"
            onClick={handleBuyClick}
            disabled={!token || loading || success} // disable if not logged in or loading
          >
            {loading ? "Loading..." : success ? "Success!" : "Buy"}
          </button>
          <button className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;

