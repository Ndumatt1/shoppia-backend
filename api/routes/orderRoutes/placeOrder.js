const express = require('express');
const db = require('../../config');
const placeOrder = require('../../controller/orderController/placeOrder');
const { authenticate, authorize } = require('../../middlewares/authenticate');

const router = express.Router();

router.post('/users/:userId/orders', authenticate, authorize, placeOrder);

module.exports = router;