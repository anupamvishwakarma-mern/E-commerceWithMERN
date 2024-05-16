import React from "react";
import './RelatedProduct.css'
import data_product from '../Assets/data'
import { Items } from "../items/Items";

export const RelatedProducts = ({ product }) => {

  const items = JSON.parse(localStorage.getItem('data'))
    
  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item row">
        {items.map((item, i) => {
          if(item.category === product.category && i < 4)
          return <Items key={i} id={item._id} name={item.Title} image={item.images} new_price={item.new_price} old_price={item.old_price} />
        })}
      </div>
    </div>
  );
};
