import React, { useEffect, useState } from "react";
import './payment.css'
import offer from '../Assets/offers.png'
import phonepay from '../Assets/phonepay.png'
import gpay from '../Assets/gpay.png'
import bheem from '../Assets/bheem.webp'
import card from '../Assets/card.png'
import holder from '../Assets/holder.png'
import valid from '../Assets/date.png'
import cvv from '../Assets/cvv.png'

export const PaymentGateway = () => {

  const [randomScratch, setRandomScratch] = useState()
  const [isDisabled, setIsDisabled] = useState(true)
 
  useEffect(() => {
    const scrollTop = () => {
      window.scrollTo(0,0)
    }
    scrollTop()
  }, [window.location])
  
  const viewMore = () => {
    const ul = document.querySelector('.offers-li')
    const viewMore = document.querySelector('.view-more span')
    const icon = document.querySelector('.view-more i')

    if (ul.style.height === 'fit-content') {
      ul.style.height = '20px'
      viewMore.textContent = 'View More'
      icon.classList.replace('fa-angle-up', 'fa-angle-down')
    } else {
      ul.style.height = 'fit-content'
      viewMore.textContent = 'View Less'
      icon.classList.replace('fa-angle-down', 'fa-angle-up')
    }
  }

  const navLink = (id) => {
    const cash = document.querySelector('.cash-pay-section')
    const cashbtn = document.querySelector('.cash-pay')
    const upi = document.querySelector('.upi-pay-section')
    const upibtn = document.querySelector('.upi-pay')
    const card = document.querySelector('.card-pay-section')
    const cardbtn = document.querySelector('.card-pay')

    if (cash.classList.contains(id)) {
      cash.classList.remove('d-none')
      cashbtn.classList.add('active')
      upi.classList.add('d-none')
      upibtn.classList.remove('active')
      card.classList.add('d-none')
      cardbtn.classList.remove('active')
    }
    if (upi.classList.contains(id)) {
      cash.classList.add('d-none')
      cashbtn.classList.remove('active')
      upi.classList.remove('d-none')
      upibtn.classList.add('active')
      card.classList.add('d-none')
      cardbtn.classList.remove('active')
    }
    if (card.classList.contains(id)) {
      cash.classList.add('d-none')
      cashbtn.classList.remove('active')
      upi.classList.add('d-none')
      upibtn.classList.remove('active')
      card.classList.remove('d-none')
      cardbtn.classList.add('active')
    }
  }

  const refreshScratch = () => {

    const spin = document.querySelector('.fa-rotate')
    spin.classList.add('fa-spin')
    const num = Math.floor(Math.random() * (99999 - 10000)) + 10000
    setRandomScratch(num)
    setTimeout(() => {
      spin.classList.remove('fa-spin')
    }, 300)
  }

  useEffect(() => {
    refreshScratch()
  }, [])

  const inputCheck = (e, value) => {
    e.preventDefault();
    let wrong = document.querySelector('.fa-circle-xmark')
    let check = document.querySelector('.fa-circle-check')

    if (randomScratch !== parseInt(value)) {
      wrong.classList.remove('d-none')
      check.classList.add('d-none')
      setIsDisabled(true)
    } else {
      check.classList.remove('d-none')
      wrong.classList.add('d-none')
      setIsDisabled(false)
    }
  }

  return (
    <div className="payment-gateway">
      <div className="offerss">
        <div> <img src={offer} alt="offer" /> <span>Bank Offers</span> </div>
        <ul className="offers-li">
          <li> 10% Instant Discount on Citi-branded Credit and Debit Cards on a minimum spend of ₹3,000. TCA </li>
          <li className=""> 7.5% Instant Discount on every spends with Myntra Kotak Credit Card. TCA </li>
          <li className=""> Get Assured Cashback up to ₹200 on Paytm UPI on a min spend of ₹500. TCA </li>
          <li className=""> Up to ₹1,000 Cashback on CRED UPI  on a minimum spend of ₹1,000. TCA </li>
          <li className=""> Flat ₹30 Cashback on Freecharge UPI (Android Devices only) on a minimum spend of ₹1,999. TCA </li>
        </ul>
        <div className="view-more" onClick={viewMore}><span> View More </span><i className="fa-solid fa-angle-down"></i> </div>
      </div>
      <h5> Choose Payment Mode </h5>
      <div className="payment-mode">
        <div className="top-nav">
          <div className="cash-pay active" onClick={() => navLink('cash-pay-section')}><span> Cash On Delivery </span></div>
          <div className="upi-pay" onClick={() => navLink('upi-pay-section')}><span> UPI Payment </span></div>
          <div className="card-pay " onClick={() => navLink('card-pay-section')}><span> Credit/Debit Card </span></div>
        </div>

        <div className="cash-pay-section" id="cash-pay-section">
          <div className="scratch">
            <div> {randomScratch} </div>
            <i className="fa-solid fa-rotate" onClick={refreshScratch}></i>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
            <input type="text" className="form-control" placeholder="Enter code shown in above image" onChange={(e) => inputCheck(e,e.target.value)} />
            <i class="fa-solid fa-circle-check d-none" style={{color:'green',fontSize:'20px'}}></i>
            <i class="fa-solid fa-circle-xmark d-none" style={{color:'red',fontSize:'20px'}}></i>
          </div>
          <p> You can pay via Cash/UPI on delivery </p>
          <button id="continue" disabled={isDisabled} onClick={() => alert('clicked')}> Continue </button>
        </div>

        <div className="upi-pay-section d-none">
          <div className="form-check">
            <input type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
            <label className="form-check-label" for="flexRadioDefault1">
              <img src={phonepay} alt="phone pay" />
              <span> Phone Pay </span>
            </label>
          </div>
          <div className="form-check">
            <input type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
            <label className="form-check-label" for="flexRadioDefault2">
              <img src={gpay} alt="Google pay" />
              <span> Google Pay </span>
            </label>
          </div>
          <div className="form-check">
            <input type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
            <label className="form-check-label" for="flexRadioDefault3">
              <img src={bheem} alt="Bheem upi pay" />
              <span> Bheem UPI </span>
            </label>
          </div>
          <div className="upi-btn">
            <button> Continue </button>
          </div>
        </div>


        <div className="card-pay-section d-none" >
          <div class="input-group card-number">
            <input type="text" class="form-control" placeholder="XXXX XXXX XXXX XXXX" aria-label="Dollar amount (with dot and two decimal places)" />
            <span class="input-group-text" style={{ padding: '7px' }}><img src={card} alt="card number" /></span>
          </div>
          <div class="input-group holder-name">
            <input type="text" class="form-control" placeholder="Card Holder Name" aria-label="Dollar amount (with dot and two decimal places)" />
            <span class="input-group-text" style={{ padding: '12px' }}><img src={holder} alt="card holder" /></span>
          </div>

          <div className="valid-cvv">

            <div class="input-group valid-date">
              <input type="text" class="form-control" placeholder="Valid Thru (MM/YY)" aria-label="Dollar amount (with dot and two decimal places)" />
              <span class="input-group-text" style={{ padding: '12px' }}><img src={valid} alt="Valid date" /></span>
            </div>
            <div class="input-group cvv">
              <input type="password" class="form-control" placeholder="CVV" aria-label="Dollar amount (with dot and two decimal places)" />
              <span class="input-group-text" style={{ padding: '12px' }}><img src={cvv} alt="CVV" /></span>
            </div>

          </div>

          <div className="continue">
            <button> Pay Now </button>
          </div>
        </div>
      </div>

    </div>
  );
};
