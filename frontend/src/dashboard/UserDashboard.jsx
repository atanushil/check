import React from "react";
import Wrapper from "../components/End-Point/Wrapper";

function UserDashboard({user,logout}) {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-blue-100 flex items-center justify-center p-4">
      {/* <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">👋 Welcome Back, {user.name}!</h2>
        <p className="text-gray-600 text-lg mb-6">
          This is your personal dashboard. Explore your data, track progress, and interact with your system tools.
        </p>

        <div className="grid grid-cols-2 gap-6 mt-4">
          <div className="bg-blue-100 p-4 rounded-xl hover:shadow-lg transition">
            <h4 className="font-semibold text-blue-700 mb-2">📊 Your Stats</h4>
            <p className="text-sm text-gray-600">Check your usage statistics and activity logs here.</p>
          </div>
          <div className="bg-green-100 p-4 rounded-xl hover:shadow-lg transition">
            <h4 className="font-semibold text-green-700 mb-2">📁 Your Data</h4>
            <p className="text-sm text-gray-600">Access all your saved information and preferences.</p>
          </div>
          <div className="bg-purple-100 p-4 rounded-xl hover:shadow-lg transition">
            <h4 className="font-semibold text-purple-700 mb-2">⚙️ Settings</h4>
            <p className="text-sm text-gray-600">Update your profile, password, and preferences.</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-xl hover:shadow-lg transition">
            <h4 className="font-semibold text-yellow-700 mb-2">📝 Tasks</h4>
            <p className="text-sm text-gray-600">View and manage your assigned tasks or activities.</p>
          </div>
          <button type="button" onClick={logout} className="bg-red-300 p-2 border rounded-2xl cursor-pointer">Logout</button>
        </div>
      </div> */}
      <Wrapper/>
    </div>
  );
}

export default UserDashboard;
