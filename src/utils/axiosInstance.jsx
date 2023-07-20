import axios from "axios";

let tempURL = 'http://localhost:6969/'
// The axios Instance
// 'https://ask-wishdom-server.onrender.com/'
export const axiosInstance = axios.create({
    baseURL: tempURL ,
});