const mongoose = require('mongoose');

// Crate Schema
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Export the model
module.exports = mongoose.model('User', userSchema);
