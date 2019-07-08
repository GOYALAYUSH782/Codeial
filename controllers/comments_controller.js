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
            console.log(comment);
            post.comments.push(comment);
            //  post.comment.sort('-createdAt');
            post.save();

            comment = await Comment.findById(comment.id)
            .populate('post')
            .populate('user','name');

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        comment:comment,
                    },
                    message:'Comment created'
                })
            }
            req.flash('success','Comment posted');
            return res.redirect('back');
        }
    }
    catch(er){
        if(err){
            req.flash('error',err);
            return res.redirect('back');
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

                    if(req.xhr){
                        return res.status(200).json({
                            data:{
                                comment_id:req.params.id
                            },
                            message:"Comment deleted"
                        });
                    }


                    req.flash('success','Comment deleted');
                    return res.redirect('back');
                }
                else{
                    req.flash('error','Cant delete someone else comment');
                    return res.redirect('back');
                }
            }
        }
        else{
            req.flash('error',err);
            return res.redirect('back');
        }
    }
    catch(err){
        if(err){
            req.flash('error',err);
            return res.redirect('back');
        }
    }
}