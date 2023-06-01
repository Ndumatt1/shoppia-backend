const Cart = require('../../models/cart');
const Product = require('../../models/product');
const { validationResult } = require('express-validator');


const addToCart = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { productId } = req.body;
      const quantity = req.body.quantity || 1;
      const { userId } = req.params;
      // Find the product by productId
      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found!' });
      }
  
      // Check if the product already exists in the cart for the user
      let cartItem = await Cart.findOne({
        where: { userId, productId },
      });
  
      if (cartItem) {
        // Update the quantity and calculate the new total price
        const newQuantity = cartItem.quantity + quantity;
        const newTotalPrice = newQuantity * product.price;
  
        // Update the existing cart item
        await cartItem.update({
          quantity: newQuantity,
          totalPrice: newTotalPrice,
        });
  
        return res.status(200).json(cartItem);
      }
  
      // Calculate the total price
      const totalPrice = quantity * product.price;
  
      // Create a new cart item
      const newCartItem = await Cart.create({
        userId,
        productId,
        quantity,
        totalPrice,
      });
  
      return res.status(201).json(newCartItem);
    } catch (error) {
      console.error('Error adding to cart:', error);
      return res.status(500).json({ error: 'Failed to add to cart' });
    }
  };
  
  module.exports = addToCart;
