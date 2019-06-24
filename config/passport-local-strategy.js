const passport=require('passport');

const LocalStrategy = require('passport-local').Strategy;

const user=require('../models/user');

passport.use(new LocalStrategy({
        usernameField:'email',
        passReqToCallback:true,
    },
    (req,email,password,done)=>{
        user.findOne({email:email},(err,user)=>{
            if(err){
                req.flash('error',err); 
                return done(err);
            }
            if(!user||user.password!=password){
                req.flash('error','Invalid Username/Password');
                return done(null,false);
            }
            return done(null,user);
        });
    }
));

passport.serializeUser(function(user,done){
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
    user.findById(id,(err,user)=>{
        if(err){console.log('Error in finding the user ----> Passport'); return done(err);}

        return done(null,user);
    })
})

passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser=(req,res,next)=>{
    if(req.isAuthenticated()){
        res.locals.user= req.user;
    }
    next();
}

module.exports=passport;