import axios from "axios";

export const axiosInstance= axios.create({
    baseURL:"http://localhost:3001/v1/api",
    withCredentials:true //will help us to send the cookies with each request.
})