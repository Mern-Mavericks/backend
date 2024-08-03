import express from 'express';
import userCtrl from '../controllers/user.controller.js';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();

router.route('/').get(userCtrl.list).post(userCtrl.create);

// Route to list all users
router.route('/').get(userCtrl.list);

router
  .route('/:userId')
  .get(authCtrl.requireSignin, userCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.remove);

router.param('userId', userCtrl.userByID);

export default router;
