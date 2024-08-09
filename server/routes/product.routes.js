// routes/product.routes.js
import express from 'express';
import productCtrl from '../controllers/product.controller.js';
import { requireSignin } from '../middlewares/auth.middleware.js'; 

const router = express.Router();

router.route('/products/featured').get( productCtrl.listProducts);

// New route for listing all products
router.route('/products').get(requireSignin, productCtrl.listAllProducts);

// Route to add a new product
router.route('/products').post(requireSignin, productCtrl.addProduct);

// Route to update a product by ID
router.route('/products/:productId').put(requireSignin, productCtrl.updateProduct);

// Route to delete a product by ID
router.route('/products/:productId').delete(requireSignin, productCtrl.deleteProduct);

// Route to get a product by ID
router.route('/products/:productId').get(requireSignin, productCtrl.getProductById);

// Route to delete all products
router.route('/products').delete(requireSignin, productCtrl.deleteAllProducts);

export default router;
