import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL="http://localhost:3001";
//initialy state will be null bcz we dont know if he is authenticated,
export const useAuthStore = create((set,get) => (
    //using get we can access all tese in different functions
    {
        authUser: null,
        isSiginingUp: false,
        isLoggingIn: false,
        isUpdatingProfile: false,
        isCheckingAuth: true, //just the loading state
        onlineUsers:[],
        socket:null,

        checkAuth: async () => {
            try {
                const res = await axiosInstance.get("/auth/check");
                set({ authUser: res.data });
                
                get().connectSocket();
            
            } catch (error) {
                console.log("Error in checkAuth: ", error);
                set({ authUser: null });
            } finally {
                set({ isCheckingAuth: false });
            }
        },

        signup: async (data) => {
            set({ isSiginingUp: true });
            try {
                const res = await axiosInstance.post("/auth/signup", data);
                set({ authUser: res.data })
                toast.success("Account created Successfully");
                get().connectSocket();
            
            } catch (error) {
                toast.error(error.response?.data?.message || "An error occurred during signup");
            } finally {
                set({ isSiginingUp: false })
            }
        },

        login: async (data) => {
            set({ isLoggingIn: true });
            try {
                const res = await axiosInstance.post("/auth/login", data);
                set({ authUser: res.data });
                toast.success("Logged in successfully");

                get().connectSocket();
            
            } catch (error) {
                toast.error(error.response.data.message);
            } finally {
                set({ isLoggingIn: false });
            }
        },

        logout: async () => {
            try {
                await axiosInstance.post("/auth/logout");
                set({ authUser: null });
                toast.success("Logged Out Successfully");
                
                get().disConnectSocket();
            
            } catch (error) {
                toast.error(error.response.data.message);
            }
        },

        updateProfile: async (data) => {
            set({ isUpdatingProfile: true });
            try {
                const res = await axiosInstance.put("/auth/update-profile", data);
                set({ authUser: res.data });
                toast.success("Profile updated successfully");
            } catch (error) {
                console.log("error in update profile:", error);
                toast.error(error.response.data.message);
            } finally {
                set({ isUpdatingProfile: false });
            }
        },

        connectSocket:()=>{
            const {authUser} = get();
            if(!authUser || get().socket?.connected) return;
            const socket = io(BASE_URL,{
                query:{
                    userId:authUser._id
                }
            });
            socket.connect();
            set({socket:socket});

            socket.on("getAllOnlineUsers",(userIds)=>{
                set({onlineUsers:userIds})
            })
        },
        
        disConnectSocket:()=>{
            if(get().socket?.connected) get().socket.disconnect();
        }
    }));