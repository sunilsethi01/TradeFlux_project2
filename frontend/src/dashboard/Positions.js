import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from '../config';
import { positions as dummyPositions } from "../data/data";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPositions = async () => {
      if (!token) {
        setError("Please login to view positions");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/api/trades/positions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        // If user has no positions, show dummy data for better UX
        if (response.data.length === 0) {
          setAllPositions(dummyPositions);
        } else {
          setAllPositions(response.data);
        }
      } catch (err) {
        // On error, show dummy data instead of error
        console.error("Error fetching positions:", err);
        setAllPositions(dummyPositions);
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, [token]);



  if (loading) {
    return <div className="loading">Loading positions...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  // Always show data (either real or dummy) - removed empty state

  return (
    <div className="dashboard-page positions-page">
      <h3 className="title">Positions ({allPositions.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Product</th>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg.</th>
            <th>LTP</th>
            <th>P&L</th>
            <th>Chg.</th>
          </tr>

          {allPositions.map((stock, index) => {
            const curValue = stock.price * stock.qty;
            const isProfit = curValue - stock.avg * stock.qty >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = stock.isLoss ? "loss" : "profit";

            return (
              <tr key={stock._id || index}>
                <td>{stock.product || "CNC"}</td>
                <td>{stock.name || stock.symbol}</td>
                <td>{stock.qty}</td>
                <td>${stock.avg.toFixed(2)}</td>
                <td>${stock.price.toFixed(2)}</td>
                <td className={profClass}>
                  ${(curValue - stock.avg * stock.qty).toFixed(2)}
                </td>
                <td className={dayClass}>{stock.day || "N/A"}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};



export default Positions;