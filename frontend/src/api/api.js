import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api/",
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    
    const csrfToken = Cookies.get("csrftoken");

    if (csrfToken) {
        config.headers["X-CSRFToken"] = csrfToken;
    }

    return config;
});