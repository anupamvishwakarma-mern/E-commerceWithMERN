const { addToCart, removeCart, getCart } = require('../controller/cartController');

const router = require('express').Router();



router.post('/addtocart', addToCart)
router.delete('/deletecart/:u_id/:p_id', removeCart)
router.get('/get/:u_id', getCart)


module.exports = router