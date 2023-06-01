/**
 * @swagger
 * /api/v1/users/{userId}/products:
 *   post:
 *     summary: Create a new product
 *     description: Create a new product for a specific user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *       - in: header
 *         name: Authorization
 *         required: true
 *         description: Bearer token for authentication
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Product information to be created
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid request or missing required fields
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: User not authorized to create a product
 *       500:
 *         description: Internal server error
 */

// Import necessary dependencies

const express = require('express');
const db = require('../../config');
const {
  createProductValidator,
  createProduct,
  upload,
} = require('../../controller/productController/uploadproduct');
const { authenticate, authorize } = require('../../middlewares/authenticate');

const router = express.Router();

router.post(
  '/users/:userId/products',
  authenticate,
  authorize,
  upload.single('image'),
  createProductValidator,
  createProduct,
);

module.exports = router;
