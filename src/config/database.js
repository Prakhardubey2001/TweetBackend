// const mongoose= require('mongoose');
// require("dotenv").config();
import mongoose from 'mongoose';
import dotenv  from 'dotenv';
dotenv.config();
export const connect = async()=>{
    await mongoose.connect(process.env.DATABASE_URL).then(() => console.log("DB Connection is Successful"))
    .catch((error) => {
        console.log("Some Issue in DB Connection");
        console.error(error.message);
        process.exit(1);
    });
}