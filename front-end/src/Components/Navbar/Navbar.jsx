import React, { useEffect, useState } from "react";
import './navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCustom } from "../../Context/ShopContext";
import userIcon from '../Assets/user.png'

export const Navbar = () => {

  const { cartItems } = useCustom();
  const [scrollY, setScrollY] = useState(0);
  const [userDetail, setUserDetail] = useState();
  const navigate = useNavigate();

  const location = useLocation()
  const [menu, setMenu] = useState(location.pathname);
  useEffect(() => {
    setMenu(location.pathname)
  }, [location])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setUserDetail(JSON.parse(localStorage.getItem('user')))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div className={`navbar ${scrollY > 50 ? "navbar-bg-fixed" : "transparent"} `}>
      <div className="nav-logo order-first">
        <img src={logo} alt="" />
        <p>SHOPPER</p>
      </div>
      <ul className="nav-menu order-last">
        <li onClick={() => setMenu('/')}><Link to="/">Shop</Link> {menu === "/" ? <hr /> : <></>} </li>
        <li onClick={() => setMenu('/mens')}><Link to="/mens">Men</Link>{menu === "/mens" ? <hr /> : <></>} </li>
        <li onClick={() => setMenu('/womens')}><Link to="/womens">Women</Link>{menu === "/womens" ? <hr /> : <></>} </li>
        <li onClick={() => setMenu('/kids')}><Link to="/kids">Kids</Link>{menu === "/kids" ? <hr /> : <></>} </li>
      </ul>
      <div className="nav-login-cart order-lg-last order-md-last">
        {
          userDetail ?
            <div className="dropdown">
              <Link className="dropdown-toggle" to="#" role="button"
                data-bs-toggle="dropdown" aria-expanded="false"
                style={{ display: 'flex', gap: '10px' }}>
                <img src={userIcon} alt="user icon" />
                <span style={{ fontWeight: 'bold' }}>{userDetail.name} </span>
              </Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="#"> {userDetail.name} </Link></li>
                <li><Link className="dropdown-item" to="#" onClick={handleLogout}>Logout</Link></li>
                <li><Link className="dropdown-item" to="#">Profile</Link></li>
              </ul>
            </div>
            :
            <Link to="/login">
              <button> Login</button>
            </Link>
        }
        <Link to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">
          { cartItems?.product ? cartItems?.product?.length : ''}
        </div>
      </div>
    </div>
  );
};
