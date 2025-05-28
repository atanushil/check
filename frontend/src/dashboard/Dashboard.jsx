import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const [protectedMsg, setProtectedMsg] = useState("");

  useEffect(() => {
    const fetchProtectedData = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch("http://localhost:5000/api/auth/protected", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setProtectedMsg(data.message);
        } else {
          setProtectedMsg("Unauthorized");
        }
      } catch {
        setProtectedMsg("Server error");
      }
    };

    fetchProtectedData();
  }, []);

  return (
    <div>
      {user?.isAdmin ? <AdminDashboard logout={logout}/> : <UserDashboard user={user} logout={logout} />}
      {/* <button onClick={logout}>Logout</button> */}
    </div>
  );
}

export default Dashboard;
