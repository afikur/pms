const express = require('express');
const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const router = express.Router();
const {User} = require('../user/user.model');

router.post('/', async (req, res) => {
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
