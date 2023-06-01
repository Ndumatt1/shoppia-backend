/**
 * @swagger
 * /api/v1/products/{userId}/{id}:
 *   put:
 *     summary: Update product information
 *     description: Update the information of a specific product
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: integer
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Bearer token for authentication
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Product information to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductInput'
 *     responses:
 *       200:
 *         description: Product information updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid request or missing required fields
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: User not authorized to update the product
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

// Import necessary dependencies

const express = require('express');
const db = require('../../config');
const updateProduct = require('../../controller/productController/updateProductInfo');
const { authenticate, authorize } = require('../../middlewares/authenticate');

const router = express.Router();

router.put('/products/:userId/:id', authenticate, authorize, updateProduct);

module.exports = router;
