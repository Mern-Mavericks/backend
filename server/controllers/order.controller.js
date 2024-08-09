import Order from '../models/order.model.js';
import { v4 as uuidv4 } from 'uuid';

// Create a new order
export const createOrder = async (req, res) => {
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
export const getPreviousOrders = async (req, res) => {
  try {
    const orders = await Order.find({ delivered: true });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch previous orders', error });
  }
};

// Get all current orders (not delivered)
export const getCurrentOrders = async (req, res) => {
  try {
    const orders = await Order.find({ delivered: false });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch current orders', error });
  }
};

export default {createOrder, getCurrentOrders, getPreviousOrders,  };
