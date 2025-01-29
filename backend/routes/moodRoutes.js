const express = require('express');
const router = express.Router();
const User = require('../models/User'); // MongoDB User model

// Save mood progress
router.post('/save-mood', (req, res) => {
  const { userId, mood, notes } = req.body;

  User.findByIdAndUpdate(
    userId,
    { $push: { moodHistory: { mood, notes, date: new Date() } } },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        return res.status(400).json({ message: 'Error saving mood progress' });
      }
      res.status(200).json({ message: 'Mood progress saved successfully!', updatedUser });
    }
  );
});

module.exports = router;
