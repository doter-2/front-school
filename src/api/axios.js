import axios from "axios";

const API = axios.create({
  baseURL: "https://school-dairy.onrender.com/api/",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem("refresh_token");

      if (!refresh) {
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(
          "https://school-dairy.onrender.com/api/token/refresh/",
          { refresh },
        );

        const newAccess = response.data.access;
        localStorage.setItem("access_token", newAccess);

        originalRequest.headers.Authorization = `Bearer ${newAccess}`;

        return API(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default API;
