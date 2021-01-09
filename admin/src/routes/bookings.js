const express = require('express');
const router = express.Router();

const bookingController = require('../app/controllers/bookingController')

router.post('/create', bookingController.save)
module.exports = router;