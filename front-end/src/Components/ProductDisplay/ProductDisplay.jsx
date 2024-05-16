import React, { useEffect, useState } from "react";
import "./productDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCustom } from "../../Context/ShopContext";


export const ProductDisplay = (props) => {

  const { cartItems,setCartItems } = useCustom();
  const { product } = props
  const images = product.images.split(',')
  const navigate = useNavigate()
  const [img, setImg] = useState(images[0]);
  const [userData, setUserData] = useState();

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem('user')) || [])
  }, [])

  const setImage = (img) => {
    setImg(img)
  }

  const addToCart = async (itemId) => {
    
      try {
        await axios.post('http://localhost:8005/shopper/cart/addtocart', { p_id: itemId, u_id: userData._id, nop: 1 }).then((res) => {
          setCartItems(res?.data?.result)
        })
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <div className="productdisplay row">
      <div className="productdisplay-left col-12 col-md-6">
        <div className="productdisplay-img-list">
          {images.map((img, i) => {
            return (
              <img src={img} alt="product" key={i} onClick={() => setImage(img)} />
            )
          })}
        </div>
        <div className="productdisplay-img">
          <img src={img} className="productdisplay-main-img" alt="show img" />
        </div>
      </div>
      <div className="productdisplay-right col-12 col-md-6">
        <h1>{product.Title}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ₹{product.old_price}
          </div>
          <div className="productdisplay-right-price-new">
            ₹{product.new_price}
          </div>
        </div>
        <div className="productdisplay-right-description">
          A shirt is a piece of clothing typically made of cotton, polyester, or a blend of the two. It is designed to be worn over the torso, with short sleeves that cover the shoulders and upper arms.
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button onClick={() => addToCart(product._id)}>ADD TO CART</button>
        <p className="productdisplay-right-category">
          <span>Category :</span>Women T-Shirt, Crop Top
        </p>
        <p className="productdisplay-right-category">
          <span>Tags :</span>Modern, Latest
        </p>
      </div>
    </div>
  );
};
