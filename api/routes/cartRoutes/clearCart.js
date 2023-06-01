const express = require('express');
const db = require('../../config');
const clearCart = require('../../controller/cartController/clearCart');
const { authenticate, authorize } = require('../../middlewares/authenticate');

const router = express.Router();

router.delete('/carts/:userId', authenticate, authorize, clearCart);

module.exports = router;