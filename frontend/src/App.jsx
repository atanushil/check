import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Register from "../src/auth/Register";
import Login from "../src/auth/Login";
import Dashboard from "../src/dashboard/Dashboard";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    </AuthProvider>
  );
}

export default App;
