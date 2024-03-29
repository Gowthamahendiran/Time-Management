import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const About = () => {
  const location = useLocation();
  const user = location.state && location.state.user;
  const [profileImage, setProfileImage] = useState(null);

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    setProfileImage(file);
  };

  const updateProfilePicture = async () => {
    try {
      const formData = new FormData();
      formData.append('profileImage', profileImage);

      const response = await fetch(`http://localhost:3000/update-profile-picture/${user._id}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        console.log('Profile picture updated successfully');
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  

  return (
    <div>
      <h2>Hello {user.name}!</h2>
      <p>Your Details:</p>
      <ul>
        <li> Email : {user.email}</li>
        <li> Employee ID : {user.employeeId}</li>
        <li> Role : {user.role}</li>
        <li> Password : {user.password}</li>
      </ul>
      <img
        src={`http://localhost:3000/${user.profileImage}`}
        style={{ width: "300px" }}
      />
      <br />
      <button>Change Password</button>
      <br />
      <button>Change Profile Picture</button>

        <>
      <label>
        Upload Profile Image:
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          onChange={handleProfileImageChange}
        />
      </label>
      <br />
      <button onClick={updateProfilePicture}>Update Profile Picture</button>
      </>
    </div>
  );
};

export default About;
