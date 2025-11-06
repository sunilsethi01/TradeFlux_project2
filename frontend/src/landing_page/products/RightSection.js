import React from 'react';

function RightSection({
    imageURL,
    productName,
    productDescription, 
    learnMore ,
}) {
    return (  
         <div className='product-right'>
            <div className='image'>
               <img src={imageURL} alt={productName} />
            </div>
            <div className='content'>
               <h2>{productName}</h2>
               <p>{productDescription}</p>
               <div>
                  {learnMore && <a href={learnMore}>Learn More <i className="fa-solid fa-arrow-right-long"></i></a>}
               </div>
            </div>
        </div>
    );
}

export default RightSection;