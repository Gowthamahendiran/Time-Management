import React, { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import "./PathNote.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const PathNote = ({ user }) => {
  const navigate = useNavigate()


  const [adminMessage, setAdminMessage] = useState("");

  const fetchAdminMessage = async () => {
    try {
      const response = await fetch('http://localhost:3000/admin/message/latest');
      if (response.status === 200) {
        const data = await response.json();
        setAdminMessage(data.message);
      } else {
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    fetchAdminMessage();
  }, []);

  
  const [showNewsModal, setShowNewsModal] = useState(false);

  const handleNewsClick = () => {
    setShowNewsModal(true);
  };

  const handleCloseModal = () => {
    setShowNewsModal(false);
  };


  const handleAbout = () =>{
    navigate('/dashboard/about' ,{ state: {user}})
  }

  const handleHistory = () => {
    navigate('/dashboard/history', {state : {user}})
  }

  const handleLeave = () => {
    navigate('/dashboard/leavereq', {state: {user}})
  }
  return (
    <div className="path-note-card">
      <div className="button-row">
        <button className="button-size" onClick={handleNewsClick}>
          Updates
        </button>
        <button className="button-size" onClick={handleAbout}>About</button>
      </div>
      <div className="button-row">
        <button className="button-size" onClick={handleHistory}>History</button>
        <button className="button-size" onClick={handleLeave}>
          Leave Request
        </button>
      </div>

      {/* Modal for News */}
      {showNewsModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>Updates</h2>
            <p>{adminMessage ? adminMessage : "No news at the moment."}</p>
          </div>
        </div>
      )}
{/* 
      {LeaveRequest && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleLeaveClose}>
              &times;
            </span>
            <h2>Leave Request</h2>
            <form ref={form} onSubmit={sendEmail}>
            <div className="input-container">
              <label className="input-label">Name</label>
              <input className="input-field" type="text" name="user_name" value={user.name} readOnly />
              <label className="input-label">Email</label>
              <input
                type="email"
                name="user_email"
                value={user.email}
                readOnly
                className="input-field"
              />
              </div>
              <div className="input-container date-container">
                <div>

              <label className="input-label">From Date</label>
              <DatePicker
                selected={fromDate}
                onChange={(date) => setFromDate(date)}
                value={fromDate}
                name="fromDate"
                className="input-field-date"
              />
               </div>

              <div>

              <label className="input-label">To Date</label>
              <DatePicker
                selected={toDate}
                onChange={(date) => setToDate(date)}
                value={toDate}
                name="toDate"
                className="input-label"
              />
              </div>
              </div>
              <div className="input-container">
              <label name="totalDays" className="input-label">Total Days: </label>
              <input name="totalDays" className="input-field" value={totalDays} readOnly />
              <label className="input-label">Reason for Leave</label>
              <input
                type="text"
                name="reason_leave"
                value={reasonLeave}
                onChange={(e) => setReasonLeave(e.target.value)}
                className="input-field"
              />
              </div>
              <div className="input-containerr">
              <label className="input-labell">Message</label>
              <textarea
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="input-fieldd"
              />
              </div>
              <br />
              <input type="submit" value="Send" />
            </form>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default PathNote;
