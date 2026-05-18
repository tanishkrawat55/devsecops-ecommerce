import axios from "axios";

const API = axios.create({
    baseURL: "https://devsecops-ecommerce.onrender.com/api"
});

export default API;