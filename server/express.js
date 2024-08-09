import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import template from './../template.js'; // Import the template
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js'; // Correct import for auth routes
import path from 'path';
import productRoutes from './routes/product.routes.js';
import User from './models/user.model.js';
import orderRoutes from './routes/order.routes.js';

const app = express();
const CURRENT_WORKING_DIR = process.cwd();

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());

// Mount routes
app.use('/api/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/api', productRoutes);
app.use('/api/orders', orderRoutes);

// Serve the HTML template at the root URL
app.get('/', (req, res) => {
  res.status(200).send(template());
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: err.name + ': ' + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ': ' + err.message });
    console.log(err);
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find(); // Assuming you have a User model
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
});


export default app;
