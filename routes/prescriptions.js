const express = require('express');
const router = express.Router();
const {Doctor} = require('./../models/doctor');
const {Patient} = require('./../models/patient');
const {Prescription, validate} = require('./../models/prescription');

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

    try {
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
    }
    catch (e) {
        console.log(e);
    }
});

module.exports = router;
