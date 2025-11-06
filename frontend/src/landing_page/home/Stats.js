import React from 'react';

function Stats() {
    return ( 
        <div className='stats-section'>
            <div className='stats-left'>
                <h1>Trust with confidence</h1>
                <h2>Customer-first always</h2>
                <p>That's why 1.6+ crore customers trust TradeFlux with ₹6 lakh crores of equity investments, making us India's largest broker; contributing to 15% of daily retail exchange volumes in India.</p>
                <h2>No spam or gimmicks</h2>
                <p>No gimmicks, spam, "gamification", or annoying push notifications. High quality apps that you use at your pace, the way you like.</p>
                <h2>The TradeFlux universe</h2>
                <p>Not just an app, but a whole ecosystem. Our investments in 30+ fintech startups offer you tailored services specific to your needs.</p>
                <h2>Do better with money</h2>
                <p>With initiatives like Nudge and Kill Switch, we don't just facilitate transactions, but actively help you do better with your money.</p>
            </div>
            <div className='stats-right'>
                <img src='media/images/ecosystem.png' alt='Ecosystem' />
                <div className='stats-links'>
                    <a href='#'>Explore our products <i className="fa-solid fa-arrow-right-long"></i></a>
                    <a href='#'>Try Kite demo <i className="fa-solid fa-arrow-right-long"></i></a>
                </div>
            </div>
        </div>
     );
}

export default Stats;