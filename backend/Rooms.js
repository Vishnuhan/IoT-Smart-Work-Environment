const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  Name: String,
  Times: [String, Boolean], // 11:00, false         
});

module.exports = mongoose.model('rooms', roomSchema);