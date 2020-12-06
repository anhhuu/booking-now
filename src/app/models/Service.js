const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Service = new Schema({
    name: String,
    provider_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type_id: { type: mongoose.Schema.Types.ObjectId, ref: "Type" },
    address: Object,
    oprating: String,
    price_range: String,
    introduction_content: Array,
    imgs_url: Array,
    menu_imgs: Array,
}, {
    timestamps: true,
});

module.exports = mongoose.model('Service', Service);