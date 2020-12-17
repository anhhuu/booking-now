const siteRouter = require('./site');
const userRouter = require('./users');

module.exports.route = (app) => {
    app.use('/', siteRouter);
    app.use('/user', userRouter);
}