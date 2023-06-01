/**
 * @swagger
 * /api/v1/products/categories/{category}:
 *   get:
 *     summary: Get products based on category
 *     description: Retrieve a list of products based on the specified category
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         description: Category name
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

const express = require('express');
const db = require('../../config');
const getProduct = require('../../controller/productController/getProduct');

const router = express.Router();

router.get('/products/:id', getProduct);

module.exports = router;
