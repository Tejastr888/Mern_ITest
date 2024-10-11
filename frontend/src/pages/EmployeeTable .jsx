import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [nameFilter, setNameFilter] = useState("");
  const [sortField, setSortField] = useState("f_Name");
  const [sortOrder, setSortOrder] = useState("asc");
  const API_URL = "http://localhost:5000/api/auth";
  axios.defaults.withCredentials = true;
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${API_URL}/employees`, {
        params: {
          page: currentPage,
          name: nameFilter,
          sort: sortField,
          order: sortOrder,
        },
      });
      setEmployees(response.data.employees);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  // Call the fetch function whenever filters, sort, or page changes
  useEffect(() => {
    fetchEmployees();
  }, [currentPage, nameFilter, sortField, sortOrder]);

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Employee List</h1>

      {/* Filter by name */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Filter by name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        />
        <button
          onClick={() => fetchEmployees()}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Apply Filter
        </button>
      </div>

      {/* Employee Table */}
      <table className="table-auto w-full bg-gray-900 text-white">
        <thead>
          <tr className="bg-gray-700">
            <th
              className="px-4 py-2 cursor-pointer"
              onClick={() => handleSort("f_Id")}
            >
              ID {sortField === "f_Id" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="px-4 py-2 cursor-pointer"
              onClick={() => handleSort("f_Name")}
            >
              Name {sortField === "f_Name" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="px-4 py-2 cursor-pointer"
              onClick={() => handleSort("f_Email")}
            >
              Email{" "}
              {sortField === "f_Email" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="px-4 py-2 cursor-pointer"
              onClick={() => handleSort("createdAt")}
            >
              Created At{" "}
              {sortField === "createdAt" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4">
                No employees found
              </td>
            </tr>
          ) : (
            employees.map((employee) => (
              <tr key={employee.f_Id} className="border-b border-gray-700">
                <td className="px-4 py-2">{employee.f_Id}</td>
                <td className="px-4 py-2">{employee.f_Name}</td>
                <td className="px-4 py-2">{employee.f_Email}</td>
                <td className="px-4 py-2">{employee.f_Mobile}</td>
                <td className="px-4 py-2">{employee.f_Designation}</td>
                <td className="px-4 py-2">{employee.f_Gender}</td>
                <td className="px-4 py-2">{employee.f_Course}</td>
                <td className="px-4 py-2">
                  {new Date(employee.createdAt).toLocaleDateString("en-US")}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeTable;
