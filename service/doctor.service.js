const {Doctor, validate} = require('./../models/doctor');

module.exports = {
    createDoctor
};

async function createDoctor(payload) {
    const {error} = validate(payload);
    if(error) {
        return;
    }

    const {name, age, address, phone } = payload;

    const doctor = new Doctor({ name, age, address, phone });
    return await doctor.save();
}