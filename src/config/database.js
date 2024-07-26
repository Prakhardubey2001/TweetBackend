const mongoose= require('mongoose');
require("dotenv").config();
const connect = async()=>{
    await mongoose.connect(process.env.DATABASE_URL).then(() => console.log("DB Connection is Successful"))
    .catch((error) => {
        console.log("Some Issue in DB Connection");
        console.error(error.message);
        process.exit(1);
    });
}
module.exports=connect; 