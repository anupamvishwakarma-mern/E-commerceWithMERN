import React, { useEffect, useState } from "react";
import "./shop.css";
import { Items } from "../../Components/items/Items";
import right_arrow from "../../Components/Assets/breadcrum_arrow.png";
import avatar from "../../Components/Assets/sad octopus.png";
import { Link } from "react-router-dom";
import all_product from "../../Components/Assets/all_product";

export const ShopCategory = (props) => {
  const dataa = all_product;
  const [x, setX] = useState();
  const [max, setMax] = useState(12);
  const [data, setData] = useState([]);

  const fetchCategory = async () => {
    if (dataa) {
      await dataa.forEach((element, i) => {
        if (element.category === props.category) {
          setX(i);
          setData((prev) => [...prev, element]);
        }
        return;
      });
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <>
      {dataa ? (
        <div className="shop-category">
          <img src={props.banner} className="shopcategory-banner" alt="" />
          <div className="shopcategory-indexSort">
            <p>
              <span>Showing 1-{max}</span> out of {x} products
            </p>
            <div className="dropdown">
              <button
                className="dropdown-toggle shopcategory-sort"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Sort by
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="#">
                    Price
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Brand
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="#">
                    Newest
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="shopcategory-products row">
            {data.map((item, i) => {
              if (props.category === item.category && i < max) {
                return (
                  <Items
                    key={i}
                    id={item.id}
                    image={item.image}
                    name={item.name}
                    new_price={item.new_price}
                    old_price={item.old_price}
                  />
                );
              } else {
                return null;
              }
            })}
          </div>
          <div className="shopcategory-loadmore" onClick={() => setMax(x)}>
            Explore More
            <span>
              <img src={right_arrow} alt="" />
              <img src={right_arrow} alt="" />
            </span>
          </div>
        </div>
      ) : (
        <div className="container empty-container">
          <div className="empty-box">
            <img src={avatar} alt="avatar" />
            <span>
              {" "}
              Out of Stock! Visit <Link to="/">Home</Link>{" "}
            </span>
          </div>
        </div>
      )}
    </>
  );
};
