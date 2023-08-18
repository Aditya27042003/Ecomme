const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    items:[
       {
         productId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Product",

        },
        qty:{
            type:Number,
            default:0,
            reuired:true,
        },
        price:{
            type:Number,
            default:0,
            reuired:true,
        },
        title:{
            type:String,
            reuired:true,
        },

    },

    ],

    totalqty:{
        type:Number,
        default:0,
        reuired:true,
    },
    totalprice:{
        type:Number,
        default:0,
        reuired:true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
});

module.exports= mongoose.model("Cart",cartSchema);