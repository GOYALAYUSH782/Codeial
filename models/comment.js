const mongosse = require('mongoose');

const commentSchema= new mongosse.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongosse.Schema.Types.ObjectId,
        ref:'User'
    },
    post:{
        type:mongosse.Schema.Types.ObjectId,
        ref:'Post'
    }
},{
    timestamps:true
});

const Comment= mongosse.model('Comment',commentSchema);

module.exports=Comment;