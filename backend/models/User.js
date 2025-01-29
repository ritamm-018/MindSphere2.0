// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  moodHistory: [{ mood: Number, notes: String, date: Date }]
});

module.exports = mongoose.model('User', userSchema);
