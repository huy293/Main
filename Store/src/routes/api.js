const express = require('express');
const { Api_AddCart, checkEmailController, Api_UserLogin, Api_cart } = require('../controllers/ApiController');
const router = express.Router();

router.post('/add_to_cart', Api_AddCart);
router.post('/check-email', checkEmailController);
router.post('/check-login', Api_UserLogin);
router.get('/check-cart', Api_cart);
module.exports = router;