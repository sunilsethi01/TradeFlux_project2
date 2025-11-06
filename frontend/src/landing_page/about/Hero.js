import React from 'react';

function Hero() {
    return ( 
        <>
            <div className='about-hero'>
                <h1> 
                   We pioneered the discount broking model in India.<br/>
                   Now, we are breaking ground with our technology.
                </h1>
            </div>
            <div className='about-content'>
               <div className='left-column'>
                 <p>
                   We kick-started operations on the 20th of August, 2015 with the goal of breaking all barriers that
                    traders and investors face in India in terms of cost, support, and technology. We named the company 
                    TradeFlux, a combination of Trade and "Flux", "A continuous flow of trading".  
                 </p>
                 <p>
                    Today, our disruptive pricing models and in-house technology
                     have made us the biggest stock broker in India.
                 </p>
                 <p>
                    Over 1.2+ crore clients place billions of orders every year through our powerful ecosystem of 
                    investment platforms, contributing over 15% of all Indian retail trading volumes.
                 </p>
               </div>
               <div className='right-column'>
                 <p>
                    In addition, we run a number of popular open online educational and community initiatives to empower retail traders and investors.
                 </p>
                 <p>
                 <a href=''>Rainmatter</a>, our fintech fund and incubator, has invested in several fintech startups with the goal of growing the Indian capital markets.
                 </p>
                 <p>
                  And yet, we are always up to something new every day. Catch up on the latest updates on our blog or see what the media is saying about us or learn more about our business and product philosophies.  
                 </p>
               </div>
            </div>
        </>
     );
}

export default Hero;