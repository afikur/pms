const {Patient, validate} = require('./../models/patient');

module.exports = {
    createPatient
};

async function createPatient(payload) {
    const {error} = validate(payload);
    if(error) {
        return;
    }
    const {_id, name, age, address, phone } = payload;

    const patient = new Patient({ _id, name, age, address, phone });
    return await patient.save();
}