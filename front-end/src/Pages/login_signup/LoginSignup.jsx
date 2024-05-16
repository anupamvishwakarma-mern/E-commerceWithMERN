import React, { useEffect, useState } from "react";
import './loginsignup.css'
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export const LoginSignup = () => {

  const location = useLocation();
  const [loginSlug, setLoginSlug] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  })

  useEffect(() => {
    const login = () => {

      if (location.pathname == '/login') {
        setLoginSlug(true)
      }
      if (location.pathname == '/signup') {
        setLoginSlug(false)
      }
    }
    login();
  })

  const handleUserChange = (e) => {
    e.preventDefault();
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8005/shopper/user/create', user).then((res) => {
        localStorage.setItem('user', JSON.stringify(res?.data?.result))
        localStorage.setItem('token', res?.data?.token)
        navigate('/');
      })

    } catch (error) {
      console.log(error);
    }
  }


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8005/shopper/user/login', user).then((res) => {
        localStorage.setItem('user', JSON.stringify(res?.data?.result))
        localStorage.setItem('token', res?.data?.token)
        navigate('/');
      })
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="loginsignup">
      {
        loginSlug &&
        <div className="loginsignup-container">
          <h1>Sign In</h1>
          <div className="loginsignup-fields">
            <input type="email" placeholder="Email Address" name="email" onChange={handleUserChange} />
            <input type="password" placeholder="Password" name="password" onChange={handleUserChange} />
          </div>
          <div className="loginsignup-agree">
            <input type="checkbox" name="" id="" />
            <p>By Continuing, I agree to the terms of use & privacy policy.</p>
          </div>
          <button onClick={handleLogin}>Continue</button>
          <p className="loginsignup-login">New User? <Link to="/signup">Signup</Link></p>
        </div>
      }
      {
        !loginSlug &&
        <div className="loginsignup-container">
          <h1>Sign Up</h1>
          <div className="loginsignup-fields">
            <input type="text" placeholder="Your Name" name="name" onChange={handleUserChange} />
            <input type="email" placeholder="Email Address" name="email" onChange={handleUserChange} />
            <input type="password" placeholder="Password" name="password" onChange={handleUserChange} />
          </div>
          <div className="loginsignup-agree">
            <input type="checkbox" name="" id="" />
            <p>By Continuing, I agree to the terms of use & privacy policy.</p>
          </div>
          <button onClick={handleSignUp}>Continue</button>
          <p className="loginsignup-login">Already have an account? <Link to="/login">Login</Link></p>
        </div>
      }


    </div>
  );
};
