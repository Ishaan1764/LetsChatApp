import express from "express";
import { login, logout, signup, updateProfile, checkAuth } from "../controllers/auth.controller.js";
import { protectionRoute } from "../middlewares/auth.middleware.js";
const router=express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);

router.put("/update-profile",protectionRoute,updateProfile);

router.get("/check",protectionRoute,checkAuth)

export default router;