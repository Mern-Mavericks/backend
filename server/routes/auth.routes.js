import express from 'express';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();

router.route('/signin').post(authCtrl.signin);
router.route('/signout').get(authCtrl.signout);
router.route('/signup').post(authCtrl.signup);

export default router;
