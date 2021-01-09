const siteRouter = require('./site');
const serviceRouter = require('./services');
const usersRouter = require('./users');
const bookingsRouter = require('./bookings');
const createError = require('http-errors');
module.exports.route = (app) => {
    app.use('/', siteRouter);
    app.use('/users', isLoggedIn, usersRouter);
    app.use('/services', serviceRouter);
    app.use('/bookings', isLoggedIn, bookingsRouter);
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}