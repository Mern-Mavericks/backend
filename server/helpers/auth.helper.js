import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const generateToken = (user) => {
  return jwt.sign({
    _id: user._id,
    email: user.email,
    name: user.name
  }, config.jwtSecret, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  return jwt.verify(token, config.jwtSecret);
};

export { generateToken, verifyToken };
