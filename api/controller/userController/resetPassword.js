const User = require('../../models/users');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

const resetPasswordValidator = [
  body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters')];

const resetPassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { password } = req.body;
    const resetToken = req.query.token;

    // Find the user by the reset token
    const user = await User.findOne({ where: { resetToken } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the reset token has expired
    if (user.resetTokenExpiresAt < Date.now()) {
      return res.status(400).json({ error: 'Reset token has expired' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password and clear the reset token
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiresAt = null;

    // Save the updated user record
    await user.save();

    return res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error during password reset:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { resetPasswordValidator, resetPassword };
