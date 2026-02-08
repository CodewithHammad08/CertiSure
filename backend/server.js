const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const certificateRoutes = require('./routes/certificateRoutes');

app.use('/api/certificates', certificateRoutes);

app.get('/', (req, res) => {
  res.send('CertiSure Backend is Running');
});

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is healthy' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
