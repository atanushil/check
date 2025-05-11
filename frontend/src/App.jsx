// App.jsx or Routes.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import ProtectedRoute from './auth/ProtectedRoute';
import Dashboard from './dashboard/Dashboard';
import LandingPage from './auth';

const App = () => {
  return (
    // <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        
        {/* Redirect or 404 route can be added here */}
      </Routes>
  );
};

export default App;
