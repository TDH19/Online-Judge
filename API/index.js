import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import problemRouter from './routes/problem.route.js';
import cookieParser from 'cookie-parser';


dotenv.config();

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO).then(() => {
  console.log('Connected to MongoDB successfully!!');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

app.use(cookieParser());

app.listen(PORT, () => {
  console.log('Server is running on port 3000!!');
  
});

// test route to check if server is running
app.use('/api/user',userRouter);

// auth route for user authentication
app.use('/api/auth',authRouter);

// problem route for problem related routes
app.use('/api/problem',problemRouter);

// Error handling middleware
app.use((error,req,res,next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    res.status(statusCode).json({ 
        success:false,
        statusCode,
        message, });
});

app.post('/api/run', async (req, res) => {
  try {
    const response = await fetch(`${process.env.Compiler}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data); // send response back to frontend
  } catch (err) {
    console.error(err);
    res.status(500).json({ err });
  }
});