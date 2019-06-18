const express = require('express');
const role = require('../helper/role');
const router = express.Router();
const {User, validate} = require('../models/user');
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
        let {err} = validate(req.body);
        if(err) {
            res.status(400).send(error.details[0].message);
        }
        let user = new User({email, password, scope});
        user = await user.save();
        res.send(user);
    } catch (e) {
        console.log(e);
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

router.put('/:id', async (req, res) => {
    try {
        const {error} = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const {email, password, scope} = req.body;

        const user = await User.findByIdAndUpdate(req.params.id,
            {email, password, scope}, {new: true});

        if (!user) {
            return res.status(404).send('The user with the given ID was not found.');
        }

        res.send(user);
    }
    catch (e) {
        res.status(500).send('Internal server error');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id);
        if(!user) {
            res.status(404).send('The user with the given ID was not found.');;
        }
        res.send(user);
    } catch (e) {
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
