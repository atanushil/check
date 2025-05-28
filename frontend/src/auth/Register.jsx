import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    isAdmin: false // false means normal user
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMsg("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMsg(data.message || "Registration failed");
      }
    } catch (error) {
      setMsg("Server error");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {msg && <p>{msg}</p>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <label>
          Admin:
          <input type="checkbox" name="isAdmin" checked={form.isAdmin} onChange={handleChange} />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
