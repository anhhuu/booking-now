const serviceService = require('../models/services/serviceService');

module.exports.getPasswordManagerPage = async(req, res, next) => {
    res.render('admin/adminPassword');
}
module.exports.profile = async(req, res, next) => {

    res.render('admin/adminProfile')
}
module.exports.getSetting = async(req, res, next) => {
    let service = await serviceService.getByID(req.params.id);
    res.render('admin/serviceSetting', {
        service: service,
    })
}
module.exports.list = async(req, res, next) => {
    let page = req.query.page;
    if (!page) {
        page = 1;
    }
    let data = await serviceService.getList(page, 15);

    res.render('admin/minServiceList', {
        services: data.services,
        numberOfPage: data.numberOfPage,
        page: page
    });
}

module.exports.awaiting = async(req, res, next) => {
    let page = req.query.page;
    if (!page) {
        page = 1;
    }
    let data = await serviceService.getAwaitingList(page, 10);

    res.render('admin/awaitingService', {
        services: data.services,
        numberOfPage: data.numberOfPage,
        page: page
    });
}

module.exports.approve = async(req, res, next) => {
    //accept awaiting service
    //change service's status to Activated
    await serviceService.approve(req.body.service_id);
    res.redirect('/admin/services/awaiting');
}

module.exports.reject = async(req, res, next) => {

    //reject awaiting service
    //delete service from database
    await serviceService.reject(req.body.service_id);
    res.redirect('/admin/services/awaiting');
}