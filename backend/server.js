// server.js

const express = require('express');
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');
const User = require('./User');
const Project = require('./Projects');
const Room = require('./Rooms');

const app = express();

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

// Project routes
const projectRoutes = express.Router();

projectRoutes.post('/projects', async (req, res) => {
  const projectData = req.body;
  console.log('We are in the projects API');
  try {
    // Save project data to MongoDB
    // Assuming you have a Project model similar to User model
    const newProject = new Project(projectData);
    await newProject.save();

    res.send('Project added successfully.');
    console.log('Project Added Successfully');
  } catch (err) {
    console.error(err);
    return res.status(500).send('An error occurred while adding the project.');
  }
});

const roomRoutes = express.Router();

roomRoutes.get('/rooms/:roomName/times/:times', async (req, res) => {
  console.log('Fetching room data from the database');
  try {
    const { roomName, times } = req.params;

    // Find the room by ID (assuming your room is identified by roomName)
    const room = await Room.findOne({ Name: roomName });

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    // Check if 'Times' property exists
if (room.Times && room.Times.length > 0) {
  // Find the time slot corresponding to the specified time
  const specifiedTimeSlot = room.Times.find(timeSlot => timeSlot.time === times);

  if (specifiedTimeSlot) {
    // Use the boolean value from the database
    const isTimeBooked = specifiedTimeSlot.booked;
    console.log(isTimeBooked)

    if (isTimeBooked) {
      console.log('Room is Available to be booked!');
      res.json({ booked: true });
    } else {
      console.log('Room is occupied, choose another timeslot.');
      res.json({ booked: false });
    }
  } else {
    console.log('Specified time slot not found.');
    res.json({ booked: false });
  }
} 
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'An error occurred while fetching rooms data.' });
  }
});

// API to handle update values 
roomRoutes.put('/rooms/:roomName/times/:times', async (req, res) => {
  try {
    const { roomName, times } = req.params;

    // Update the room by setting the booked value to false for the specific time slot
    await Room.findOneAndUpdate(
      { Name: roomName, 'Times.time': times },
      { $set: { 'Times.$.booked': false } }
    );

    // Send a success response
    res.json({ message: 'Booking updated successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'An error occurred while updating room data.' });
  }
});


projectRoutes.get('/projects', async (req, res) => {
  console.log('Fetching projects from the database');
  try {
    // Fetch all projects from MongoDB
    const projects = await Project.find();
    res.json(projects);
    console.log(projects)
  } catch (err) {
    console.error(err);
    return res.status(500).send('An error occurred while fetching projects.');
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

    var dummyEmployee = {
      name: "Syed Abdul Wadood",
      tasks: "Dummy Data Tasks" 
    }

    res.json(dummyEmployee);
    console.log('Login Successful');
  } catch (err) {
    console.error(err);
    return res.status(500).send('An error occurred during login.');
  }
});


app.use('/auth', authRoutes);
app.use('/auth', projectRoutes);
app.use('/auth', roomRoutes);



// Listen on all network interfaces
const PORT = 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
