const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const Role = require('./Role');
const User = new Schema({
    name: String,
    username: String,
    email: { type: String, require: true, index: true, unique: true, sparse: true },
    password: String,
    gender: String,
    phone_number: String,
    avatar_img: String,
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" }
}, {
    timestamps: true,
});
User.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

User.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', User);