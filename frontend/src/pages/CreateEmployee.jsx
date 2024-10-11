import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Loader,
  User,
  Mail,
  Phone,
  Briefcase,
  Image,
  BookOpen,
} from "lucide-react";
import Input from "../components/Input";

import { useAuthStore } from "../store/authStore";

const CreateEmployee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [course, setCourse] = useState("");
  const [img, setImage] = useState("null");
  const navigate = useNavigate();
  const { createEmployee, isLoading, error } = useAuthStore();

  const handleCreateEmp = async (e) => {
    e.preventDefault();
    try {
      await createEmployee(
        name,
        email,
        mobile,
        designation,
        gender,
        course,
        img
      );
      navigate("/employeeCreated");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <div className="p-8">
        <h2
          className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-red-400 to-gray-500
              text-transparent bg-clip-text"
        >
          Create Employee
        </h2>
        <form onSubmit={handleCreateEmp}>
          <Input
            icon={User}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            icon={Mail}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            icon={Phone}
            type="text"
            placeholder="Mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />

          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Briefcase className="size-5 text-red-300" />
            </div>
            <select
              className="w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
            >
              <option value="">Select Designation</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Gender</label>
            <div className="flex space-x-4">
              <label className="text-gray-300">
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  className="mr-2"
                  onChange={() => setGender("M")}
                  required
                />
                Male
              </label>
              <label className="text-gray-300">
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  className="mr-2"
                  onChange={() => setGender("F")}
                  required
                />
                Female
              </label>
            </div>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <BookOpen className="size-5 text-red-300" />
            </div>
            <select
              className="w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-2 focus:ring-green-500 text-white placeholder-gray-400 transition duration-200"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
            >
              <option value="">Select Course</option>
              <option value="MCA">MCA</option>
              <option value="BCA">BCA</option>
              <option value="BSC">BSC</option>
            </select>
          </div>

          <Input
            icon={Image}
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button
            className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="w-6 h-6 animate-spin text-center mx-auto" />
            ) : (
              "create employee"
            )}
          </button>
          {error && <p className="text-red-500 font-semibold mb-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateEmployee;
