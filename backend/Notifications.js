const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  targetEmployeeIds: [{
    type: String,
    ref: 'User', // Assuming 'User' is the name of your employee model
  }],
  readBy: [{
    type: String,
    ref: 'User',
  }],
});

module.exports = mongoose.model('notifications', notificationSchema);
