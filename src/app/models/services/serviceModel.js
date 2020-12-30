const Service = require('../mongooseModels/Service');

module.exports.getList = async(page, limit) => {
    try {
        if (!page) {
            page = 1;
        }
        if (!limit) {
            limit = 10;
        }
        const services = await Service.find({}).skip(page * limit - limit).limit(limit).lean();
        const total = await Service.find({}).countDocuments();
        numberOfPage = total / limit;
        return {
            services,
            numberOfPage
        }
    } catch (error) {
        throw error;
    }
}

module.exports.searchByName = async(page, limit, keyword) => {
    try {
        if (!page) {
            page = 1;
        }

        if (!limit) {
            limit = 20;
        }

        let services = await Service.find({ $text: { $search: keyword } }).skip(limit * page - limit)
            .limit(limit).lean();

        const total = await Service.find({ $text: { $search: keyword } }).countDocuments();
        numberOfPage = Math.ceil(total / limit);
        return {
            services,
            numberOfPage,
            total
        }

    } catch (error) {
        throw error;
    }
}

module.exports.getListFlashsale = async(page, limit) => {
    try {
        if (!page) {
            page = 1;
        }
        if (!limit) {
            limit = 10;
        }
        const services = await Service.find({ flashsale: { $gt: 1 } }).skip(page * limit - limit).limit(limit).lean();
        return services;
    } catch (error) {
        throw error;
    }
}

module.exports.save = async(serviceObj) => {
    try {
        let service = new Service({
            name: serviceObj.name,
            url: serviceObj.url,
            address: serviceObj.address,
            oprating: serviceObj.oprating,
            rating: serviceObj.rating,
            flashsale: serviceObj.flashsale,
            price_range: serviceObj.price_range,
            introduction_content: serviceObj.introduction_content,
            description: serviceObj.description,
            imgs_url: serviceObj.imgs_url,
            menu_imgs: serviceObj.menu_imgs,
            provider_id: serviceObj.provider_id,
            type_id: serviceObj.type_id,
        })

        await service.save();

    } catch (error) {
        throw error;
    }
}