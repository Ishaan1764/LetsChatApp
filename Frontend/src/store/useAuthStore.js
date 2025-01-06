import { create } from "zustand";
import {axiosInstance} from "../lib/axios";
import toast from "react-hot-toast";

//initialy state will be null bcz we dont know if he is authenticated,
export const useAuthStore=create((set)=>(
    {
    authUser:null, 
    isSiginingUp: false,
    isLoggingIn:false,
    isUpdatingProfile:false,

    isCheckingAuth:true, //just the loading state
        
    checkAuth: async()=>{
        try {
            const res= await axiosInstance.get("/auth/check");
            set({authUser:res.data});
        } catch (error) {
            console.log("Error in checkAuth: ",error);
            set({authUser:null});
        } finally{
            set({isCheckingAuth:false});
        }
    },

    signup: async (data)=>{
        set({isSiginingUp:true});
        try {
            const res= await axiosInstance.post("/auth/signup",data);
            set({authUser: res.data})
            toast.success("Account created Successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred during signup");
        }finally{
            set({isSiginingUp:false})
        }
    },

    login: async(data)=>{
        set({isLoggingIn:true});
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged in successfully");      
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({ isLoggingIn: false });
        }
    },

    logout: async ()=>{
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser:null});
            toast.success("Logged Out Successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
})) ;