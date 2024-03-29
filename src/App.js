import React from "react";
import LoginPage from "./LoginPage/LoginPage";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from "./Dashboard/Dashboard";
import SuperAdmin from "./SuperAdmin/SuperAdmin";
import About from "./Dashboard/About";
import AdminIndex from "./Admin/AdminIndex";


const App = () => {
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/Admin" element={<AdminIndex />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/SuperAdmin" element={<SuperAdmin />} />
      <Route path="/dashboard/about" element={<About />} />
    </Routes>
    </BrowserRouter>
    
  )
}

export default App