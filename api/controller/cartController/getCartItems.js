const Cart = require('../../models/cart');
const Product = require('../../models/product');

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find all cart items for the user
    const cartItems = await Cart.findAll({
      where: { userId },
      include: { model: Product },
    });

    if (cartItems.length === 0) {
      return res.status(200).json({ message: 'Your cart is empty!' });
    }

    // Extract the product details from cart items
    const products = cartItems.map((cartItem) => {
      const { id, title, description, price, imageUrl } = cartItem.Product;
      const { quantity }= cartItem;
      const { totalPrice } = cartItem;
      return { id, title, description, price, quantity, totalPrice, imageUrl };
    });

    // Calculate the grand total price
    const grandTotal = cartItems.reduce((total, cartItem) => {
      return total + cartItem.totalPrice;
    }, 0);

    return res.status(200).json({ products, grandTotal });
  } catch (error) {
    console.error('Error retrieving user cart:', error);
    return res.status(500).json({ error: 'Failed to retrieve user cart' });
  }
};

module.exports = getUserCart