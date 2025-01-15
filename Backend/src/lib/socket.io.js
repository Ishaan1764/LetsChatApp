import {Server} from "socket.io";
import http from "http";
import express from "express";

const app=express();

const server=http.createServer(app);

const io= new Server(server,{
    cors:{
        origin:["http://localhost:5173"]
    }
});

//we will give the user ID and it will return the socket id so that it is easy to communicate between two sockets
export function getReceiverSocketId(userId){
    return userSocketMaping[userId];
}

//To store online Users
const userSocketMaping={};

io.on("connection",(socket)=>{
    console.log("User connected",socket.id);

    const userId=socket.handshake.query.userId;

    if(userId) userSocketMaping[userId]=socket.id;

    io.emit("getAllOnlineUsers",Object.keys(userSocketMaping));
    socket.on("disconnect",()=>{
        console.log("A user is Disconnected",socket.id);
        delete userSocketMaping[userId];
    io.emit("getAllOnlineUsers",Object.keys(userSocketMaping));

    })
})
export {io,app,server}  ;