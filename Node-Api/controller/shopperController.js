const ShopperSchema = require('../Model/shopperModel')



const create = (req, res, next) => {
  const product = new ShopperSchema({
    Title: req.body.title,
    category: req.body.category,
    productType: req.body.productType,
    size: req.body.size,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
    tags: req.body.tags,
    details: req.body.details,
    description: req.body.description
  })

  if (req.files) {
    let path = ''

    req.files.forEach((files, i, err) => {
      path = path + `/assets/product/` + files.filename + ','
    })

    path = path.substring(0, path.lastIndexOf(','))
    product.images = path
  }

  product.save().then(result => {
    console.log({ message: 'Product is created' })
    return;
  }).catch(error => {
    console.log({ error: 'Error in product creation' })
    return;
  })
}



const get = (req, res, next) => {
  ShopperSchema.find().then(result => {
    res.json({result})
  }).catch(error => {
    res.json({error: 'Error to get product'})
  })
}


module.exports = { create, get };