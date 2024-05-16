import React from "react";
import './error404.css';
import avatar from '../Assets/angry_octopus.png'
import { Link } from "react-router-dom";

export const Error404 = () => {
  return (
    <div className="error-404">
      <div className="container">
        <div className="left-box">
          <h1>You are wrong place</h1>
          <p>Found Error 404! Visit <Link to="/">Home</Link></p>
        </div>
        <div className="right-box">
          <img src={avatar} alt="" />
        </div>
        <span></span>
      </div>
    </div>
  );
};
