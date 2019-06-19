const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const Doctor = mongoose.model('Doctor', new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },

    license: {
        type: String,
        required: true
    },

    degrees: [{
        type: String,
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

function validateDoctor(patient) {
    const schema = {
        _id: Joi.string().required(),
        license: Joi.string().required(),
        degrees: Joi.array().items(Joi.string()),
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
    };

    return Joi.validate(patient, schema);
}

exports.Doctor = Doctor;
exports.validate = validateDoctor;
