const Post=require('../models/post');

module.exports.Createpost=(req,res)=>{
    Post.create({
        content: req.body.content,
        user: req.user._id
    },(err,post)=>{
        if(err){ console.log('error in creating the post'); return;}
        console.log(post);
        return res.redirect('back');
    })
}