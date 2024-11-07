import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increased payload limit for large image uploads

// Routes
app.use('/api/v1/post', postRoutes);

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello from the AI-powered Image Generator API!',
  });
});

const startServer = async () => {
  try {
    connectDB('mongodb://127.0.0.1:27017/ai'); // MongoDB connection URL
    app.listen(8080, () => console.log('Server started on port 8080'));
  } catch (error) {
    console.log(error);
  }
};

startServer();
