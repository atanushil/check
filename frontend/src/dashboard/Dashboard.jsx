import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [protectedMsg, setProtectedMsg] = useState("");

  useEffect(() => {
    async function fetchProtected() {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch("http://localhost:5000/api/auth/protected", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (res.ok) {
          setProtectedMsg(data.message);
        } else {
          setProtectedMsg(data.message || "Failed to fetch protected data");
        }
      } catch {
        setProtectedMsg("Server error");
      }
    }
    fetchProtected();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user.name}!</p>
      <p>Your role: {user.isAdmin ? "Admin" : "User"}</p>

      {user.isAdmin ? (
        <div>
          <h2>Admin Panel</h2>
          <p>{protectedMsg}</p>
        </div>
      ) : (
        <div>
          <h2>User Panel</h2>
          <p>{protectedMsg}</p>
        </div>
      )}

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;
