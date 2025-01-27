const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const plaidRoutes = require('./routes/plaid'); // Added Plaid routes
const { initDatabase } = require('./db');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('views'));

// Initialize Database
initDatabase();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/plaid', plaidRoutes); // Added Plaid API routes

// Home Page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/home.html');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

