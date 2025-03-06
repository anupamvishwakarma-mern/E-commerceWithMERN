import React, { createContext, useContext, useEffect, useState } from "react";
import all_product from "../Components/Assets/all_product";
import axios from "axios";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  // const shopperData =
  //   localStorage.getItem("data") && JSON.parse(localStorage.getItem("data"));
  const user =
    localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));

  const getDefaultCart = () => {
    if (all_product) {
      let cart = {};
      for (let i = 0; i < all_product.length + 1; i++) {
        cart[i] = 0;
      }
      return cart;
    }
  };

  const [cartItems, setCartItems] = useState(getDefaultCart());

  const getCartData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8005/shopper/cart/get/${user._id}`
      );

      setCartItems(response?.data?.cart);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCartData();
  }, []);

  // const getTotalCartAmount = () => {
  //   let totalAmount = 0
  //   for (let item in cartItems) {
  //     if (Number(cartItems[item]) > 0) {
  //       let itemInfo = shopperData.find((product) => product._id === item)
  //       totalAmount = totalAmount + itemInfo.new_price * cartItems[item]
  //     }
  //   }
  //   return totalAmount;
  // }

  // const getTotalCartItems = () => {
  //   let totalItem = 0;
  //   for (const item in cartItems) {
  //     if (cartItems[item] > 0) {
  //       totalItem += cartItems[item]
  //     }
  //   }
  //   return totalItem
  // }

  const contextValue = { all_product, cartItems, setCartItems };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export const useCustom = () => {
  return useContext(ShopContext);
};

export default ShopContextProvider;
