const siteRouter = require('./site');
const serviceRouter = require('./services');

module.exports.route = (app) => {
    app.use('/', siteRouter);
    app.use('/services', serviceRouter);
}