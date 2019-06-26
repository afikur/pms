const express = require('express');
const router = express.Router();
const {Doctor} = require('../doctor/doctor.model');
const {Patient} = require('../patient/patient.model');
const {Prescription, validate} = require('./prescription.model');

router.get('/:doctorId/:patientId', async (req, res) => {
    const {doctorId, patientId} = req.params;
    const prescriptions = await Prescription.find({doctor: doctorId, patient: patientId});
    res.send(prescriptions);
});

router.post('/', async (req, res) => {
    const {doctorId, patientId} = req.body;
    const {error} = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const doctor = await Doctor.findById(doctorId);
    const patient = await Patient.findById(patientId);
    if(!doctor) {
        return res.status(400).send('Invalid doctor ID provided');
    } if(!patient) {
        return res.status(400).send('Invalid patient ID provided');
    } else {
        const prescription = new Prescription({
            doctor: doctorId,
            patient: patientId,
            disease: req.body.disease,
            medicine: req.body.medicine
        });

        const createdPrescription = await prescription.save();
        res.send(createdPrescription);
    }
});

module.exports = router;
