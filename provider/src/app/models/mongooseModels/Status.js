const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Status = new Schema({
    name: String
}, {
    timestamps: true,
});

module.exports = mongoose.model('Status', Status);