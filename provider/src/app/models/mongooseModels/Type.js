const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Type = new Schema({
    name: String
}, {
    timestamps: true,
});

module.exports = mongoose.model('Type', Type);