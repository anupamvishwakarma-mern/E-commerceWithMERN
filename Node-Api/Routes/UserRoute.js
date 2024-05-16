const { create, loginUser, addNewAddress, getAddress, removeAdd, updateAddress } = require('../controller/userController');

const router = require('express').Router();



router.post('/create', create)
router.post('/login', loginUser)


router.post('/address/add', addNewAddress)
router.get('/address/get/:u_id', getAddress)
router.delete('/address/delete/:id/:u_id', removeAdd)
router.post('/address/update/:ad_id', updateAddress)


module.exports = router
