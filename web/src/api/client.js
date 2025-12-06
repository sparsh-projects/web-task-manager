import axios from 'axios';

const api =axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: false,
});

api.interceptors.request.use(
    (config) => {
        console.log("Request", config.url);
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