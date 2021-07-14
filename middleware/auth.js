// we create own middleware than using bloated passport, that is good if want fb login, etc..
const jwt = require('jsonwebtoken');
const config = require('config');

// middleware function has access to request, response objects, also a callback to run to next piece of middleware
module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');
  // Check for token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' }); // 401 = not authorized
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
