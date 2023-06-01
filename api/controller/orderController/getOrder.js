const Order = require('../../models/order');
const User = require('../../models/users');

const getOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Find the order by its ID
    const order = await Order.findByPk(orderId, {
      include: [{ model: User }],
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    // Return the order
    return res.status(200).json({ order });
  } catch (error) {
    console.error('Error retrieving order:', error);
    return res.status(500).json({ error: 'Failed to retrieve order' });
  }
};

module.exports = getOrder;
