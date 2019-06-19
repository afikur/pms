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
    return await User.find();
}

async function createUser(payload) {
    const {email, password, scope} = payload;

    let user = new User({email, password, scope});
    return await user.save();
}

async function findUserById(id) {
    return await User.findById(id);
}

async function findByIdAndUpdate(id, payload) {

    const {email, password, scope} = payload;

    return  await User.findByIdAndUpdate(id,
        {email, password, scope},
        {new: true});
}

async function findByIdAndRemove(id) {
    return await User.findByIdAndRemove(id);
}

async function findUserByEmail(email) {
    return await User.findOne({email});
}
