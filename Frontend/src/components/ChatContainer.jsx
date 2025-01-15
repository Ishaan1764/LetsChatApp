import React, { useEffect, useRef, useCallback } from 'react';
import { useChatStore } from "../store/useChatStore" ;
import ChatHeader from './ChatHeader';
import MessageInput from './sketetons/MessageInput';
import MessageSkeleton from './sketetons/MessageSkeleton';
import { useAuthStore } from '../store/useAuthStore';
import  {formatMessageTime} from "../lib/utils";


const ChatContainer = () => {
  const {messages,selectedUser,isMessagesLoading,getMessages,subscribeToMessages,unsubscribeFromMessages}=useChatStore();
  const {authUser}=useAuthStore();
  const messageScrollRef = useRef(null);

  
  useEffect(()=>{
    getMessages(selectedUser._id);
    subscribeToMessages();
    //on deMount
    return()=>unsubscribeFromMessages();
  },[selectedUser._id,getMessages,unsubscribeFromMessages,subscribeToMessages])
  
  //usefeect to scroll on new message
  useEffect(()=>{
    if(messageScrollRef.current && messages){
      messageScrollRef.current.scrollIntoView({behavior:"smooth"});
    }
    
  },[messages])

  if(isMessagesLoading) return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader/>
      <MessageSkeleton/>
      <MessageInput/>
    </div>
  );
  
  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader/>

      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {/* Will use chat bubble form daisyUI */}
        {messages.map((message)=>(
          <div
            key={message._id}
            className={`chat ${message.senderId===authUser._id ? "chat-end":"chat-start"}`}
            ref={messageScrollRef}
            >
              <div className='chat-image avatar'>
                <div className='size-10 rounded-full border'>
                  <img src={message.senderId===authUser._id?authUser.profilePic || "/avatar.png": selectedUser.profilePic || "/avatar.png"} />
                </div>
              </div>
              <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
              
            </div>
            
          </div>
          
          
        ))}
      </div>
      

      <MessageInput/>
      
    </div>
  );
}

export default ChatContainer