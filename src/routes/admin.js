const express = require('express');
const router = express.Router();
const adminController = require('../app/controllers/adminController')
const providerController = require('../app/controllers/providerController')
const serviceController = require('../app/controllers/serviceController')
router.get('/services/list', adminController.list);
router.get('/profile', adminController.profile)

router.get('/services/awaiting', adminController.awaiting);

router.get('/password', adminController.getPasswordManagerPage);

router.get('/setting/:id', adminController.getSetting);

router.post('/reject', adminController.reject);
router.post('/approve', adminController.approve);
router.post('/setting/update/:id', providerController.update);
router.post('/setting/status/:id', providerController.changeStatus);
router.post('/export/:id', serviceController.exportData)
module.exports = router;