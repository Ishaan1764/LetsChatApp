import { create } from "zustand";
import {axiosInstance} from "../lib/axios";
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
    }
}))