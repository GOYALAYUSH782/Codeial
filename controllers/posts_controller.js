const Post=require('../models/post');
const Comment=require('../models/comment');
const User=require('../models/user');
const postsmailer = require('../mailers/post_mailer');
const Like = require('../models/like');
module.exports.Createpost= async (req,res)=>{
    try{
        let post= await Post.create({
            content: req.body.content,
            user: req.user._id
        })
        post=await Post.findById(post.id).populate('user','name email');

        postsmailer.newPost(post);
        
        if(req.xhr){
            
            return res.status(200).json({
                data:{
                    post:post,
                },
                message: "Post created!"
            });
        }
        req.flash('success','Post Published!');
        res.locals.flash={
            'success':req.flash('success'),
            'error':req.flash('error'),
        }
        return res.redirect('back');
    }
    catch(err){
        if(err){
            req.flash('error',err);
            return res.redirect('back');
        }
    }

}

module.exports.destroy= async (req,res)=>{
    
    //post.user is just a id unitl we populate it and .id converts the objectId into string ,  while comparing objectId's we need to comapre the strings..
    try{
        let post = await Post.findById(req.params.id);
        if(post.user==req.user.id){

            await Like.deleteMany({_id:{$in:post.comments}});
            await Comment.deleteMany({post:req.params.id})
            await Like.deleteMany({
                likeable:req.params.id,
                onModel: 'Post'
            });
            post.remove();

            if(req.xhr){
                return res.status(200).json({
                    data:{
                        post_id:req.params.id,
                    },
                    message:"Post deleted"
                });
            }
            req.flash('success','Post Deleted');
            return res.redirect('back');
        }
        else{
            req.flash('error','Cant delete someone else posts');
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