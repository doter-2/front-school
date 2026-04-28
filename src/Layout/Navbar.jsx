import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Navbar = ({ user }) => {
  const [access, setAccess] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const access = localStorage.getItem("access_token");
    setData(user);
    setAccess(access);
  }, [user]);

  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <h3>Электронный дневник</h3>

      {access ? (
        <button onClick={logout}>Выйти</button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </header>
  );
};

export default Navbar;
