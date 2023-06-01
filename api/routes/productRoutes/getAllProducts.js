/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all products
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
const getAllProducts = require('../../controller/productController/getAllProduct');

const router = express.Router();

router.get('/products', getAllProducts);

module.exports = router;
