/*
 * This file defines the controller for listing all products in the database
 * Check the routes folder for the endpoint
 */

const Product = require('../../models/product');
const { validationResult } = require('express-validator');

const getProducts = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: `Invalid input`,
        errors: errors.array(),
      });
    }

    const page = parseInt(req.query.page); //|| 1;
    const limit = parseInt(req.query.limit); //|| 20;
    const offset = (page - 1) * limit;

    if (isNaN(page) || isNaN(limit) || page <= 0 || limit <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid page or limit value',
      });
    }

    const { count, rows: products } = await Product.findAndCountAll({
      order: [['createdAt', 'DESC']],
      offset,
      limit,
    });

    //const totalProducts = await Product.count();

    const totalPages = Math.ceil(count / limit);

    return res.status(200).json({
      success: true,
      data: {
        products,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch products',
    });
  }
};

module.exports = getProducts;
