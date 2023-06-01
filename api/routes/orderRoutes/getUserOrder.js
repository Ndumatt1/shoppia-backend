const express = require('express');
const db = require('../../config');
const getUserOrder = require('../../controller/orderController/getUserOrder');
const { authenticate, authorize } = require('../../middlewares/authenticate');

const router = express.Router();

router.get('/users/:userId/orders', authenticate, authorize, getUserOrder);

module.exports = router;