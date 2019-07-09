const User= require('../models/user');
const Post= require('../models/post');
const Comment= require('../models/comment');
const Like= require('../models/like');

module.exports.toggleLike = async (req,res)=>{
    try{
        let likeable;
        let deleted=false;

        // likeables to check whther it is a post or a comment and getting it array of likes...
        if(req.query.type=='Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }
        else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        // finding the like
        let existingLike = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        });
        // if alredy existed then just delete it
        if(existingLike){
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.remove();
            deleted=true;
        }

        // if doesnt existed then create a new one
        else{
            let newLike = await Like.create({
                likeable: req.query.id,
                onModel: req.query.type,
                user: req.user._id
            });
            likeable.likes.push(newLike._id);
            likeable.save();
        }
        
        return res.json(200,{
            message:'Request Successful!',
            data:{
                deleted:deleted,
            }
        });
    }
    catch(err){
        console.log(err);
        return res.json(500,{
            message: 'Internal server error'
        })
    }
};
