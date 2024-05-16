import axios from "axios";
import React, { useEffect, useState } from "react";

export const AddNewAddress = () => {
  
  useEffect(() => {
    const scrollTop = () => {
      window.scrollTo(0, 0)
    }
    scrollTop()
  }, [window.location])

  const user = JSON.parse(localStorage.getItem('user'))
  const [address, setAddress] = useState({
    u_id: user._id,
    name: "",
    mobile: "",
    pin: "",
    address: "",
    landmark: "",
    city: "",
    state: "",
    save_as: "",
    default: false
  })

  const inputChange = (e) => {
    e.preventDefault()
    setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSaveAs = (key) => {
    let home = document.querySelector(".Home")
    let work = document.querySelector(".Work")
    let other = document.querySelector(".Other")
    setAddress((prev) => ({ ...prev, save_as: key }))
    if (home.classList.contains(key)) {
      home.classList.add('default')
      work.classList.remove('default')
      other.classList.remove('default')
    } else if (work.classList.contains(key)) {
      home.classList.remove('default')
      other.classList.remove('default')
      work.classList.add('default')
    } else {
      home.classList.remove('default')
      other.classList.add('default')
      work.classList.remove('default')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:8005/shopper/user/address/add', address)

      if (res.data) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className="left_card">
        <form method="post" onSubmit={handleSubmit}>
          <div className="contact">
            <h6>Contact Details</h6>
            <input type="text" name="name" className="form-control" placeholder="Name" onChange={inputChange} />
            <input type="number" name="mobile" className="form-control" placeholder="Mobile No" onChange={inputChange} />
          </div>
          <div className="address2">
            <h6>Address</h6>
            <input type="number" name="pin" className="form-control" placeholder="Pin Code" onChange={inputChange} />
            <input type="text" name="address" className="form-control" placeholder="House No, Street, Area" onChange={inputChange} />
            <input type="text" name="landmark" className="form-control" placeholder="Locality/Town" onChange={inputChange} />
            <div className="city_state">
              <input type="text" name="city" className="form-control" placeholder="City/District" onChange={inputChange} />
              <input type="text" name="state" className="form-control" placeholder="State" onChange={inputChange} />
            </div>
          </div>
          <div className="save_as">
            <h6>Save Address As</h6>
            <div>
              <span className="btn Home" onClick={() => handleSaveAs('Home')}> Home </span>
              <span className="btn Work" onClick={() => handleSaveAs('Work')}> Work </span>
              <span className="btn Other" onClick={() => handleSaveAs('Other')}> Other </span>
            </div>
          </div>
          <div className="form-check">
            <input type="checkbox" name="default" id="flexCheckDefault"
              onChange={(e) => setAddress((prev) => ({ ...prev, default: e.target.checked }))} />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Make Address default
            </label>
          </div>
          <div className="add_address">
            <button> Add Address </button>
          </div>
        </form>
      </div>
    </>
  );
};
