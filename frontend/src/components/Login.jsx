import { useState } from "react";
import axios from "axios";
import "../Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://fullstack-expense-tracker-1-34rh.onrender.com/api/users/login",
        {
          email,
          password,
        }
      );
console.log("LOGIN RESPONSE:", response.data);
      localStorage.setItem(
  "token",
  response.data.token
);

localStorage.setItem(
  "userName",
  response.data.name
);

localStorage.setItem(
  "userId",
  response.data.id
);

window.location.href = "/";
console.log(response.data);
    } catch (error) {
  console.log("ERROR:", error);
  console.log("RESPONSE:", error.response);
  console.log("DATA:", error.response?.data);

  alert("Check Console");
}
  };

  return (
  <div className="auth-container">
    <div className="auth-card">

      <div className="logo-circle">
        💰
      </div>

      <h2 className="welcome-text">
        Welcome to
      </h2>

      <h1 className="app-title">
        Expense Tracker
      </h1>

      <p className="tagline">
        Small savings today, big dreams tomorrow.
      </p>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      

      <button onClick={handleLogin}>
  Login
</button>

    </div>
  </div>
);
}

export default Login;