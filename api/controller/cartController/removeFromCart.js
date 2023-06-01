const Cart = require('../../models/cart');
const Product = require('../../models/product');
//const getUserCart = require('./getCartItems');

const removeFromCart = async (req, res) => {
    try {
      const { userId, productId } = req.params;
  
      // Find the cart item to remove
      const cartItem = await Cart.findOne({
        where: { userId, productId },
      });
  
      if (!cartItem) {
        return res.status(404).json({ error: 'Cart item not found' });
      }
  
      // Remove the cart item from the database
      await cartItem.destroy();

      // Call getUserCart to retrieve the updated cart items and calculate the grand total
    //const cartResponse = await getUserCart(req, res);
    //const { products, grandTotal } = cartResponse;
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
  
      //return res.status(200).json({ message: 'Cart item removed successfully!' });
    } catch (error) {
      console.error('Error removing from cart:', error);
      return res.status(500).json({ error: 'Failed to remove from cart' });
    }
  };

module.exports = removeFromCart;