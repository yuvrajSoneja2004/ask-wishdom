import axios from "axios";

// The axios Instance
export const axiosInstance = axios.create({
    baseURL: 'http://localhost:6969/',
    timeout: 1000,
});