import React from "react";
import './newCollections.css'
import { Items } from "../items/Items";

export const NewCollections = () => {

  const collection = JSON.parse(localStorage.getItem('data'))

  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      {
        collection ?
          <div className="collections row">
            {
              collection.map((item, i) => {
                return <Items key={i} id={item._id} name={item.Title} image={item.images} new_price={item.new_price} old_price={item.old_price} />
              })
            }
          </div>
          :
          <>
          </>
      }
    </div>
  );
};
