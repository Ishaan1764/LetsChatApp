import express from "express";
import { protectionRoute } from "../middlewares/auth.middleware.js";
import { getSidebarUsers,getMessages,sendMessage } from "../controllers/message.controller.js";
const router=express.Router();

//get method to fetch all the users and show on the side bar.
router.get("/users",protectionRoute, getSidebarUsers);

//get end point to get all the chat between the sender and receiver.
router.get("/:id",protectionRoute, getMessages);
//post route to send messages.
router.post("/send/:id",protectionRoute,sendMessage);

export default router;