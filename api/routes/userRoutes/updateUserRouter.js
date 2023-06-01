/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: Update User Information
 *     description: Update user information by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               // Define properties for the request body here
 *     responses:
 *       200:
 *         description: User information updated successfully
 *       400:
 *         description: Invalid request or missing required fields
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

const express = require('express');
const db = require('../../config');

const {
  updateUser,
} = require('../../controller/userController/updateUserInfo');

const router = express.Router();

router.put('/users/:id', updateUser);

module.exports = router;
