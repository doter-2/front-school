import axios from "axios";

const API = axios.create({
  baseURL: "https://school-dairy.onrender.com/api/",
});

// Добавляем токен в каждый запрос
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Обработка 401 и refresh токена
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Проверяем, что есть ответ и это 401
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem("refresh_token");

      // если refresh токена нет — просто падаем
      if (!refresh) {
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(
          "https://school-dairy.onrender.com/api/token/refresh/",
          { refresh },
        );

        const newAccess = response.data.access;

        // сохраняем новый токен
        localStorage.setItem("access_token", newAccess);

        // обновляем заголовок
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;

        // повторяем оригинальный запрос
        return API(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default API;
