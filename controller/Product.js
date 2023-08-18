const Product = require("../models/Product");
//const Category = require("../models/Category");


exports.getProductDetails = async (req,res) =>{
    try {
        //get id
        const {productId} = req.body;

        //find product details using product id
        const productDetails = await Product.find(
                                                  {_id:productId})
                                                  .populate("category").exec();

        //validation
        if(!productDetails){
            return res.status(403).json({
                success:false,
                message:`Could not find the product details with ${productId}`,
            });
        }

        //return response
        return res.status(200).json({
            success:true,
            message:"Product Details fetched Successfully",
            data:productDetails,
        });

    } catch (error) {
          console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}




// GET /api/products/category/:categoryId
exports.productList = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    // Fetch products based on the category ID
    const products = await Product.find({ category: categoryId });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No products found for the given category' });
    }

    // Extract essential details for each product
    const productList = products.map((product) => ({
      _id: product._id,
      title: product.title,
      description: product.description,
      price: product.price,
      manufacturer:product.manufacturer,
      availability: product.availability,
    }));

    return res.status(200).json({
        success:true,
        data:productList,
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};


