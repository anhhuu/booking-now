const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/siteController')

/* GET home page. */
router.get('/', siteController.index);

module.exports = router;