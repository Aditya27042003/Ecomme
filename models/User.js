const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type:String,
        required:true,
    },
 
    active: {
        type: Boolean,
        default: true,
    },
    approved: {
        type: Boolean,
        default: true,
    },
 
    token :{
        type:String,
    },
    contactNumber: {
        type:Number,
        trim:true,
      }
 

    

},
// Add timestamps for when the document is created and last modified
{ timestamps: true },
);

module.exports = mongoose.model("User",userSchema);