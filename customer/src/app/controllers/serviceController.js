const serviceService = require('../models/services/serviceService');

module.exports.index = async(req, res, next) => {

    let page = req.query.page;
    if (!page) {
        page = 1;
    }
    let data = await serviceService.getList(page, 20);

    res.render('services', {
        title: 'Nhà hàng ăn uống',
        servicesTitle: 'Nhà hàng trên Booking Now',
        services: data.services,
        numberOfPage: data.numberOfPage,
        page: page
    });
}

module.exports.showService = async(req, res, next) => {
    let service = await serviceService.getByURL(req.params.url);
    res.render('serviceShow', {
        title: service.name,
        servicesTitle: 'Nhà hàng trên Booking Now',
        service: service
    })
}

module.exports.exportData = async(req, res, next) => {
    res.json({ message: "Hhey here is your data!" })
}