/*
 * This file handles functions to display a user information
 * Check the routes folder for the endpoint
 */

const { validationResult } = require('express-validator');
const User = require('../../models/users');

const getUserInfo = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    // Check if the user exists
    const user = await User.findOne({ where: { id: id } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { password, ...userInfo } = user.toJSON();

    // Return the user data
    return res.status(200).json({ user: userInfo });
  } catch (err) {
    console.error('Error retrieving user:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = getUserInfo;
