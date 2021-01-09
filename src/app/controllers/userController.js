const userService = require('../models/services/userService');

module.exports.index = async(req, res, next) => {
    res.render('userProfile');
}

module.exports.update = async(req, res, next) => {
    const userBody = req.body;
    await userService.update(userBody);
    res.redirect('/users/profile');
}

module.exports.getPasswordManagerPage = async(req, res, next) => {
    res.render('passwordManager');
}

module.exports.updatePassword = async(req, res, next) => {
    const userBody = req.body;
    if (userBody.new_pass !== userBody.repeat_pass || userBody.new_pass === '') {
        res.render('passwordManager', {
            message: 'Xác nhận lại mật khẩu mới?'
        })
    }

    if (!await userService.updatePassword(userBody)) {
        res.render('passwordManager', {
            message: 'Sai mật khẩu cũ!'
        })
    }
    res.render('passwordManager', {
        message: 'Đổi mật khẩu thành công!'
    })
}