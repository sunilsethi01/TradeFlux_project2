import React from 'react';

function Education() {
    return (  
        <div className='education-section'>
            <div className='education-image'>
                <img src='media/images/education.svg' alt='Education' />
            </div>
            <div className='education-content'>
                <h1>Free and open market education</h1>
                <p>Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.</p>
                <a href='#'>Varsity <i className="fa-solid fa-arrow-right-long"></i></a>

                <p>TradingQ&A, the most active trading and investment community in India for all your market related queries.</p>
                <a href='#'>TradingQ&A <i className="fa-solid fa-arrow-right-long"></i></a>
            </div>
        </div>
    );
}

export default Education;