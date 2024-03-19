import React from "react";
import "./UserProfile.css";
import UserProfileCard from "./USerprofileCard";

const UserProfile = ({ user }) => {
  return (
    <div className="row">
      <UserProfileCard>
        <div className="left">
            <div className="content">
          <p className="Userp1">Hello {user.name}! </p>
          <p className="userp2">Email: {user.email}</p>
          <p className="userp2">EmployeeID : {user.employeeId}</p>
          <p className="userp2">Role: {user.role}</p>
          </div>

        </div>
        <div className="right">
          {user.profileImage && (
            <img
              src={`http://localhost:3000/${user.profileImage}`}
              alt={user.name}
              className="imagee"
            />
          )}
        </div>
      </UserProfileCard>
    </div>
  );
};

export default UserProfile;
