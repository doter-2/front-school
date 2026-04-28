import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import SchedulePage from "./pages/SchedulePage";
import GradesPage from "./pages/GradesPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import MainLayout from "./layout/MainLayout";
import API from "./api/axios";
import AttendancePage from "./pages/AttendancePage";

const App = () => {
  const [access, setAccess] = useState(localStorage.getItem("access_token"));

  const [payment, setPayment] = useState([]);
  const [data, setData] = useState({});
  const [schedule, setSchedule] = useState([]);
  const [studentClass, setStudentClass] = useState("");
  const [grades, setGrades] = useState([]);
  const [attendance, setAttendance] = useState([]);

  // 🔥 теперь реагирует на изменение токена
  useEffect(() => {
    if (access) {
      loadUser(access);
    }
  }, [access]);

  async function loadUser(access) {
    try {
      const res = await API.get("user-info/", {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      setData(res.data);

      loadSchedule(access, res.data.student_class || "1Б");
      loadGrades(access, res.data.username);
      loadAttendance(access, res.data.username);
      loadPayment(access, res.data.username);
    } catch (error) {
      console.error(`ошибка при получении пользователя: ${error}`);
    }
  }

  async function loadSchedule(access, student_class) {
    try {
      const res = await API.get(`schedule/?student_class=${student_class}`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      setSchedule(res.data);
    } catch (error) {
      console.error(`ошибка при получении расписания: ${error}`);
    }
  }

  async function loadGrades(access, username) {
    try {
      const res = await API.get(`grades/?username=${username}`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      setGrades(res.data);
    } catch (error) {
      console.error(`ошибка при получении оценок: ${error}`);
    }
  }

  async function loadAttendance(access, username) {
    try {
      const res = await API.get(`attendance/?username=${username}`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      setAttendance(res.data);
    } catch (error) {
      console.error(`ошибка при получении посещаемости: ${error}`);
    }
  }

  async function loadPayment(access, username) {
    try {
      const res = await API.get(`payment/?username=${username}`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      setPayment(res.data);
    } catch (error) {
      console.error(`ошибка при получении оплаты: ${error}`);
    }
  }

  return (
    <Routes>
      {/* 🔓 Публичные */}
      <Route path="/login" element={<LoginPage setAccess={setAccess} />} />

      <Route
        path="/register"
        element={
          <RegisterPage
            studentClass={studentClass}
            setStudentClass={setStudentClass}
            setAttendance={setAttendance}
          />
        }
      />

      {/* 🔐 Приватные */}
      <Route element={<ProtectedRoute access={access} />}>
        <Route element={<MainLayout data={data} />}>
          <Route
            path="/"
            element={
              <HomePage
                data={data}
                schedule={schedule}
                grades={grades}
                attendance={attendance}
              />
            }
          />
          <Route
            path="/profile"
            element={<ProfilePage data={data} payment={payment} />}
          />
          <Route
            path="/schedule"
            element={<SchedulePage schedule={schedule} />}
          />
          <Route path="/grades" element={<GradesPage grades={grades} />} />
          <Route
            path="/attendance"
            element={<AttendancePage attendance={attendance} />}
          />
        </Route>
      </Route>

      {/* ❌ 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
