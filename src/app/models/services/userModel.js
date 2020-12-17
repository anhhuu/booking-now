const User = require('../mongooseModels/User');

module.exports.getByUsername = async(username) => {
    try {
        let user = await User.findOne({ username: username }).lean();
        return user;
    } catch (error) {
        throw error;
    }
}