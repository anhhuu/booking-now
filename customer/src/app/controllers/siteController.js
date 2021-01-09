const serviceService = require('../models/services/serviceService');

module.exports.index = async(req, res, next) => {

    const sliderServices = await serviceService.getList(Math.floor(Math.random() * 10) + 1, 3);
    const flashsaleServices = await serviceService.getListFlashsale(1, 6);
    const newerServices = await serviceService.getList(Math.floor(Math.random() * 3) + 1, 8);
    const recommendServices = await serviceService.getList(Math.floor(Math.random() * 8) + 4, 8);
    res.render('index', {
        title: 'Đặt bàn online với Booking Now',
        sliderServices: sliderServices.services,
        flashsaleServices: flashsaleServices,
        newerServices: newerServices.services,
        recommendServices: recommendServices.services,
    });
}


module.exports.search = async(req, res, next) => {
    let page = req.query.page;
    if (!page) {
        page = 1;
    }

    const q = req.query.q;
    page = req.query.page;
    if (!page || page < 0) {
        page = 1;
    }
    let data = await serviceService.searchByName(page, 20, q);

    res.render('services', {
        title: 'Nhà hàng ăn uống',
        servicesTitle: 'Có ' + data.total + ' kết quả với từ khoá "' + q + '"',
        q: q,
        services: data.services,
        numberOfPage: data.numberOfPage,
        page: page
    });
}