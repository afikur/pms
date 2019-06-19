const {Doctor, validate} = require('./doctor.model');

module.exports = {
    getAllDoctors,
    createDoctor,
    updateDoctor,
    deleteDoctor,
    getDoctorById
};

async function getAllDoctors() {
    return await Doctor.find();
}

async function createDoctor(payload) {
    const {error} = validate(payload);
    if(error) {
        return;
    }

    const {_id, license, degrees } = payload;

    const doctor = new Doctor({ _id, license, degrees });
    return await doctor.save();
}

async function updateDoctor(id, payload) {
    const { _id, license, degrees } = payload;

    return await Doctor.findByIdAndUpdate(id,
        {_id, license, degrees}, {new: true});
}

async function deleteDoctor(id) {
    return await Doctor.findByIdAndRemove(id);
}

async function getDoctorById(id) {
    return await Doctor.findById(id);
}
