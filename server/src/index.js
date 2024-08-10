//index.js
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes'); // Import your auth routes
const connectDB = require('./config/database'); // If you have a separate DB connection config
const passportConfig = require('./config/passport'); // Import your passport config

dotenv.config();

const app = express();
const port = process.env.PORT;

// Connect to the database
connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key', // Use an environment variable for secret
  resave: false,
  saveUninitialized: false,
}));

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Define routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes); // Use auth routes

// Root route
app.get('/', (req, res) => {
  res.send('Express');
});

// Start the server
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
