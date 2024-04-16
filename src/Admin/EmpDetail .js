import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import './EmpDetail.css';
import AdminEdit from "./AdminEdit";
import RecentEntries from "./RecentEntries";

const localizer = momentLocalizer(moment);

const EmpDetail = ({ user }) => {
    const [employees, setEmployees] = useState([]);
    const [selectedRole, setSelectedRole] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [timings, setTimings] = useState(null);
    const [leaveEvents, setLeaveEvents] = useState([]);
    const [showCalendar, setShowCalendar] = useState(false);

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

    useEffect(() => {
        if (selectedUser) {
            fetchTimings(selectedUser._id);
            fetchLeave(selectedUser.email);
        }
    }, [selectedUser]);

    const fetchTimings = async (userId) => {
        try {
            const response = await fetch(`http://localhost:3000/timesheet/${userId}/entries`);
            if (response.ok) {
                const data = await response.json();
                setTimings(data);
                setShowCalendar(true);
            } else {
                console.log("Error:", response.statusText);
            }
        } catch (error) {
            console.error("Error:", error.message);
        }
    };

    const fetchLeave = async (email) => {
      try {
          const response = await fetch(`http://localhost:3000/leave-history/${email}`);
          if (response.ok) {
              const leaveHistory = await response.json();
              // Filter leave events to only include those with the status "Approved"
              const approvedLeaveEvents = leaveHistory
                  .filter(leave => leave.status === "Approved")
                  .map(leave => ({
                      start: new Date(leave.fromDate),
                      end: moment(leave.toDate).add(1, 'day').toDate(),
                      title: 'Leave',
                  }));
              setLeaveEvents(approvedLeaveEvents);
          } else {
              console.log("Error:", response.statusText);
          }
      } catch (error) {
          console.error("Error:", error.message);
      }
  };
  

    const handleRoleClick = (role) => {
        setSelectedRole(role);
        setSelectedUser(null);
        setTimings(null);
        setShowCalendar(false);
    };

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    const renderRoleButtons = () => {
        const rolesWithUsers = employees.reduce((roles, employee) => {
            if (employee.category === 'User' && !roles.includes(employee.role)) {
                roles.push(employee.role);
            }
            return roles;
        }, []);

        return rolesWithUsers.map((role, index) => (
            <button key={index} onClick={() => handleRoleClick(role)}>
                {role}
            </button>
        ));
    };

    const renderUsers = () => {
        if (!selectedRole) return null;
        const users = employees.filter((employee) => employee.role === selectedRole);
        return users.map((user, index) => (
            <button key={index} onClick={() => handleUserClick(user)}>
                {user.name}
            </button>
        ));
    };

    const renderEvents = () => {
        const events = [];
        if (timings) {
            timings.forEach(timing => {
                events.push({
                    start: new Date(timing.timeIn),
                    end: new Date(timing.timeOut || new Date()),
                    title: 'Login',
                    className: 'login-event'
                });
                if (timing.timeOut) {
                    events.push({
                        start: new Date(timing.timeOut),
                        end: new Date(timing.timeOut),
                        title: 'Logout',
                        className: 'logout-event'
                    });
                }
            });
        }
        return [...events, ...leaveEvents];
    };

    return (
        <>
            <h1 className="EmployeeH1">Employee Time Management</h1>
            <br />
            <RecentEntries />
            <div>
                <h2>Employee Details:</h2>
                <div className="role-buttons">
                    {renderRoleButtons()}
                </div>
                <div className="users">
                    {renderUsers()}
                </div>
                {showCalendar && (
                    <div className="calendar">
                        <Calendar
                            localizer={localizer}
                            events={renderEvents()}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: 500 }}
                            eventPropGetter={event => ({
                                className: event.className,
                                style: {
                                    backgroundColor: event.title === 'Leave' ? 'red' : '',
                                },
                            })}
                        />
                    </div>
                )}
                <AdminEdit user={user} />
            </div>
        </>
    );
};

export default EmpDetail;
