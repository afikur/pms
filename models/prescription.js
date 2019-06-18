const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const {Schema} = mongoose;

const Prescription = mongoose.model('Prescription', new mongoose.Schema({
    doctor: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    disease: [{type: String}],
    medicine: [{type: String}]
}));

function validatePrescription(prescription) {
    const schema = {
        doctor: Joi.string().required(),
        patient: Joi.string().required(),
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
        disease: Joi.array().items(Joi.string()),
        medicine: Joi.array().items(Joi.string())
    };

    return Joi.validate(prescription, schema);
}

exports.Prescription = Prescription;
exports.validate = validatePrescription;
