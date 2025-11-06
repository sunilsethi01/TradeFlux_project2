import React from 'react';

function Universe() {
    return ( 
        <div className='universe-section'>
            <h2>The TradeFlux Universe</h2>
            <p>Extend your trading and investment experience even further with our partner platforms</p>
             
            <div className='universe-grid'>
             <div className='universe-item'>
               <img src="media/images/tradeflux fund.png" alt="TradeFlux Fund House" />
               <h3>TradeFlux Fund House</h3>
               <p>Our asset management venture that is creating simple and transparent index funds to help you save for your goals.</p>
             </div>
             <div className='universe-item'>
               <img src="media/images/sensibullLogo.svg" alt="Sensibull" />
               <h3>Sensibull</h3>
               <p>Options trading platform that lets you create strategies, analyze positions, and examine data points like open interest, FII/DII, and more.</p>
             </div>
             <div className='universe-item'>
               <img src="media/images/streakLogo.png" alt="Streak" />
               <h3>Streak</h3>
               <p>Systematic trading platform that allows you to create and backtest strategies without coding.</p>
             </div>
             <div className='universe-item'>
               <img src="media/images/smallcaselogo.png" alt="Smallcase" />
               <h3>Smallcase</h3>
               <p>Thematic investing platform that helps you invest in diversified baskets of stocks on ETFs.</p>
             </div>
             <div className='universe-item'>
               <img src="media/images/tijori.png" alt="Tijori" />
               <h3>Tijori</h3>
               <p>Investment research platform that offers detailed insights on stocks, sectors, supply chains, and more.</p>
             </div>
             <div className='universe-item'>
               <img src="media/images/dittoLogo.png" alt="Ditto" />
               <h3>Ditto</h3>
               <p>Personalized advice on life and health insurance. No spam and no mis-selling.</p>
             </div>
            </div>
            <button>Signup Now</button>
        </div>
     );
}

export default Universe;