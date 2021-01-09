module.exports.index = async(req, res, next) => {
    res.render('userProfile');
}

module.exports.update = async(req, res, next) => {
    res.send(req.body);
}

module.exports.getPasswordManagerPage = async(req, res, next) => {
    res.render('passwordManager');
}