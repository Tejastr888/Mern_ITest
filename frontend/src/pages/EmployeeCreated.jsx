import React from "react";
import { useNavigate } from "react-router-dom"; // Or useNavigate if using react-router v6+
import { useAuthStore } from "../store/authStore";

const EmployeeCreated = () => {
  const { employee } = useAuthStore();
  const navigate = useNavigate();

  // Navigate to different pages
  const goToHome = () => navigate("/");
  const createAnotherEmployee = () => navigate("/create-employee");
  const viewEmployees = () => navigate("/employees");

  return (
    <div className="max-w-md w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800">
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">
        Employee Created Successfully
      </h2>

      <div className="space-y-6">
        <div className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-green-400 mb-3">
            Employee Details
          </h3>
          <p className="text-gray-300">Name: {employee.f_Name}</p>
          <p className="text-gray-300">Email: {employee.f_Email}</p>
          <p className="text-gray-300">Mobile: {employee.f_Mobile}</p>
          <p className="text-gray-300">Designation: {employee.f_Designation}</p>
          <p className="text-gray-300">Gender: {employee.f_Gender}</p>
          <p className="text-gray-300">Course: {employee.f_Course}</p>
          <p className="text-gray-300">Image URL: {employee.f_Image}</p>
        </div>
      </div>

      <div className="mt-6 flex space-x-4">
        <button
          onClick={goToHome}
          className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white 
				font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700
				 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Home
        </button>
        <button
          onClick={createAnotherEmployee}
          className="w-full py-2 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
				font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700
				 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Create Employee
        </button>
        <button
          onClick={viewEmployees}
          className="w-full py-2 px-4 bg-gradient-to-r from-yellow-500 to-orange-600 text-white 
				font-bold rounded-lg shadow-lg hover:from-yellow-600 hover:to-orange-700
				 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          View Employees
        </button>
      </div>
    </div>
  );
};

export default EmployeeCreated;
