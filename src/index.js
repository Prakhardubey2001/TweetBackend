const express = require('express');
const app = express();
const connect= require('./config/database');
const Tweet= require('./models/tweet.js');
const TweetRepository=  require('./repository/tweet-repository.js');
const Comment= require('./models/comments.js')
app.listen(3000, async() => {
    console.log("Server is running on port 3000");
    await connect();
    console.log("MogoDbDatabase connected successfully");
    // const tweet= await Tweet.create({
    //     content:"third Demo Tweet",
    //     userEmail:'abc@gmail.com'
    // });
    // const tweet=await Tweet.find();

    // const tweet= await Tweet.findById('669cd2300ee959f4905a32c3');

    const tweetRepo= new TweetRepository();
    


})