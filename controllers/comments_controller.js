const Post = require('../models/post');
const Comment = require('../models/comment');
const User = require('../models/user');

module.exports.create=async (req,res)=>{
    try{
        let post = await Post.findById(req.body.post);
        if(post){
            let comment=await Comment.create({
                content:req.body.content,
                user:req.user._id,
                post:req.body.post
            });
            post.comments.push(comment);
            post.save();
            return res.redirect('back');
        }
    }
    catch(er){
        if(err){
            console.log('Error',err);
            return;
        }
    }
    
};


module.exports.destroy=async (req,res)=>{
    try{
        let comment = await Comment.findById(req.params.id);
        if(comment){
            let postId= comment.post;
            let post = await Post.findById(postId);
            if(post){
                let userId= post.user;
                if((userId=req.user.id)||(comment.user==req.user.id)){
                    let post = await Post.findByIdAndUpdate(postId,{ $pull: {comments: req.params.id}});
                    comment.remove();
                    return res.redirect('back');
                }
                else{
                    return res.redirect('back');
                }
            }
        }
        else{
            return res.redirect('back');
        }
    }
    catch(err){
        if(err){
            console.log('Error',err);
            return;
        }
    }
}