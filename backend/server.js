import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';
dotenv.config()
import authRoutes from './routes/AuthRoutes.js'
import userRoutes from './routes/UserRoutes.js'
import ProductRoutes from './routes/ProductRoutes.js'
import PaymentRoutes from './routes/Payment_routes.js'
import CartRoutes from './routes/Cart_Routes.js'
import OrderRoutes from './routes/Order_Routes.js'
import TrainerRoutes from './routes/TrainerRoutes.js'
import AdminRoutes from './routes/AdminRoutes.js'
import connectDB from "./db/connectDB.js";
import path from "path";
import cors from 'cors'
import rateLimit from "express-rate-limit";
import { app, io, server } from "./socket/socket.js";
import { scheduleEmailNotifications, UpdateMembershipStatus } from "./controllers/UserControllers.js";
import helmet from "helmet";

const PORT = process.env.PORT || 5000;

// Error handling for uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

// Error handling for unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

scheduleEmailNotifications();
UpdateMembershipStatus();

const __dirname_temp = path.resolve();
const __dirname = path.join(__dirname_temp, '.');
console.log(__dirname);

app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://checkout.razorpay.com"],
      imgSrc: ["'self'", "data:", "https://i.imgur.com", "https://firebasestorage.googleapis.com"],
      connectSrc: ["'self'", "https://api.razorpay.com", "https://lumberjack.razorpay.com"],
      frameSrc: ["'self'", "https://checkout.razorpay.com", "https://api.razorpay.com"],
    },
  })
);

app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(cors({ 
  origin: ["*", "http://13.211.182.131:3000", "http://16.176.121.1:3000", "http://localhost:3000"], 
  credentials: true 
}));
app.use(bodyParser.json({ limit: '50mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', ProductRoutes);
app.use('/api/Payment', PaymentRoutes);
app.use('/api/Cart', CartRoutes);
app.use('/api/Order', OrderRoutes);
app.use('/api/Trainer', TrainerRoutes);
app.use('/api/Admin', AdminRoutes);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(path.resolve(), "frontend/dist");
  console.log('Serving frontend from:', frontendPath);
  
  app.use(express.static(frontendPath));
  
  app.get('*', (req, res) => {
    const indexPath = path.join(frontendPath, 'index.html');
    console.log('Serving index.html from:', indexPath);
    res.sendFile(indexPath);
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server with error handling
const startServer = async () => {
  try {
    await connectDB();
    server.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();