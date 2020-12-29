const siteRouter = require('./site');

module.exports.route = (app) => {
    app.use('/', siteRouter);
}