const express = require("express")
const router = express.Router()
const {auth} = require("../middleware/auth")


const {createCategory,showAllCategories} = require("../controller/Category")

router.post("/createCategory",auth,createCategory);
router.get("/showAllCategories",auth,showAllCategories);



module.exports=router;