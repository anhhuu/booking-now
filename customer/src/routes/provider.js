const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/userController')


router.get('/services/list', serviceController.index);
router.get('/services/awaiting', serviceController.awaiting);

router.get('/password', userController.getPasswordManagerPage);

module.exports = router;