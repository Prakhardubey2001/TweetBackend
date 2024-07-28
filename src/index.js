const express = require('express');
const app = express();
const connect= require('./config/database');
const Tweet= require('./models/tweet.js');
const TweetRepository=  require('./repository/tweet-repository.js');
const Comment= require('./models/comments.js')
const {HashtagRepository}=require('./repository/index.js')
const TweetService= require('./services/tweet-service.js')
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
     let repo= new HashtagRepository();
    // await repo.bulkCreate([
    //     {
    //         title:'happy',
    //         tweets:[]
    //     },{
    //         title:'sad',
    //         tweets:[],
    //     },{
    //         title:'angry',
    //         tweets:[]
    //     }
    // ])
    // const response= await repo.findByName(['hastag1','angry']);
    // console.log(response); 
    let service = new TweetService();
    const tweet=await service.create({
        content:"i am good at coding its empty at the top #apple, #banana #code #orange"
    });
    console.log(tweet);    


})