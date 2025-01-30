// Database Integration using Mongoose for MongoDB and Sequelize for SQL

const mongoose = require('mongoose');
const { Sequelize, DataTypes } = require('sequelize');

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mental_health_app', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

// MySQL Connection
const sequelize = new Sequelize('mental_health_app', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

// MongoDB Models
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});
const MoodTrackerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  moodLogs: { type: Array, required: true },
  journalEntry: { type: String },
});
const ProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  weekStart: { type: Date, required: true },
  weekEnd: { type: Date, required: true },
  moodScore: { type: Number, required: true },
});
const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  contact: { type: String, required: true },
});
const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});
const AppointmentSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  appointmentTime: { type: Date, required: true },
});
const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  rsvpUsers: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rsvpTime: { type: Date, default: Date.now },
  }],
});
const EmergencyNumbersSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctorContact: { type: String, required: true },
  otherNumbers: { type: Array },
});

// Register MongoDB Models
const User = mongoose.model('User', UserSchema);
const MoodTracker = mongoose.model('MoodTracker', MoodTrackerSchema);
const Progress = mongoose.model('Progress', ProgressSchema);
const Doctor = mongoose.model('Doctor', DoctorSchema);
const Exercise = mongoose.model('Exercise', ExerciseSchema);
const Appointment = mongoose.model('Appointment', AppointmentSchema);
const Event = mongoose.model('Event', EventSchema);
const EmergencyNumbers = mongoose.model('EmergencyNumbers', EmergencyNumbersSchema);

// SQL Models
const SQLUser = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  username: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
});
const SQLMoodTracker = sequelize.define('MoodTracker', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  mood_logs: { type: DataTypes.JSON, allowNull: false },
  journal_entry: { type: DataTypes.TEXT },
  date: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
});
const SQLProgress = sequelize.define('Progress', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  week_start: { type: DataTypes.DATE, allowNull: false },
  week_end: { type: DataTypes.DATE, allowNull: false },
  mood_score: { type: DataTypes.INTEGER, allowNull: false },
});
const SQLDoctor = sequelize.define('Doctor', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  specialty: { type: DataTypes.STRING, allowNull: false },
  contact: { type: DataTypes.STRING, allowNull: false },
});
const SQLExercise = sequelize.define('Exercise', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
});
const SQLAppointment = sequelize.define('Appointment', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  doctor_id: { type: DataTypes.INTEGER, allowNull: false },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  appointment_time: { type: DataTypes.DATE, allowNull: false },
});
const SQLEvent = sequelize.define('Event', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  type: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false },
  time: { type: DataTypes.STRING, allowNull: false },
});
const SQLEmergencyNumbers = sequelize.define('EmergencyNumbers', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  doctor_contact: { type: DataTypes.STRING, allowNull: false },
  other_numbers: { type: DataTypes.JSON },
});

// Sync SQL Models
const syncSQLModels = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('SQL models synced');
  } catch (error) {
    console.error('Error syncing SQL models:', error);
  }
};

module.exports = {
  connectDB,
  sequelize,
  syncSQLModels,
  User,
  MoodTracker,
  Progress,
  Doctor,
  Exercise,
  Appointment,
  Event,
  EmergencyNumbers,
  SQLUser,
  SQLMoodTracker,
  SQLProgress,
  SQLDoctor,
  SQLExercise,
  SQLAppointment,
  SQLEvent,
  SQLEmergencyNumbers,
};
