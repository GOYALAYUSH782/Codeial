const passport=require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User =require('../models/user');
let opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'secret',
}
passport.use(new JWTStrategy(opts, function(jwt_payload, done) {
    User.findById( jwt_payload.id, function(err, user) {
        if (err) {
            console.log('Error in fonding user from JWT');
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

module.exports = passport;