import React from "react";
import { useLocation } from "react-router-dom";

const History = () => {
    const location = useLocation()
    const user = location.state && location.state.user
    return(
        <div>
            <p>Hello {user.name}! Here you can view your History</p>
        </div>
    )
}

export default History