const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const Patient = mongoose.model('Patient', new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
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
        _id: Joi.string().required(),
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
    };

    return Joi.validate(patient, schema);
}

exports.Patient = Patient;
exports.validate = validatePatient;
