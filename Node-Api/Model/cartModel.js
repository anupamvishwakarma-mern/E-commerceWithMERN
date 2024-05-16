const mongoose = require('mongoose')


const cartSchema = new mongoose.Schema({
  u_id: {
    type: String
  },

  product: [{
    p_id: { type: String },
    nop: { type: Number }
  }]

}, { timestamps: true })

const CartSchema = mongoose.model('cart', cartSchema)

module.exports = CartSchema;