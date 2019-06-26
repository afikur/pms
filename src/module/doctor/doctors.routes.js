const express = require('express');
const doctorService = require('./doctor.service');
const router = express.Router();
const {validate} = require('./doctor.model');

router.get('/', async (req, res) => {
    const doctors = await doctorService.getAllDoctors();
    res.send(doctors);
});

router.post('/', async (req, res) => {
    const doctor = await doctorService.createDoctor(req.body);
    if (!doctor) {
        return res.status(400).send(error.details[0].message);
    }
    res.send(doctor);
});

router.put('/:id', async (req, res) => {
    const {error} = validate(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const doctor = await doctorService.updateDoctor(req.params.id, req.body);

    if (!doctor) {
        return res.status(404).send('The doctor with the given ID was not found.');
    }

    res.status(201).send(doctor);
});

router.delete('/:id', async (req, res) => {
    const doctor = await doctorService.deleteDoctor(req.params.id);

    if (!doctor) {
        return res.status(404).send('The doctor with the given ID was not found.');
    }
    res.send(doctor);
});

router.get('/:id', async (req, res) => {
    const doctor = await doctorService.getDoctorById(req.params.id);
    if (!doctor) {
        return res.status(404).send('The doctor with the given ID was not found.');
    }
    res.send(doctor);
});

module.exports = router;
