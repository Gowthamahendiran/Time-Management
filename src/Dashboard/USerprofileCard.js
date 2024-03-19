import React from "react";
import './UserCard.css'; 

const USerprofileCard = ({ children }) => {
    return (
        <div className="login-card">
            {children}
        </div>
    );
}

export default USerprofileCard;
