const User=require('../models/user');

module.exports.profile = (req,res)=>{
    return res.render('users',{
        title:"Users",
    });
}


module.exports.signUp = (req,res)=>{
    return res.render('user_sign_up',{
        title:'Codeial | Sign In'
    });
};

module.exports.signIn=(req,res)=>{
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
module.exports.comment=(req,res)=>{
    return res.send('<h1>Comment section</h1>');
}