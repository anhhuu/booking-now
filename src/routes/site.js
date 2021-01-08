const express = require('express');
const passport = require('passport');
const siteController = require('../app/controllers/siteController');
const router = express.Router();

router.get('/', siteController.index);
router.get('/search', siteController.search);

router.post('/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.send({ success: false, message: 'login-failed' });
        }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.send({ success: true, message: 'login-succeeded', user });
        });
    })(req, res, next);
});

router.post('/register', passport.authenticate('local-signup', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/services',
    failureFlash: true,
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