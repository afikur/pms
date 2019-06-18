const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const Patient = mongoose.model('Patient', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50
    },
    address: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required: true,
        minLength: 11,
        maxLength: 11
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
}));

function validatePatient(patient) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        address: Joi.string().required(),
        age: Joi.number().required(),
        phone: Joi.string().min(11).max(11).required(),
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
    };

    return Joi.validate(patient, schema);
}

exports.Patient = Patient;
exports.validate = validatePatient;
