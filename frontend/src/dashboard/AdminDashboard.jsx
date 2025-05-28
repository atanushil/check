import React from "react";

function AdminDashboard({logout}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-blue-800 mb-4 text-center">Admin Dashboard 👨‍💼</h2>
        <p className="text-gray-700 text-center mb-6">
          Welcome, Admin! Here you can manage users, view system stats, and control the application.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-xl p-5 shadow hover:shadow-md transition duration-300">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">👥 Manage Users</h3>
            <p className="text-gray-600 text-sm">Add, update, or remove users with ease.</p>
          </div>

          <div className="bg-blue-50 rounded-xl p-5 shadow hover:shadow-md transition duration-300">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">📊 View Stats</h3>
            <p className="text-gray-600 text-sm">Track usage, registrations, and performance.</p>
          </div>

          <div className="bg-blue-50 rounded-xl p-5 shadow hover:shadow-md transition duration-300">
            <h3 className="text-xl font-semibold text-blue-700 mb-2">⚙️ System Settings</h3>
            <p className="text-gray-600 text-sm">Configure features and security settings.</p>
          </div>
        <button type="button" onClick={logout} className="bg-red-300 p-2 border rounded-2xl cursor-pointer">Logout</button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
