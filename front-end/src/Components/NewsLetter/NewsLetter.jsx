import React from "react";
import './newsLetter.css'

export const NewsLetter = () => {
  return (
    <div className="news-letter">
      <div className="container">
        <h1>Get Exclusive Offers On Your Email</h1>
        <p>Subscribe to our newsletter and stay updated</p>
        <div className="bottom-div">
          <input type="email" placeholder="Your Email Id" />
          <button>Subscribe</button>
        </div>
      </div>
    </div>
  );
};
