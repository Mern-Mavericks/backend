import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import { expressjwt } from 'express-jwt';
import config from './../../config/config.js';

// Sign in function to generate JWT token upon user login
const signin = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status('401').json({ error: 'User not found' });

    if (!user.authenticate(req.body.password)) {
      return res
        .status('401')
        .send({ error: "Email and password don't match." });
    }

    const token = jwt.sign({ _id: user._id }, config.jwtSecret, {
      expiresIn: '1h',
    });
    res.cookie('t', token, { expire: new Date() + 9999 });
    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status('401').json({ error: 'Could not sign in' });
  }
};

// Signup function to register a new user and generate a JWT token
const signup = async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = jwt.sign({ _id: user._id }, config.jwtSecret, {
      expiresIn: '1h',
    });
    res.cookie('t', token, { expire: new Date() + 9999 });
    return res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(err,'err')
    return res.status(400).json({
      error: 'Could not sign up user',
    });
  }
};

// Sign out function to clear JWT token from cookies
const signout = (req, res) => {
  res.clearCookie('t');
  return res.status('200').json({ message: 'Signed out' });
};

// Middleware to require a valid JWT token for access to certain routes
const requireSignin = expressjwt({
  secret: config.jwtSecret,
  algorithms: ['HS256'],
  userProperty: 'auth', // This populates req.auth with the JWT payload
  getToken: (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    }
    return null;
  },
});
// Middleware to check if the authenticated user is authorized to perform certain actions
const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status('403').json({ error: 'User is not authorized' });
  }
  next();
};

export default { signin, signout, signup, requireSignin, hasAuthorization };
