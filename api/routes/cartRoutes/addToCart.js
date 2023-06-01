const express = require('express');
const db = require('../../config');
const addToCart = require('../../controller/cartController/addToCart');
const { authenticate, authorize } = require('../../middlewares/authenticate');

const router = express.Router();

router.post('/users/:userId/carts', authenticate, authorize, addToCart);

module.exports = router;