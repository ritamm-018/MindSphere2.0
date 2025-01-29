const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const moodRoutes = require('./routes/moodRoutes');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use('/api', moodRoutes);

mongoose
  .connect('mongodb://localhost:27017/mindsphere', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
