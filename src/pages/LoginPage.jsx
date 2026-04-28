import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setAccess }) => {
  // 🔥 принимаем проп
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/");
    }
  }, []);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "https://school-dairy.onrender.com/api/login/",
        form,
      );

      const token = res.data.access_token;

      // сохраняем токены
      localStorage.setItem("access_token", token);
      localStorage.setItem("refresh_token", res.data.refresh_token);

      setAccess(token); // 🔥 ВОТ ЭТО КЛЮЧ

      navigate("/"); // переход ПОСЛЕ setAccess
    } catch (err) {
      setError("❌ Неверный логин или пароль");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleLogin}>
        <h2>🔐 Вход</h2>

        {error && <p className="error">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Имя пользователя"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Вход..." : "Войти"}
        </button>

        <p>
          Нет аккаунта? <a href="/register">Регистрация</a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
