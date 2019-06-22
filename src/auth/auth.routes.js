const express = require('express');
const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const router = express.Router();
const {User} = require('./../user/user.model');

router.get('/', async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.send(users);
    } catch (e) {
        res.status(500).send('Internal server error');
    }
});

router.post('/', async (req, res) => {
    try {
        const {err} = validate(req.body);
        if(err) {
            return res.status(400).send(error.details[0].message);
        }
        let user = await User.findOne({$or: [{email: req.body.email}, {phone: req.body.phone}]});

        if(!user) {
            return res.status(400).send('Invalid email or password');
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) {
            return res.status(400).send('Invalid email or password');
        }
        const token = jwt.sign({_id: user._id}, config.get('jwtPrivateKey'));
        res.send(token);

    } catch (e) {
        res.status(500).send('Internal server error');
    }
});

function validate(user) {
    const schema = {
        email: Joi.string(),
        password: Joi.string().required(),
        phone: Joi.string().min(11).max(11)
    };

    return Joi.validate(user, schema);
}


module.exports = router;
