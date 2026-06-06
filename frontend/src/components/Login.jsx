import { useState } from "react";
import axios from "axios";

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

alert(response.data.name);
console.log(response.data);
    } catch (error) {
  console.log("ERROR:", error);
  console.log("RESPONSE:", error.response);
  console.log("DATA:", error.response?.data);

  alert("Check Console");
}
  };

  return (
    <div>
      <h2 style={{ color: "#333" }}>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />

      <br />

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;