/**
 * @swagger
 * /api/v1/register:
 *   post:
 *     summary: User Registration
 *     description: Register a new user
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
 *         description: User registration successful
 *       400:
 *         description: Invalid request or missing required fields
 *       500:
 *         description: Internal server error
 */

const express = require('express');
const db = require('../../config');

const {
  /*getVerificationEmail,*/ registerUser,
} = require('../../controller/userController/register');

const router = express.Router();

router.post('/register', registerUser);

/*router.get('/verify-email', async (req, res) => {
    const { token } = req.query;
    try {
      // Verify the token
      const decodedToken = jwt.verify(token, 'mykey');
  
      // Get the user ID from the token
      const userId = decodedToken.userId;
  
      // Update the user's email verification status in the database
      await User.update({ isEmailVerified: true }, { where: { id: userId } });
  
      return res.status(200).json({ message: 'Email verified successfully' });
    } catch (err) {
      console.error(`Error verifying email:`, err);
      return res.status(500).json({ error: 'Failed to verify email' });
    }
  }); */

module.exports = router;
