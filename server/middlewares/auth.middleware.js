// /backend/middlewares/auth.middleware.js
import jwt from 'jsonwebtoken';
import config from '../../config/config.js';

const requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1]; // Assuming Bearer token
    try {
      const decoded = jwt.verify(token, config.jwtSecret);
      req.auth = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  } else {
    return res.status(403).json({ error: 'Authorization header missing' });
  }
};

export { requireSignin }; 
