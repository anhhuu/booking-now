const express = require('express');
const router = express.Router();

const bookingController = require('../app/controllers/bookingController')

router.post('/create', bookingController.save)
router.post('/cancel', bookingController.cancel)
router.get('/history', bookingController.getHistoryPage)
module.exports = router;