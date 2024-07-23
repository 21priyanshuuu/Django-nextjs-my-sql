"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);
  const [editEmployee, setEditEmployee] = useState(null);
  const [employeeData, setEmployeeData] = useState({
    EmployeeId: "",
    EmployeeName: "",
    Department: "",
    DateOfJoining: "",
    PhotoFileName: "",
  });
  const [newEmployeeData, setNewEmployeeData] = useState({
    EmployeeName: "",
    Department: "",
    DateOfJoining: "",
    PhotoFileName: "",
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/employee/");
        setEmployees(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/employee/${id}`);
      setEmployees(employees.filter((employee) => employee.EmployeeId !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = async () => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/employee/${employeeData.EmployeeId}`,
        employeeData
      );
      setEmployees(
        employees.map((emp) =>
          emp.EmployeeId === employeeData.EmployeeId ? employeeData : emp
        )
      );
      setEditEmployee(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = async () => {
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/employee/",
        newEmployeeData
      );
      setEmployees([
        ...employees,
        { ...newEmployeeData, EmployeeId: res.data.EmployeeId },
      ]);
      setNewEmployeeData({
        EmployeeName: "",
        Department: "",
        DateOfJoining: "",
        PhotoFileName: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleNewEmployeeChange = (e) => {
    const { name, value } = e.target;
    setNewEmployeeData({ ...newEmployeeData, [name]: value });
  };

  return (
    <div>
      <h1>Employees</h1>

      <h2>Add New Employee</h2>
      <input
        type="text"
        name="EmployeeName"
        value={newEmployeeData.EmployeeName}
        onChange={handleNewEmployeeChange}
        placeholder="Name"
      />
      <input
        type="text"
        name="Department"
        value={newEmployeeData.Department}
        onChange={handleNewEmployeeChange}
        placeholder="Department"
      />
      <input
        type="date"
        name="DateOfJoining"
        value={newEmployeeData.DateOfJoining}
        onChange={handleNewEmployeeChange}
        placeholder="Date of Joining"
      />
      <input
        type="text"
        name="PhotoFileName"
        value={newEmployeeData.PhotoFileName}
        onChange={handleNewEmployeeChange}
        placeholder="Photo File Name"
      />
      <button onClick={handleAdd}>Add Employee</button>

      <ul>
        {employees.map((employee) => (
          <li key={employee.EmployeeId}>
            <p>
              <strong>ID:</strong> {employee.EmployeeId}
            </p>
            <p>
              <strong>Name:</strong> {employee.EmployeeName}
            </p>
            <p>
              <strong>Department:</strong> {employee.Department}
            </p>
            <p>
              <strong>Date of Joining:</strong> {employee.DateOfJoining}
            </p>
            {/* Removed image section */}
            <button
              onClick={() => {
                setEditEmployee(employee);
                setEmployeeData(employee);
              }}
            >
              Edit
            </button>
            <button onClick={() => handleDelete(employee.EmployeeId)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      {editEmployee && (
        <div>
          <h2>Edit Employee</h2>
          <input
            type="text"
            name="EmployeeName"
            value={employeeData.EmployeeName}
            onChange={handleInputChange}
            placeholder="Name"
          />
          <input
            type="text"
            name="Department"
            value={employeeData.Department}
            onChange={handleInputChange}
            placeholder="Department"
          />
          <input
            type="date"
            name="DateOfJoining"
            value={employeeData.DateOfJoining}
            onChange={handleInputChange}
            placeholder="Date of Joining"
          />
          <input
            type="text"
            name="PhotoFileName"
            value={employeeData.PhotoFileName}
            onChange={handleInputChange}
            placeholder="Photo File Name"
          />
          <button onClick={handleEdit}>Save</button>
          <button onClick={() => setEditEmployee(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default EmployeesPage;
