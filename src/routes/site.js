const express = require('express');
const passport = require('passport');
const siteController = require('../app/controllers/siteController');
const router = express.Router();

/* GET home page. */
router.get('/', siteController.index);
router.get('/search', siteController.search);

router.post('/login', passport.authenticate('local-login', {
    successReturnToOrRedirect: '/user/profile',
    failureFlash: true
}));

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