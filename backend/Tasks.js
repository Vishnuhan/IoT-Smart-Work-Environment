// Tasks.js

const mongoose = require('mongoose');
const { exec } = require('child_process');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  taskName: String,
  phase: String,
  Complete: Boolean,
  employees: [
    {
      employeeName: String,
    }
  ], 
});

module.exports = mongoose.model('Task', taskSchema);
