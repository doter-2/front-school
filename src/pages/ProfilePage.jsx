import { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = ({ data, payment = [] }) => {
  const [user, setUser] = useState();
  const [showPayments, setShowPayments] = useState(false);
  const [openAvatar, setOpenAvatar] = useState(false);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  const BASE_URL = "http://127.0.0.1:8000";

  const avatarURL = user?.avatar?.startsWith("http")
    ? user.avatar
    : `${BASE_URL}${user?.avatar}`;

  const handleImage = (e) => {
    const img = e.target.files[0];
    setFile(img);
    setPreview(URL.createObjectURL(img));
  };

  async function updateProfile() {
    const access_token = localStorage.getItem("access_token");
    const formData = new FormData();
    formData.append("username", user?.username);
    formData.append("email", user?.email);
    formData.append("student_class", user?.student_class);

    if (file) {
      formData.append("avatar", file);
    }

    try {
      setLoading(true);

      const res = await axios.patch(
        "https://school-dairy.onrender.com/api/user-info/update/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "multipart/form-user",
          },
        },
      );

      console.log("UPDATED:", res.user);
      setUser(res.data);
      setLoading(false);
      setFile(null);
      setPreview(null);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  const hasDebt = payment.some((p) => !p.paid);

  return (
    <main
      style={{ padding: "20px", background: "#f4f6fb", minHeight: "100vh" }}
    >
      <h1>👤 Профиль</h1>

      {/* PROFILE CARD */}
      <div
        style={{
          padding: "20px",
          borderRadius: "20px",
          background: "linear-gradient(135deg, #273da4, #4facfe)",
          color: "#fff",
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        {/* AVATAR */}
        <div style={{ position: "relative" }}>
          <img
            src={preview || avatarURL}
            alt="avatar"
            onClick={() => setOpenAvatar(true)}
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #fff",
              cursor: "pointer",
            }}
          />

          {/* UPLOAD BUTTON */}
          <label
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              background: "#21a038",
              width: "25px",
              height: "25px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#fff",
            }}
          >
            +
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              style={{ display: "none" }}
            />
          </label>
        </div>

        {/* INFO */}
        <div>
          <h2>{user?.username}</h2>
          <p>{user?.email}</p>
          <p>Класс: {user?.student_class}</p>
        </div>
      </div>

      {/* SAVE BUTTON */}
      <button
        onClick={updateProfile}
        disabled={loading}
        style={{
          marginTop: "15px",
          width: "100%",
          padding: "12px",
          borderRadius: "12px",
          border: "none",
          background: "#273da4",
          color: "#fff",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        {loading ? "Сохранение..." : "💾 Сохранить изменения"}
      </button>

      {/* DEBT WARNING */}
      {hasDebt && (
        <div
          style={{
            marginTop: "15px",
            padding: "15px",
            borderRadius: "10px",
            background: "#ffecec",
            color: "#e74c3c",
            fontWeight: "bold",
          }}
        >
          ⚠️ Есть неоплаченные месяцы
        </div>
      )}

      {/* PAYMENTS BUTTON */}
      <button
        onClick={() => setShowPayments(!showPayments)}
        style={{
          marginTop: "20px",
          width: "100%",
          padding: "15px",
          borderRadius: "12px",
          background: "#21a038",
          color: "#fff",
          border: "none",
          fontWeight: "bold",
        }}
      >
        💳 {showPayments ? "Скрыть платежи" : "Показать платежи"}
      </button>

      {/* PAYMENTS */}
      {showPayments && (
        <div style={{ marginTop: "15px", display: "grid", gap: "10px" }}>
          {payment.map((p) => (
            <div
              key={p.id}
              style={{
                background: "#fff",
                padding: "15px",
                borderRadius: "12px",
              }}
            >
              <h3>{p.month}</h3>
              <p>{p.date_pay}</p>
              <span style={{ color: p.paid ? "green" : "red" }}>
                {p.paid ? "Оплачено" : "Долг"}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* AVATAR MODAL */}
      {openAvatar && (
        <div
          onClick={() => setOpenAvatar(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={preview || avatarURL}
            alt="avatar"
            style={{
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "4px solid white",
            }}
          />
        </div>
      )}
    </main>
  );
};

export default ProfilePage;
