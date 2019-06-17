const express = require('express');
const router = express.Router();
const {Doctor, validate} = require('../models/doctor');

router.get('/', async (req, res) => {
    const doctors = await Doctor.find();
    res.send(doctors);
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }

    const {name, age, address, phone } = req.body;

    const doctor = new Doctor({ name, age, address, phone });

    const createdDoctor = await doctor.save();
    res.send(createdDoctor);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const {name, age, phone, address} = req.body;

    const doctor = await Doctor.findByIdAndUpdate(req.params.id,
        { name, age, address, phone }, { new: true });

    if (!doctor) {
        return res.status(404).send('The doctor with the given ID was not found.');
    }

    res.send(doctor);
});

router.delete('/:id', async (req, res) => {
    const doctor = await Doctor.findByIdAndRemove(req.params.id);

    if (!doctor) return res.status(404).send('The doctor with the given ID was not found.');

    res.send(doctor);
});

router.get('/:id', async (req, res) => {
    let doctor;
    try {
        doctor = await Doctor.findById(req.params.id);
    } catch (e) {
        console.log(`Invalid id provided...`, e);
    }

    if (!doctor) return res.status(404).send('The doctor with the given ID was not found.');

    res.send(doctor);
});


module.exports = router;