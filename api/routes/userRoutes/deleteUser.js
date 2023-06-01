/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Delete a user by their ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Invalid request or missing required fields
 *       401:
 *         description: Unauthorized access
 *       403:
 *         description: User not authorized to delete the user
 *       500:
 *         description: Internal server error
 */

// Import necessary dependencies

const express = require('express');
const deleteUser = require('../../controller/userController/deleteuser');

const router = express.Router();

router.delete('/users/:id', deleteUser);

module.exports = router;
