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
        if (email === "Admin@gmail.com" && password === "1212121212121212") {
          console.log("Email:", email);
          console.log("Password:", password);
          navigate("/Admin", { state: { user: userData.user } } );
        } else {
         
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
        <p>Login Page!</p>
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
