import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

request.interceptors.request.use(
  (config) => {
    const jwtToken = localStorage.getItem("accessToken");
    if (jwtToken) {
      config.headers["Authorization"] = "Bearer " + jwtToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request;
