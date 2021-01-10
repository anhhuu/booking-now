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
    if (!page) {
        page = 1;
    }
    let provider_id = req.user._id;
    let data = await serviceService.getProviderServices(page, 10, provider_id)
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