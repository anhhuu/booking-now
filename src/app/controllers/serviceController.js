const serviceModel = require('../models/services/serviceModel');

module.exports.index = async(req, res, next) => {

    let page = req.query.page;
    if (!page) {
        page = 1;
    }
    let data = await serviceModel.getList(page, 20);

    res.render('services', {
        title: 'Nhà hàng ăn uống',
        servicesTitle: 'Nhà hàng trên Booking Now',
        services: data.services,
        numberOfPage: data.numberOfPage,
        page: page
    });
}