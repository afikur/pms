const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const role = require('../../helper/role');

const User = mongoose.model('User', new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    scope: [{type: String, default: role.patient}]
}));

function validateUser(user) {
    const schema = {
        email: Joi.string().required(),
        password: Joi.string().required(),
        scope: Joi.array().items(Joi.string())
    };

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
