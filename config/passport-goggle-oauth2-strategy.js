const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new googleStrategy({
        clientID:"172591078325-3piv8fh1ioddser1fh2v5ff6iuek3oet.apps.googleusercontent.com",
        clientSecret:"k8qKHaG5vIS1V_t9DCkUnn1N",
        callbackURL:"http://localhost:8000/users/auth/google/callback"
    },
    function(accessToken,refreshToken,profile,done){
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){console.log('error in finding user google-passport',err); return;}
            if(user){
                return done(null,user);
            }
            else{
                User.create({
                    email:profile.emails[0].value,
                    name: profile.displayName,
                    password: crypto.randomBytes(20).toString('hex')
                },(err,user)=>{
                    if(err){console.log('error in creating user google-passport',err); return;}
                    return done(null,user);
                })
            }
        })
    }
));

module.exports= passport;