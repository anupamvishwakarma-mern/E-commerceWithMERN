import React, { useEffect, useState } from "react";
import './popular.css'
import { Items } from "../items/Items";
import axios from 'axios';

export const Popular = () => {

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      await axios.get('http://localhost:8005/shopper/product/get').then(res => {
        setData(res?.data?.result)
        localStorage.setItem('data', JSON.stringify(res?.data?.result))
      })
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])



  return (
    <>
      {data ?
        <div className="popular">
          <h1>POPULAR IN WOMEN </h1>
          <hr />
          <div className="popular-item row">
            {data.map((item, i) => {
              if (item.category === 'women' && i < 4) {
                return <Items key={i} id={item._id} name={item.Title} image={item.images} new_price={item.new_price} old_price={item.old_price} />
              }
              return null;
            })}
          </div>
        </div>
        :
        <></>
      }
    </>
  );
};