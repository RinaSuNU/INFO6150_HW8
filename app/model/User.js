const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    match: /^[a-zA-Z\s]+$/, 
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String, 
    default: null,
  },
});


module.exports = mongoose.model('User', userSchema);
