import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ user }) => {
  return (
    <div className="sidebar">
      <h2>📘 Дневник</h2>

      <Link to="/">🏠 Главная</Link>
      <Link to="/schedule">📅 Расписание</Link>
      <Link to="/grades">📈 Оценки</Link>
      <Link to="/profile">👤 Профиль {user.username}</Link>
      <Link to="/attendance">🧾 Посещаемость</Link>
    </div>
  );
};

export default Sidebar;
