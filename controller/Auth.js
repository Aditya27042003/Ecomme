const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


//sign up
exports.signUp = async(req,res) =>{
    try{

        //fetch data from request body
        const {firstName,
               lastName,
               email,
               password,
               confirmPassword,
               contactNumber, 
                       
        } =  req.body;

        //validate
        if(!firstName || !lastName || !email || !password || !confirmPassword
            ){
            
                return res.status(403).json({
                    success:false,
                    message:'All fields are required',

                });
            }

              //2 password match krlo
        if(password !== confirmPassword) {
            return res.status(400).json({
                success:false,
                message:'Password and ConfirmPassword Value does not match, please try again',
            });
        }

         //check user already exist or not
       const existingUser =  await User.findOne({email});  
       if(existingUser){
        return res.status(400).json({
            success:false,
            message:"User is already Registered",
        });
       } 

    

       //hash password

      const hashedPassword = await bcrypt.hash(password,10);

  


           //entry create in DB


        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password:hashedPassword,
            
        })

        //return res
        return res.status(200).json({
            success:true,
            message:'User is registered Successfully',
            user,
        });


    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be registrered. Please try again",
        })

    }
}




exports.login = async (req,res) => {
    try {
        //get data  from request  body
        const {email,password} = req.body;

        //validation data
        if(!email || !password) {
            return res.status(403). json({
                success:false,
                message:'All fields are required, please try again',
            });
        }

        //check user exist or not
        const user = await User.findOne({email});
        if(!user){
            console.error('error');
            return res.status(401).json({
                success:false,
                message:"User is not registrered, please signup first",
                
            });
        }

        //generate jwt after password matching
        if(await bcrypt.compare(password,user.password)){
            const payload = {
                email : user.email,
                id : user._id,
                
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn:"2h",
            });
            user.token=token;
            user.password=undefined;

                //create cookie and send response
                const options = {
                    expires: new Date(Date.now() + 3*24*60*60*1000),
                    httpOnly:true,
                }
                res.cookie("token", token, options).status(200).json({
                    success:true,
                    token,
                    user,
                    message:'Logged in successfully',
                })
    
        }
        else{
            return res.status(401).json({
                success:false,
                message:'Password is incorrect',
            });
        }



    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Login Failure, please try again',
        });
        
    }
};