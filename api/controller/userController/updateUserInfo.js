/*
 * This file defines controller for updating user information
 * Check the routes folder for the endpoint
 */

const User = require('../../models/users');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const updateUser = async (req, res) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const { id } = req.params;
    const { firstname, lastname, username, email, password, phonenumber } =
      req.body;

    // Check if the user exists
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ where: { email } });
      if (emailExists) {
        return res.status(400).json({ error: `email is already taken` });
      }
    }

    if (username && username !== user.username) {
      const usernameExists = await User.findOne({ where: { username } });
      if (usernameExists) {
        return res.status(400).json({ error: `Username already exists` });
      }
    }
    // Hash the password if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    user.firstname = firstname || user.firstname;
    user.lastname = lastname || user.lastname;
    user.username = username || user.username;
    user.email = email || user.email;
    user.phonenumber = phonenumber || user.phonenumber;

    await user.save();

    // Update the user information
    // await User.updateUserInfo(id, firstname, lastname, username, email, hashedPassword, phonenumber);

    return res
      .status(200)
      .json({ message: 'User information updated successfully', user });
  } catch (err) {
    console.error('Error updating user information:', err);
    return res.status(500).json({ error: 'error updating user information' });
  }
};

module.exports = {
  updateUser: [
    body('firstname')
      .optional()
      .notEmpty()
      .withMessage('First name is required'),
    body('lastname').optional().notEmpty().withMessage('Last name is required'),
    body('username').optional().notEmpty().withMessage('Username is required'),
    body('email').optional().isEmail().withMessage('Invalid email address'),
    body('password')
      .optional()
      .isLength({ min: 5 })
      .withMessage('Password must be at least 5 characters long'),
    body('phonenumber')
      .optional()
      .isMobilePhone()
      .withMessage('Invalid phone number'),
    updateUser,
  ],
};
