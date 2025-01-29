// models/Appointment.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  therapistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist' }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
