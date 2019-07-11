const mongoose= require('mongoose');
const User= require('./user');
const Post = require('./post');
const Comment = require('./comment');
const likeSchema =new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    // this defines the object id of the loked object
    likeable:{
        type : mongoose.Schema.Types.ObjectId,
        required:true,
        refPath: 'onModel',
    },
    // this filed is used for defining the type of the liked object since this is a dynamic reference 
    onmodel:{
        type:String,
        required:true,
        enum:['Post','Comment']
    }
},{
    timestamps:true
});

const Like= mongoose.model('Like',likeSchema);
module.exports = Like;