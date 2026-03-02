import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: {
        "Content-Type": "application/json"
    }
}); 

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');
    if (token && token !== "null" && token !== "undefined") {
        config.headers.Authorization = `Token ${token.trim()}`;
    } else {
        delete config.headers.Authorization;
    }
    return config;
});

export default api;