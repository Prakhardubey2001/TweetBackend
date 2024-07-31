// const express = require('express');
// const connect= require('./config/database');
import express from 'express';
import {connect} from './config/database.js'
import bodyParser from 'body-parser';
import {UserRepository,TweetRepository} from './repository/index.js';
import LikeService from './services/like-service.js';
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use('/api',apiRoutes);
// const Tweet= require('./models/tweet.js');
// const TweetRepository=  require('./repository/tweet-repository.js');
// const Comment= require('./models/comments.js')
// const {HashtagRepository}=require('./repository/index.js')
// const TweetService= require('./services/tweet-service.js')
// import {HashtagRepository,TweetRepository} from'./repository/index.js'
// import service from './services/tweet-service.js'
import apiRoutes from './routes/index.js'


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
    // const tweetRepo= new TweetRepository();
    //   let repo= new HashtagRepository();
    // // let service = new TweetService();
    // // const tweet=await service.create({
    // //     content:"i am good at coding its empty at the top #apple, #banana #code #orange"
    // // });
    // // console.log(tweet);   
    // let ser=new service();
    // await ser.create({content:"one more Capital letters tags #NOCAPS #clAss"})
    const userRepo=new UserRepository();
    const tweetRepo=new TweetRepository();

    // const user= await userRepo.create({
    //     email:'user01@gmail.com',
    //     password:'123456',
    //     name:'user01'
    // });

    //  const tweets=await tweetRepo.getAll(0,10);
    //  const users=await userRepo.getAll();


    //  const likeService= new LikeService();
    // await likeService.toggleLike(tweets[0].id,'Tweet',users[0].id);





})