/**
 * @swagger
 * /api/v1/products/campuses/{campus}:
 *   get:
 *     summary: Get products based on campus
 *     description: Retrieve a list of products based on the specified campus
 *     parameters:
 *       - in: path
 *         name: campus
 *         required: true
 *         description: Campus name
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
 *       500:
 *         description: Internal server error
 */

// Import necessary dependencies
const express = require('express');
const db = require('../../config');
const getCampusBasedProducts = require('../../controller/productController/getCampusBasedProducts');

const router = express.Router();

router.get('/products/campuses/:campus', getCampusBasedProducts);

module.exports = router;
