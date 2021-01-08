const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Role = require('./Role');
const passportLocalMongoose = require('passport-local-mongoose');;
const User = new Schema({
    name: String,
    gender: String,
    phone_number: String,
    avatar_img: String,
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" }
}, {
    timestamps: true,
});
User.plugin(passportLocalMongoose, { usernameField: 'email', })

module.exports = mongoose.model('User', User);