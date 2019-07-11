const mongoose = require('mongoose');

const accesTokenSchema = new mongoose.Schema({
    user:{
        type:String,
    },
    token:{
        type:String,
        required:true,
    },
    isValid:{
        type:Boolean,
        required:true,
    }
},{timestamps:true});

const accessToken = mongoose.model('accessToken',accesTokenSchema);

module.exports = accessToken;   