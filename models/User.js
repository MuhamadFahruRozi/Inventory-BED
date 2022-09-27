const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    slug:{
        type: String,
        required: true,
        unique: true
    },
    user_id:{
        type: String,
        required: true,
        unique: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        required: true,
    },
    pic_url:{
        type: String,
    },
    pic_id:{
        type: String,
    },
    createdAt:{
        type:Date,
        required: true,
    },
    updatedAt:{
        type:Date,
        required: true,
    }
},{timestamp:true}
)

module.exports = mongoose.model('user', UserSchema, 'user')