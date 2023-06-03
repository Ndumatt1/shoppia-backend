const User = require('../../models/users');
const crypto = require('crypto');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
require('dotenv').config({ path: '../../.env' });

const forgotPasswordValidator = [
    body('email').isEmail().withMessage('Invalid email address'),
  ];

const forgotPassword = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
    
      const { email } = req.body;
      // Find the user by email
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Generate reset token
      const resetToken = generateResetToken();
  
      // Set the reset token and expiration in the user record
      user.resetToken = resetToken;
      user.resetTokenExpiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
  
      // Save the updated user record
      await user.save();
  
      // Send password reset email
      await sendPasswordResetEmail(user.email, resetToken);
  
      return res.status(200).json({ message: 'Password reset email sent' });
    } catch (error) {
      console.error('Error during forgot password:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  const generateResetToken = () => {
    // Generate a random reset token using the crypto module
    const resetToken = crypto.randomBytes(20).toString('hex');
    return resetToken;
  };
  
  const sendPasswordResetEmail = async (email, resetToken) => {
    try {
      const shopEmail = process.env.EMAIL;
      const pass = process.env.PASS;

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: shopEmail,
          pass: pass,
        },
      });
  
      // Define the email message
      const mailOptions = {
        from: shopEmail,
        to: email,
        subject: 'Password Reset',
        text: `Dear user,\n\nTo reset your password, please click on the following link:\n\nhttps://shoppia-online.netlify.app/reset-password?token=${resetToken}\n\nIf you did not request a password reset, please ignore this email.\n\nBest regards,\nShoppia Team`,
      };
  
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw new Error('Failed to send password reset email');
    }
  };
  
  module.exports = { forgotPasswordValidator, forgotPassword };