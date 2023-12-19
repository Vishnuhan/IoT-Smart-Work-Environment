// server.js

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');
const User = require('./User');

const app = express();
const { exec } = require('child_process');

// Express middleware and configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/auth');

// API data routes
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

app.get('/getSuggestions', (req, res) => {
  // Execute the Python script or provide suggestions logic
  exec('python suggestions.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Python script: ${error}`);
      return res.status(500).send('Internal Server Error');
    }

    console.log(`Python script output: ${stdout}`);
    res.send('Suggestions retrieved successfully');
  });
});

// Authentication routes
const authRoutes = express.Router();

authRoutes.post('/register', async (req, res) => {
  const { employeeName, employeeId, password } = req.body;

  // Check if employeeId is provided and not null
  if (!employeeId) {
    return res.status(400).send('Employee ID is required.');
  }

  console.log('Received registration request:', { employeeName, employeeId, password });

  try {
    // Save user data to MongoDB
    const newUser = new User({ employeeName, employeeId, password });
    await newUser.save();

    res.send('Registration successful.');
    console.log('Registration Successful');
  } catch (err) {
    console.error(err);
    return res.status(500).send('An error occurred while registering.');
  }
});

authRoutes.post('/login', async (req, res) => {
  const { employeeId, password } = req.body;

  // Check if employeeId and password are provided
  if (!employeeId || !password) {
    return res.status(400).send('Employee ID and password are required.');
  }

  console.log('Received login request:', { employeeId, password });

  try {
    // Find the user by employeeId and password
    const user = await User.findOne({ employeeId, password });

    if (!user) {
      console.log('Authentication failed: Incorrect credentials');
      return res.status(401).send('Authentication failed.');
    }

    res.send('Login successful.');
    console.log('Login Successful');
  } catch (err) {
    console.error(err);
    return res.status(500).send('An error occurred during login.');
  }
});


app.use('/auth', authRoutes);

// Listen on all network interfaces
const PORT = 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
