const serviceService = require('../models/services/serviceService');


module.exports.getSetting = async(req, res, next) => {
    let service = await serviceService.getByID(req.params.id);

    res.render('provider/serviceSetting', { service });
}
module.exports.update = async(req, res, next) => {
    //post
    //
}
module.exports.changeStatus = async(req, res, next) => {

}

module.exports.getListPage = async(req, res, next) => {
    let page = req.query.page;
    let provider = req.user._id;
    let bookings = await bookingService.getByUserID(provider);
    for (let i = 0; i < bookings.length; i++) {
        const service = await serviceService.getByID(bookings[i].service_id);
        bookings[i].service = service;
    }

    res.render('customer/bookingHistory', { bookings: bookings });
    if (!page) {
        page = 1;
    }
    let data = await serviceService.getByID(page, 15);

    res.render('provider/minServiceList', {
        services: data.services,
        numberOfPage: data.numberOfPage,
        page: page
    });
}
module.exports.profile = async(req, res, next) => {
    res.render('provider/providerProfile')
}
module.exports.getPasswordManagerPage = async(req, res, next) => {
    res.render('provider/providerPassword');
}
module.exports.getUserList = async(req, res, next) => {

    res.render('provider/bookingList')
}