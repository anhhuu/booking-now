const serviceModel = require('../models/services/serviceModel');

module.exports.index = async(req, res, next) => {

    const sliderServices = await serviceModel.getList(5, 3);
    const flashsaleServices = await serviceModel.getListFlashsale(1, 6);
    const newerServices = await serviceModel.getList(2, 8);
    const recommendServices = await serviceModel.getList(3, 8);

    //console.log(sliderServices);
    res.render('index', {
        title: 'Booking now - Đặt bàn online',
        sliderServices: sliderServices,
        flashsaleServices: flashsaleServices,
        newerServices: newerServices,
        recommendServices: recommendServices,
    });
}