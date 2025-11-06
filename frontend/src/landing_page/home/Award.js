import React from 'react';

function Awards() {
    return ( 
    <div className='awards-section'>

        <div className='awards-image'>
            <img src='media/images/largestBroker.svg' alt='Largest Broker' />
        </div>

        <div className='awards-content'>
            <h1>Largest stock broker in India</h1>
            <p>2+ million TradeFlux clients contribute to over 15% of all retail order volumes in India daily by trading and investing in:</p>
            
            <div className='awards-lists'>
                <div className='awards-list'>
                    <ul>
                        <li><p>Future and Options</p></li>
                        <li><p>Commodity derivatives</p></li>
                        <li><p>Currency derivatives </p></li>
                    </ul>
                </div>
                <div className='awards-list'>
                    <ul>
                        <li><p>Stock & IPOs</p></li>
                        <li><p>Direct mutual funds</p></li>
                        <li><p>Bonds and Govt.Securities</p></li>
                    </ul>
                </div>
            </div>
            
            <img src='media/images/pressLogos.png' className='press-logos' alt='Press Logos' />
        </div>
    </div>
     );
}

export default Awards;