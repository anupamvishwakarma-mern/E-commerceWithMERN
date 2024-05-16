import React from "react";
import './hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from "../Assets/arrow.png";
import hero_img from '../Assets/hero_image.png'


export const Hero = () => {
  return (
    <div className="hero ">
      <div className="container row">
        <div className="hero-left col-6 col-sm-6">
          <h2>NEW ARRIVALS ONLY</h2>
          <div>
            <div className="hero-hand-icon">
              <p>new</p>
              <img src={hand_icon} alt="" />
            </div>
            <p>Collections</p>
            <p>for everyone</p>
          </div>
          <div className="hero-latest-btn">
            <div>Latest Collection</div>
            <img src={arrow_icon} alt="" />
          </div>
        </div>
        <div className="hero-right col-6 col-sm-6">
          <img src={hero_img} alt="" />
        </div>
      </div>
    </div>
  );
};
