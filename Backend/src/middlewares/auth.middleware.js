import jwt from "jsonwebtoken";
import User from "../models/users.model.js";

export const protectionRoute = async(req,res,next)=>{
    try {
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({message: "Unauthorized - No Token Available!!"});
        }

        const decodedToken= jwt.verify(token,process.env.JWT_SECRET);
        if(!decodedToken){
            return res.status(401).json({message: "Unauthorized - Token Invalid!!"});
        }
        const user= await User.findById(decodedToken.userId).select("-password");

        if(!user){
            return res.status(404).json({message:" User nOt Found"});
        }

        req.user= user;
        next();
    } catch (error) {
        console.log("Error in Protection Middleware!!",error.message);
        res.status(500).json({message:"Internal server Error"});
    }
}