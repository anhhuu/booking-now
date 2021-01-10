const express = require('express');
const router = express.Router();
const providerController = require('../app/controllers/providerController')



router.get('/profile', providerController.profile)
router.get('/password', providerController.getPasswordManagerPage);
router.get('/setting/:id', providerController.getSetting);
router.get('/services/list', providerController.getListPage);
router.get('/services/userlist', providerController.getUserList)
module.exports = router;