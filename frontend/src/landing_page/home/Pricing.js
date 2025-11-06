import React from 'react';

function Pricing() {
    return ( 
       <div className='pricing-home-section'>
            <div className='pricing-home-left'>
                <h1>Unbeatable pricing</h1>
                <p>We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.</p>
                <a href='#'>See pricing <i className="fa-solid fa-arrow-right-long"></i></a>
            </div>
            
            <div className='pricing-home-right'>
                <div className='pricing-boxes'>
                    <div className='pricing-box'>
                        <h1>₹0</h1>
                        <p>Free equity delivery and direct mutual funds</p>
                    </div>
                    <div className='pricing-box'>
                        <h1>₹20</h1>
                        <p>Intraday and F&O</p>
                    </div>
                </div>
            </div>
       </div>
     );
}

export default Pricing;