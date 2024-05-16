const mongoose = require('mongoose')



const shopperSchema = new mongoose.Schema({
  Title: {
    type: String,
  },
  category: {
    type: String
  },
  productType: {
    type: String
  },
  size: {
    type: String
  },
  new_price: {
    type: Number
  },
  old_price: {
    type: Number
  },
  images: {
    type: String
  },
  tags: {
    type: String
  },
  details: {
    type: String
  },
  description: {
    type: String
  }

}, { timestamps: true })



const ShopperSchema = mongoose.model("shopper", shopperSchema)

module.exports = ShopperSchema;