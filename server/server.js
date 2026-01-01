const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const bookRoutes = require('./routes/bookRoutes');

const app = express();

/**
 * MIDDLEWARE CONFIGURATION
 */

// Parse incoming JSON request bodies
app.use(express.json());

// Enable Cross-Origin Resource Sharing (CORS)
// Allows requests from frontend on localhost:3000
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

/**
 * DATABASE CONNECTION
 */

// Connect to MongoDB Atlas
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`✓ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`✗ Database Connection Error: ${error.message}`);
    process.exit(1);
  }
};

/**
 * API ROUTES
 */

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// Book management routes
app.use('/api/books', bookRoutes);

/**
 * ==========================================
 * ERROR HANDLING - 404 Not Found
 * ==========================================
 */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

/**
 * ==========================================
 * SERVER START
 * ==========================================
 */

const PORT = process.env.PORT || 5000;

// Connect to database and start server
connectDB();

app.listen(PORT, () => {
  console.log(`✓ Smart Library Server running on port ${PORT}`);
  console.log(`✓ API available at http://localhost:${PORT}/api`);
});
