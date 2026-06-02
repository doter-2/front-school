# School Diary — Frontend
Frontend часть веб-приложения электронного школьного дневника.

##  Технологии

- React
- Vite
- React Router DOM
- Axios
- JWT Authentication



 Функционал

- Регистрация и вход
- Авторизация через JWT (access + refresh token)
- Автоматическое обновление токена (Axios interceptors)
- Protected Routes
- Личный кабинет пользователя
- Расписание уроков
- Оценки
- Посещаемость
- Платежи
- Обновление профиля (аватар, данные)



  Авторизация

Проект использует JWT:

- access_token — хранится в localStorage
- refresh_token — используется для обновления access токена
- Axios автоматически обновляет токен при 401 ошибке



## Backend

Backend часть проекта:
- Django REST API
- JWT authentication
- Cloudinary storage

API URL:

https://db-school-diary.onrender.com/api/

##  Запуск проекта

bash
npm install
npm run dev
