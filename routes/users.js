const express = require('express');
const role = require('../helper/role');
const router = express.Router();
const {User} = require('../models/user');
const validateUser = require('../models/user').validate;
const {createDoctor} = require('./../service/doctor.service');
const {createPatient} = require('./../service/patient.service');

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (e) {
        res.status(500).send('Internal server error');
    }
});

router.post('/', async (req, res) => {
    try {
        const {email, password, scope} = req.body;
        let user = new User({email, password, scope});
        let err = validateUser(user);
        if(err) {
            res.status(400).send('Requested with bad payload');
        }
        user = await user.save();
        res.send(user);
    } catch (e) {
        res.status(500).send('Internal server error');
    }
});

router.post('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user) {
            res.status(404).send('requested user not found');
        }
        if(user.scope === role.doctor) {
            const doctor = await createDoctor(req.body);
            if(!doctor) {
                return res.status(400).send(error.details[0].message);
            }
            res.send(doctor);
        }

        if(user.scope === role.patient) {
            const patient = await createPatient(req.body);
            if(!patient) {
                return res.status(400).send(error.details[0].message);
            }
            res.send(patient);
        }
    } catch (e) {
        res.status(500).send('Internal server error');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user) {
            res.status(404).send('requested user not found');
        }
        res.send(user);
    } catch (e) {
        res.status(500).send('Internal server error');
    }
});

module.exports = router;