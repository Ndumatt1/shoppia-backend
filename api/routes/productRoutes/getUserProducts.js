/**
 * @swagger
 * /api/v1/users/{id}/products:
 *   get:
 *     summary: Get products of a user
 *     description: Retrieve the products associated with a user based on the specified user ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
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
 *       404:
 *         description: User not found or no products found for the user
 *       500:
 *         description: Internal server error
 */

// Import necessary dependencies

const express = require('express');
const getUserProducts = require('../../controller/productController/getUserProducts');

const router = express.Router();

router.get('/users/:id/products', getUserProducts);

module.exports = router;
