import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import LoginCard from "./LoginCard";
import { useAuth } from "../Auth/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        console.log("Login successful");
        const userData = await response.json();

        if (userData.user.category === 'Admin') {
          navigate("/Admin", { state: { user: userData.user } } );
        } else if (userData.user.category === 'SuperAdmin') {
          navigate('/SuperAdmin' , { state: {user: userData.user}})
        } else{
          navigate("/dashboard", { state: { user: userData.user } });
        }
      } else {
        console.log("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="login-page">
      <LoginCard>
        <h2>Login Page!</h2>
        <input
          placeholder="Email ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </LoginCard>
    </div>
  );
};

export default LoginPage;
