/*
 * This file defines the controller for getting a single product
 * Check the routes folder for the endpoint
 */

const Product = require('../../models/product');
const { validationResult } = require('express-validator');

const getProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: `Invalid input`,
        errors: errors.array(),
      });
    }

    const { id } = req.params;

    // Find the product by ID
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to delete product',
    });
  }
};

module.exports = getProduct;
