// Load environment variables from the .env file
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Set up the port to use either the value from the .env file or a default of 3000
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Basic test route to check if the server is running
app.get('/', (req, res) => {
  res.send('Hello, World! Task Manager App is running!');
});

// Connect to MongoDB
mongoose
  .connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Database connection error:', err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
