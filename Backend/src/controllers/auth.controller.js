import { generateToken } from "../lib/utils.js";
import User from "../models/users.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js"

// Signup Endpoint
export const signup= async(req,res)=>{
    const {email,fullname,password}= req.body;
    try {
        if(!fullname || !password || ! email){
            return res.status(400).json({message:"All Fields are required"}); 
        }
        if (password.length<6){
            return res.status(400).json({message:"Password must have 6 Characters"}); 
        }
        
        const user = await User.findOne({email});
        if(user) return res.status(400).json({message:"Email Already Exists"});
        
        //HASHING PASSWORD.
        const salt= await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser= new User({
            fullname,
            email,
            password:hashedPassword
        });

        if(newUser){
            //generate JWT TOKEN
            generateToken(newUser._id,res);
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                email:newUser.email,
                fullname:newUser.fullname,
                password:newUser.password,
                profilePic:newUser.profilePic
            })
        }else{
            res.status(400).json({message:"INVALID USER DATA"});
        }
        
    } catch (error) {
        console.log("Error in signup controller",error.message);
        res.status(500).json({message:"Internal server Error"});

    }
}

//Login Endpoint
export const login= async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user =await User.findOne({email});

        if(!user){
            return res.status(400).json({message:"Invalid Credentials"});
        }

        //checking for correct password

        const isPassCorrect= await bcrypt.compare(password,user.password);
        if(!isPassCorrect){
            return res.status(400).json({message:"Wrong Password"});
        }

        generateToken(user._id,res);

        res.status(200).json({
            _id:user._id,
            email:user.email,
            fullname:user.fullname,
            password:user.password,
            profilePic:user.profilePic
        })
    } catch (error) {
        console.log("Error in login controller",error.message);
        res.status(500).json({message:"Internal server Error"});
    }
}

//LogOut EndPoint
export const logout= (req,res)=>{
    try {
        //clear the cookie
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message:"Logged Out Successfully"});    
    } catch (error) {
        console.log("Error in Logout controller",error.message);
        res.status(500).json({message:"Internal server Error"});
    }
    
}

//Updating prfile pick but not allowing to update email and name.

export const updateProfile= async(req,res)=>{
    try {
        const {profilePic}= req.body;
        //user is coming from the protected middleware that comes before in in app.js .

        const userId = req.user._id;
        if(!profilePic){
            return res.status(400).json({message: "Profile Pic is required!!"});
        }

        const uploadResp = await cloudinary.uploader.upload(profilePic);
        const updatedUser= await User.findByIdAndUpdate(userId,{profilePic:uploadResp.secure_url},{new:true});

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("error in updated Profile: ",error.message);
        res.status(500).json({message:"Internal server Error"});
    }
}

//Get Check point
export const checkAuth = async(req,res)=>{
    try{
        res.status(200).json(req.user);
    }catch(error){
        console.log("Error in checkAuth: ",error.message);
        res.status(500).json({message:"Internal server Error"});
    }
}
