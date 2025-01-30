// Required dependencies
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialize app and middleware
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Database connection
mongoose.connect("mongodb://localhost:27017/mindsphere", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Database connection error:", err));

// Models
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

const MoodSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  moodLogs: [{ mood: String, date: Date }],
  journalEntries: [{ title: String, content: String, date: Date }]
});

const AppointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  doctorId: String,
  date: Date,
  time: String
});

const User = mongoose.model("User", UserSchema);
const Mood = mongoose.model("Mood", MoodSchema);
const Appointment = mongoose.model("Appointment", AppointmentSchema);

// JWT Secret
const JWT_SECRET = "your_jwt_secret_key";

// Register API
app.post("/api/register", async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ error: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, email });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(400).json({ error: "Error registering user", details: error.message });
  }
});

// Login API
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Error logging in", details: error.message });
  }
});

// Middleware to authenticate JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const verified = jwt.verify(token.split(" ")[1], JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
  }
};

// Mood Tracker APIs
app.post("/api/mood-tracker/log", authenticateToken, async (req, res) => {
  const { mood, journalEntry, date } = req.body;
  try {
    let moodData = await Mood.findOne({ userId: req.user.id });

    if (!moodData) {
      moodData = new Mood({ userId: req.user.id, moodLogs: [], journalEntries: [] });
    }

    if (mood) {
      moodData.moodLogs.push({ mood, date: date || new Date() });
    }

    if (journalEntry) {
      moodData.journalEntries.push({
        title: journalEntry.title,
        content: journalEntry.content,
        date: date || new Date()
      });
    }

    await moodData.save();
    res.status(200).json({ message: "Mood and journal data saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error logging mood", details: error.message });
  }
});

app.get("/api/mood-tracker", authenticateToken, async (req, res) => {
  try {
    const moodData = await Mood.findOne({ userId: req.user.id });
    if (!moodData) return res.status(404).json({ error: "No mood data found" });

    res.status(200).json({ moodLogs: moodData.moodLogs, journalEntries: moodData.journalEntries });
  } catch (error) {
    res.status(500).json({ error: "Error fetching mood data", details: error.message });
  }
});

// Progress API
app.get("/api/progress", authenticateToken, async (req, res) => {
  try {
    const moodData = await Mood.findOne({ userId: req.user.id });
    if (!moodData) return res.status(404).json({ error: "No mood data found" });

    res.status(200).json({ moodLogs: moodData.moodLogs });
  } catch (error) {
    res.status(500).json({ error: "Error fetching progress", details: error.message });
  }
});

// Exercises API
app.get("/api/exercises", (req, res) => {
  const exercises = [
    { id: 1, name: "Breathing", details: "Relaxation breathing techniques" },
    { id: 2, name: "Yoga", details: "Yoga for mental health" },
    { id: 3, name: "Sleep", details: "Tips for better sleep" },
    { id: 4, name: "Music", details: "Calming music playlists" },
    { id: 5, name: "Meditation", details: "Guided meditations" }
  ];

  res.status(200).json({ exercises });
});

// Connect API
app.get("/api/events", (req, res) => {
  const events = [
    { id: 1, name: "Online Webinar", type: "Webinar", date: "2025-02-01", time: "10:00 AM" },
    { id: 2, name: "Mental Health Meetup", type: "Get Together", date: "2025-02-10", time: "4:00 PM" }
  ];

  res.status(200).json({ events });
});

app.post("/api/events/rsvp", authenticateToken, (req, res) => {
  const { eventId } = req.body;
  // Logic to save RSVP (to be implemented)
  res.status(200).json({ message: RSVP for event ${eventId} successful! });
});

// Emergency Numbers API
app.get("/api/emergency", (req, res) => {
  const emergencyContacts = [
    { name: "Dr. Smith", number: "+1234567890" },
    { name: "Emergency Line", number: "911" }
  ];

  res.status(200).json({ emergencyContacts });
});

// Appointment Booking APIs
app.get("/api/doctors", (req, res) => {
  const doctors = [
    { id: 1, name: "Dr. Jane Doe", specialization: "Therapist" },
    { id: 2, name: "Dr. John Smith", specialization: "Psychiatrist" }
  ];

  res.status(200).json({ doctors });
});

app.post("/api/appointments/book", authenticateToken, async (req, res) => {
  const { doctorId, date, time } = req.body;
  try {
    const appointment = new Appointment({ userId: req.user.id, doctorId, date, time });
    await appointment.save();
    res.status(200).json({ message: "Appointment booked successfully!", appointment });
  } catch (error) {
    res.status(500).json({ error: "Error booking appointment", details: error.message });
  }
});

app.get("/api/appointments", authenticateToken, async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user.id });
    res.status(200).json({ appointments });
  } catch (error) {
    res.status(500).json({ error: "Error fetching appointments", details: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(Server running on port ${PORT}));