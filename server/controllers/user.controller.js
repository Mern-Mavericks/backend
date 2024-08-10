import User from '../models/user.model.js';
import extend from 'lodash/extend.js';
import errorHandler from './error.controller.js';
import { connectToDb, getDb, closeConnection } from '../db/connection.js';
const create = async (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  try {
    await connectToDb();
    const db = getDb();

    // Example: Insert a document into a collection
    const collection = db.collection('mycollection'); // Replace with your collection name
    const result = await collection.insertOne({ name: 'Alice', age: 25 });
    console.log('Document inserted:', result.insertedId);

    // Example: Find documents in a collection
    const documents = await collection.find({}).toArray();
    console.log('Documents:', documents);

    await user.save();
    return res.status(200).json({
      message: 'Successfully signed up!',
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const list = async (req, res) => {
  try {
    let users = await User.find();
    res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const userByID = async (req, res, next, id) => {
  try {
    console.log("Looking for user with ID:", id);
    let user = await User.findById(id);
    if (!user) {
      console.log("User not found");
      return res.status(404).json({ error: 'User not found' });
    }
    req.profile = user;
    next();
  } catch (err) {
    console.error("Error retrieving user:", err);
    return res.status(400).json({
      error: 'Could not retrieve user',
    });
  }
};

const read = (req, res) => {
  if (!req.profile) {
    return res.status(400).json({ error: 'User profile not found' });
  }
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};


const update = async (req, res) => {
  try {
    const userId = req.auth._id; // Get user ID from the decoded JWT token

    // Fetch the user directly if req.profile is not set
    let user = req.profile || await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user = extend(user, req.body); // Merge the updated fields into the user object
    user.updated = Date.now(); // Update the timestamp

    await user.save(); // Save the updated user object to the database
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  } catch (err) {
    console.error("Error updating user:", err);
    return res.status(400).json({
      error: 'Could not update user',
    });
  }
};

const remove = async (req, res) => {
  try {
    let user = req.profile;
    let deletedUser = await user.deleteOne();
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.json(deletedUser);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

// Get My Profile (Authenticated User)
const getMyProfile = async (req, res) => {
  try {
    console.log("getMyProfile function is running");
    // console.log(req,'request')
    const userId = req.auth._id; // Assuming req.auth is populated correctly
    console.log("Looking for user with ID:", userId);

    let user = await User.findById(userId);

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ error: 'User not found' });
    }

    // Safely set properties only if the user exists
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  } catch (err) {
    console.error("Error retrieving user profile:", err);
    return res.status(400).json({
      error: 'Could not retrieve user',
    });
  }
};




export default { create, userByID, read, list, remove, update, getMyProfile };
