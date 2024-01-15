const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  Name: String,
  Percentage_Complete: Number,
  Team: [String],
  Due_Date: String,
  Tasks: [String],
});

module.exports = mongoose.model('projects', projectSchema);
