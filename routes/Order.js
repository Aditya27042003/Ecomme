const express = require('express');
const router = express.Router();
const {auth} = require('../middleware/auth'); // Assuming you have authentication middleware

const {orderPlacement,orderHistory,orderDetails} =  require("../controller/Order")

router.post("/orderPlacement",auth,orderPlacement);
router.get("/orderHistory",auth,orderHistory);
router.get("/orderDetails",auth,orderDetails);

module.exports=router