const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Service = new Schema({
    name: String,
    url: String,
    address: Object, //text: string, map_url: string, img: string
    oprating: String,
    price_range: String,
    introduction_content: Object, //title: string, text: array
    description: Array, //title: string, description: string
    imgs_url: Array,
    rating: Number,
    flashsale: Number,
    menu_imgs: Array,
    provider_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type_id: { type: mongoose.Schema.Types.ObjectId, ref: "Type" },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Service', Service);