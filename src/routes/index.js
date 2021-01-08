const siteRouter = require('./site');
const serviceRouter = require('./services');
const userRouter = require('./user');
module.exports.route = (app) => {
    app.use('/', siteRouter);
    app.use('/user', isLoggedIn, userRouter);
    app.use('/services', serviceRouter);
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.status(400).json({
        'message': 'access denied'
    });
}