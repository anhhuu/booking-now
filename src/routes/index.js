const siteRouter = require('./site');
const serviceRouter = require('./services');
const usersRouter = require('./users');
const bookingsRouter = require('./bookings');
const providerRouter = require('./provider');
const adminRouter = require('./admin');

module.exports.route = (app) => {
    app.use('/', siteRouter);
    app.use('/users', isLoggedIn, isCustomer, usersRouter);
    app.use('/services', serviceRouter);
    app.use('/bookings', isLoggedIn, bookingsRouter);
    app.use('/provider', isLoggedIn, isProvider, providerRouter);
    app.use('/admin', isLoggedIn, isAdmin, adminRouter);
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}

function isCustomer(req, res, next) {
    if (req.user.role.name === 'customer')
        return next();
    res.redirect('/');
}

function isAdmin(req, res, next) {
    if (req.user.role.name === 'admin')
        return next();
    res.redirect('/');
}

function isProvider(req, res, next) {
    if (req.user.role.name === 'provider')
        return next();
    res.redirect('/');
}