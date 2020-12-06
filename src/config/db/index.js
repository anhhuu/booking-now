const mongoose = require('mongoose');
const debug = require('debug')('booking-now:db')

async function connect() {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        debug('connected successfully!')
    } catch (error) {
        debug('connected failure! <' + error + '>');
    }
}

module.exports = { connect };