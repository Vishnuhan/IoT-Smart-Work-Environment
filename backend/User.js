// User.js

const mongoose = require('mongoose');
const { exec } = require('child_process');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  employeeName: String,
  employeeId: {
    type: String,
    unique: true,
    required: true,
  },
  password: String,
  tasks: [
    {
        taskName: String,
        taskSize: Number,
        activeTask: Boolean
    }
  ],
  employeePic: String
});

module.exports = mongoose.model('User', userSchema);
