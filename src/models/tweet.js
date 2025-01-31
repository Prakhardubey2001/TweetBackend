// const mongoose= require('mongoose');
import mongoose from "mongoose";
const tweetSchema= new mongoose.Schema({
    content:{
        type:String,
        required:[true,'Please provide content'],
        max:[250,"Tweet lenth can't be more than 250 characters"]
    },
    likes:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Like'
    }
],
comments: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }
],
    // hashtags:[
    //     {
    //         type:mongoose.Schema.Types.ObjectId,
    //         ref:'Hashtag'
    //     }
    // ]
    image: {
        type: String
    }
},{timestamps: true});


 
const Tweet= mongoose.model('Tweet',tweetSchema);
// module.exports=Tweet;
export  default Tweet;

