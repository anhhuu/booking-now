const User = require('../mongooseModels/User');

module.exports.getByUsername = async(username) => {
    try {
        let user = await User.findOne({ username: username }).lean();
        return user;
    } catch (error) {
        throw error;
    }
}

module.exports.update = async(userObj) => {
    try {
        const user = await User.findById(userObj.user_id);
        await user.updateOne({
            full_name: userObj.full_name,
            gender: userObj.gender
        })
    } catch (error) {
        throw error;
    }
}

module.exports.updatePassword = async(userObj) => {
    try {
        const user = await User.findById(userObj.user_id);

        if (user.validPassword(userObj.old_pass)) {
            user.password = user.generateHash(userObj.new_pass);
            await user.updateOne({
                password: user.password,
            })
            return true;
        }
        return false;
    } catch (error) {
        throw error;
    }
}