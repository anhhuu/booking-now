const express = require('express');
const router = express.Router();

const serviceController = require('../app/controllers/serviceController')

/* GET home page. */
router.get('/', serviceController.index);

module.exports = router;