let services = require('./rawData/PasgoHCM.json');

const typeModel = require('../app/models/services/typeModel');
const userModel = require('../app/models/services/userModel');
const serviceModel = require('../app/models/services/serviceModel');

const db = require('../config/db');

saveData = async() => {
    const type = await typeModel.getByName('Nhà hàng/Quán ăn');
    const serviceProvider = await userModel.getByUsername('provider_test1');
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
        await serviceModel.save(services[i]);
        console.log('Running...' + Math.round((i + 1) / services.length * 100) + '%');
    }
    console.log('COMPLETED!!!');
}

(async() => {
    await db.connect();
    await saveData();
})()