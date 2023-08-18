const Cart = require("../models/Cart");
const user = require("../models/User");
const Product = require("../models/Product");

//user add product to cart
exports.addToCart = async (req,res)=>{
   
    try {
            const userId = req.user._id;
            const productId = req.params.productId;
            const { qty } = req.body;
        
            // Find the product
            const product = await Product.findById(productId);
        
            if (!product) {
              return res.status(404).json({ message: 'Product not found' });
            }
        
            // Add the product to the user's cart
            let cart = await Cart.findOne({ user: userId });
        
            if (!cart) {
              cart = new Cart({
                user: userId,
                items: [{ productId: productId, qty , price ,title }],
              });
            } else {
              // Check if the product is already in the cart
              const existingProduct = cart.items.find(item => item.items.equals(productId));
        
              if (existingProduct) {
                existingProduct.qty += qty;
              } else {
                cart.items.push({ productId: productId, qty, price,title });
              }
            }
        
            await cart.save();
        
            res.json({ message: 'Product added to cart successfully' });
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred' });
          }


    } 
       


//view cart
exports.viewCart = async(req,res)=>{
    try {
        const userId = req.user.id;
        const userCart = await Cart.findOne({_id:userId});
        //here we populated product try this
        if(!userCart){
            return res.status(400).json({
                success:false,
                message:`Could not find cart for ${userId}`,
            });
        }
        return res.status(200).json({
            success: true,
            data: userCart,
          });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
          })
    }
};