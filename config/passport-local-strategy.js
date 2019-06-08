const passport=require('passport');

const LocalStrategy = require('passport-local').Strategy;

const user=require('../models/user');

passport.use(new LocalStrategy({
        usernameField:'email'
    },
    (email,password,done)=>{
        user.findById({email:email},(err,user)=>{
            if(err){console.log('Error in finding the user ----> Passport'); return done(err);}

            if(!user||user.password!=password){
                console.log('Invalid Usrname/Password');
                return (null,false);
            }
            return done(null,user);
        });
    }
));

passport.serializeUser(function(user,done){
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
    user.findByIdfindById(id,(err,user)=>{
        if(err){console.log('Error in finding the user ----> Passport'); return done(err);}

        return done(null,user);
    })
})

module.exports=passport;