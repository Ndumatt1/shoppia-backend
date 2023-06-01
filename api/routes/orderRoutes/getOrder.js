const express = require('express');
const getOrder = require('../../controller/orderController/getOrder');
const { authenticate, authorize } = require('../../middlewares/authenticate');

const router = express.Router();

router.get('/:userId/orders/:orderId', authenticate, authorize, getOrder);

module.exports = router;