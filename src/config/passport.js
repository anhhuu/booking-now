const LocalStrategy = require('passport-local').Strategy;
const User = require('../app/models/mongooseModels/User');
const Role = require('../app/models/mongooseModels/Role')


module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            Role.findById(user.role).exec(function(err, role) {
                user.role = role;
                done(err, user);
            })
        });
    });

    passport.use('local-signup', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            session: true,
            passReqToCallback: true,
        },
        function(req, email, password, done) {
            process.nextTick(function() {
                User.findOne({ 'email': email }, function(err, user) {
                    if (err)
                        return done(err);
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {
                        Role.findOne({ name: 'customer' }, function(err, role) {
                            let newUser = new User();
                            newUser.email = email;
                            newUser.password = newUser.generateHash(password);
                            newUser.role = role._id;
                            newUser.full_name = req.body.full_name;
                            newUser.phone_number = req.body.phone_number;
                            newUser.save(function(err) {
                                if (err)
                                    throw err;
                                return done(null, newUser);
                            });
                        })
                    }
                });
            });
        }));

    passport.use('local-login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            session: true,
            passReqToCallback: true,
        },
        function(req, email, password, done) {
            User.findOne({ 'email': email }).populate('role').exec(function(err, user) {
                if (err)
                    return done(err);
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user found.'));
                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                return done(null, user);
            });
        }));
}