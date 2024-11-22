const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

/**
 * Middleware to enable Cross-Origin Resource Sharing (CORS).
 * Allows requests from the frontend running on http://localhost:3000.
 */
app.use(cors({ origin: 'http://localhost:3000' }));

/**
 * Middleware to parse incoming JSON requests.
 * This enables the server to handle JSON payloads in API requests.
 */
app.use(bodyParser.json());

/**
 * Connect to the MongoDB database using the connection string from the environment variables.
 * Logs a message upon successful connection or an error if the connection fails.
 */
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => console.log(err));

/**
 * API routes for course and unit-related operations.
 * - /api/courses: Handles routes for course-related operations.
 * - /api/units: Handles routes for unit-related operations.
 * - /auth: Handles routes for authentication (register, login, logout).
 * - /api/user-activity: Handles routes for user-activity.
 */
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/units', require('./routes/unitRoutes'));
app.use('/auth', require('./routes/authRoutes'));
app.use('/api/user-activity', require('./routes/userActivityRoutes'));

/**
 * Starts the Express server on the specified port.
 * Logs a message indicating that the server is running.
 */
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
