/**
 * @swagger
 * /api/v1/products/search:
 *   get:
 *     summary: Search products
 *     description: Search for products based on the specified search query parameters
 *     parameters:
 *       - in: query
 *         name: campus
 *         required: true
 *         description: Campus name
 *         schema:
 *           type: string
 *       - in: query
 *         name: q
 *         required: true
 *         description: Search keyword
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid search parameters
 *       500:
 *         description: Internal server error
 */

// Import necessary dependencies

// To use this route pass the campus and the keyword to be searched as querystring
// Example: /api/v1/products/search?campus=ebsu&q=iphone 8

const express = require('express');
const db = require('../../config');
const searchProducts = require('../../controller/productController/search');

const router = express.Router();

router.get('/products/search', searchProducts);

module.exports = router;
