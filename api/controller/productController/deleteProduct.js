/*
 * This file defines the controller for deleting a product
 * Check the routes folder for the endpoint
 */

const Product = require('../../models/product');
const { validationResult } = require('express-validator');

const deleteProduct = async (req, res) => {
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
    const { userId } = req;

    // Find the product by ID
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }

    if (product.userId !== userId) {
      return res.status(403).json({
        success: false,
        error: 'Authentication failed',
      });
    }

    // Delete the product
    await product.destroy();

    return res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to delete product',
    });
  }
};

module.exports = deleteProduct;
