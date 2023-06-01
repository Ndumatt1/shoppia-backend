/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get user information
 *     description: Retrieve user information by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *       400:
 *         description: Invalid request or missing required fields
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

// Import necessary dependencies

const express = require('express');
const db = require('../../config');
const getUserInfo = require('../../controller/userController/getUserInfo');

const router = express.Router();

router.get('/users/:id', getUserInfo);

module.exports = router;
