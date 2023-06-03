/*
 * This file defines the controller for user login
 * Check the routes folder for the endpoint
 */

const User = require('../../models/users');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

require('dotenv').config({ path: '../../.env' });

const jwtKey = process.env.JWT_SECRET;

// Configure passport to use JWT strategy
passport.use(
  new JwtStrategy(
    {
      secretOrKey: jwtKey, // Replace with your actual secret key
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (payload, done) => {
      try {
        // Retrieve user from the database based on the payload
        const user = await User.getUserById(payload.userId);
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    },
  ),
);

const loginValidator = [
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').notEmpty().withMessage('Password is required'),
];

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ errors: 'Invalid email' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ errors: 'Incorrect password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, jwtKey, { expiresIn: '24h' });

    return res.status(200).setHeader('Authorization', token).json({ token });
  } catch (err) {
    console.error('Error during login:', err);
    return res.status(500).json({errors: 'Internal server error'});
  }
};

module.exports = { login: [loginValidator, login] };
