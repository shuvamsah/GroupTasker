const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  role: String
});

module.exports = mongoose.model('User', userSchema);
