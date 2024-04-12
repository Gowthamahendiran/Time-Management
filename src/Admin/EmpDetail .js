import React, { useState, useEffect } from "react";
import './EmpDetail.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AdminEdit from "./AdminEdit";

const EmpDetail = ({user}) => {
  const [employees, setEmployees] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [timings, setTimings] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:3000/employees");
        if (response.ok) {
          const data = await response.json();
          setEmployees(data);
        } else {
          console.log("Error:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
    fetchEmployees();
  }, []);

  const handleRoleClick = (role) => {
    setSelectedRole(role);
    setSelectedUser(null);
    setTimings(null);
  };

  const handleUserClick = async (userId) => {
    setSelectedUser(userId);
    try {
      const response = await fetch(`http://localhost:3000/timesheet/${userId}/entries`);
      if (response.ok) {
        const data = await response.json();
        setTimings(data);
      } else {
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const renderRoleButtons = () => {
    const roles = Array.from(new Set(employees.map((employee) => employee.role)));
    return roles.map((role, index) => (
      <button key={index} onClick={() => handleRoleClick(role)}>
        {role}
      </button>
    ));
  };

  const renderUsers = () => {
    if (!selectedRole) return null;
    const users = employees.filter((employee) => employee.role === selectedRole);
    return users.map((user, index) => (
      <button key={index} onClick={() => handleUserClick(user._id)}>
        {user.name}
      </button>
    ));
  };

  const renderTimings = () => {
    if (!selectedUser || !timings) return null;
    const SelecteduserName = employees.find((employee) => employee._id === selectedUser)?.name;
    const selectedTimings = timings.filter(timing => {
      const timingDate = new Date(timing.timeIn).toDateString();
      return new Date(selectedDate).toDateString() === timingDate;
    });
    return (
      <div>
        <h3>{SelecteduserName} Login Records</h3>
        <ul>
          {selectedTimings.map((timing, index) => (
            <li key={index}>
              Time In: {new Date(timing.timeIn).toLocaleString()} - Time Out: {timing.timeOut ? new Date(timing.timeOut).toLocaleString() : "Not recorded"}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <h2>Employee Details:</h2>
      <div className="role-buttons">
        {renderRoleButtons()}
      </div>
      <div className="users">
        {renderUsers()}
      </div>
      <div className="timings">
        <Calendar
          value={selectedDate}
          onChange={setSelectedDate}
          tileContent={({ date }) => {
            if (timings) {
              const timingDate = new Date(date).toDateString();
              const timingsForDate = timings.filter(timing => new Date(timing.timeIn).toDateString() === timingDate);
              return timingsForDate.length > 0 ? <div className="dot"></div> : null;
            }
            return null;
          }}
        />
        {renderTimings()}
      </div>
      <AdminEdit user={user}/>
    </div>
  );
};

export default EmpDetail;
