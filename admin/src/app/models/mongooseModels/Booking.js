const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Booking = new Schema({
    amount_adult: { type: Number },
    amount_kid: { type: Number },
    status: { type: String },
    date_modified: { type: String },
    schedule: { type: String },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    service_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Booking', Booking);