import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EmpDetail from "./EmpDetail ";
import SendAdminMessage from "./SendAdminMessage";
import Admin from "./Admin";
import AdminLogin from "./AdminLogin";
import AdminLeave from "./AdminLeave";
const AdminIndex = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state && location.state.user;

  useEffect(() => {
    if (!user || !user.category || user.category !== "Admin") {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <div>
      <Admin />
      <AdminLogin user={user} />
      <SendAdminMessage />
      <EmpDetail />
      <AdminLeave />
    </div>
  );
};

export default AdminIndex;
