// const mongoose=require('mongoose');
import mongoose from "mongoose";
const hashtagSchema= new mongoose.Schema({
    // title of the hashtag
    title:{
        type:String,
        required:true,
        unique:true,
    },
    // what all tweets actually belong to hashtag
    // multiple tweet id belong ot a hashtag
    tweets:[
        {
            type:mongoose.SchemaTypes.ObjectId,
            ref:'Tweet',
        }
    ]
},{timestamps:true});
// hashtagSchema.pre('save',function(next){
//     this.title=this.title.toLowerCase();
//     console.log(this);
//     next();
// }) 

const Hashtag=mongoose.model('Hashtag',hashtagSchema);
export default Hashtag;
// module.exports=Hashtag;

