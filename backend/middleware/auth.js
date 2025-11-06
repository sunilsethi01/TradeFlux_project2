const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'No token!' });
  }

  // Authorization header is usually "Bearer <token>"
  const token = authHeader.startsWith('Bearer ') 
    ? authHeader.slice(7, authHeader.length) 
    : authHeader;

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token!' });
  }
}

module.exports = auth;
