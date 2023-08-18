const express = require("express");
const app = express();
const userRoute = require("./routes/User");
const categoryRoute = require("./routes/Category");
const orderRoutes = require("./routes/Order");
const cartRoutes = require("./routes/Cart");
const productRoutes = require("./routes/Product");


const cookieParser = require("cookie-parser");

require("dotenv").config();
const PORT = process.env.PORT || 3000;



 const connectWithdb =require("./config/database");
 connectWithdb();

 //middleware
 app.use(express.json());
 app.use(cookieParser());

 //routes
 app.use("/api/v1/auth",userRoute);
 app.use("/api/v1/auth",categoryRoute);
 app.use("/api/v1/auth",orderRoutes);
 app.use("/api/v1/auth",cartRoutes);
 app.use("/api/v1/auth",productRoutes);
 




app.listen(PORT,()=>{
    console.log(`Server successfully started at ${PORT}`);
});