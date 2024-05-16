import React from "react";
import './footer.css'
import footer_logo from "../Assets/logo_big.png";
import instagram_icon from "../Assets/instagram_icon.png";
import pintester_icon from "../Assets/pintester_icon.png";
import whatsapp_icon from "../Assets/whatsapp_icon.png";
import { Link } from "react-router-dom";



export const Footer = () => {
  return (
    <div className="footer row">
      <div className="footer-top col-12">
        <div className="container row">
          <div className="footer-logo col-12 col-lg-3 col-md-12">
              <img src={footer_logo} alt="" />
            <Link to="/">
              <p>SHOPPER</p>
            </Link>
          </div>
          <ul className="footer-links col-12 col-lg-6 col-md-8">
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
          <div className="footer-social-icon col-12 col-lg-3 col-md-3">
            <div className="footer-icons-container">
              <img src={instagram_icon} alt="" />
            </div>
            <div className="footer-icons-container">
              <img src={pintester_icon} alt="" />
            </div>
            <div className="footer-icons-container">
              <img src={whatsapp_icon} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="footer-copyright col-12">
        <hr />
        <p>Copright @ 2024 - All Right Reserved</p>
      </div>
    </div>
  );
};
