import React from "react"; 

function Hero() {
  return (
    <section className="support-section">
      {/* Header */}
      <div className="support-header">
        <h4>Support Portal</h4>
        <a href="#" className="track-tickets">Track Tickets</a>
      </div>

      {/* Main content */}
      <div className="support-content">
        <div className="row">
          {/* Left side */}
          <div className="support-left">
            <h2 className="support-heading">
              Search for an answer or browse help topics to create a ticket
            </h2>

            <input
              type="text"
              className="support-input"
              placeholder="Eg: how do I activate F&O, why is my order getting rejected..."
            />

            <div className="support-links">
              <a href="#">Track account opening</a>
              <a href="#">Track segment activation</a>
              <a href="#">Intraday margins</a>
              <a href="#">Kite user manual</a>
            </div>
          </div>

          {/* Right side */}
          <div className="support-right">
            <h2 className="support-heading">Featured</h2>
            <ol>
              <li>
                <a href="#">Current Takeovers and Delisting - January 2024</a>
              </li>
              <li>
                <a href="#">Latest Intraday leverages - MIS & CO</a>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
