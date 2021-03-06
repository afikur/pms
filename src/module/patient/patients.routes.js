const express = require('express');
const router = express.Router();
const {Patient, validate} = require('./patient.model');
const {createPatient} = require('./patient.service');

router.get('/', async (req, res) => {
    const patients = await Patient.find();
    res.send(patients);
});

router.post('/', async (req, res) => {

    const patient = await createPatient(req.body);
    if(!patient) {
        return res.status(400).send(error.details[0].message)
    }
    res.send(patient);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const {name, age, phone, address} = req.body;

    const patient = await Patient.findByIdAndUpdate(req.params.id,
        { name, age, address, phone }, { new: true });

    if (!patient) {
        return res.status(404).send('The patient with the given ID was not found.');
    }

    res.send(patient);
});

router.delete('/:id', async (req, res) => {
    const patient = await Patient.findByIdAndRemove(req.params.id);

    if (!patient) return res.status(404).send('The patient with the given ID was not found.');

    res.send(patient);
});

router.get('/:id', async (req, res) => {
    const patient = await Patient.findById(req.params.id);

    if (!patient) return res.status(404).send('The patient with the given ID was not found.');

    res.send(patient);
});

module.exports = router;
