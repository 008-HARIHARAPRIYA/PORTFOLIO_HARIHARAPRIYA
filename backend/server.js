const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const projectRoutes = require('./routes/projectRoutes');

const codingStatsRoute = require('./routes/codingStatsRoute');
const certificationRoutes = require('./routes/certificationRoutes');
const secretRoutes = require('./routes/secretRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect DB
const connectDB = require('./config/db');
connectDB();
app.use('/api/projects', projectRoutes);
app.use('/api/coding-stats', codingStatsRoute);
app.use('/api/certifications', certificationRoutes);

app.use('/api/secret', secretRoutes);


console.log("Env key:", process.env.SECRET_KEY);


// Basic Route
app.get('/', (req, res) => {
  res.send('Portfolio Backend is running...');
});

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
