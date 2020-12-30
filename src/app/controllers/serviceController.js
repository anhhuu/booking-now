const serviceModel = require('../models/services/serviceModel');

module.exports.index = async(req, res, next) => {

    let services = await serviceModel.getList(1, 20);

    res.render('services', {
        title: 'Nhà hàng ăn uống',
        services: services
    });
}