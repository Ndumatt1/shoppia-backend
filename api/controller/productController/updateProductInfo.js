/*
 * This file defines the controller for updating a product info
 * Check the routes folder for the endpoint
 */

const Product = require('../../models/product');
//const { body, validationResult } = require('express-validator');

const updateProduct = async (req, res) => {
  /*{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }*/
  try {
    const { id } = req.params;
    const { title, description, price, campus, quantity, category } = req.body;

    // Find the product by ID
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }

    // Update the product fields
    product.title = title;
    product.description = description;
    product.price = price;
    product.campus = campus;
    product.quantity = quantity;
    product.category = category;

    // Save the updated product
    await product.save({ validate: false });

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error('Error updating product:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to update product',
    });
  }
};

module.exports = updateProduct;
