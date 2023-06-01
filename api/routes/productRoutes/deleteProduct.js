/**
 * @swagger
 * /api/v1/users/{userId}/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     description: Delete a product from a user's list of products
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: ID of the user
 *         required: true
 *         schema:
 *           type: integer
 *       - name: id
 *         in: path
 *         description: ID of the product to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Product deleted successfully
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *       403:
 *         description: Forbidden - User is not authorized to delete the product
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

// Import neccessary dependencies

// Note this route needs authentocation before it can be accessed
// Login first before acessing this route
const express = require('express');
const db = require('../../config');
const deleteProducts = require('../../controller/productController/deleteProduct');
const { authenticate, authorize } = require('../../middlewares/authenticate');

const router = express.Router();

router.delete(
  '/users/:userId/products/:id',
  authenticate,
  authorize,
  deleteProducts,
);

module.exports = router;
