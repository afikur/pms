const Joi = require('joi');
const mongoose = require('mongoose');

const Doctor = mongoose.model('Doctor', new mongoose.Schema({
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
    }
}));

function validateDoctor(patient) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        address: Joi.string().required(),
        age: Joi.number().required(),
        phone: Joi.string().min(11).max(11).required()
    };

    return Joi.validate(patient, schema);
}

exports.Doctor = Doctor;
exports.validate = validateDoctor;
