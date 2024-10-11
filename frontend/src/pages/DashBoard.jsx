import React from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

const DashBoard = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCreateEmployee = () => {
    navigate("/create-employee");
  };

  const handleEditEmployee = () => {
    navigate("/edit-employee");
  };

  return (
    <div className="max-w-md w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800 relative">
      {/* Logo in top-left corner */}
      <div className="absolute top-4 left-4">
        <Loader className="size-165 text-red-300" />
      </div>

      {/* Dashboard Title */}
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">
        Dashboard
      </h2>

      <div className="space-y-6">
        {/* Profile Information */}
        <div className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-green-400 mb-3">
            Profile Information
          </h3>
          <p className="text-gray-300">Name: {user.f_userName}</p>
        </div>

        {/* Account Activity */}
        <div className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-green-400 mb-3">
            Account Activity
          </h3>
          <p className="text-gray-300">
            <span className="font-bold">Joined: </span>
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Buttons for creating and editing employees */}
      <div className="mt-6 space-y-3">
        <button
          onClick={handleCreateEmployee}
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white 
          font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-blue-700
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Create Employee
        </button>

        <button
          onClick={handleEditEmployee}
          className="w-full py-3 px-4 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white 
          font-bold rounded-lg shadow-lg hover:from-yellow-600 hover:to-yellow-700
          focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Edit Employee
        </button>
      </div>

      {/* Logout Button */}
      <div className="mt-4">
        <button
          onClick={handleLogout}
          className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
          font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700
          focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashBoard;
