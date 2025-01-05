import express from "express";
import dotenv from "dotenv"; 
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const PORT=process.env.PORT;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials:true    
}))

// Sign In / Signup Route
app.use("/v1/api/auth",authRoutes);
//Messages Route
app.use("/v1/api/message",messageRoutes);

app.listen(PORT,()=>{
    console.log(`server running at port ${PORT}`);
    connectDB();
})