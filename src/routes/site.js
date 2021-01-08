const express = require('express');
const passport = require('passport');
const User = require('../app/models/mongooseModels/User');
const siteController = require('../app/controllers/siteController');
const router = express.Router();

/* GET home page. */
router.get('/', siteController.index);
router.get('/search', siteController.search);
router.post('/register', (req, res, next) => {
    console.log(req.body);
    User.register(new User({ email: req.body.email }), req.body.password, function(err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});
router.post('/login',
    passport.authenticate('local', {
        successReturnToOrRedirect: '/user/profile',
        failureRedirect: '/',
        failureFlash: true
    }));
router.get('/logout', function(req, res) {
    req.logout();
    if (req.session) {
        req.session.destroy();
    }
    // Clear cookie
    res.clearCookie(this.cookie, { path: '/' });
    res.redirect('/');
});
module.exports = router;