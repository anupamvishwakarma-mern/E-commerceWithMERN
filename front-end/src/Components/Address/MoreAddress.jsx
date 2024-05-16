import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AddNewAddress } from "./AddNewAddress";
import home from '../Assets/home-address.png'
import axios from "axios";
import { UpdateAddress } from "./UpdateAddress";


export const MoreAddress = () => {

  const [address, setAddress] = useState([])
  const user = JSON.parse(localStorage.getItem('user'))
  const [updateRow, setUpdateRow] = useState([])
  const [check, setCheck] = useState(null)

  useEffect(() => {
    const scrollTop = () => {
      window.scrollTo(0,0)
    }
    scrollTop()
  },[window.location])

  const getAddress = async () => {
    try {
      const res = await axios.get(`http://localhost:8005/shopper/user/address/get/${user._id}`)
      setAddress(res?.data)
      localStorage.setItem('address', JSON.stringify(res?.data))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setAddress(JSON.parse(localStorage.getItem('address')))
  }, [])

  useEffect(() => {
    getAddress();
  }, [])

  const handleDeleteAddress = async (id) => {

    const confirmDelete = window.confirm('Are you sure you want to delete this address?');

    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:8005/shopper/user/address/delete/${id}/${user._id}`)
        setAddress(response.data)
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log('Deletion cancelled');
    }
  }

  const updateData = async (id) => {
    try {

      const selectedItem = address.find(elem => elem._id === id);

      localStorage.setItem('updateRow', JSON.stringify(selectedItem));
      setUpdateRow(selectedItem)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleDeliveryAddress = (id) => {
    address.forEach(elem => {
      if (elem._id === id) {
        setCheck(elem)
        localStorage.setItem('deliver_address', JSON.stringify(elem))
      }
    })
  }

  useEffect(() => {
    const fetch = () => {
      address.forEach(elem => {
        if (elem.default === true) {
          localStorage.setItem('deliver_address', JSON.stringify(elem))
        }
      })
    }
    fetch()
  }, [])

  return (
    <div className="left_address">
      <div className="top_section">
        <h5>Select Delivery Address </h5>
        <button className="btn modal-btn" data-bs-toggle="modal" data-bs-target="#exampleModal"> <i className="fa-solid fa-circle-plus"></i> Add New Address </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Add New Address</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <AddNewAddress />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom_section">
        <h6> Addresses </h6>
        <div className="address_card">
          {
            address != '' ?
              <>
                {
                  address.map((item, i) => {

                    return (
                      <div className="address-one" key={i}>
                        <input type="radio" name="address" checked={check !== null ? check && check._id === item._id : item.default}
                          onChange={() => handleDeliveryAddress(item._id)} />
                        <div className="address-right">
                          <div className="name">
                            <h6>{item.name} <span className="badge rounded-pill text-bg-success px-2">{item.save_as}</span></h6>
                            <div className="dropdown">
                              <span className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="fa-solid fa-ellipsis"></i>
                              </span>
                              <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#updateModal" onClick={() => updateData(item._id)}>Edit</Link></li>
                                <li><Link className="dropdown-item" href="#" onClick={() => handleDeleteAddress(item._id)}>Delete</Link></li>
                              </ul>
                              <div className="modal fade" id={`${updateRow !== '' ? 'updateModal' : ''}`} tabIndex="-1" aria-labelledby="updateModalLabel" aria-hidden="true">
                                <UpdateAddress updateRow={updateRow} />
                              </div>
                            </div>
                          </div>
                          <div className="add_one">
                            <span>{item.address}</span>, <span>{item.landmark}</span>, <span>{item.city}</span>, <span>{item.state}</span> <span> - </span> <span>{item.pin}</span>
                          </div>
                          <div className="mobile">Mobile: <span>{item.mobile}</span></div>
                        </div>
                      </div>
                    )
                  })
                }
              </>
              :
              <div className="no-address">
                <img src={home} alt="no address" />
                <span> No Address Available. Please <span className="span" data-bs-toggle="modal" data-bs-target="#updateModal"> Add New!</span> </span>
              </div>
          }
        </div>
      </div>

    </div >
  );
};
