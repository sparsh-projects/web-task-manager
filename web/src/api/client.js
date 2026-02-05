import axios from 'axios';

const api =axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: false,
});

api.interceptors.request.use(
    (config) => {
        // 🔑 1. Read token
        const token = localStorage.getItem("token");

        // 🔐 2. Attach token if exists
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log("Request",config.method?.toUpperCase(), config.url);
        return config;
    },
    (error) => {
        console.log("Request Error", error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log("Api Response Error", error.message);
        return Promise.reject(error);
    }
);

export default api;