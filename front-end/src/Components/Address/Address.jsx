import React, { useEffect } from "react";
import './address.css'
import { Outlet, useNavigate } from "react-router-dom";
import { useCustom } from "../../Context/ShopContext";

export const Address = () => {

  const { cartItems } = useCustom()
  const navigate = useNavigate()
  const products = JSON.parse(localStorage.getItem('data'))
  const deliveryAdd = JSON.parse(localStorage.getItem('deliver_address'))

  useEffect(() => {
    const scrollTop = () => {
      window.scrollTo(0,0)
    }
    scrollTop()
  },[window.location])

  const checkPaymentPath = () => {
    if (window.location.pathname === '/checkout/payment') {
      document.querySelector('#proceed').classList.add('d-none')
    } else {
      document.querySelector('#proceed').classList.remove('d-none')
    }
  }

  useEffect(() => {
    checkPaymentPath()
    if (document.querySelector('#proceed').classList.contains('d-none')) {
      document.querySelector('#delivery-add').classList.remove('d-none')
    } else {
      document.querySelector('#delivery-add').classList.add('d-none')
    }
  }, [window.location.pathname])

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

  return (
    <section className="address">
      <div className="container">
        <div className="row">
          <div className="col-8">
            <Outlet />
          </div>
          <div className="col-4" style={{ borderLeft: '1px solid lightgray' }}>
            <div className="right_card">
              <h6>Price details ( {cartItems.product ? cartItems.product.length : '0'} items)</h6>
              <hr />
              <div className="amount">
                <span>Total Amount</span>
                <span> ₹ {getTotalCartAmount()} </span>
              </div>
              <hr />

              <div className="delivery-add d-none" id="delivery-add">
                <h6> Delivery Address </h6>
                <span style={{ color: '#000' }}> {deliveryAdd.name} </span>
                <span> {deliveryAdd.address}, {deliveryAdd.landmark}, {deliveryAdd.city}, {deliveryAdd.state}-{deliveryAdd.pin} </span>
                <span style={{ color: '#000' }}> {deliveryAdd.mobile} </span>
              </div>
              <div>
                <button onClick={() => navigate('/checkout/payment')} id="proceed"> Proceed To Pay </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section >
  );
};
