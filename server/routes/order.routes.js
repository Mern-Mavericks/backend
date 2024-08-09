import express from 'express';
const router = express.Router();
import orderController from '../controllers/order.controller.js';
import { requireSignin } from '../middlewares/auth.middleware.js'; 

// Create a new order
router.post('/create',requireSignin, orderController.createOrder);

// Get all previous orders (delivered)
router.get('/previous',requireSignin, orderController.getPreviousOrders);

// Get all current orders (not delivered)
router.get('/current', requireSignin, orderController.getCurrentOrders);


// Get order by ID
router.get('/:id', requireSignin, orderController.getOrderById);

// Update order by ID
router.put('/:id', requireSignin, orderController.updateOrderById);

// Delete order by ID
router.delete('/:id', requireSignin, orderController.deleteOrderById);

export default router;
