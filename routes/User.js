const express = require("express")
const router = express.Router()


const {signUp,login}= require("../controller/Auth");


//route for registration
router.post("/signUp",signUp);


//Route for login
router.post("/login",login);

module.exports= router
