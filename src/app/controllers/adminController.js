module.exports.getPasswordManagerPage = async(req, res, next) => {
    res.render('admin/adminPassword');
}

module.exports.awaiting = async(req, res, next) => {
    res.render('admin/awaitingService')
}

module.exports.approve = async(req, res, next) => {
    //accept awaiting service
    //change service's status to Activated
    res.json({ message: "Accept Service!!!" })
}

module.exports.reject = async(req, res, next) => {
    //reject awaiting service
    //delete service from database
    res.json({ message: "Reject!!!!!" })
}