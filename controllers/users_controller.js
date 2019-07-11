const User=require('../models/user');
const Post=require('../models/post');
const fs=require('fs');
const path=require('path');
const FilePreviews = require('filepreviews');
const accessToken= require('../models/reset_pasword_access_token');
const resetMailer = require('../mailers/reset_password_mailer');
const crypto = require('crypto');
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
                        // previews.generate(user.avatar, function(err, result) {
                        //     console.log(err);
                        //     console.log(result.id);
                        //     console.log(result.status);
                          
                        //     previews.retrieve(result.id, function(err, result) {
                        //       console.log(result);
                        //     });
                        // });
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

module.exports.forgot = (req,res)=>{
    return res.render('forget',{
        title:'Forget Password',
    });
}
module.exports.reset_password = async (req,res)=>{
    try{
        let user = await User.findOne({email:req.body.email}) // 'email','_id'
        if(user){
            let Token = await accessToken.create({
                user: req.body.email,
                isValid:true,
                token : crypto.randomBytes(20).toString('hex'),
            });
            //Token = await Token.populate('user','email');
            console.log(Token);
            req.flash('success','Password change email sent sucessfully');
            resetMailer.reset_pass(Token);
        }
        else{
            req.flash('error','Your email is not registered');
        }
        return res.redirect('/users/sign-in');
    }
    catch(err){
        console.log('error in reseting password or sending mail or creating token ',err);
        return res.redirect('/users/sign-in');
    }
}
module.exports.reset = async (req,res)=>{
    if(req.body.password==req.body.confirm_password){
        try{
            let Token =await  accessToken.findOne({token:req.body.accessToken});
            if(Token){
                if(Token.isValid){
                    let user = await User.findOne({email:Token.user});
                    user.password= req.body.password;
                    user.save();
                    Token.isValid = false;
                    Token.save();
                    req.flash('success','password changed sucessfully');
                }
                else{
                    console.log('Token expired');
                    req.flash('error','Token expired');
                }
                req.flash('error','Token didnt found');
            }
            res.redirect('/users/sign-in');
        }catch(err){
            console.log('error in reseting password',err);
            req.flash('error','error in resesting password');
            res.redirect('/users/sign-in');
        }
    }
    else{
        res.redirect('/users/sign-in');
    }
}