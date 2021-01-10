const Service = require('../mongooseModels/Service');
const createErr = require('http-errors')

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
        const services = await Service.find({ flash_sale: { $gt: 1 } }).skip(page * limit - limit).limit(limit).lean();
        return services;
    } catch (error) {
        throw error;
    }
}

module.exports.getByURL = async(url) => {
    try {
        let service = await Service.findOne({
            url: url
        }).lean();

        let operating = service.operating;
        let regex = "([01]?[0-9]|2[0-4])h[0-5][0-9]";

        let operating_time = [];
        while (operating.match(regex)) {
            operating_time.push(operating.match(regex)[0])
            operating = String(operating.split(operating.match(regex)[0]));
        }
        operating_time = operating_time;

        let timeArr = [];
        for (let i = 0; i < operating_time.length / 2; i++) {
            let minHour = +operating_time[i].split('h')[0];
            let minMin = +operating_time[i].split('h')[1];

            let maxHour = +operating_time[i + 1].split('h')[0];
            let maxMin = +operating_time[i + 1].split('h')[1];

            let k = minMin;
            if (minHour < maxHour) {
                for (let j = minHour; j <= maxHour; j += 1) {
                    let h = String(j < 10 ? '0' + j : j);
                    let m = String(k == 0 ? '00' : k);
                    timeArr.push(h + 'h' + m);
                    if (j == maxHour && k == maxMin) {
                        break;
                    }

                    if (k < 30) {
                        j--;
                        k += 30;
                    } else {
                        k = 0;
                    }
                }
            }
            if (minHour > maxHour) {
                for (let j = minHour; j < 24; j += 1) {
                    let h = String(j < 10 ? '0' + j : j);
                    let m = String(k == 0 ? '00' : k);
                    timeArr.push(h + 'h' + m);
                    if (j == maxHour && k == maxMin) {
                        break;
                    }

                    if (k < 30) {
                        j--;
                        k += 30;
                    } else {
                        k = 0;
                    }
                }
                for (let j = 0; j <= maxHour; j += 1) {
                    let h = String(j < 10 ? '0' + j : j);
                    let m = String(k == 0 ? '00' : k);
                    timeArr.push(h + 'h' + m);
                    if (j == maxHour && k == maxMin) {
                        break;
                    }

                    if (k < 30) {
                        j--;
                        k += 30;
                    } else {
                        k = 0;
                    }
                }
            }
        }
        service.timeArr = timeArr;
        console.log(timeArr);
        console.log(operating_time);
        return service;
    } catch (error) {
        throw error;
    }
}

module.exports.getByID = async(req) => {
    try {
        const service = await Service.findById({ _id: req.params.id }).lean();
        console.log(service)
        return service;
    } catch (error) {
        createErr(404)
    }
}

module.exports.save = async(serviceObj) => {
    try {
        let service = new Service({
            name: serviceObj.name,
            url: serviceObj.url,
            address: serviceObj.address,
            operating: serviceObj.operating,
            rating: serviceObj.rating,
            flash_sale: serviceObj.flash_sale,
            price_range: serviceObj.price_range,
            introduction_content: serviceObj.introduction_content,
            description: serviceObj.description,
            imgs_url: serviceObj.imgs_url,
            menu_imgs: serviceObj.menu_imgs,
            provider_id: serviceObj.provider_id,
            address_img: serviceObj.address_img,
            type_id: serviceObj.type_id,
        })

        await service.save();

    } catch (error) {
        throw error;
    }
}

module.exports.getAwaitingList = async(page, limit) => {
    try {
        if (!page) {
            page = 1;
        }
        if (!limit) {
            limit = 10;
        }
        const services = await Service.find({ status: "awaiting" }).skip(page * limit - limit).limit(limit).lean();
        const total = await Service.find({ status: "awaiting" }).countDocuments();
        numberOfPage = total / limit;
        return {
            services,
            numberOfPage
        }
    } catch (error) {
        throw error;
    }
}