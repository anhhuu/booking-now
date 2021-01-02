const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Service = new Schema({
    name: String,
    url: String,
    address: Object, //text: string, map_url: string, img: string
    operating: String,
    price_range: String,
    introduction_content: Object, //title: string, text: array
    description: Array, //title: string, description: string
    imgs_url: Array,
    rating: Number,
    flash_sale: Number,
    menu_imgs: Array,
    address_img: Object,
    provider_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type_id: { type: mongoose.Schema.Types.ObjectId, ref: "Type" },
}, {
    timestamps: true,
});


Service.index({ name: 'text' });

module.exports = mongoose.model('Service', Service);