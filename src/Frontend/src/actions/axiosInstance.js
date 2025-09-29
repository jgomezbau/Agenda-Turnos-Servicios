import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;
const token = localStorage.getItem('token');



const axiosInstance = axios.create({
    baseURL: baseUrl
});

axiosInstance.interceptors.request.use(
    (request) => {
        request.headers['Authorization'] = `Bearer ${token}`;
        return request;

    },
    (err) => err
);


export default axiosInstance;