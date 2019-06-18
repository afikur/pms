const express  = require('express');
const mongoose = require('mongoose');
const patients = require('./routes/patients');
const doctors = require('./routes/doctors');
const prescriptions = require('./routes/prescriptions');
const swaggerUi = require('swagger-ui-express');

const app = express();

mongoose.connect('mongodb://localhost/pms')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(express.json());
app.use('/api/v1/patients', patients);
app.use('/api/v1/doctors', doctors);
app.use('/api/v1/prescriptions', prescriptions);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
