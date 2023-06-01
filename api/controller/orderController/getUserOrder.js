const Order = require('../../models/order');
const { validationResult } = require('express-validator')

const getOrdersByUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'Invalid input',
        errors: errors.array(),
      });
    }
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
    const { userId } = req.params;

    if (isNaN(page) || page <= 0) {
      page = 1;
    }
    if (isNaN(limit) || limit <= 0) {
      limit = 20;
    }
    const offset = (page -1 ) * limit;

    const {count, rows: orders} = await Order.findAndCountAll({
      where: { userId },
      offset,
      limit,
    });
    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found!' });
    }
    const totalPages = Math.ceil(count / limit);

    return res.status(200).json({
      success: true,
      data: {
        orders,
        totalPages,
   }
  });
  } catch (error) {
    console.error('Error retrieving orders:', error);
    return res.status(500).json({ error: 'Failed to retrieve orders' });
  }
};

module.exports = getOrdersByUser;
