import User from "../models/users.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId,io } from "../lib/socket.io.js";
export const getSidebarUsers= async (req,res)=>{
    try {
        const loggedInUserId= req.user._id;
        const filteredUsers= await User.find({_id: {$ne: loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getSidebarUsers: ",error.message);
        res.status(500).json({message:"Internal server Error"});
    }
}

export const getMessages = async (req,res)=>{
    try {
        const {id:userToChatId}= req.params;
        const myId= req.user._id;

        const messages= await Message.find({
            $or:[
                {senderId:myId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:myId}
            ]
        });

        res.status(200).json(messages);
    } catch (error) {
        console.error("Error in getMessages: ",error.message);
        res.status(500).json({message:"Internal server Error"});
    }
}

export const sendMessage =async(req,res)=>{
    try{
        const {text,image}=req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user._id;

        let imgUrl;
        if(image){
            //Uploading base 64 image to cloudinary(basket where we will have all our images).
            const uploadResp= await cloudinary.uploader.upload(image);
            imgUrl=uploadResp.secure_url;
        }

        const newMessage= new Message({
            senderId,
            receiverId,
            text,
            image: imgUrl,
        });

        await newMessage.save();
        
        //DID realtime functionality using socket.io
        //here receiverId is the userId who is getting response
        const receiverSocketId=getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("MessageforYou",newMessage);
        }
        
        res.status(201).json(newMessage);
    }catch(error){
        console.error("Error in sendMessages controller: ",error.message);
        res.status(500).json({message:"Internal server Error"});
    }
}