import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setAccess }) => {
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
        "https://db-school-diary.onrender.com/api/login/",
        form,
      );

      const access = res.data.access_token;
      const refresh = res.data.refresh_token;

      if (!access) throw new Error("No token");

      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      setAccess(access);

      navigate("/");
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
          placeholder="Email"
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
          Нет аккаунта?{" "}
          <a
            onClick={() => navigate("/register")}
            style={{ cursor: "pointer" }}
          >
            Зарегистрироваться
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
