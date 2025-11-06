import React from 'react';

function CreateTicket() {
    return (  
    <div className='create-ticket-section'>
        <h1>To create a ticket, select a relevant topic</h1>
        
        <div className='ticket-categories'>
            <div className='ticket-category'>
                <h4>
                   <i className="fa-solid fa-circle-plus"></i> Account Opening
                </h4>
                <a href=''>Resident individual</a>
                <a href=''>Minor</a>
                <a href=''>Non Resident Indian (NRI)</a>
                <a href=''>Company, Partnership, HUF and LLP</a>
                <a href=''>Charges at TradeFlux</a>
                <a href=''>TradeFlux IDFC FIRST Bank 3-in-1 Account</a>
                <a href=''>Getting Started</a>
            </div>
            
            <div className='ticket-category'>
                <h4>
                   <i className="fa-solid fa-circle-user"></i> Your TradeFlux Account
                </h4>
                <a href=''>Your Profile</a>
                <a href=''>Account modification</a>
                <a href=''>Client Master Report (CMR) and Depository</a>
                <a href=''>Participant (DP)</a>
                <a href=''>Nomination</a>
                <a href=''>Transfer and conversion of securities</a>
            </div>
            
            <div className='ticket-category'>
                <h4>
                   <i className="fa-solid fa-circle-arrow-left"></i> Kite
                </h4>
                <a href=''>IPO</a>
                <a href=''>Trading FAQs</a>
                <a href=''>Margin Trading Facility (MTF) and Margins</a>
                <a href=''>Charts and orders</a>
                <a href=''>Alerts and Nudges</a>
                <a href=''>General</a>
            </div>
            
            <div className='ticket-category'>
                <h4>
                   <i className="fa-solid fa-sack-dollar"></i> Funds 
                </h4>
                <a href=''>Add money</a>
                <a href=''>Withdraw money</a>
                <a href=''>Add bank accounts</a>
                <a href=''>eMandates</a>
                <a href=''>Charges at TradeFlux</a>
            </div>
            
            <div className='ticket-category'>
                <h4>
                   <i className="fa-solid fa-circle-left"></i> Console
                </h4>
                <a href=''>Portfolio</a>
                <a href=''>Corporate actions</a>
                <a href=''>Funds statement</a>
                <a href=''>Reports</a>
                <a href=''>Profile</a>
                <a href=''>Segments</a>
            </div>
            
            <div className='ticket-category'>
                <h4>
                   <i className="fa-solid fa-coins"></i> Coin
                </h4>
                <a href=''>Mutual funds</a>
                <a href=''>National Pension Scheme (NPS)</a>
                <a href=''>Fixed Deposit (FD)</a>
                <a href=''>Features on Coin</a>
                <a href=''>Payments and Orders</a>
                <a href=''>General</a>
            </div>
        </div>
    </div>
    );
}

export default CreateTicket;