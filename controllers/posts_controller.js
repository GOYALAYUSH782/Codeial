const Post=require('../models/post');
const Comment=require('../models/comment');
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

module.exports.destroy=(req,res)=>{
    Post.findById(req.params.id,(err,post)=>{

        //post.user is just a id unitl we populate it and .id converts the objectId into string ,  while comparing objectId's we need to comapre the strings..
        if(post.user==req.user.id){
            post.remove();
            Comment.deleteMany({post:req.params.id},(err)=>{
                return res.redirect('back');
            })
        }
        else{
            return res.redirect('back');
        }
    })
}