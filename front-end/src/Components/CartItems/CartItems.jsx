import React, { useEffect, useState } from "react";
import './cartItems.css'
import { useCustom } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


export const CartItems = () => {

  const { cartItems, setCartItems } = useCustom()
  const navigate = useNavigate()
  const products = JSON.parse(localStorage.getItem('data'))
  const user = JSON.parse(localStorage.getItem('user'))
  
  useEffect(() => {
    const scrollTop = () => {
      window.scrollTo(0,0)
    }
    scrollTop()
  }, [window.location])
  
  const getTotalCartAmount = () => {
    var price = 0
    if (cartItems.product) {
      cartItems.product.forEach(elem => {
        products.forEach(item => {
          if (elem.p_id === item._id) {
            price += item.new_price * elem.nop
          }
        });
      });
      return price;
    }
  }

  const removeFromCart = async (p_id) => {
    try {
      const res = await axios.delete(`http://localhost:8005/shopper/cart/deletecart/${user._id}/${p_id}`)
      
      setCartItems(res?.data?.result)
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div className="cartitems">
      <div className="container">
        <table className="table table-striped" style={{ width: '100%' }}>
          <thead className="">
            <tr>
              <th>#</th>
              <th scope="col">Products</th>
              <th scope="col">Title</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Total</th>
              <th scope="col" className="col-1" style={{ textAlign: 'center' }}>Del</th>
            </tr>
          </thead>
          {cartItems.product ?
            <tbody >
              {cartItems.product.map((e, ix) => {
                const { p_id, nop } = e;
                return (
                  <>
                    {
                      products.map((item, i) => {
                        if (p_id === item._id) {
                          const img0 = item.images.split(',')[0]
                          return (
                            <tr className="cartitems-format" key={i}>
                              <th style={{ fontSize: '13px' }}>{ix + 1}</th>
                              <td>
                                <img src={img0} alt="images" className="cartitems-product-icon" />
                              </td>
                              <td onClick={window.scrollTo(0, 0)} >
                                <Link to={`/product/${item._id}`}>{item.Title}</Link>
                              </td>
                              <td>₹{item.new_price} </td>
                              <td>
                                <input type="number" className="cartitems-quantity" value={nop} disabled/>
                              </td>
                              <td>₹{item.new_price * nop} </td>
                              <td>
                                <img src={remove_icon} className="cartitems-remove-icon" alt=""
                                  onClick={() => removeFromCart(p_id)} />
                              </td>
                            </tr>
                          )
                        }
                      })
                    }
                  </>
                )
              })}
            </tbody> : <></>
          }
        </table>
        <div className="cartitems-down row">
          <div className="cartitems-total col-12 col-md-6 col-lg-6 order-lg-first order-md-first">
            <h1>Cart Total</h1>
            <div>
              <div className="cartitems-total-item">
                <p>Subtotal</p>
                <p>₹{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <p>Shipping Fee</p>
                <p>{getTotalCartAmount() >= 499? <> <span style={{fontSize:'12px',color:'green', fontWeight:'bold'}}><del style={{textDecorationColor:'red'}}> ₹40</del></span> Free</> : <span style={{fontSize:'12px',color:'green', fontWeight:'bold'}}> ₹40</span> } </p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <p>Total</p>
                <p>₹{getTotalCartAmount()}</p>
              </div>
            </div>
            <button onClick={()=>navigate('/checkout/address')}>CHECKOUT</button>
          </div>
          <div className="cartitems-promocode col-12 col-md-6 col-lg-5 order-first">
            <p>If you have a promo code, Enter it here</p>
            <div className="cartitems-promobox">
              <input type="text" placeholder="Promo Code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
