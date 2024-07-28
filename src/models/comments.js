// const mongoose= require('mongoose');
import mongoose from "mongoose";
const commentSchema= new mongoose.Schema({
    content:{
        type:String,
        required:[true,'Please provide content'],
    },
    userEmail:{
        type: String,
    },
},{timestamps: true});

const Comment= mongoose.model('Comment',commentSchema);
export  default Comment;


