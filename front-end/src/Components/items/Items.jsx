import React, { useEffect, useState } from "react";
import "./items.css";
import { Link } from "react-router-dom";

export const Items = (props) => {

  const [image, setImage] = useState([]);

  useEffect(() => {
    setImage(props.image.split(','))
  }, [])


  return (
    <div className="item col-6 col-md-3 col-lg-3 p-3">
      <div className="item-container">
        <Link to={`/product/${props.id}`}>
          <img src={image[0]} alt="Products" title="View Details" onClick={window.scrollTo(0, 0)} />
        </Link>
        <div className="item-container-2">
          <p className="p-2">{props.name}</p>
          <div className="item-prices px-2">
            <div className="item-price-new">
              ₹{props.new_price}
            </div>
            <div className="item-price-old">
              ₹{props.old_price}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
