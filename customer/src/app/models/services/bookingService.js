const Booking = require('../mongooseModels/Booking');

module.exports.getByUserID = async(user_id) => {
    try {
        const bookings = await Booking.find({ user_id: user_id }).lean();
        return bookings;
    } catch (error) {
        throw error;
    }
}

module.exports.getByProviderID = async(service_id) => {
    try {
        const bookings = await Booking.find({ service_id: service_id }).lean();
        return bookings;
    } catch (error) {
        throw error;
    }
}

module.exports.save = async(bookingObj) => {
    try {
        const booking = new Booking({
            amount_adult: bookingObj.amount_adult,
            amount_kid: bookingObj.amount_kid,
            status: bookingObj.status,
            time: bookingObj.time,
            date_modified: bookingObj.date_modified,
            schedule: bookingObj.schedule,
            user_id: bookingObj.user_id,
            service_id: bookingObj.service_id
        });
        await booking.save();
        return booking;
    } catch (error) {
        throw error;
    }
}

module.exports.cancel = async(id) => {
    try {
        const booking = Booking.findById(id);
        await booking.updateOne({
            status: 'cancel'
        })
    } catch (error) {
        throw error;
    }
}