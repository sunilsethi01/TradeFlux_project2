import React from 'react';

function LeftSection({
    imageURL,
    productName,
    productDescription, 
    tryDemo ,
    learnMore ,
    googlePlay ,
    appStore
    }) {
    return ( 
        <div className='product-left'>
            <div className='image'>
               <img src={imageURL} alt={productName} />
            </div>
            <div className='content'>
               <h2>{productName}</h2>
               <p>{productDescription}</p>
               <div>
                  {tryDemo && <a href={tryDemo}>Try Demo <i className="fa-solid fa-arrow-right-long"></i></a>}
                  {learnMore && <a href={learnMore}>Learn More <i className="fa-solid fa-arrow-right-long"></i></a>}
               </div>
               {(googlePlay || appStore) && (
                <div className='app-buttons'>
                   {googlePlay && <a href={googlePlay}><img src='media/images/googlePlayBadge.svg' alt='Google Play' /></a>}
                   {appStore && <a href={appStore}><img src='media/images/appstoreBadge.svg' alt='App Store' /></a>}
                </div>
               )}
            </div>
        </div>
     );
}

export default LeftSection;