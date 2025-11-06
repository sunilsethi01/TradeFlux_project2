import React from 'react';

function Hero() {
    return ( 
        <>
            <div className='pricing-hero'>
             <h1>Pricing</h1>
             <p>Free equity investments and flat ₹20 intraday and F&O trades</p>
            </div>
            
            <div className='pricing-cards'>
                <div className='pricing-card'>
                  <img src='media/images/pricingEquity.svg' alt='Free equity delivery' />
                  <h2>Free equity delivery</h2>
                  <p>All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage.</p>
                </div>
                
                <div className='pricing-card'>
                  <img src='media/images/intradayTrades.svg' alt='Intraday and F&O trades' />
                  <h2>Intraday and F&O trades</h2>
                  <p>Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on all option trades.</p>
                </div>
                
                <div className='pricing-card'>
                  <img src='media/images/pricingEquity.svg' alt='Free direct MF' />
                  <h2>Free direct MF</h2>
                  <p>All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges.</p>
                </div>
            </div>
        </>
     );
}

export default Hero;