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
                post:req.body.post
            },(err,comment)=>{
                if(err){
                    console.log('error in creating the comment');
                    return;
                }
                post.comments.push(comment);
                post.save();
                return res.redirect('back');
            });
        }
    })
};


module.exports.destroy=(req,res)=>{
    Comment.findById(req.params.id,(err,comment)=>{
        if(comment){
            let postId=comment.post;
            Post.findById(postId,(err,post)=>{
                if(post){
                    let userId=post.user;
                    if((userId=req.user.id)||(comment.user==req.user.id)){
                        let postId=comment.post;
                        Post.findByIdAndUpdate(postId,{ $pull: {comments: req.params.id}},(err,post)=>{
                            return res.redirect('back');
                        })
                        comment.remove();
                        
                    }
                    else{
                        return res.redirect('back');
                    }
                }
                else{
                    return res.redirect('back');
                }
            })
        }
        else{
            return res.redirect('back');
        }
    })
}