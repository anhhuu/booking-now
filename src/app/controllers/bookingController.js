const bookingService = require('../models/services/bookingService');
const serviceService = require('../models/services/serviceService');

module.exports.save = async(req, res, next) => {
    try {
        let booking = req.body;
        booking.status = 'waiting';
        booking.date_modified = booking.schedule;
        await bookingService.save(booking);
        console.log(booking);
        res.send({ message: 'success' });
    } catch (err) {
        res.send({ result: 'failed' })
    }
}

module.exports.cancel = async(req, res, next) => {
    const id = req.body.booking_id;
    await bookingService.cancel(id)
    res.redirect('/bookings/history');
}

module.exports.getHistoryPage = async(req, res, next) => {
    const user_id = req.user._id;
    let bookings = await bookingService.getByUserID(user_id);
    for (let i = 0; i < bookings.length; i++) {
        const service = await serviceService.getByID(bookings[i].service_id);
        bookings[i].service = service;
    }
    console.log(bookings);

    res.render('bookingHistory', { bookings: bookings });
}