const Type = require('../mongooseModels/Type');

module.exports.getByName = async(name) => {
    try {
        let type = await Type.findOne({ name: name }).lean();
        return type;
    } catch (error) {
        throw error;
    }
}