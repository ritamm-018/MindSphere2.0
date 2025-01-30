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
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Define Schemas & Models
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    profile_info: {
        name: String,
        dob: Date
    },
    created_at: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);

const moodTrackerSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now },
    mood: String,
    journal_entry: String
});
const MoodTracker = mongoose.model('MoodTracker', moodTrackerSchema);

// API Routes
app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/users/:id', async (req, res) => {
    try {
        const { name, dob, email } = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            email,
            'profile_info.name': name,
            'profile_info.dob': dob
        }, { new: true });
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/mood', async (req, res) => {
    try {
        const { user_id, mood, journal_entry } = req.body;
        const newMood = new MoodTracker({ user_id, mood, journal_entry });
        await newMood.save();
        res.json({ message: 'Mood logged successfully', mood: newMood });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/mood/:user_id', async (req, res) => {
    try {
        const moods = await MoodTracker.find({ user_id: req.params.user_id });
        res.json(moods);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Serve Frontend
app.use(express.static(path.join(__dirname, 'frontend')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
