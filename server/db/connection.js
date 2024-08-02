import { MongoClient } from 'mongodb';
export const mongoConfig = {
  url: 'mongodb://localhost:27017', // Replace with your MongoDB URL if it's hosted remotely
  dbName: 'mernproject', // Replace with your database name
};

const client = new MongoClient(mongoConfig.url, { useUnifiedTopology: true });

let db;

export const connectToDb = async () => {
  try {
    await client.connect();
    console.log('Connected successfully to MongoDB');
    db = client.db(mongoConfig.dbName);
  } catch (err) {
    console.error(err);
  }
};

export const getDb = () => {
  if (!db) {
    throw new Error('Database not connected');
  }
  return db;
};

export const closeConnection = async () => {
  try {
    await client.close();
    console.log('Connection closed');
  } catch (err) {
    console.error(err);
  }
};
