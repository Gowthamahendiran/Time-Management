import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import EmpDetail from "./EmpDetail ";
import SendAdminMessage from "./SendAdminMessage";
import Admin from "./Admin";

const AdminIndex = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const user = location.state && location.state.user;

    useEffect(() => {
        if ( !user || !user.category || user.category !== 'Admin') {
          navigate("/");
        }
      }, [navigate, user]);


    return(
        <div>
            <button>Add a Employee</button>
            <Admin />
            <SendAdminMessage />
            <EmpDetail />
        </div>
    )
}

export default AdminIndex