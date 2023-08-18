const express = require("express")
const router = express.Router()
const {auth} = require("../middleware/auth")

const {getProductDetails, productList} = require("../controller/Product");

router.get("/getProductDetails",auth,getProductDetails);
router.get("/productList",auth,productList);

module.exports=router;