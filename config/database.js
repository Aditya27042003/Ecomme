const mongoose = require("mongoose");

require("dotenv").config();

const Connect = () =>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology: true,
    })
    .then(()=> console.log("Db connection successfull"))
    .catch((error)=>{
        console.log("issue in db connection");
        console.error(error.message);
        process.exit(1);
    })
}
module.exports=Connect;