const User=require('../models/user');
const Post=require('../models/post');

module.exports.profile = function(req, res){
    User.findById(req.params.id,(err,user)=>{
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user:user,
        })
    })
};
module.exports.update=(req,res)=>{
        if(req.user.id==req.params.id){
            User.findByIdAndUpdate(req.user.id,req.body,(err,user)=>{
                return res.redirect('back');
            })
        }
        else{
            return res.status(401).send('Unauthorised');
        }
};
module.exports.signUp = (req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:'Codeial | Sign In'
    });
};

module.exports.signIn=(req,res)=>{
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:'Codeial | Sign Up'
    });
}

module.exports.createUser=(req,res)=>{
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},(err,user)=>{
        if(err){console.log('error in finding the user while signing up'); return;}
        if(!user){
            User.create(req.body,(err,user)=>{
                if(err){console.log('error in creating user while signing up'); return;}
                
                return res.redirect('/users/sign-in');
            })
        }
        else{
            return res.redirect('back');
        }
    })
}

module.exports.createSession= (req,res)=>{
    req.flash('success','logged in sucessfully');
    return res.redirect('/');
};

module.exports.destroySession= (req,res)=>{
    req.logout();
    req.flash('success','logged out sucessfully');
    return res.redirect('/users/sign-in');
};