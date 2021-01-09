const bookingService = require('../models/services/bookingService');

module.exports.save = (req, res, next) => {
    res.send(req.body);
}
module.exports.index = (req, res, next) => {
    res.render('bookingHistory')
}