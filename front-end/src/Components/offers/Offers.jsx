import React from "react";
import './offer.css'
import exclusive_image from "../Assets/exclusive_image.png";


export const Offers = () => {
  return (
    <div className="offers">
      <div className="container row">
        <div className="offers-left col-6">
          <h1>Exclusive</h1>
          <h1>Offers For You</h1>
          <p>ONLY ON BEST SELLERS PRODUCTS</p>
          <button>Check Now</button>
        </div>
        <div className="offers-right col-6">
          <img src={exclusive_image} alt="" />
        </div>
      </div>
    </div>
  );
};
