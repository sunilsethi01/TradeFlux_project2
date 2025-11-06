import React, { useState, useEffect } from "react";
import { API_URL } from '../config';
import "./BuyActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [currentPrice, setCurrentPrice] = useState(0.0);
  const [availableQty, setAvailableQty] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const token = localStorage.getItem("token");

  // Fetch current stock price and available quantity
  useEffect(() => {
    const fetchStockData = async () => {
      if (!token) {
        setError("Please login to use sell features.");
        setLoading(false);
        return;
      }
      
      try {
        // Fetch current price
        const priceRes = await fetch(`${API_URL}/api/stocks/quote/${uid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (priceRes.ok) {
          const priceData = await priceRes.json();
          setCurrentPrice(priceData.currentPrice);
          setStockPrice(priceData.currentPrice);
        }

        // Fetch holdings to get available quantity
        const holdingsRes = await fetch(`${API_URL}/api/trades/holdings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (holdingsRes.ok) {
          const holdings = await holdingsRes.json();
          const holding = holdings.find(h => h.symbol === uid);
          if (holding) {
            setAvailableQty(holding.qty);
          } else {
            setError("You don't own this stock");
          }
        }
      } catch (err) {
        setError("Error fetching stock data");
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, [uid, token]);

  const handleSellClick = async () => {
    if (!token) {
      setError("Please login to use sell features.");
      return;
    }

    if (parseInt(stockQuantity) > availableQty) {
      setError(`You only have ${availableQty} shares available`);
      return;
    }
    
    setError(null);
    setSuccess(null);
    
    try {
      const response = await fetch(`${API_URL}/api/trades/sell`, {
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
        const profit = data.order.profit || 0;
        const profitText = profit >= 0 ? `Profit: $${profit.toFixed(2)}` : `Loss: $${Math.abs(profit).toFixed(2)}`;
        const message = `✅ Successfully sold ${stockQuantity} shares of ${uid} at $${data.order.price}!\n${profitText}\nTotal Revenue: $${data.order.total}\nNew Balance: $${data.balance}`;
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
    // Close the window by going back
    window.history.back();
  };

  const totalRevenue = (stockPrice * stockQuantity).toFixed(2);

  return (
    <div className="container" id="sell-window" draggable="true">
      <div className="regular-order">
        <h4>Sell {uid}</h4>
        {loading && <div className="info">Loading stock price...</div>}
        {error && <div className="error" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
        {success && <div className="success" style={{color: 'green', marginBottom: '10px'}}>{success}</div>}
        {!loading && currentPrice > 0 && (
          <div className="info" style={{marginBottom: '10px'}}>
            Current Price: ${currentPrice.toFixed(2)}<br/>
            Available: {availableQty} shares
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
              max={availableQty}
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
        <span>Total Revenue: ${totalRevenue}</span>
        <div>
          <button
            className="btn btn-red"
            onClick={handleSellClick}
            disabled={!token || loading || success || availableQty === 0}
          >
            {loading ? "Loading..." : success ? "Success!" : "Sell"}
          </button>
          <button className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellActionWindow;
