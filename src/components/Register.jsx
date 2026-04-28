import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = ({ register, studentClass, setStudentClass }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const classes = [
    "1а",
    "1б",
    "1в",
    "1г",
    "2а",
    "2б",
    "2в",
    "2г",
    "3а",
    "3б",
    "3в",
    "3г",
    "4а",
    "4б",
    "4в",
    "4г",
    "5а",
    "5б",
    "5в",
    "5г",
  ];

  async function handleSubmit(e) {
    e.preventDefault();

    const user = {
      username,
      email,
      password,
      student_class: studentClass,
    };

    const res = await register(user);
    console.log(res);

    if (res?.access_token) {
      navigate("/");
    }

    setUsername("");
    setEmail("");
    setPassword("");
    setStudentClass("");
  }

  return (
    <div className="register">
      <form className="register__form" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          className="register__input"
          type="text"
          name="username"
          placeholder="Username"
          required
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="register__input"
          type="email"
          name="email"
          placeholder="E-mail"
          required
        />

        {/* SELECT КЛАССА */}
        <select
          className="register__input"
          value={studentClass}
          onChange={(e) => setStudentClass(e.target.value)}
          required
        >
          <option value="">Выберите класс</option>
          {classes.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>

        <input
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          className="register__input"
          type="password"
          placeholder="Password"
          required
        />

        <button>Регистрация</button>
        <Link to="/login">Уже есть аккаунт? Войти</Link>
      </form>
    </div>
  );
};

export default Register;
