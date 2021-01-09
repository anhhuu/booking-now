let services = require('./rawData/PasgoHCM.json');

const typeService = require('../app/models/services/typeService');
const userService = require('../app/models/services/userService');
const serviceService = require('../app/models/services/serviceService');

const db = require('../config/db');

saveData = async() => {
    const type = await typeService.getByName('Nhà hàng/Quán ăn');
    const serviceProvider = await userService.getByUsername('provider_test1');
    for (let i = 0; i < services.length; i++) {

        //address object
        services[i].address.text = services[i].address;
        services[i].address.map_url = services[i].address_img.map_url;
        services[i].address.img = services[i].address_img.img;

        services[i].provider_id = serviceProvider._id;
        services[i].type_id = type._id;

        services[i].rating = parseFloat(services[i].rating);

        services[i].description = services[i].introduction_content;
        services[i].introduction_content = services[i].description.pop();

        if (Array.isArray(services[i].introduction_content.description)) {
            for (let j = 0; j < services[i].introduction_content.description.length; j++) {
                if (services[i].introduction_content.description[j] == ' ' || services[i].introduction_content.description[j][0] == '-') {
                    services[i].introduction_content.description.splice(j, 1);
                    j--;
                }
            }
        }

        services[i].flash_sale = i % 3 == 0 ? 0 : Math.floor(Math.random() * Math.floor(35));

        await serviceService.save(services[i]);
        console.log('Running...' + Math.round((i + 1) / services.length * 100) + '%');
    }
    console.log('COMPLETED!!!');
}

(async() => {
    await db.connect();
    await saveData();
})()