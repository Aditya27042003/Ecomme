const Category = require("../models/Category");

exports.createCategory = async (req,res) =>{

    try {
        
        //fetch data
        const {name,description} = req.body;

        //validation
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"All Fields are required",

            });
        }

        //create entry in db
        const CategoryDetails = await Category.create( {
                name:name,
                description:description,
            });

            console.log(CategoryDetails);
            //return response

            return res.status(200).json({
                success:true,
                message:"Category Created Successfully",
            })





    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
        
    }

};

exports.showAllCategories = async (req,res)=>{
    try {
        const allCategories = await Category.find({},{name:true,description:true});
        res.status(200).json({
            success:true,
            message:"All category returned successfully",
            allCategories,
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        });
        
    }
};