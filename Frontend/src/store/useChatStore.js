import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set,get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/message/users");
            set({ users: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },
    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/message/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessages: async(msgData)=>{
        const {selectedUser,messages}=get();
        try {
            const res = await axiosInstance.post(`/message/send/${selectedUser._id}`,msgData);
            set({messages:[...messages,res.data]})
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    //listeningto messages
    subscribeToMessages:()=>{
        const {selectedUser} = get();
        //if no selected chat then retu immideately.
        if(!selectedUser) return;

        const socket = useAuthStore.getState().socket;
//! there will be an issue so need to optimise in future.:
//^ so the problem was with realtime messages as i wanted to send a message to ishu nut ishu select another person on his screen so he was able to see mesasage there but when he de selects the person and onpen me and then again open that person then the messages were gone .LETS FIX THIS.
        socket.on("MessageforYou",(newMessage)=>{
            if(newMessage.senderId!== selectedUser._id) return;
            set({
                messages:[...get().messages,newMessage]
            })
        })
    },

    unsubscribeFromMessages:()=>{
        const socket = useAuthStore.getState().socket;
        socket.off("MessageforYou");
    },



    //TODO : ek error aaega jb aega then we will optimise it .
    setSelectedUser: (selectedUser)=>set({selectedUser})
}))