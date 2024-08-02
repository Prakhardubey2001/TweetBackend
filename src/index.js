// const express = require('express');
// const connect= require('./config/database');
import express from 'express';
import {connect} from './config/database.js'
import bodyParser from 'body-parser';
import {UserRepository,TweetRepository} from './repository/index.js';
import LikeService from './services/like-service.js';
import passport from 'passport';
import { passportAuth } from './config/jwt-middleware.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(passport.initialize());
passportAuth(passport);
app.use('/api',apiRoutes);
import apiRoutes from './routes/index.js'
const PORT=process.env.PORT 

app.listen(PORT, async() => {
    console.log(`Server is running on port ${PORT}`);
    await connect();
    console.log("MogoDbDatabase connected successfully");
    const userRepo=new UserRepository();
    const tweetRepo=new TweetRepository();
})