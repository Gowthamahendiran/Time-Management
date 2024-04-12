import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const History = () => {
  const location = useLocation();
  const user = location.state && location.state.user;
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchTimeEntries = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/timesheet/${user._id}/entries`
        );
        if (response.ok) {
          const data = await response.json();
          const formattedEvents = data.reduce((accumulator, entry) => {
            if (entry.timeIn && entry.timeOut) {
              accumulator.push({
                title: "Time In",
                start: new Date(entry.timeIn),
                end: new Date(entry.timeIn),
              });
              accumulator.push({
                title: "Time Out",
                start: new Date(entry.timeOut),
                end: new Date(entry.timeOut),
              });
            }
            return accumulator;
          }, []);
          setEvents(formattedEvents);
        } else {
          console.error("Error:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    };
    fetchTimeEntries();
  }, [user._id]);

  return (
    <div>
      <h1 style={{textAlign: "center"}}>History</h1>
      <div style={{ height: 500 }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ margin: "50px" }}
        />
      </div>
    </div>
  );
};

export default History;
