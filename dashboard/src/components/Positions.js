import React, { useState, useEffect } from "react";
import axios from "axios";

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
        const response = await axios.get("http://localhost:4000/api/trades/positions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllPositions(response.data);
      } catch (err) {
        setError("Failed to fetch positions");
        console.error(err);
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

  if (allPositions.length === 0) {
    return (
      <div className="no-positions">
        <h3>No Positions</h3>
        <p>You don't have any open positions.</p>
      </div>
    );
  }

  return (
    <>
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
    </>
  );
};



export default Positions;