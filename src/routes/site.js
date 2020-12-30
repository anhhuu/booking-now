const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/siteController')

/* GET home page. */
router.get('/', siteController.index);
router.get('/search', siteController.search);

module.exports = router;