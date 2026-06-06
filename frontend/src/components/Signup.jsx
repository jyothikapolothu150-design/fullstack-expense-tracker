import { useState } from "react";
import axios from "axios";
import "../Auth.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await axios.post(
  "https://fullstack-expense-tracker-1-34rh.onrender.com/api/users/signup",
        {
          name,
          email,
          password,
        }
      );

      alert("Signup Successful");
    } catch (error) {
  console.log("ERROR:", error);
  console.log("DATA:", error.response?.data);

  alert(
    error.response?.data?.message ||
    "Signup Failed"
  );
}
  };

  return (
  <div className="auth-container">
    <div className="auth-card">

      <div className="logo-circle">
        🚀
      </div>

      <h2 className="welcome-text">
        Create Your Account
      </h2>

      <h1 className="app-title">
        Expense Tracker
      </h1>

      <p className="tagline">
        Small savings today, big dreams tomorrow.
      </p>

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Create password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="login-btn"
        onClick={handleSignup}
      >
        Create Account
      </button>

    </div>
  </div>
);
}

export default Signup;