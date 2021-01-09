const bookingService = require('../models/services/bookingService');

module.exports.save = (req, res, next) => {
    res.send(req.body);
}