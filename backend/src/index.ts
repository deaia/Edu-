import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/edu-management';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((error) => console.error('❌ MongoDB connection error:', error));

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Welcome to Edu Management System API',
    version: '1.0.0',
    endpoints: {
      students: '/api/students',
      sections: '/api/sections',
      attendance: '/api/attendance',
      payments: '/api/payments',
      exams: '/api/exams',
      behavior: '/api/behavior',
      dashboard: '/api/dashboard',
    },
  });
});

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'Server is running ✅' });
});

// Error Handling Middleware
app.use((err: any, req: Request, res: Response) => {
  console.error(err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 Edu Management System - Backend Server`);
});

export default app;
