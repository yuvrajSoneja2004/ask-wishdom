import axios from "axios";

let tempURL = "https://ask-wishdom-server.onrender.com/";
// The axios Instance
// 'https://ask-wishdom-server.onrender.com/'
export const axiosInstance = axios.create({
  baseURL: tempURL,
});

// http://localhost:6969
