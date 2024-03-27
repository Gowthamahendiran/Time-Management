import React from "react";
import LoginPage from "./LoginPage/LoginPage";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Admin from "./Admin/Admin";
import Dashboard from "./Dashboard/Dashboard";
import SuperAdmin from "./SuperAdmin/SuperAdmin";


const App = () => {
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/Admin" element={<Admin />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/SuperAdmin" element={<SuperAdmin />} />
    </Routes>
    </BrowserRouter>
    
  )
}

export default App