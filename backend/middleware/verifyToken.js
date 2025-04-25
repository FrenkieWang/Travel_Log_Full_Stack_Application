const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET;

const verifyToken = (request, response, next) => {
  const token = request.headers['authorization'];

  if (!token) {
    return response.status(401).json('No token provided');
  }

  jwt.verify(token, SECRET_KEY, (error, decoded) => {
    if (error) return response.status(401).json('Invalid token');
    
    request.userId = decoded.id; // Add userId into request
    next(); // Go to next Function
  });
};

module.exports = verifyToken;