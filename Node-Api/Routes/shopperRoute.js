const { create, get } = require('../controller/shopperController');
const { upload } = require('../middleware/shopper');

const router = require('express').Router();



router.post('/store', upload.array("images[]"), create);
router.get('/get', get);





module.exports = router;

