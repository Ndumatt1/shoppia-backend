/*
 * This file defines the controller for getting all products of a user
 * Check the routes folder for the endpoint
 */

const Product = require('../../models/product');
const User = require('../../models/users');
const NodeCache = require('node-cache');
const { validationResult } = require('express-validator');
const { Op } = require('sequelize');

const cache = new NodeCache();

const getUserProducts = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: `Invalid input`,
        errors: errors.array(),
      });
    }
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const { id } = req.params;
    const offset = (page - 1) * limit;

    if (isNaN(page) || isNaN(limit) || page <= 0 || limit <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Invalid page or limit value',
      });
    }

    const cacheKey = `id:${id}:page:${page}:limit:${limit}`;

    // check if the data is cached
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return res.status(200).json({
        success: true,
        data: cachedData,
      });
    }

    // Find the user based on the username
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found',
      });
    }

    const { count, rows: products } = await Product.findAndCountAll({
      where: { userId: user.id },
      order: [['createdAt', 'DESC']],
      offset,
      limit,
    });

    const totalPages = Math.ceil(count / limit);

    const response = {
      products,
      totalPages,
    };

    cache.set(cacheKey, response);

    return res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error('Error fetching user products:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch user products',
    });
  }
};

module.exports = getUserProducts;
