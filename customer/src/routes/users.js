const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/userController')

router.get('/profile', userController.index);
router.post('/profile', userController.update);
router.get('/password', userController.getPasswordManagerPage);

module.exports = router;