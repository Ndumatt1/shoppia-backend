const express = require('express');
const db = require('../../config');
const removeFromCart = require('../../controller/cartController/removeFromCart');
const { authenticate, authorize } = require('../../middlewares/authenticate');

const router = express.Router();

router.delete('/carts/:userId/:productId', authenticate, authorize, removeFromCart);

module.exports = router;