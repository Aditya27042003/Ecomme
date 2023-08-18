const express = require("express")
const router = express.Router()
const {auth} = require("../middleware/auth")

const {addToCart, viewCart} = require("../controller/Cart");

router.put("/addToCart",auth,addToCart);
router.get("/viewCart",auth,viewCart);

module.exports=router;