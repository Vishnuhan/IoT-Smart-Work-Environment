const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  Name: String,
  Times: [
    {
      time: String,
      booked: Boolean,
    }
  ], // 11:00, false         
});

module.exports = mongoose.model('rooms', roomSchema);