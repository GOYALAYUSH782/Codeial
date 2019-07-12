const Post=require('../../../models/post');
const Comment=require('../../../models/comment');

module.exports.index=async (req,res)=>{
    let posts= await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user',
            }
        })
    return res.json(200,{
        message:"List of posts",
        posts:posts,
    });
}

module.exports.destroy= async (req,res)=>{
    console.log(req.user.id);
    //post.user is just a id unitl we populate it and .id converts the objectId into string ,  while comparing objectId's we need to comapre the strings..
    try{
        console.log(req.user.id);
        let post = await Post.findById(req.params.id);
        if(post&&post.user==req.user.id){
            post.remove();
            await Comment.deleteMany({post:req.params.id})
            return res.json(200,{
                message:'Post and associated comment deleted successfully',
            });
        }
        else{
            return res.json(401,{
                message:'you cant delete!!!',
            });
        }
    }
    catch(err){
        console.log(err);
        return res.json(500,{
            message:'Internal server Error'
        })
    }
}