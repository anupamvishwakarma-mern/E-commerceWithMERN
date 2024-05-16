import React from "react";
import './breadcrum.css'
import arrow_icon from "../Assets/breadcrum_arrow.png";
import { Link } from "react-router-dom";


export const Breadcrum = (props) => {
  const { product } = props
  // console.log(product)
  return (
    <div className="breadcrum">
      Home <img src={arrow_icon} alt="" /> <Link to="/"> SHOP </Link><img src={arrow_icon} alt="" /><Link to={`/${product.category}s`}> {product.category}</Link> <img src={arrow_icon} alt="" /> {product.Title}
    </div>
  );
};
