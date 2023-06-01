/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     summary: User Login
 *     description: Perform user login functionality
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User login successful
 *       400:
 *         description: Invalid request or missing required fields
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */

const express = require('express');
const db = require('../../config');
const { login } = require('../../controller/userController/login');

const router = express.Router();

router.post('/login', login);

module.exports = router;
