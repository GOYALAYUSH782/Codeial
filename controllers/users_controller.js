const User=require('../models/user');
const Post=require('../models/post');
const fs=require('fs');
const path=require('path');
module.exports.profile = function(req, res){
    User.findById(req.params.id,(err,user)=>{
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user:user,
        })
    })
};
module.exports.update= async (req,res)=>{
        // if(req.user.id==req.params.id){
        //     User.findByIdAndUpdate(req.user.id,req.body,(err,user)=>{
        //         req.flash('success','Profile Updated');
        //         return res.redirect('back');
        //     })
        // }
        // else{
        //     req.flash('error','Cant update someone else profile');
        //     return res.status(401).send('Unauthorised');
        // }
        if(req.user.id==req.params.id){
            try{
                let user= await User.findById(req.params.id);
                User.uploadedAvatar(req,res,function(err){
                    if(err){console.log('******Multer Error',err); return }
                    user.name= req.body.name;
                    user.email=req.body.email;
                    if(req.file){
                        //await unlink(req.file.path)
                        if(user.avatar){
                            if(fs.existsSync(path.join(__dirname,"..",user.avatar))){
                                fs.unlinkSync(path.join(__dirname,"..",user.avatar));
                            }
                        }
                        user.avatar=User.avatarPath+'/'+req.file.filename;
                    }
                    user.save();
                    return res.redirect('back');
                })
            }
            catch(err){
                req.flash('error',err);
                return res.redirect('back');
            }
        }
        else{
            req.flash('error','Cant update someone else profile');
            return res.status(401).send('Unauthorised');
        }
};
module.exports.signUp = (req,res)=>{
    if(req.isAuthenticated()){
        req.flash('error','You are already signed in');
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',{
        title:'Codeial | Sign In'
    });
};

module.exports.signIn=(req,res)=>{
    if(req.isAuthenticated()){
        req.flash('error','You are already signed in');
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in',{
        title:'Codeial | Sign Up'
    });
}

module.exports.createUser=(req,res)=>{
    if(req.body.password!=req.body.confirm_password){
        req.flash('error','Password dosesnt match');
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},(err,user)=>{
        if(err){
            req.flash('error',err);
            return res.redirect('back');
        }
        if(!user){
            User.create(req.body,(err,user)=>{
                if(err){console.log('error in creating user while signing up'); return;}
                req.flash('success','User Created');
                return res.redirect('/users/sign-in');
            })
        }
        else{
            req.flash('error','email already registered');
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