require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mentalhealthapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Schemas & Models
const teamSchema = new mongoose.Schema({
    name: String,
    role: String
});
const TeamMember = mongoose.model('TeamMember', teamSchema);

const userSchema = new mongoose.Schema({
    username: String,
    password_hash: String,
    email: String,
    profile_info: String,
    created_at: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);

const appointmentSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    doctor_name: String,
    date: Date,
    time: String,
    status: { type: String, default: 'pending' }
});
const Appointment = mongoose.model('Appointment', appointmentSchema);

const doctorSchema = new mongoose.Schema({
    name: String,
    details: String,
    specialization: String,
    contact: String
});
const Doctor = mongoose.model('Doctor', doctorSchema);

const emergencySchema = new mongoose.Schema({
    name: String,
    contact_number: String,
    contact_type: String 
});
const EmergencyNumber = mongoose.model('EmergencyNumber', emergencySchema);

const eventSchema = new mongoose.Schema({
    event_name: String,
    event_type: String,
    event_time: Date,
    rsvp_users: Array
});
const Event = mongoose.model('Event', eventSchema);

const moodTrackerSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now },
    mood: String,
    journal_entry: String
});
const MoodTracker = mongoose.model('MoodTracker', moodTrackerSchema);

const progressSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now },
    mood_rating: Number,
    stress_level: Number,
    progress_notes: String
});
const Progress = mongoose.model('Progress', progressSchema);

const exerciseSchema = new mongoose.Schema({
    exercise_name: String,
    description: String,
    category: String,
    duration: Number
});
const Exercise = mongoose.model('Exercise', exerciseSchema);

// API Routes
app.get('/team', async (req, res) => {
    try {
        const teamMembers = await TeamMember.find();
        res.json(teamMembers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/team', async (req, res) => {
    try {
        const newMember = new TeamMember(req.body);
        await newMember.save();
        res.json({ message: 'Team member added successfully', member: newMember });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Serve Frontend (React/HTML)
app.use(express.static(path.join(__dirname, 'frontend')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
