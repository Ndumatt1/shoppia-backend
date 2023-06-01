/*
 * This file contains the authentication and authorization middleware
 * The two funtions defines routes a user needs to be authenticated before accessing
 * Check the description file for details on how to access protected routes
 */

const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '../.env' });

const jwtKey = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
  try {
    const token = req.header('authorization');
    if (!token) {
      return res.status(401).json({ error: 'Access Denied!' });
    }

    // Verify the token
    const decodedToken = jwt.verify(token, jwtKey);

    // Attach the userId to the request object
    req.userId = decodedToken.userId;
    //console.log(req.userId);

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      // Invalid token
      return res.status(401).json({ error: 'Invalid token' });
    } else if (error.name === 'TokenExpiredError') {
      // Expired token
      return res.status(401).json({ error: 'Token expired' });
    }

    console.error('Error authenticating:', error);
    return res.status(401).json({
      success: false,
      error: 'Authentication failed',
    });
  }
};

const authorize = (req, res, next) => {
  const { userId } = req.params;

  // Check if the authenticated user matches the requested user
  if (userId !== String(req.userId)) {
    return res.status(403).json({
      success: false,
      error: 'Authorization failed',
    });
  }

  next();
};

module.exports = {
  authenticate,
  authorize,
};
