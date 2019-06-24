const Post=require('../models/post');
const Comment=require('../models/comment');
module.exports.Createpost= async (req,res)=>{
    try{
        await Post.create({
            content: req.body.content,
            user: req.user._id
        })  
        req.flash('success','Post Published!');
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