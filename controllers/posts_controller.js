const Post=require('../models/post');
const Comment=require('../models/comment');
const User=require('../models/user');
module.exports.Createpost= async (req,res)=>{
    try{
        let post= await Post.create({
            content: req.body.content,
            user: req.user._id
        })
        post=await Post.findById(post.id).populate('user','name');
        await req.flash('success','Post Published!');
        res.locals.flash={
            'success':req.flash('success'),
            'error':req.flash('error'),
        }
        if(req.xhr){
            
            return res.status(200).json({
                data:{
                    post:post,
                },
                message: "Post created!"
            });
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
            post.remove();
            await Comment.deleteMany({post:req.params.id})
            if(req.xhr){
                console.log('hi from controllers');
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