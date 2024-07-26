const mongoose=require('mongoose');
const hashtagSchema= new mongoose.Schema({
    // title of the hashtag
    title:{
        type:String,
        required:true,
    },
    // what all tweets actually belong to hashtag
    // multiple tweet id belong ot a hashtag
    tweets:[
        {
            type:mongoose.SchemaTypes.ObjectId,
            ref:'Tweet',
        }
    ]
},{timestamps:true}) 

const Hashtag=mongoose.model('Hashtag',hashtagSchema);
module.exports=Hashtag;

