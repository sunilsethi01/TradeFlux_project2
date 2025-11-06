import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchHoldings = async () => {
      if (!token) {
        setError("Please login to view holdings");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:4000/api/trades/holdings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAllHoldings(response.data);
      } catch (err) {
        setError("Failed to fetch holdings");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHoldings();
  }, [token]);

  // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  const labels = allHoldings.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  // export const data = {
  //   labels,
  //   datasets: [
  // {
  //   label: 'Dataset 1',
  //   data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //   backgroundColor: 'rgba(255, 99, 132, 0.5)',
  // },
  //     {
  //       label: 'Dataset 2',
  //       data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
  //       backgroundColor: 'rgba(53, 162, 235, 0.5)',
  //     },
  //   ],
  // };

  // Calculate totals
  const totalInvestment = allHoldings.reduce((sum, stock) => sum + (stock.avg * stock.qty), 0);
  const currentValue = allHoldings.reduce((sum, stock) => sum + (stock.price * stock.qty), 0);
  const totalPL = currentValue - totalInvestment;
  const totalPLPercent = totalInvestment > 0 ? ((totalPL / totalInvestment) * 100).toFixed(2) : 0;

  if (loading) {
    return <div className="loading">Loading holdings...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (allHoldings.length === 0) {
    return (
      <div className="no-holdings">
        <h3>No Holdings</h3>
        <p>You haven't bought any stocks yet. Start trading to see your holdings here.</p>
      </div>
    );
  }

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>LTP</th>
            <th>Cur. val</th>
            <th>P&L</th>
            <th>Net chg.</th>
            <th>Day chg.</th>
          </tr>

          {allHoldings.map((stock, index) => {
            const curValue = stock.totalValue || (stock.price * stock.qty);
            const costValue = stock.totalCost || (stock.avg * stock.qty);
            const profitLoss = stock.profitLoss || (curValue - costValue);
            const isProfit = profitLoss >= 0.0;
            const profClass = isProfit ? "profit" : "loss";
            const dayClass = stock.day && stock.day.includes("-") ? "loss" : "profit";

            return (
              <tr key={stock._id || index}>
                <td>{stock.name || stock.symbol}</td>
                <td>{stock.qty}</td>
                <td>${stock.avg.toFixed(2)}</td>
                <td>${stock.price.toFixed(2)}</td>
                <td>${curValue.toFixed(2)}</td>
                <td className={profClass}>
                  ${profitLoss.toFixed(2)}
                </td>
                <td className={profClass}>{stock.net || "0.00%"}</td>
                <td className={dayClass}>{stock.day || "N/A"}</td>
              </tr>
            );
          })}
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            ${totalInvestment.toFixed(2)}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            ${currentValue.toFixed(2)}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 className={totalPL >= 0 ? "profit" : "loss"}>
            ${totalPL.toFixed(2)} ({totalPLPercent >= 0 ? '+' : ''}{totalPLPercent}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>
      <VerticalGraph data={data} />
    </>
  );

};

export default Holdings;
