import React from 'react';

function Team() {
    return (  
       <div className='people-section'>
            <h2>Inspired by</h2>
            <div className='founder-card'>
               <div className='founder-image'>
                 <img src='media/images/nithinkamath.jpg' alt='Nithin Kamath' />
               </div>
               <div className='founder-info'>
                 <h3>Nithin Kamath</h3>
                 <p>
                   This project is inspired by Nithin Kamath, who bootstrapped and founded Zerodha in 2010 to overcome the hurdles
                   he faced during his decade-long stint as a trader. 
                   Today, Zerodha has changed the landscape of the Indian broking industry. 
                 </p>
                 <p>
                  He is a member of the SEBI Secondary Market Advisory Committee (SMAC)
                 and the Market Data Advisory Committee (MDAC). 
                 </p>
                 <p>
                    Playing basketball is his zen.
                 </p>
                 <p>Connect on <a href='https://nithinkamath.me/' target='_blank' rel='noopener noreferrer'>Homepage</a> / <a href='https://tradingqna.com/' target='_blank' rel='noopener noreferrer'>TradingQnA</a> / <a href='https://twitter.com/Nithin0dha' target='_blank' rel='noopener noreferrer'>Twitter</a></p>
               </div>
            </div>
        </div>
    );
}

export default Team;