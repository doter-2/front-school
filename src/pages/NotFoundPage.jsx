import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="notfound">
      <div className="notfound__card">
        <h1 className="notfound__code">404</h1>
        <h2>Страница не найдена</h2>
        <p>Возможно, ты перешёл по неправильной ссылке</p>

        <Link to="/" className="notfound__btn">
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
