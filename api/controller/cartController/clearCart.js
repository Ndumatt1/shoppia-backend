const Cart = require('../../models/cart');
const Product = require('../../models/product');

const clearCart = async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Check if the user has any cart items
      const cartItemsCount = await Cart.count({
        where: { userId },
      });
  
      if (cartItemsCount === 0) {
        return res.status(404).json({ error: 'Cart is empty!' });
      }
  
      // Delete all cart items associated with the user ID
      await Cart.destroy({
        where: { userId },
      });
  
      return res.status(200).json({ message: 'Cart cleared successfully!' });
    } catch (error) {
      console.error('Error clearing cart:', error);
      return res.status(500).json({ error: 'Failed to clear cart' });
    }
  };
module.exports = clearCart;  