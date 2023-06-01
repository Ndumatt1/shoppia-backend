const logout = async (req, res) => {
    try {
      // Clear the token from the client-side by sending a response with no Authorization header
      res.setHeader('Authorization', '');
  
      return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      console.error('Error during logout:', error);
      return res.status(500).json({ error: 'Failed to logout' });
    }
  };
  
  module.exports = logout;
  