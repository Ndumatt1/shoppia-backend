const express = require('express');
const db = require('../../config');
const getCartItems = require('../../controller/cartController/getCartItems');
const { authenticate, authorize } = require('../../middlewares/authenticate');

const router = express.Router();

router.get('/users/:userId/carts', authenticate, authorize, getCartItems);

module.exports = router;