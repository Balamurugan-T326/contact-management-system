const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const contactRoutes = require('./routes/contactRoutes');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());

// Routes
app.use('/contacts', contactRoutes);

// Root route
app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to the Contact Management System API',
    endpoints: {
      createContact: 'POST /contacts',
      getAllContacts: 'GET /contacts',
      getContactById: 'GET /contacts/:id',
      updateContact: 'PUT /contacts/:id',
      deleteContact: 'DELETE /contacts/:id',
    },
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API Route not found',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
