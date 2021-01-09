const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/userController')
const providerController = require('../app/controllers/providerController')


router.get('/services/list', providerController.getListPage);
//router.get('/services/awaiting', serviceController.awaiting);

//router.get('/password', userController.getPasswordManagerPage);

module.exports = router;