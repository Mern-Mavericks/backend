import dotenv from 'dotenv';
dotenv.config();

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'YOUR_secret_key',
  mongoUri: process.env.MONGODB_URI || 'mongodb+srv://mernproject:<password>@mernproject.c1gssia.mongodb.net/mernproject?retryWrites=true&w=majority',
};

export default config;
