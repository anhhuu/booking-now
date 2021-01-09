const siteRouter = require('./site');
const serviceRouter = require('./services');
const usersRouter = require('./users');
const bookingsRouter = require('./bookings');
module.exports.route = (app) => {
    app.use('/', siteRouter);
    app.use('/users', isLoggedIn, usersRouter);
    app.use('/services', serviceRouter);
    app.use('/bookings', bookingsRouter);
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.status(400).json({
        'message': 'access denied'
    });
}