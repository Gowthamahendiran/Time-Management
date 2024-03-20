import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EmpDetail from "./EmpDetail ";

const Admin = () => {
  const location = useLocation();
  const user = location.state && location.state.user;
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [adminMessage, setAdminMessage] = useState('');


  useEffect(() => {
    if (!user || user.email !== "Admin@gmail.com" || user.password !== "1212121212121212") {
      navigate("/");
    }
  }, [navigate, user]);


  const handleCreateEmployee = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('employeeId', employeeId);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('role', role);
      formData.append('profileImage', profileImage);

      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        body: formData,
      });

      if (response.status === 201) {
        console.log("User created successfully");
        navigate("/");
      } else {
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
  };

  const handleAdminMessageChange = (event) => {
    setAdminMessage(event.target.value);
  };

  const handleSendAdminMessage = async () => {
    try {
      const response = await fetch('http://localhost:3000/admin/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: adminMessage }),
      });

      if (response.status === 201) {
        console.log("Admin message sent successfully");
        // Optionally, you can clear the message input field after sending
        setAdminMessage('');
      } else {
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      <p>This is Admin Page!</p>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input placeholder="Employee ID" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
      <input placeholder="Email ID" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <label>
        Upload Profile Image:
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={handleProfileImageChange}
        />
      </label>
      <button onClick={handleCreateEmployee}>Create an Employee</button> 
      <br />
      <div>
        <h2>Send Admin Message</h2>
        <textarea
          value={adminMessage}
          onChange={handleAdminMessageChange}
          rows="4"
          cols="50"
          placeholder="Enter admin message..."
        />
        <br />
        <button onClick={handleSendAdminMessage}>Send Message</button>
      </div>
      <EmpDetail />
    </div>
  );
}

export default Admin;
