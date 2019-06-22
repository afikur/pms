const bcrypt = require('bcrypt');
const {User} = require('./user.model');

module.exports = {
    getAllUsers,
    createUser,
    findUserById,
    findByIdAndUpdate,
    findByIdAndRemove,
    findUserByEmail
};

async function getAllUsers() {
    return await User.find().select('-password');
}

async function createUser(payload) {
    const {name, email, phone, age, gender, password, scope} = payload;
    let user = new User({name, email, phone, age, gender, password, scope});
    const salt = await bcrypt.genSalt(11);
    user.password = await bcrypt.hash(user.password, salt);
    return await user.save();
}

async function findUserById(id) {
    return await User.findById(id);
}

async function findByIdAndUpdate(id, payload) {

    const {name, email, phone, age, gender, password, scope} = payload;

    return  await User.findByIdAndUpdate(id,
        {name, email, phone, age, gender, password, scope},
        {new: true}).select('-password');
}

async function findByIdAndRemove(id) {
    return await User.findByIdAndRemove(id).select('-password');
}

async function findUserByEmail(email) {
    return await User.findOne({email}).select('-password');
}
