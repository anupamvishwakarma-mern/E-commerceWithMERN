import axios from "axios";
import React, { useEffect, useState } from "react";

export const UpdateAddress = ({ updateRow }) => {

  const user = JSON.parse(localStorage.getItem('user'))
  useEffect(() => {
    const scrollTop = () => {
      window.scrollTo(0,0)
    }
    scrollTop()
  },[window.location])

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

  useEffect(() => {
    setAddress(updateRow)
  }, [updateRow])

  const handleSaveAs = (key) => {
    setAddress((prev) => ({ ...prev, save_as: key }));
  };

  const handleUpdateAddress = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`http://localhost:8005/shopper/user/address/update/${updateRow._id}`, address)

      localStorage.setItem('address', JSON.stringify(res?.data))
      if (res.data) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (

    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="updateModalLabel">Update Address</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body"></div>
        <div className="left_card">
          <form method="post" onSubmit={handleUpdateAddress}>
            <div className="contact">
              <h6>Contact Details</h6>
              <input type="text" name="name" className="form-control" placeholder="Name" value={address.name} onChange={inputChange} />
              <input type="number" name="mobile" className="form-control" placeholder="Mobile No" value={address.mobile} onChange={inputChange} />
            </div>
            <div className="address2">
              <h6>Address</h6>
              <input type="number" name="pin" className="form-control" placeholder="Pin Code"
                value={address.pin} onChange={inputChange} />
              <input type="text" name="address" className="form-control" placeholder="House No, Street, Area" value={address.address} onChange={inputChange} />
              <input type="text" name="landmark" className="form-control" placeholder="Locality/Town"
                value={address.landmark} onChange={inputChange} />
              <div className="city_state">
                <input type="text" name="city" className="form-control" placeholder="City/District" value={address.city} onChange={inputChange} />
                <input type="text" name="state" className="form-control" placeholder="State" value={address.state} onChange={inputChange} />
              </div>
            </div>
            <div className="save_as">
              <h6>Save Address As</h6>
              <div>
                <span className={`btn Home ${address.save_as === 'Home' ? 'default' : ''}`} onClick={() => handleSaveAs('Home')}> Home </span>
                <span className={`btn Work ${address.save_as === 'Work' ? 'default' : ''}`} onClick={() => handleSaveAs('Work')}> Work </span>
                <span className={`btn Other ${address.save_as === 'Other' ? 'default' : ''}`} onClick={() => handleSaveAs('Other')}> Other </span>
              </div>
            </div>
            <div className="form-check">
              <input type="checkbox" name="default" id="flexCheckDefault" checked={address.default}
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
      </div>
    </div>

  );
};
