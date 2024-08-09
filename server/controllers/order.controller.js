import Order from '../models/order.model.js';
import { v4 as uuidv4 } from 'uuid';

// Create a new order
 const createOrder = async (req, res) => {
  try {
    const { productId, quantity, address, userName, phoneNumber } = req.body;
    const orderNumber = uuidv4();

    const newOrder = new Order({
      productId,
      quantity,
      orderNumber,
      delivered: false,
      address,
      userName,
      phoneNumber,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error });
  }
};

// Get all previous orders (delivered)
 const getPreviousOrders = async (req, res) => {
  try {
    const orders = await Order.find({ delivered: true });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch previous orders', error });
  }
};

// Get all current orders (not delivered)
 const getCurrentOrders = async (req, res) => {
  try {
    const orders = await Order.find({ delivered: false });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch current orders', error });
  }
};

// Get order by ID
 const getOrderById = async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.findById(id);
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch order', error });
    }
  };
  

  // Update order by ID
 const updateOrderById = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
  
      const updatedOrder = await Order.findByIdAndUpdate(id, updatedData, { new: true });
  
      if (!updatedOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update order', error });
    }
 };
  
 // Delete order by ID
 const deleteOrderById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const deletedOrder = await Order.findByIdAndDelete(id);
  
      if (!deletedOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete order', error });
    }
  };
  
  

export default {createOrder, getCurrentOrders, getPreviousOrders, getOrderById, updateOrderById, deleteOrderById };
