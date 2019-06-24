const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

module.exports.create=(req,res)=>{
    Post.findById(req.body.post,(err,post)=>{
        if(err){
            console.log('error in finding the post');
            return;
        }
        if(post){
            Comment.create({
                content:req.body.content,
                user:req.user._id,
                post:req.post._id
            },(err,comment)=>{
                if(err){
                    console.log('error in creating the comment');
                    return;
                }
                post.comments.push(comment);
                post.save();
                return res.redirect('/back');
            });
        }
    })
};