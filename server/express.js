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

export default app;
