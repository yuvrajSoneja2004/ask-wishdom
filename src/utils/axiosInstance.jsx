import axios from "axios";

let tempURL = "https://ask-wishdom-server.onrender.com/";
// The axios Instance
export const axiosInstance = axios.create({
  baseURL: tempURL,
});

