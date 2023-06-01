/*
 * This file defines the controller for deleting the user account
 * It may come in handy when a user wishes to delete his or her account
 * But it may not be important at this point
 */

const { validationResult } = require('express-validator');
const User = require('../../models/users');

const deleteUser = async (req, res) => {
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

    // Delete the user
    await User.destroy({ where: { id: user.id } });

    // Return success response
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = deleteUser;
