import React, { useState } from "react";
import Register from "../components/Register";

const Registerpage = ({ studentClass, setStudentClass }) => {
  const [message, setMessage] = useState("");

  async function register(user) {
    const res = await fetch("https://school-dairy.onrender.com/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const body = await res.json();
    setMessage(body.message);

    localStorage.setItem("access_token", body.access_token);
    localStorage.setItem("refresh_token", body.refresh_token);

    return body;
  }

  return (
    <div>
      <Register
        register={register}
        studentClass={studentClass}
        setStudentClass={setStudentClass}
      />
    </div>
  );
};

export default Registerpage;
