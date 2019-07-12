const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const env = require('./environment');
passport.use(new googleStrategy({
        clientID: env.goggle_client_id,
        clientSecret: env.goggle_clientSecret,
        callbackURL: env.google_callbackURL,
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