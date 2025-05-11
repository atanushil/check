import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import ProtectedRoute from './auth/ProtectedRoute';
import Dashboard from './dashboard/Dashboard';
import LandingPage from './auth'; // Assuming this is your home page

const App = () => {
  const isLoggedIn = localStorage.getItem('status'); // You can replace this with more secure logic

  return (
      <Routes>
        <Route path='/' element={<LandingPage />} />

        {/* Prevent access to /login and /register if already logged in */}
        <Route
          path="/login"
          element={!isLoggedIn ? <Login /> : <Navigate to="/dashboard" replace />}
        />
        <Route
          path="/register"
          element={!isLoggedIn ? <Register /> : <Navigate to="/dashboard" replace />}
        />

        {/* Protected route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Optional: catch-all 404 route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
  );
};

export default App;
