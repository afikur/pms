const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const role = require('../../helper/role');

const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },

    email: {
        type: String,
        unique: true
    },

    phone: {
        type: String,
        unique: true,
        minLength: 11,
        maxLength: 11
    },

    age: {
        type: Number
    },

    gender: {
        type: String,
        enum: ['male', 'female']
    },

    password: {
        type: String,
        required: true
    },

    address: {
        type: String
    },

    scope: [{
        type: String,
        enum: [role.doctor, role.patient],
        default: role.patient
    }],

    createdAt: {
        type: Date,
        default: Date.now()
    },

    updatedAt: {
        type: Date,
        default: Date.now()
    }
}));

function validateUser(user) {
    const schema = {
        name: Joi.string().required(),
        email: Joi.string(),
        phone: Joi.string().min(11).max(11),
        age: Joi.number().required(),
        gender: Joi.string().valid('male', 'female').required(),
        password: Joi.string().required(),
        scope: Joi.array().items(Joi.string().valid(role.doctor, role.patient))
    };

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
