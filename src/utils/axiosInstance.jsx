import axios from "axios";

// The axios Instance
export const axiosInstance = axios.create({
    baseURL: 'https://ask-wishdom-server.onrender.com/',
});