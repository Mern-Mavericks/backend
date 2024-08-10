import express from 'express';
import userCtrl from '../controllers/user.controller.js';
import authCtrl from '../controllers/auth.controller.js';

const logAuth = (req, res, next) => {
  console.log("Decoded JWT:", req.auth);
  next();
};


const router = express.Router();

router.route('/').get(userCtrl.list).post(userCtrl.create);

// Route to list all users
router.route('/').get(userCtrl.list);

// router
//   .route('/:userId')
//   .get(authCtrl.requireSignin, userCtrl.read)
//   .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
//   .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);

// Get and update the authenticated user's profile

router.route('/me')
  .get(authCtrl.requireSignin,logAuth, userCtrl.getMyProfile)
  .put(authCtrl.requireSignin,logAuth, userCtrl.update);

// router.param('userId', userCtrl.userByID);



// router.param('userId', userCtrl.userByID);




export default router;
