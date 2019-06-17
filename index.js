const express  = require('express');
const mongoose = require('mongoose');
const patients = require('./routes/patients');
const doctors = require('./routes/doctors');

const app = express();

mongoose.connect('mongodb://localhost/pms')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(express.json());
app.use('/api/v1/patients', patients);
app.use('/api/v1/doctors', doctors);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
