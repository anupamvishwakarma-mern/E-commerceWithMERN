const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  }
}, { timestamps: true })


const UserSchema = mongoose.model('user', userSchema)

module.exports = UserSchema







const addressSchema = new mongoose.Schema({
  u_id: {
    type: String
  },
  name: {
    type: String
  },
  mobile: {
    type: String
  },
  address: {
    type: String
  },
  landmark: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  pin: {
    type: Number
  },
  save_as: {
    type: String
  },
  default: {
    type: Boolean
  }
}, { timestamps: true })


const AddSchema = mongoose.model('address', addressSchema)

module.exports = AddSchema;